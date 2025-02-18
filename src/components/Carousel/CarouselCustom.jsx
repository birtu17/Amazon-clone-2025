import { Carousel } from "react-responsive-carousel";
import { img } from "./CarouselImage/Images";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import style from "./Carousel.module.css"
// import { FaLess } from "react-icons/fa6";
const CarouselCustom = () => {  return (
  <>
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showIndicators={false}
      showThumbs={false}
    >
      {img?.map((imageLink, index) => (
        <img key={imageLink} src={imageLink} alt={`image-${index}`} />
      ))}
    </Carousel>
    <div className={style.shadowEffect}></div>
  </>
);
};

export default CarouselCustom;
