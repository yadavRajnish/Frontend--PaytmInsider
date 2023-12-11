import React from "react";
import NavbarAndCarousel from "../Component/Navbar/NavbarAndCarousel";
import Footer from "../Component/Navbar/Footer";
import BannerComp from "../Component/Navbar/BannerComp";
import { GiChopsticks, GiTheaterCurtains } from "react-icons/gi";
import { BiLaugh } from "react-icons/bi";
import {
  HiOutlineComputerDesktop,
  HiOutlineMusicalNote,
} from "react-icons/hi2";
import CategoriesEvent from "../Component/Navbar/CategoriesEvent";

const Home = () => {
  return (
    <div>
      <NavbarAndCarousel />
      <div className="lg:mx-[150px] md:mx-[50px] ms:mx-[10px] md:text-center">
        <CategoriesEvent />
        <BannerComp
          propsID={"6519803c54ef82f7c1f3b75d"}
          myicon={<GiChopsticks />}
        />
        
        <BannerComp propsID={"6519805954ef82f7c1f3b75f"} myicon={<BiLaugh />} />
        <BannerComp
          propsID={"6519811154ef82f7c1f3b766"}
          myicon={<HiOutlineComputerDesktop />}
        />
        <BannerComp
          propsID={"651a738d0c0c125a3e7cc708"}
          myicon={<GiTheaterCurtains />}
        />
        <BannerComp
          propsID={"651d0ca19e2ed38a476e5c1b"}
          myicon={<HiOutlineMusicalNote />}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
