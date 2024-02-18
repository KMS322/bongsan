import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./scrollToTop";
import Header from "./components/header";
import Footer from "./components/footer";
import Shop from "./components/shop/shop";
import Login from "./components/login/login";
import Signin from "./components/signin/signin";
import Detail from "./components/shop/detail";
import { useSelector } from "react-redux";
function App() {
  const { me } = useSelector((state) => state.user);
  console.log("me : ", me);
  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/:id" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
