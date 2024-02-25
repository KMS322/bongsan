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
import Cart from "./components/cart/cart";
import Order from "./components/order/order";
import Review from "./components/review/review";
import { useDispatch } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "./reducers/user";
import { LOAD_PRODUCTS_REQUEST } from "./reducers/product";
import { LOAD_REVIEWS_REQUEST } from "./reducers/review";
import Main from "./adminComponents/main";
function App() {
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch({
      type: LOAD_REVIEWS_REQUEST,
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
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/review" element={<Review />} />
        <Route path="/admin" element={<Main />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
