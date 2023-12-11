import React from "react";
import logo from "../../images/Insider_Logo_Inverted_xbyvil.png";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-[#0c172f] text-white px-4 py-8 ">
      <div className="lg:mx-[150px] md:mx-[50px] ms:mx-[10px]">
        <div className="cursor-pointer">
          <img src={logo} alt="logo" className="h-7" />
        </div>
        <div className=" text-sm my-5">
          Paytm Insider is a platform that helps you discover and buy the best
          in events, travel, and food in your city. We strive to curate
          experiences that are worth your time and money, possibly something you
          have never tried before.
        </div>
        <div className="my-5 ">
          <h1 className="font-bold my-2">FOR EVENT ORGANIZERS</h1>
          <p className="text-sm">
            Paytm Insider is built by the same team that created Bacardi NH7
            Weekender (us) and we sure know what goes into putting together a
            great experience. Our technology, marketing, and customer support
            can help you build a community of not just ticket buyers, but also
            fans.
          </p>
        </div>
        <div className="my-5 ">
          <ul className="flex flex-wrap  gap-5">
            <li className="cursor-pointer font-semibold uppercase tracking-tighter">
              about us
            </li>
            <li className="cursor-pointer font-semibold uppercase tracking-tighter">
              blog
            </li>
            <li className="cursor-pointer font-semibold uppercase tracking-tighter">
              careers
            </li>
            <li className="cursor-pointer font-semibold uppercase tracking-tighter">
              privacy policy
            </li>
            <li className="cursor-pointer font-semibold uppercase tracking-tighter">
              term & condition
            </li>
            <li className="cursor-pointer font-semibold uppercase tracking-tighter">
              list with us
            </li>
            <li className="cursor-pointer font-semibold uppercase tracking-tighter">
              contact us
            </li>
            <li className="cursor-pointer font-semibold uppercase tracking-tighter">
              faqs
            </li>
          </ul>
        </div>
        <div className="flex gap-5 items-center ">
          <h3>Find us on :</h3>
          <div className="flex justify-center items-center gap-5">
            <div className="cursor-pointer">
              <BsFacebook className="text-4xl" />
            </div>
            <div className="cursor-pointer">
              <BsTwitter className="text-4xl" />
            </div>
            <div className="cursor-pointer">
              <BsInstagram className="text-4xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
