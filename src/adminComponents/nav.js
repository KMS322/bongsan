import "../css/admin/nav.css";
import React, { useState } from "react";
const Nav = ({ onSelectMenu }) => {
  const [selectedMenu, setSelectedMenu] = useState("상품 등록/삭제");

  const handleSubMenuClick = (menu) => {
    onSelectMenu(menu);
    setSelectedMenu(menu);
  };
  return (
    <div className="nav">
      <p
        onClick={() => {
          handleSubMenuClick("상품 등록/삭제");
        }}
        style={{
          color: selectedMenu === "상품 등록/삭제" ? "lightgreen" : "white",
        }}
      >
        상품 등록/삭제
      </p>
      <p
        onClick={() => {
          handleSubMenuClick("상품 목록");
        }}
        style={{ color: selectedMenu === "상품 목록" ? "lightgreen" : "white" }}
      >
        상품 목록
      </p>
      <p
        onClick={() => {
          handleSubMenuClick("배송후기 등록/삭제");
        }}
        style={{
          color: selectedMenu === "배송후기 등록/삭제" ? "lightgreen" : "white",
        }}
      >
        배송후기 등록/삭제
      </p>
      <p
        onClick={() => {
          handleSubMenuClick("주문목록");
        }}
        style={{
          color: selectedMenu === "주문목록" ? "lightgreen" : "white",
        }}
      >
        주문목록
      </p>
    </div>
  );
};

export default Nav;
