import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Userlogin from "../pages/user/UserLogin.jsx";

import UserSignup from "../pages/user/UserSignup";
import UserHome from "../pages/user/UserHome";
import AdminDashboard from "../pages/admin/AdminDashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/login" element={<Userlogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
