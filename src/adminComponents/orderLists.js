import "../css/admin/section.css";
import "../css/admin/orderLists.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const OrderLists = () => {
  const dispatch = useDispatch();

  return (
    <div className="section orderLists">
      <div className="download_btn">
        <a href="http://localhost:3060/admin/downList" download>
          다운로드
        </a>
      </div>
    </div>
  );
};

export default OrderLists;
