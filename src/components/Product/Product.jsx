import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import style from "./Product.module.css";
import Loader from "../../components/Loader/Loader";
const Product = () => {
  const [products, setProducts] = useState();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
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
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={style.productsContainer}>
          {products?.map((singleProduct, index) => (
            <ProductCard key={index} product={singleProduct} />
          ))}
        </section>
      )}
    </>
  );
};

export default Product;
