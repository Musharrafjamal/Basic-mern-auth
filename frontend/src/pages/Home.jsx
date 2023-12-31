import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import axios from "axios";

const Home = () => {
  const isAuthenticated = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const profilePic = localStorage.getItem("profilePic");

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <>  
            <Link to="/page1">Page 1</Link>
            <Link to="/page2">Page 2</Link>
            <Logout />
            <h1>profile: {username}</h1>
            <img src={profilePic} alt="Preview" style={{ marginTop: '20px', maxWidth: '100%' }} />
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Home;
