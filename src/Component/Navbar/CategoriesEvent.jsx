import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRoute } from "react-icons/fa";
import { Link } from "react-router-dom";

const CategoriesEvent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://paytm-insider-backend.onrender.com/get-categories")
      .then((response) => {
        const responseData = response.data.data;
        setData(responseData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="mt-10">
      <div className="flex md:flex-row gap-1">
        <div className="flex items-center">
          <div className="homeIcon">
            <FaRoute />
          </div>
        </div>
        <div className=" flex flex-col">
          <div className="h-auto font-bold text-2xl md:text-4xl text-[#202226] uppercase max-h-32 font-[korolev-condensed]">
            FIND NEW EXPERIENCES
          </div>
          <div className="text-[#7a7c82]  md:text-left md:mt-1 sm:mt-16">
            Explore. Discover. Make a Plan
          </div>
        </div>
      </div>

      <div className=" justify-items-center grid gap-5 mt-4 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-3">
        {data.map((item, index) => {
          return (
            <div key={index}>
              <Link to={`/events/${item._id}`}>
                <div style={{ width: "100%", borderRadius: "5px" }}>
                  <img
                    src={`http://localhost:8282/uploads/${item.avatar}`}
                    alt="events"
                    className="max-w-full h-auto rounded-[5px]"
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesEvent;
