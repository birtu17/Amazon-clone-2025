import logo from "../../assets/image/amazon_PNG11.png";
import flag from "../../assets/image/USA_flag.png";
import { LuMapPin } from "react-icons/lu";
import { BsSearch } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import style from "./Header.module.css";
import { Link } from "react-router";
import LowerHeader from "./LowerHeader";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
const Header = () => {
  const [{ basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className={style.stickyHeader}>
      <section>
        <div className={style.headerContainer}>
          <div className={style.logoContainer}>
            <Link to="/">
              <img src={logo} alt="Amazon logo" />
            </Link>
            <div className={style.delivery}>
              <span>
                <LuMapPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={style.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="search product" />
            <BsSearch />
          </div>
          <div className={style.orderContainer}>
            <Link className={style.flag}>
              <img src={flag} alt="" />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            <Link to="/auth">
              <div>
                <p>Sign In</p>
                <span>Account and Lists</span>
              </div>
            </Link>
            <Link to="/order">
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/cart" className={style.cart}>
              <FiShoppingCart />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
