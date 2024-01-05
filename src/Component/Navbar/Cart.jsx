import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Cart() {
  const [expanded, setExpanded] = React.useState("panel1");
  const [data, setData] = useState([]);
  const [showCartIcon, setShowCartIcon] = useState(false);
  // const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  let navigate = useNavigate();

  // const [quantity, setQuantity] = useState(1);
  const gstRate = 0.18; // GST rate of 18%
  const bookingFee = 150;

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { id } = useParams();
  const userID = JSON.parse(localStorage.getItem("user"));
  const cartid = userID._id; //delete

  console.log(id);

  useEffect(() => {
    axios
      .get(`https://paytm-insider-backend.onrender.com/get-cart-item/${cartid}`)
      .then((res) => {
        const resData = res.data.data;
        setData(resData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, cartid]);

  console.log(data);

  function getUserDataFromLocalStorage() {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }
  const userData = getUserDataFromLocalStorage();

  const handleContinue = (event) => {
    if (expanded === "panel1") {
      setExpanded("panel2");
    } else if (expanded === "panel2") {
      setExpanded("panel3");
    }
  };

  const quantityIncrement = (index) => {
    const updatedCart = [...data];
    const item = updatedCart[index];

    if (item.quantity < 10) {
      item.quantity++;
      const eventId = item._id;
      const quantity = item.quantity;

      setData(updatedCart);

      axios
        .put(`https://paytm-insider-backend.onrender.com/update-quantity/${eventId}?type=inc`, {
          quantity: quantity,
        })
        .then((response) => {
          // Handle the response if needed
        })
        .catch((error) => {
          console.error("Error updating cart item quantity:", error);
        });
    } else {
      alert("Quantity cannot exceed 10");
    }
  };

  const quantityDecrement = (index) => {
    const updatedCart = [...data];
    const updatedItem = updatedCart[index];
    if (updatedItem.quantity > 1) {
      updatedItem.quantity--;
      const productId = updatedItem._id;
      const quantity = updatedItem.quantity;
      setData(updatedCart);
      axios
        .put(`https://paytm-insider-backend.onrender.com/update-quantity/${productId}?type=desc`, {
          quantity: quantity,
        })
        .then((response) => {})
        .catch((error) => {
          console.error("Error updating cart item quantity:", error);
        });
    }
  };

  let subPrice = Math.floor(data[0]?.price * data[0]?.quantity);
  let gstCal = subPrice * gstRate;
  let totalCost = gstCal + bookingFee;
  const eventDate = data[0]?.startDate
    ? new Date(data[0]?.startDate).toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
      })
    : null;


  const handleDeleteCart = (index) => {
    const updatedCart = [...data];
    const removedItem = updatedCart[index];
    setData(updatedCart);
    axios
      .delete(`https://paytm-insider-backend.onrender.com/delete-cart-item/${removedItem._id}`)
      .then((response) => {})
      .catch((error) => {
        console.error("Error deleting cart item:", error);
      });
  };

  let eventName = data[0]?.tittle;
  let eventLocation = data[0]?.location;
  let event_date = data[0]?.startDate;
  let eventTime = data[0]?.time;
  let totalTickets = data.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="w-[100%]">
      <Navbar showCartIcon={showCartIcon} />
      <div
        style={{ margin: "0 auto" }}
        className="w-[50%]  pt-[100px] mb-[80px] lg:mx-[150px] md:mx-[50px] ms:mx-[10px]"
      >
        <div
          style={{ color: "rgb(54, 149, 216)" }}
          className="text-center font-bold text-2xl mb-10"
        >
          Confirm your cart details and pay
        </div>
        <div className="border"></div>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className="border rounded-lg mb-4 border-t-2"
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            className="bg-blue-500 rounded-t-lg"
          >
            <Typography className="text-white" style={{ fontSize: "19px" }}>
              STEP 1: LOGGED IN AS :
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <h2 className="font-bold  text-[22px]">{userData.email}</h2>
              <p className="text-[#7a7c82] text-[12px]">
                Please note you won't lose the items in your cart if you sign
                out.
              </p>
              <Button
                variant="contained"
                onClick={handleContinue}
                className="CartCompButton"
              >
                Continue
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
        <div className="border"></div>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          className="border rounded-lg mb-4"
        >
          <AccordionSummary
            aria-controls="panel2d-content"
            id="panel2d-header"
            className="bg-blue-500 rounded-t-lg"
          >
            <Typography
              className="text-white uppercase"
              style={{ fontSize: "19px" }}
            >
              Event info
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <form onSubmit={(e) => e.preventDefault()}>
                <table className="cartForm">
                  <thead>
                    <tr className=" bg-[#eef0f5] text-left">
                      <th className="px-4">ITEM</th>
                      <th>QTY</th>
                      <th>SUBTOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="ps-2 pt-4">{data[0]?.tittle}</td>
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                        }}
                        className="pt-4"
                      >
                        <button onClick={() => quantityIncrement(0)}>+</button>
                        <h2>{data[0]?.quantity}</h2>
                        <button onClick={() => quantityDecrement(0)}>-</button>
                      </td>
                      <td className="pt-4">{subPrice}</td>
                    </tr>
                    <tr>
                      <td className="ps-2">{eventDate}</td>
                    </tr>
                    <tr>
                      <td className="p-2"></td>
                    </tr>
                    <tr className="border-dotted border-t">
                      <td colSpan="3"></td>
                    </tr>
                    <tr>
                      <td className="p-2"></td>
                    </tr>
                    <tr>
                      <td className="pt-4"></td>
                      <td>GST (18%)</td>
                      <td>{gstCal}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Booking Fee</td>
                      <td>{bookingFee}</td>
                    </tr>
                    <tr>
                      <td className="p-2"></td>
                    </tr>
                    <tr className="border-dotted border-t">
                      <td colSpan="3"></td>
                    </tr>
                    <tr>
                      <td className="p-2"></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Total</td>
                      <td>{totalCost}</td>
                    </tr>
                  </tbody>
                </table>
                <Button
                  variant="contained"
                  onClick={handleContinue}
                  className="CartCompButton"
                >
                  Continue
                </Button>
              </form>
            </div>
          </AccordionDetails>
        </Accordion>
        <div className="border"></div>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          className="border rounded-lg mb-4"
        >
          <AccordionSummary
            aria-controls="panel3d-content"
            id="panel3d-header"
            className="bg-blue-500 rounded-t-lg"
          >
            <Typography className="text-white">Payment</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <div>
              <h3 className="font-bold text-[20px]">Product Summary</h3>
              {paymentSuccess ? (
                <div>
                  <p>Payment successful! Your order is confirmed.</p>
                </div>
              ) : (
                <div>
                  <p >Event Name: {eventName}</p>
                  <p>Location: {eventLocation}</p>
                  <p>Date : {event_date?.slice(0, 10)}</p>
                  <p>Time : {eventTime}</p>
                  <p>Total Tickets: {totalTickets}</p>
                  <p>Total Price: {totalCost}</p>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleDeleteCart(0);
                      setPaymentSuccess(true);
                      navigate("/orderpage");
                    }}
                    className="CartCompButton"
                  >
                    Payment
                  </Button>
                </div>
              )}
            </div> */}

            <div>
              <h3 className="font-bold text-[20px]">Product Summary</h3>
              <div>
                <p>Event Name: {eventName}</p>
                <p>Location: {eventLocation}</p>
                <p>Date : {event_date?.slice(0, 10)}</p>
                <p>Time : {eventTime}</p>
                <p>Total Tickets: {totalTickets}</p>
                <p>Total Price: {totalCost}</p>
              </div>
              <Button
                variant="contained"
                onClick={() => {
                  handleDeleteCart(0);
                  // setPaymentSuccess(true);
                  navigate("/");
                }}
                className="CartCompButton"
              >
                Payment
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <Footer />
    </div>
  );
}
