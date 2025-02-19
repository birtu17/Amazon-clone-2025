import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import style from "./Product.module.css";
import { Link } from "react-router";
const ProductCard = ({ product, flex, renderDesc }) => {
  const { image, title, id, rating, price, description } = product;
  return (
    <div className={`${style.cardContainer} ${flex ? style.productsFlex : ""}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div className={style.cardBottom}>
        <p>{title}</p>
        {renderDesc && <div className={style.description}>{description}</div>}
        <div className={style.rating}>
          {rating && rating.rate ? (
            <>
              <Rating value={rating.rate} precision={0.1} />
              <small>{rating.count}</small>
            </>
          ) : (
            <small>No rating available</small>
          )}
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        <button className={style.button}>add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
