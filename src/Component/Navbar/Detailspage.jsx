import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TfiTag } from "react-icons/tfi";
import { BsCalendar4Event } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { LiaWalletSolid, LiaLanguageSolid } from "react-icons/lia";
import { GoPersonAdd } from "react-icons/go";
import { GiMicrophone } from "react-icons/gi";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import Slider from "react-slick";
import Card from "./Card";
import LoaderImg from "../../images/insider-heart-loader.gif";

const isUserLoggedIn = () => {
  const user = localStorage.getItem("user");
  return user !== null;
};

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

const Detailspage = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = useState([]);
  const [similer, setSimilar] = useState([]);
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState(true);

// console.log(id);

  useEffect(() => {
    setTimeout(() => {
      setStatus(false);
    }, 700);
  }, []);

  useEffect(() => {
    axios
      .get(`https://paytm-insider-backend.onrender.com/get-event/${id}`)
      .then((res) => {
        const resData = res.data.data;
        setData(resData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get("https://paytm-insider-backend.onrender.com/get-events")
      .then((res) => {
        const resData = res.data.data;
        const newData = resData.filter(
          (item) => item._id !== id && item.categoryId === data.categoryId
        );
        // console.log(newData);
        setSimilar(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, data.categoryId]);
  // console.log(data);
  const userID = JSON.parse(localStorage.getItem("user"));

  const handleAddCartData = (e) => {
    e.preventDefault();

    const add = {
      userID: userID._id,
      eventId: data._id,
      price: data.price,
      location: data.location,
      startDate: data.startDate,
      endDate: data.endDate,
      time: data.time,
    };
    console.log(add);

    axios
      .post("https://paytm-insider-backend.onrender.com/add-to-cart", add)
      .then((response) => {
        const cartData = response.data.data;
        console.log(cartData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const startDate = data.startDate
    ? new Date(data.startDate).toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
      })
    : "Video on Demand";

  const endDate = data.endDate
    ? new Date(data.endDate).toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
      })
    : null;

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    speed: 500,
    centerPadding: "10px",
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "10px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "10px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };

  function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
      <button className="custom-arrow custom-prev" onClick={onClick}>
        <BiSolidLeftArrow />
      </button>
    );
  }

  function CustomNextArrow(props) {
    const { onClick } = props;
    return (
      <button className="custom-arrow custom-next" onClick={onClick}>
        <BiSolidRightArrow />
      </button>
    );
  }

  const previousSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  console.log("id in Detailspage:", id);
  return (
    <>
      {status ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <img
            src={LoaderImg}
            alt="loader"
            style={{ height: "50px", width: "50px" }}
          />
        </div>
      ) : (
        <div>
          <Navbar id={id} showCartIcon={true}/>
          <div className="sm:mx-[10px] md:mx-[50px] lg:mx-[150px]">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 grid-flow-row-dense pt-[7rem]">
              <div className="xl:col-span-2 row-span-2 overflow-hidden">
                <img
                  className="rounded-[8px]"
                  src={`https://paytm-insider-backend.onrender.com/uploads/${data?.image}`}
                  alt="img"
                />
              </div>
              <div className="xl:col-span-1 h-[100%] border rounded-[8px] p-3 flex flex-col justify-between gap-2">
                <div className="font-bold text-[21px] mb-2">{data.tittle}</div>
                <div className="flex justify-start items-center gap-3 ">
                  <div className="text-[20px]">
                    <TfiTag />
                  </div>
                  <div>{data.eventTag}</div>
                </div>
                <div>
                  {startDate && (
                    <div className="flex gap-4 items-center ">
                      <div className="text-[18px]">
                        <BsCalendar4Event />
                      </div>
                      <div className="flex items-center">
                        <div className="pe-2">{startDate}</div>
                        {endDate && (
                          <div
                            className="px-2"
                            style={{ borderLeft: "1px solid grey" }}
                          >
                            {endDate}
                          </div>
                        )}
                        {data.time && (
                          <div
                            className="ps-2"
                            style={{ borderLeft: "1px solid grey" }}
                          >
                            {data.time}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {data.location && (
                    <div className="flex justify-start items-center gap-3 ">
                      <div className="text-[20px]">
                        <IoLocationOutline />
                      </div>
                      <div>{data.location}</div>
                    </div>
                  )}
                </div>

                <div className="flex justify-start items-center gap-3">
                  <div className="text-[20px] flex text-center">
                    <LiaWalletSolid />
                  </div>
                  <div className="flex justify-between w-[100%] text-center">
                    <div className="font-bold text-[20px] py-2">
                      <span>&#8377;</span> {data.price} Onwards
                    </div>

                    <div className="border cursor-pointer text-white font-bold bg-[#ec1066] rounded-[7px] flex text-center">
                      {isUserLoggedIn() ? (
                        <button
                          onClick={(e) => {
                            navigate(`/cart/${id}`);
                            handleAddCartData(e);
                          }}
                          style={{ padding: "10px 18px" }}
                        >
                          BUY NOW
                        </button>
                      ) : (
                        <Link to={"/login"} style={{ padding: "10px 18px" }}>
                          BUY NOW
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:col-span-1 border rounded-[8px] p-3">
                <div className="flex flex-col justify-between h-[100%] gap-2">
                  <div className="border-b-gray-200 border-b-2 font-semibold pb-2">
                    Event Guide
                  </div>
                  <div className="flex justify-start items-center gap-3">
                    <div className="text-[20px]">
                      <GoPersonAdd />
                    </div>
                    <div>
                      <div className="text-[#7a7c82] text-[13px]">
                        For Age(s)
                      </div>
                      <div>{data.age}</div>
                    </div>
                  </div>
                  <div className="flex justify-start items-center gap-3">
                    <div className="text-[20px]">
                      <LiaLanguageSolid />
                    </div>
                    <div>
                      <div className="text-[#7a7c82] text-[13px]">Language</div>
                      <div>{data.language}</div>
                    </div>
                  </div>
                  <div className="flex justify-start items-center gap-3">
                    <div className="text-[20px]">
                      <GiMicrophone />
                    </div>
                    <div>
                      <div className="text-[#7a7c82] text-[13px]">
                        Live Performance
                      </div>
                      <div>{data.livePerformance}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:col-span-2">
                <div className="mb-5">
                  <div style={{ borderBottom: "1px solid #ebe2e2" }}>
                    <span
                      style={{ borderBottom: "2px solid #000000" }}
                      className="font-bold text-[#0D0F13] text-[23px]"
                    >
                      About
                    </span>
                  </div>
                  <div className="mt-5 ps-2">{data.about}</div>
                </div>
                {data.venue && (
                  <div className="my-5">
                    <div className="font-bold text-[#0D0F13] text-[23px]">
                      Venue
                    </div>
                    <div className="ps-2">{data.venue}</div>
                  </div>
                )}

                <div>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography className="font-bold text-[#0D0F13] text-[23px]">
                        Terms & Conditions
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <li>Please carry a valid ID proof along with you.</li>
                        <li>
                          No refunds on purchased ticket are possible, even in
                          case of any rescheduling.
                        </li>
                        <li>
                          Security procedures, including frisking remain the
                          right of the management.
                        </li>
                        <li>
                          No dangerous or potentially hazardous objects
                          including but not limited to weapons, knives, guns,
                          fireworks, helmets, lazer devices, bottles, musical
                          instruments will be allowed in the venue and may be
                          ejected with or without the owner from the venue.
                        </li>
                        <li>
                          The sponsors/performers/organizers are not responsible
                          for any injury or damage occurring due to the event.
                          Any claims regarding the same would be settled in
                          courts in Mumbai.
                        </li>
                        <li>
                          People in an inebriated state may not be allowed
                          entry.
                        </li>
                        <li>
                          Organizers hold the right to deny late entry to the
                          event.
                        </li>
                        <li>Venue rules apply.</li>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>
            <div className="border my-10"></div>
            <div>
              <div className="font-bold text-[#0D0F13] text-[23px] mt-10">
                YOU MAY LOVE THESE TOO 👇
              </div>

              <div className="mb-6">
                <div className="relative">
                  <div className="absolute top-1/2 -left-10 z-10">
                    <CustomPrevArrow onClick={previousSlide} />
                  </div>
                  <div>
                    <Slider ref={sliderRef} {...settings}>
                      {similer.map((e, ind) => {
                        return <Card element={e} key={ind} />;
                      })}
                    </Slider>
                  </div>
                  <div className="absolute top-1/2 -right-10 z-10">
                    <CustomNextArrow onClick={nextSlide} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
export default Detailspage;
