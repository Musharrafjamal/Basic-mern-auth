import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element, authenticated }) => {
  return authenticated ? (
    <Routes>
      <Route element={element} />
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
