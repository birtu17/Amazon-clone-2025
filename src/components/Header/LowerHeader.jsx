
import { IoIosMenu } from "react-icons/io";
import style from "./Header.module.css";
const LowerHeader = () => {
  return (
    <div className={style.lowerContainer}>
      <ul>
        <li>
          <IoIosMenu />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Costumer Service</li>
        <li>Registry</li>
        <li>Gift cards</li>
        <li>sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader
