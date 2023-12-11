import React, {useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {AiOutlineLeft} from "react-icons/ai"
import {AiOutlineRight} from "react-icons/ai"
import navratriImage from "../../images/aishwarya.png"
import bollywood from "../../images/bollywood.jpg"
import musical from "../../images/https___media.insider.in_image_upload_c_crop,g_custom_v1695807226_bkiktgdlb0ilonj9lrq3.jpg"
import arijit from "../../images/https___media.insider.in_image_upload_c_crop,g_custom_v1695991757_majm01lpvmzuwguzjwei.jpg"
import comedy from "../../images/https___media.insider.in_image_upload_c_crop,g_custom_v1696079085_ry6zg4vrzj7d49hktmsp.jpg"
function Carousel() {

  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    arrows: false, // Disable default arrows
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "10px",
    autoplay: true, // Enable auto play
    autoplaySpeed: 1500, // Set auto play speed (in milliseconds)
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "10px",
          slidesToShow: 3,
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

  // Custom component for the previous arrow button
  function CustomPrevArrow(props) {
    return (
      <button className="custom-prev-arrow" onClick={props.onClick}>
        <AiOutlineLeft/>
      </button>
    );
  }

  // Custom component for the next arrow button
  function CustomNextArrow(props) {
    return (
      <button className="custom-next-arrow" onClick={props.onClick}>
       <AiOutlineRight/>
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
    <div className="carousel-container pt-16">
        <div className="custom-prev-arrows">
          <CustomPrevArrow onClick={previousSlide} />
      </div>

      <Slider ref={sliderRef} {...settings}>
        
        <div className="slider-item">
          <div className="slider-content">
            <div className="slider-border ">
              <img src={navratriImage} alt="navratriImage"/>
            </div>
          </div>
        </div>

        <div className="slider-item">
          <div className="slider-content">
            <div className="slider-border">
            <img src={bollywood} alt="bollywood" />
            </div>
          </div>
        </div>

        <div className="slider-item">
          <div className="slider-content">
            <div className="slider-border">
            <img src={musical} alt="musical" />
            </div>
          </div>
        </div>

        <div className="slider-item">
          <div className="slider-content">
            <div className="slider-border">
              <img src={arijit} alt="arijit" />
            </div>
          </div>
        </div>

        <div className="slider-item">
          <div className="slider-content">
            <div className="slider-border">
              <img src={comedy} alt="comedy" />
            </div>
          </div>
        </div>
      </Slider>

      <div className="custom-next-arrows">
        <CustomNextArrow onClick={nextSlide} />
      </div>
    </div>
  );
}

export default Carousel;
