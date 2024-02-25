import "../css/admin/addModal.css";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ADD_PRODUCT_REQUEST } from "../reducers/admin";
import { LOAD_PRODUCTS_REQUEST } from "../reducers/product";
const AddModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productFalsePrice, setProductFalsePrice] = useState("");
  const [productTruePrice, setProductTruePrice] = useState("");
  const [productMainImgSrc, setProductMainImgSrc] = useState(null);
  const handleCategory = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handleName = (e) => {
    setProductName(e.target.value);
  };
  const handleFalsePrice = (e) => {
    setProductFalsePrice(e.target.value);
  };
  const handleTruePrice = (e) => {
    setProductTruePrice(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductMainImgSrc(file);
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (!productMainImgSrc) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("mainImage", productMainImgSrc);
    const fileName = productMainImgSrc.name;
    try {
      const response = await axios.post("/admin/uploadProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        dispatch({
          type: ADD_PRODUCT_REQUEST,
          data: {
            selectedCategory,
            productName,
            productFalsePrice,
            productTruePrice,
            productMainImgSrc: fileName,
          },
        });
      }
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  return (
    <div className="addModal">
      <img src="/images/btn_delete.png" alt="" onClick={onClose} />
      <div className="select_box">
        <p>상품 카테고리</p>
        <select value={selectedCategory} onChange={handleCategory}>
          <option value="">선택</option>
          <option value="축하화환">축하화환</option>
          <option value="근조화환">근조화환</option>
          <option value="관엽">관엽</option>
          <option value="동양란">동양란</option>
          <option value="서양란">서양란</option>
          <option value="분재">분재</option>
          <option value="꽃다발">꽃다발</option>
          <option value="꽃바구니">꽃바구니</option>
          <option value="행사용상품">행사용상품</option>
        </select>
      </div>
      <div className="input_box">
        <p>상품명</p>
        <input type="text" value={productName} onChange={handleName} />
      </div>
      <div className="input_box">
        <p>할인 전 가격</p>
        <input
          type="text"
          value={productFalsePrice}
          onChange={handleFalsePrice}
          placeholder="50000(숫자만 입력)"
        />
      </div>
      <div className="input_box">
        <p>할인 후 가격(판매 가격)</p>
        <input
          type="text"
          value={productTruePrice}
          onChange={handleTruePrice}
          placeholder="40000(숫자만 입력)"
        />
      </div>
      <div className="input_box">
        <p>썸네일 등록</p>
        <div className="label_container">
          <label htmlFor="file">
            <div className="upload_btn">이미지 선택</div>
          </label>
          <input id="file" type="file" onChange={handleFileChange} />
        </div>
      </div>
      <p className="img_src">
        {productMainImgSrc ? productMainImgSrc.name : ""}
      </p>
      <div className="btn_box">
        <div className="btn" onClick={onClose}>
          취소
        </div>
        <div className="btn" onClick={addProduct}>
          추가
        </div>
      </div>
    </div>
  );
};

export default AddModal;
