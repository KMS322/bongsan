import "../css/admin/addReviewModal.css";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ADD_REVIEW_REQUEST } from "../reducers/admin";
const AddModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [reviewName, setReviewName] = useState("");
  const [reviewOrderer, setReviewOrderer] = useState("");
  const [reviewImgSrc, setReviewImgSrc] = useState(null);

  const handleName = (e) => {
    setReviewName(e.target.value);
  };
  const handleOrderer = (e) => {
    setReviewOrderer(e.target.value);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReviewImgSrc(file);
  };

  const addReview = async (e) => {
    e.preventDefault();

    if (!reviewImgSrc) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("mainImage", reviewImgSrc);
    const fileName = reviewImgSrc.name;
    try {
      const response = await axios.post("/admin/uploadReview", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        dispatch({
          type: ADD_REVIEW_REQUEST,
          data: {
            reviewName,
            reviewOrderer,
            reviewImgSrc: fileName,
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

      <div className="input_box">
        <p>상품명</p>
        <input type="text" value={reviewName} onChange={handleName} />
      </div>
      <div className="input_box">
        <p>주문자</p>
        <input type="text" value={reviewOrderer} onChange={handleOrderer} />
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
      <p className="img_src">{reviewImgSrc ? reviewImgSrc.name : ""}</p>
      <div className="btn_box">
        <div className="btn" onClick={onClose}>
          취소
        </div>
        <div className="btn" onClick={addReview}>
          추가
        </div>
      </div>
    </div>
  );
};

export default AddModal;
