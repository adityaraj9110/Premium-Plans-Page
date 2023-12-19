import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import swal from "sweetalert";
import { TailSpin } from "react-loader-spinner";
import "./login.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const { setUserId, setUserName } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (user.password.trim() === "" || user.email.trim() === "") {
      swal({
        title: "Fill all the given filled",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    } else {
      setLoading(true);
      try {
        const res = await axios.post(
          "https://premium-app-vha0.onrender.com/api/user/login",
          user
        );
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("username", res.data.user.username);
        // console.log(res.data)
        setUserId(res.data.user._id);
        setUserName(res.data.user.username);
        setLoading(false);
        swal({
          title: "Login Succesfully",
          icon: "success",
          buttons: false,
          timer: 1000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (error) {
        console.log(error)
        setLoading(false);
        swal({
          title: "Email or password is invalid!",
          icon: "error",
          buttons: false,
          timer: 2000,
        });
      }
    }
  };
  return (
    <div className="outer-div">
      <div className="login-form">
        <form>
          <div className="title">Login to your account</div>
          <div className="input-container">
            <label>Email </label>
            <input
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input
              required
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="check-box">
            <input type="checkbox" value="lsRememberMe" id="rememberMe" />{" "}
            <label for="rememberMe">Remember me</label>
          </div>
          <div className="button-container">
            <button
              className="btn"
              onClick={(e) => {
                handleLogin(e);
              }}
              type="submit"
            >
              {loading ? <TailSpin  height={25} color="white" /> : "Login"}
            </button>
          </div>
          <p className="bottom-para">
              New to MyApp? <a href="/register">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
