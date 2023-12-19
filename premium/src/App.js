import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/home/Home";
import Plans from "./Pages/plans/Plans";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import { useAuth } from "./context/auth/AuthContext";

const App = () => {
  const { setUserId, setUserName } = useAuth();
  const storedId = localStorage.getItem("userId");
  const storedUser = localStorage.getItem("username");

  useEffect(() => {
    if (storedId) {
      setUserId(storedId);
    } else if (storedId == null || storedId === undefined) {
      setUserId(null);
    }
  }, [storedId]);
  useEffect(() => {
    if (storedUser) {
      setUserName(storedUser);
    } else if (storedId == null || storedId === undefined) {
      setUserName(null);
    }
  }, [storedUser]);
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={storedId!=null ? <Home/> : <Navigate to="/login"/>}/>
          <Route
            path="/premium"
            element={storedId!=null ? <Plans/> : <Navigate to="/login"/>}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>Error 404 page not found</h1>} />
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;
