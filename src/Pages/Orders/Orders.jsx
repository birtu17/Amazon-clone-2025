import LayOut from "../../components/LayOut/LayOut";
import style from "./Orders.module.css";
import { db } from "../../Utility/fireBase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/Product/ProductCard";

const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);
  return (
    <LayOut>
      <section className={style.container}>
        <div className={style.ordersContainer}>
          <h2>Your Orders</h2>
          {orders?.length == 0 && (
            <div className={style.noOrder}>you don't have orders yet.</div>
          )}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID:{eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;
