import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import showToast from "crunchy-toast";
import { Link } from "react-router-dom";
import Logo  from "./logo.png";

function Navbar() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("user") || '{}');
    setUser(storageUser);
  }, [])

  const logout  = ()=>{
    localStorage.removeItem('user');
    window.location.href= '/login';
    showToast('Logout Succesfully..!', "success", 4000);
  }

  return (
    <div className="navbar">
      <Link to="/" className="navbar-title">
        <img src={Logo} alt="Logo" className="navbar-image" />
        Criminal Face Recognition
      </Link>

      <div className='navbar-links-container'>
     
        <Link to="/criminalform" className="navbar-link"> Criminal Data </Link>

        <Link to="/missingperson" className="navbar-link"> Missing Person </Link>
        <Link to="/faceDetection" className="navbar-link">FaceDetection</Link>
 
        {/* <Link to='/signup'  className="navbar-link"> Signup </Link> */}
               
               
               {
            user?.name ?  <button type='button' className="navbar-link logout px-4 py-1" onClick={logout}> Logout </button> : <span><Link to='/signup'  className="navbar-link link"> Signup </Link> <Link to='/login'  className="navbar-link">login</Link> </span> 
           }
         
         <span className="text-lg mx-2 ">👋 Hey  {user?.name || "User"} !</span>

      </div>
    </div>
  )
}

export default Navbar;