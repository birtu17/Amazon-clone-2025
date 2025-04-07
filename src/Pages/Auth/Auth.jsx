import style from "./Auth.module.css";
import { Link, useNavigate, useLocation } from "react-router";
import logo from "../../assets/image/amazon_black_logo.png";
import React, { useState, useContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Utility/fireBase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signin: false, signup: false });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name == "signin") {
      setLoading({ ...loading, signin: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({ type: Type.SET_USER, user: userInfo.user });
          setLoading({ ...loading, signin: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signin: false });
        });
    } else {
      setLoading({ ...loading, signup: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({ type: Type.SET_USER, user: userInfo.user });
          setLoading({ ...loading, signup: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signup: false });
        });
    }
  };

  return (
    <section className={style.login}>
      <Link to="/">
        <img src={logo} alt="Amazon logo" />
      </Link>
      <div className={style.loginContainer}>
        <h1>Sign-in</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            className={style.btn}
            type="submit"
            onClick={authHandler}
            name="signin"
          >
            {loading.signin ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of use &
          Sale. Please see our Privacy Notice, Cookies Notice, and our
          Interest-Based Ads Notice.
        </p>
        <button
          className={style.registerButton}
          onClick={authHandler}
          type="submit"
          name="signup"
        >
          {loading.signup ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && <p className={style.error}>{error}</p>}
      </div>
    </section>
  );
};

export default Auth;
