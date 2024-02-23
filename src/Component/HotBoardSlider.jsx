import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderCard from "./SliderCard";
import "./slick.css";

export default function HotBoardSlider(props) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => (
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul style={{ padding: 0, margin: 0 }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <Slider {...settings}>
      {props.item
        ? props.item.map((item, index) => (
            <SliderCard
              key={index}
              name={item.id}
              imgUrl={item.data.attachmentUrl}
            />
          ))
        : ""}
    </Slider>
  );
}
