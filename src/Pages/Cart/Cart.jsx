import { useContext } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import style from "./Cart.module.css";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const increment = (item) => {
    dispatch({ type: Type.ADD_TO_BASKET, item });
  };
  const decrement = (id) => {
    dispatch({ type: Type.REMOVE_FROM_BASKET, id });
  };
  return (
    <LayOut>
      <section className={style.container}>
        <div className={style.cartContainer}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>Opps! No item in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={style.cartProduct}>
                  <ProductCard
                    key={i}
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                  />
                  <div className={style.buttonContainer}>
                    <button
                      onClick={() => {
                        increment(item);
                      }}
                    >
                      <IoIosArrowUp size={25} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      onClick={() => {
                        decrement(item.id);
                      }}
                    >
                      <IoIosArrowDown size={25} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={style.subtotal}>
            <div>
              <p>subtotal ({basket.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payment">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Cart;
