import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from './pages/public/Login'
import Header from './pages/public/Header'
import Home from './pages/public/Home'
import Product from './pages/public/Product'
import Cart from './pages/public/Cart'
const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

const NoLayout = () => {
  return <Outlet />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NoLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}