import "../../css/shop.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_PRODUCTS_REQUEST } from "../../reducers/product";
import Banner from "../banner";
const Shop = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentCategory, setCurrentCategory] = useState("1");
  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCTS_REQUEST,
    });
  }, []);
  return (
    <>
      <Banner />
      <div className="shop">
        <p>SHOP</p>
        <div className="category_box">
          <p
            className={currentCategory === "1" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("1");
            }}
          >
            축하화환
          </p>
          <p
            className={currentCategory === "2" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("2");
            }}
          >
            근조화환
          </p>
          <p
            className={currentCategory === "3" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("3");
            }}
          >
            관엽
          </p>
          <p
            className={currentCategory === "4" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("4");
            }}
          >
            동양란
          </p>
          <p
            className={currentCategory === "5" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("5");
            }}
          >
            서양란
          </p>
          <p
            className={currentCategory === "6" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("6");
            }}
          >
            분재
          </p>
          <p
            className={currentCategory === "7" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("7");
            }}
          >
            꽃다발
          </p>
          <p
            className={currentCategory === "8" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("8");
            }}
          >
            꽃바구니
          </p>
          <p
            className={currentCategory === "9" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("9");
            }}
          >
            행사용상품
          </p>
        </div>
        <div className="article_container">
          {products &&
            products.map((product, index) => {
              if (product.product_category === currentCategory) {
                return (
                  <div
                    className="article"
                    onClick={() => {
                      navigate(`/detail/${product.id}`);
                    }}
                    key={index}
                  >
                    <div className="img_box">
                      <img src={product.product_mainImgSrc} alt="" />
                    </div>

                    <p>{product.product_name}</p>
                    <div className="price_box">
                      <p>
                        {Number(product.product_falsePrice).toLocaleString()}원
                      </p>
                      <p>
                        {Number(product.product_truePrice).toLocaleString()}원
                      </p>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </>
  );
};

export default Shop;
