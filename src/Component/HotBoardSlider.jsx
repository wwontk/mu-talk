import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderCard from "./SliderCard";

export default function HotBoardSlider(props) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Slider {...settings}>
      {props.item
        ? props.item.map((item) => (
            <SliderCard name={item.id} imgUrl={item.data.attachmentUrl} />
          ))
        : ""}
    </Slider>
  );
}
