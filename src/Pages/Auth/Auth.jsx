import style from "./Auth.module.css";
import { Link, useNavigate } from "react-router"; 
import logo from "../../assets/image/amazon_black_logo.png";
import { useState, useContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Utility/fireBase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import Loader from "../../components/Loader/Loader";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signin: false, signup: false });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  // Handle SignIn
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading((prevState) => ({ ...prevState, signin: true }));
    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: Type.SET_USER, user: userInfo.user });
      setLoading((prevState) => ({ ...prevState, signin: false }));
      navigate("/"); // Navigate after successful sign-in
    } catch (err) {
      setError(err.message);
      setLoading((prevState) => ({ ...prevState, signin: false }));
    }
  };

  // Handle SignUp
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading((prevState) => ({ ...prevState, signup: true }));
    try {
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: Type.SET_USER, user: userInfo.user });
      setLoading((prevState) => ({ ...prevState, signup: false }));
      navigate("/"); 
    } catch (err) {
      setError(err.message);
      setLoading((prevState) => ({ ...prevState, signup: false }));
    }
  };

  return (
    <section className={style.login}>
      <Link to="/">
        <img src={logo} alt="Amazon logo" />
      </Link>
      <div className={style.loginContainer}>
        <h1>Sign-in</h1>

        {/* SignIn Form */}
        <form onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>
          <button className={style.btn} type="submit">
            {loading.signin ? <Loader /> : "Sign In"}
          </button>
        </form>

        {/* SignUp Button */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of use &
          Sale. Please see our Privacy Notice, Cookies Notice, and our
          Interest-Based Ads Notice.
        </p>
        <button className={style.registerButton} onClick={handleSignUp}>
          Create your Amazon Account
        </button>

        {error && <p className={style.error}>{error}</p>}
      </div>
    </section>
  );
};

export default Auth;
