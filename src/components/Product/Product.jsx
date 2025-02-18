import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import style from "./Product.module.css"
const Product = () => {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className={style.productsContainer}>
      {products?.map((singleProduct, index) => (
        <ProductCard key={index} product={singleProduct} />
      ))}
    </section>
  );
};

export default Product;
