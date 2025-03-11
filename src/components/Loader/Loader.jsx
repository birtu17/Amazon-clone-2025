import style from "./Loader.module.css";
import { FadeLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className={style.adjustment}>
      <FadeLoader color="#36D6AB" size={12} />
    </div>
  );
};

export default Loader;
