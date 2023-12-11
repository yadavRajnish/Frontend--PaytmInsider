import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Slider from "react-slick";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

const BannerComp = ({ propsID, myicon }) => {
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const sliderRef = useRef(null);

  // console.log(propsID);

  useEffect(()=>{
    axios
      .get("http://localhost:8282/get-event-data")
      .then((res) => {
        const getRes = res.data.data;
        const newData = getRes.filter((item) => item.categoryId === propsID);
        setData(newData);
        // console.log(newData);
      })
      .catch((error) => {
        console.error(error);
      });
  },[propsID])
  // console.log(data);

  useEffect(() => {
    axios
      .get(`http://localhost:8282/get-category/${propsID}`)
      .then((res) => {
        const getCategoryData = res.data.data;
        setCategoryData(getCategoryData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [propsID]);


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

  return (
    <div className="border-red-500 mt-10 mb-5">
      <div className="flex justify-start items-center gap-1 ps-4">
        <div className="homeIcon">{myicon}</div>
        <h1 className="font-bold text-[28px] text-[#202226] uppercase max-h-[32px] font-[korolev-condensed]">
          {categoryData.name}
        </h1>
      </div>

      <div className="relative">
        <div className="absolute top-1/2 -left-10 z-10">
          <CustomPrevArrow onClick={previousSlide} />
        </div>
        <div>
          <Slider ref={sliderRef} {...settings}>
            {data.map((e, ind) => {
              return <Card element={e} key={ind}/>;
            })}
          </Slider>
        </div>
        <div className="absolute top-1/2 -right-10 z-10">
          <CustomNextArrow onClick={nextSlide} />
        </div>
      </div>
    </div>
  );
};

export default BannerComp;
