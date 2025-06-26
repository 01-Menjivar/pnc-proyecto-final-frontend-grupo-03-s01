import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./modules/home/page/home";
import FavoritesPage from "./modules/dashboard/page/FavoritesPage";
import Login from "./modules/login/page/login.jsx";
import Register from "./modules/register/page/register.jsx";
import Profile from "./modules/profile/page/profile.jsx";
import WaitingList from "./modules/waiting/page/WaitingList.jsx";
import AdminManager
    from "./modules/adminManager/page/AdminManager.jsx";
import Product from "./modules/product/page/Product.jsx";
import DashboardBackend from "./modules/dashboard/page/dashboardBackend.jsx";
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashboardBackend />} />
      <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path={"/waitlist"} element={<WaitingList isAdmin={true} />} />
        <Route path={"/adminman"} element={<AdminManager isAdmin={true} />} />
        <Route path={"/product/:id"} element={<Product/>}/>
    </Routes>
  );
};