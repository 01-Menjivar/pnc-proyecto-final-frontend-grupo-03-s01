import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./modules/home/page/home";
import FavoritesPage from "./modules/dashboard/page/FavoritesPage";
import Login from "./modules/login/page/login.jsx";
import Register from "./modules/register/page/register.jsx";
import Profile from "./modules/profile/page/profile.jsx";
import WaitingList from "./modules/waiting/page/WaitingList.jsx";
import AdminManager from "./modules/adminManager/page/AdminManager.jsx";
import Product from "./modules/product/page/Product.jsx";
import DashboardBackend from "./modules/dashboard/page/dashboardBackend.jsx";
import AdminDashboard from "./modules/adminDashboard/page/mainAdmin.jsx";
import UserProfile from "./modules/userProfile/page/UserProfile.jsx";
import ProductsPage from './modules/products/page/ProductsPage.jsx';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashboardBackend />} />
      <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path={"/waitlist"} element={<WaitingList isAdmin={true} />} />
        <Route path={"/product/:id"} element={<Product/>}/>
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path={"/user/:email"} element={<UserProfile />} />
    </Routes>
  );
};