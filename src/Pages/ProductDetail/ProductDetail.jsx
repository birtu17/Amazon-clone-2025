import { useParams } from "react-router";
import LayOut from "../../components/LayOut/LayOut";
import style from "./ProductDetail.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";

const ProductDetail = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState({});
  const [isLoading, setLoading] = useState(false);
  console.log(productId);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard product={products} flex={true} renderDesc={true} renderAdd={true}/>
      )}
    </LayOut>
  );
};

export default ProductDetail;
