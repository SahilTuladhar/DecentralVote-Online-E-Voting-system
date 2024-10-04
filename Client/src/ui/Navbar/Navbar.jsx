import React from "react";
import styles from "./Navbar.module.css";
import { Link, Links } from "react-router-dom";
import axios from "axios";

const handleClick = async()=>{
  try {
    const response = await axios.post("http://localhost:4000/user/logout" , {}, {
      withCredentials:true
    });
    
   localStorage.clear()
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
  console.log('logout')
}

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logoCover}>
        <img
          className={styles.logo}
          src="\images\navbarlogo.png"
          alt="decentral vote logo"
        />
      </div>

      <div className={styles.navActions}>
        <Link to="/election-list">
          <p>My Elections</p>
        </Link>

        <Link to="/my-dashboard">
          {" "}
          <p>My Profile</p>
        </Link>

        <p>
         
            <button onClick = {handleClick} className = {styles.logoutBtn}>Log Out</button>
         
        </p>
      </div>
    </div>
  );
};

export default Navbar;
