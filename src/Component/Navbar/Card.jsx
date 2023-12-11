import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TbCalendarTime } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";
import { FiYoutube } from "react-icons/fi";
import { Link } from "react-router-dom";

const Card = ({ element }) => {
  const { tittle, startDate, endDate, time, price, location, image, _id } =
    element;

  const sDate = startDate
    ? new Date(startDate).toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
      })
    : "Video on Demand";

  const eDate = endDate
    ? new Date(endDate).toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
      })
    : null;

  return (
    <div>
      <Link to={`/product/details/${_id}`}>
        <div className="card-item ">
          <div className="element_box hover:shadow-[2px_6px_12px_rgba(0,0,0,0.1)] hover:transition-all ">
            <div className="w-[100%] overflow-hidden rounded-tl-[6px] rounded-tr-[6px]">
              <img src={`http://localhost:8282/uploads/${image[0]}`} alt="" />
            </div>
            <div className="text-left p-3 flex flex-col justify-between gap-3">
              <div className="font-bold">{tittle}</div>
              <div className="flex justify-start items-center gap-2">
                <div>
                  <TbCalendarTime />
                </div>
                <div className="flex items-center">
                  {sDate && <div className="pe-2">{sDate}</div>}
                  {eDate && <div className="px-2" style={{borderLeft:'1px solid grey'}}>{eDate}</div>}
                  {time && <div className="ps-2" style={{borderLeft:'1px solid grey'}}>{time}</div>}
                </div>
              </div>
              <div>
                {location ? (
                  <div className="flex justify-start items-center">
                    <div>
                      <CiLocationOn />
                    </div>
                    <div className="ps-2">{location}</div>
                  </div>
                ) : (
                  <div className="flex justify-start items-center">
                    <div>
                      <FiYoutube />
                    </div>
                    <div className="ps-2">Watch on Insider</div>
                  </div>
                )}
              </div>
              <div className="bg-[#f5fcfe] font-bold rounded flex justify-between items-center p-2 cursor-pointer">
                <div>
                  <span>&#8377;</span> {price} ONWARDS
                </div>
                <div>BUY NOW</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
