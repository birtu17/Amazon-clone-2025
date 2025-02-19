import style from "./Loader.module.css";
import { FadeLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className={style.adjustment}>
      <FadeLoader color="#36D6AB" />
    </div>
  );
};

export default Loader;
