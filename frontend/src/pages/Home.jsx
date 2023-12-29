import React from "react";
import { Link } from 'react-router-dom'
import Logout from "../components/Logout";

const Home = () => {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/page1">Page 1</Link>
            <Link to="/page2">Page 2</Link>
            <Logout />
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
