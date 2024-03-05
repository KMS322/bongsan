import "../../css/shop.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_PRODUCTS_REQUEST } from "../../reducers/product";
import Banner from "../banner";
import Cookies from "js-cookie";
const Shop = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentCategory, setCurrentCategory] = useState("축하화환");
  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCTS_REQUEST,
    });
  }, []);
  const initializeCookies = () => {
    if (!Cookies.get("cart")) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);

      Cookies.set("cart", "", { expires: expirationDate });
    }
  };
  useEffect(() => {
    initializeCookies();
  }, []);
  return (
    <>
      <Banner />
      <div className="shop">
        <p>SHOP</p>
        <div className="category_box">
          <p
            className={currentCategory === "축하화환" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("축하화환");
            }}
          >
            축하화환
          </p>
          <p
            className={currentCategory === "근조화환" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("근조화환");
            }}
          >
            근조화환
          </p>
          <p
            className={currentCategory === "관엽" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("관엽");
            }}
          >
            관엽
          </p>
          <p
            className={currentCategory === "동양란" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("동양란");
            }}
          >
            동양란
          </p>
          <p
            className={currentCategory === "서양란" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("서양란");
            }}
          >
            서양란
          </p>
          <p
            className={currentCategory === "분재" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("분재");
            }}
          >
            분재
          </p>
          <p
            className={currentCategory === "꽃다발" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("꽃다발");
            }}
          >
            꽃다발
          </p>
          <p
            className={currentCategory === "꽃바구니" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("꽃바구니");
            }}
          >
            꽃바구니
          </p>
          <p
            className={currentCategory === "행사용상품" ? "selected" : ""}
            onClick={() => {
              setCurrentCategory("행사용상품");
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
                      <img
                        src={`/products/${product.product_mainImgSrc}`}
                        alt=""
                      />
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
