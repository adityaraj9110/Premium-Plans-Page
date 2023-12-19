import React, { useContext } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';
// import AuthContext from '../../context/auth/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  // const { userInfo } = useContext(AuthContext);
  // const userId = userInfo?.id || '';
  const {userId,setUserId,userName,setUserName} = useAuth();
  

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setUserId(null);
    setUserName(null);
    navigate('/login');
  };

  return (
    <div className='nav'>
      <h1 className="logo" onClick={()=>navigate("/")}>RP</h1>
      <div className="nav-part2">
        <h3 onClick={()=>navigate("/")}>{userName}</h3>
        <h3 onClick={()=>navigate("/premium")}>Plans</h3>
        <h3 className='logout' onClick={handleLogout}>Logout</h3>
      </div>
    </div>
  );
};

export default Navbar;
