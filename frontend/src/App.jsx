import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UploadImg from "./pages/UploadImg";

const App = () => {
  // Check if the user is authenticated (you can implement this using state, context, or other methods)

  const isAuthenticated = localStorage.getItem("token");

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/page1"
          element={
            isAuthenticated ? <Page1 /> : <Login />
          }
        />
        <Route
          path="/page2"
          element={
            isAuthenticated ? <Page2 /> : <Login />
          }
        />
        <Route
          path="/upload"
          element={
            isAuthenticated ? <UploadImg /> : <Login />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
