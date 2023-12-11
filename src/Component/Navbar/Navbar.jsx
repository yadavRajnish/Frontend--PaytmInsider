// import React, { useEffect, useState } from "react";
import logo from "../../images/Insider_Logo_Inverted_xbyvil.png";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
// import axios from "axios";

const Navbar = (showCartIcon) => {
  // const [data, setData] = useState([])
  // const navigate = useNavigate();
  let eventID = showCartIcon.id;

  // console.log(eventID);
  // console.log("showCartIcon in Navbar:", showCartIcon); // Log 'showCartIcon' if needed

  function getUserDataFromLocalStorage() {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }
  const userData = getUserDataFromLocalStorage(); // Get user data from local storage

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8282/get-events");
  //       setData(response.data.data);
  //     } catch (error) {
  //       console.error("An error occurred:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  // console.log(data);
  //   const freeEvents = data.filter((element) => element.price <= 50);
  //   console.log("All Events:", data);
  // console.log("Free Events:", freeEvents);

  // console.log(eventID);

  return (
    <div className="bg-[#0c172f] flex justify-between items-center text-white w-full py-1 px-2 fixed z-50">
      <div className="flex items-center">
        <Link to={"/"}>
          <img src={logo} className="h-7 text-center items-center" alt="Logo" />
        </Link>
        <div className="hidden md:hidden xsm:fle lg:flex h-fit items-center justify-center">
          {/* <div className="semi-round font-semibold cursor-pointer m-2 border border-slate-500 hover:border-slate-100">
            <div>Popular event</div>
          </div> */}
{/* 
          <div className="semi-round font-semibold cursor-pointer m-2 border border-slate-500 hover:border-slate-100">
            <div>Pocket Friendly Event</div>
          </div> */}
          {/* <div className="semi-round font-semibold cursor-pointer m-2 border border-slate-500 hover:border-slate-100">
            <div>Today's Event</div>
          </div> */}
        </div>
      </div>
      <div className="flex items-center">
      <Link to='/search'>
        <div className="font-semibold items-center text-center cursor-pointer m-2 border border-slate-500 hover:border-slate-100 round">
         
            <AiOutlineSearch className="icon" />
        </div>
          </Link>

        {showCartIcon && ( // Conditionally render the cart icon based on showCartIcon prop
          <Link to={`/cart/${eventID}`}>
            <div className="font-semibold cursor-pointer m-2 border border-slate-500 hover:border-slate-100 round">
              <div>
                <AiOutlineShoppingCart />
              </div>{" "}
              {/* Replace with your cart icon component */}
            </div>
          </Link>
        )}

        {userData ? (
          // If user is logged in, display the user's name
          <div className="text-center cursor-pointer m-2 rounded-[100px] px-4">
            <div>Hello, {userData.name}</div>
          </div>
        ) : (
          // If user is not logged in, display the login link
          <Link to="/login">
            <div className="round font-semibold items-center text-center cursor-pointer m-2 border border-slate-500 hover:border-slate-100 rounded-[100px] px-4">
              <div>
                <HiOutlineUser className="icon" />
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
