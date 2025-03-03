// import { useState } from "react";
import { useContext, useEffect } from "react";
import "./App.css";
import Routing from "./Routing";
import { Type } from "./Utility/action.type";
import { DataContext } from "./components/DataProvider/DataProvider";
import { auth } from "./Utility/fireBase";
// import CarouselCustom from "./components/Carousel/CarouselCustom";
// import CategoryMain from "./components/Category/CategoryMain";
// import Header from "./components/Header/Header";
// import Product from "./components/Product/Product";
// import Landing from "./Pages/Landing/Landing";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      // Ensure 'authUser' is passed correctly here
      if (authUser) {
        dispatch({ type: Type.SET_USER, user: authUser });
      } else {
        dispatch({ type: Type.SET_USER, user: null });
      }
    });
  }, []);
  // const [count, setCount] = useState(0);
  return (
    <>
      {/* <Header /> */}
      <Routing />
    </>
  );
}

export default App;
