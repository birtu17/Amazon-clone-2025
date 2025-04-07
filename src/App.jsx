// import { useState } from "react";
import { useContext, useEffect } from "react";
import "./App.css";
import Routing from "./Routing";
import { Type } from "./Utility/action.type";
import { DataContext } from "./components/DataProvider/DataProvider";
import { auth } from "./Utility/fireBase";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: Type.SET_USER, user: authUser });
      } else {
        dispatch({ type: Type.SET_USER, user: null });
      }
    });
  }, []);
  return (
    <>
      <Routing />
    </>
  );
}

export default App;
