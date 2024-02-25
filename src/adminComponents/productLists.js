import "../css/admin/section.css";
import "../css/admin/productLists.css";
import React from "react";
import { useSelector } from "react-redux";
const ProductLists = () => {
  const { products } = useSelector((state) => state.product);
  return (
    <div className="section productLists">
      <p>상품 목록</p>
      <div className="table_container">
        <div className="row_head row">
          <p>No</p>
          <p>카테고리</p>
          <p>상품명</p>
          <p>할인전 금액</p>
          <p>할인후 금액</p>
          <p>썸네일 이미지</p>
        </div>
        {products &&
          products.map((product, index) => {
            return (
              <div
                className={
                  index % 2 === 0 ? "row_content row" : "row_content row  even"
                }
                key={index}
              >
                <p>{product.id}</p>
                <p>{product.product_category}</p>
                <p>{product.product_name}</p>
                <p>{Number(product.product_falsePrice).toLocaleString()}원</p>
                <p>{Number(product.product_truePrice).toLocaleString()}원</p>
                <p>{product.product_mainImgSrc}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductLists;
