import LayOut from "../../components/LayOut/LayOut";
import style from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import React, { useContext, useState } from "react";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";

const Payment = () => {
  const [{ user, basket }] = useContext(DataContext);
  console.log(user);

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = (e) => {
    e.preventDefault();
  };
  return (
    <LayOut>
      <div className={style.paymentHeader}>Checkout ({totalItem}) items</div>
      <section className={style.Payment}>
        <div className={style.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email || "No email available"}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        <div className={style.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => {
              return <ProductCard product={item} flex={true} />;
            })}
          </div>
        </div>
        <hr />
        <div className={style.flex}>
          <h3>Payment methods</h3>
          <div className={style.paymentCard}>
            <div className={style.paymentDetails}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className={style.price}>
                  <div>
                    <span>
                      <p>Total Order |</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button>Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;
