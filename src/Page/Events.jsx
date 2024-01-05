import Card from "../Component/Navbar/Card";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEventByQuery, getEventsById } from "../redux/AllEvents/Action";
import axios from "axios";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Navbar/Footer";

const Events = () => {
  const dispatch = useDispatch();
  const { categoryEventID } = useParams();
  const subCat = useSelector((state) => state.event);
  const events = useSelector((state) => state.event);
  const [eventNames, setEventNames] = useState([]);
  const [selectedEventName, setSelectedEventName] = useState("");

  const [check, setCheck] = useState('')

  useEffect(() => {
    dispatch(getEventsById(categoryEventID));
  }, [categoryEventID, dispatch]);

  useEffect(() => {
    axios
      .get("https://paytm-insider-backend.onrender.com/get-event-tag")
      .then((res) => {
        setEventNames(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching event names: ", err);
      });
  }, []);

  const handleEventNameClick = (eventTag) => {
    setSelectedEventName(eventTag);
    dispatch(getEventByQuery(eventTag));
  };

  return (
    <div>
      <Navbar />
      <div className="lg:mx-[150px] md:mx-[50px] ms:mx-[10px] md:text-center pt-16 mb-5">
        <div className="text-center mt-4 lg:mt-8">
          <div className="text-3xl lg:text-4xl font-bold">
            All{" "}
            <span className="pl-1">
              {subCat?.events?.data?.[0]?.eventTag
                ? subCat?.events?.data?.[0]?.eventTag
                : "Pocket Friendly"}
            </span>
          </div>
          <div className="text-3xl lg:text-4xl font-bold">
            ({subCat?.isLoading ? "Isloading" : subCat?.events?.data?.length})
          </div>
        </div>
        
        {/* <div className="text-center mt-4 lg:mt-8 flex">
        <div>TIME:</div>
        <div className="border rounded hover:bg-[#c20000] hover:text-white">
          <button className="p-2 lg:p-3">All</button>
        </div>
        <div className="border rounded hover:bg-[#c20000] hover:text-white">
          <button className="p-2 lg:p-3">Today</button>
        </div>
        <div className="border rounded hover:bg-[#c20000] hover:text-white">
          <button className="p-2 lg:p-3">Tomorrow</button>
        </div>
        <div className="border rounded hover:bg-[#c20000] hover:text-white">
          <button className="p-2 lg:p-3">Weekend</button>
        </div>
      </div> */}
        <div className="text-center mt-4 lg:mt-8 sm:static md:flex justify-center items-center gap-4">
          <div>GENRE:</div>
          <div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {eventNames.map((eventName) => (
                <div
                  key={eventName}
                  className="text-[#00B9F5] font-bold pl-1 border rounded  hover:text-red-500"
                  onClick={() => handleEventNameClick(eventName)}
                >
                  <button className="p-2 me-2">{eventName}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="text-center mt-4 lg:mt-8">
        <div>SORT:</div>
        <div>
          <label htmlFor="sel">
            <select name="sel" id="">
              <option value="price">Price</option>
              <option value="date">Date</option>
            </select>
          </label>
        </div>
      </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4 lg:mt-8">
          {events?.isLoading
            ? "Loading data"
            : events?.events?.data?.map((e, ind) => {
                return <Card element={e} key={ind} />;
              })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;
