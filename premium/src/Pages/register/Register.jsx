import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { TailSpin } from "react-loader-spinner";
import "./register.css"
const Register = () => {
  const { setUserId, setUserName } = useAuth();
  const [loading,setLoading] = useState(false);
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (info.password.trim() === "" || info.email.trim() === "" ||info.username.trim()==="") {
      swal({
        title: "Fill all the given filled",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }else{

    setLoading(true)
    try {
      const res = await axios.post(
        "https://premium-app-vha0.onrender.com/api/user/register",
        info
      );
      const { user } = res.data;

      localStorage.setItem("userId", user._id);
      localStorage.setItem("username", user.username);

      setUserId(user._id);
      setUserName(user.name);
      setLoading(false)
      swal({
        title: "Registered Succesfully",
        icon: "success",
        buttons: false,
        timer: 1000,
    });
     setTimeout(()=>{
        navigate("/");
     },1500)
    } catch (error) {
      console.log(error)
      setLoading(false);
        swal({
            title: "Wrong Credentials",
            icon: "false",
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
          <div className="title">Register your account</div>
          <div className="reg-input-container">
            <label htmlFor="username">username</label>
            <input
              type="text"
              name="username"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="reg-input-container">
            <label>Email </label>
            <input
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="reg-input-container">
            <label>Password </label>
            <input
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              required
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
                handleSubmit(e);
              }}
              type="submit"
            >
              {loading ? <TailSpin  height={25} color="white" /> : "Register"}
            </button>
          </div>
          <p className="bottom-para">
            Already a user? <a href="/login">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
