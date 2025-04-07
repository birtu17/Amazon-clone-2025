import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRout/ProtectedRoute";
const stripePromise = loadStripe(
  "pk_test_51QyQVkPHajrnbFJFG4wWWJfYHPyn4RqJjk0AlaXQ0I0RLtr9jfwQJvVXNeq4B3EFmA0ncV0yLyMKnupcBDchbZXk00BYfxzl4Y"
);

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute msg={"you must log in to pay"} redirect={"/payment"}>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute
              msg={"you must log in to access your orders"}
              redirect={"/order"}
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
