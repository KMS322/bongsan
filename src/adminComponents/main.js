import "../css/admin/main.css";
import React, { useState } from "react";
import Nav from "./nav";
import ProductLists from "./productLists";
import ProductManage from "./productManage";
import ReviewManage from "./reviewManange";
const Main = () => {
  const [currentComponent, setCurrentComponent] = useState("상품 목록");
  const handleMenuSelect = (selectedMenu) => {
    setCurrentComponent(selectedMenu);
  };
  let selectedComponent;
  switch (currentComponent) {
    case "상품 목록":
      selectedComponent = <ProductLists />;
      break;
    case "상품 등록/삭제":
      selectedComponent = <ProductManage />;
      break;
    case "배송후기 등록/삭제":
      selectedComponent = <ReviewManage />;
      break;
    default:
      selectedComponent = null;
  }

  return (
    <div className="main">
      <Nav onSelectMenu={handleMenuSelect} />
      {selectedComponent}
    </div>
  );
};

export default Main;
