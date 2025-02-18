import CarouselCustom from "../../components/Carousel/CarouselCustom";
import CategoryMain from "../../components/Category/CategoryMain";
import LayOut from "../../components/LayOut/LayOut";
import Product from "../../components/Product/Product";

const Landing = () => {
  return (
    <LayOut>
      <CarouselCustom />
      <CategoryMain />
      <Product />
    </LayOut>
  );
};

export default Landing;
