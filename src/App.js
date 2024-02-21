import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./scrollToTop";
import Header from "./components/header";
import Footer from "./components/footer";
import Shop from "./components/shop/shop";
import Login from "./components/login/login";
import Signin from "./components/signin/signin";
import Detail from "./components/shop/detail";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "./reducers/user";
import { LOAD_PRODUCTS_REQUEST } from "./reducers/product";
function App() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCTS_REQUEST,
    });
  }, []);
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
