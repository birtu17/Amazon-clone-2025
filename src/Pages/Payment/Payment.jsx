import LayOut from "../../components/LayOut/LayOut";
import style from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import React, { useContext, useState } from "react";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { db } from "../../Utility/fireBase";
import { useNavigate } from "react-router";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      const clientSecret = response.data?.clientSecret;
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc("paymentIntent.id")
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      navigate("/order", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
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
                  <button type="submit">
                    {processing ? (
                      <div className={style.loader}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
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
