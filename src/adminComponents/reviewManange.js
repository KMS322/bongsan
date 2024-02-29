import "../css/admin/section.css";
import "../css/admin/reviewManage.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_REVIEWS_REQUEST } from "../reducers/review";
import { DELETE_REVIEW_REQUEST } from "../reducers/admin";
import AdminModal from "./adminModal";
import AddReviewModal from "./addReviewModal";
const ReviewManage = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const { reviews } = useSelector((state) => state.review);
  const { deleteReviewDone, addReviewDone } = useSelector(
    (state) => state.admin
  );
  const [deletedId, setDeletedId] = useState(null);
  const deleteReview = (id) => {
    setModalMsg("정말로 삭제하시겠습니까?");
    setDeletedId(id);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleAddClose = () => {
    setOpenAddModal(false);
  };
  const handleConfirm = (data) => {
    if (data === "항목 삭제") {
      dispatch({
        type: DELETE_REVIEW_REQUEST,
        data: {
          deletedId,
        },
      });
    }
  };
  useEffect(() => {
    if (deleteReviewDone) {
      setOpenModal(false);
      dispatch({
        type: LOAD_REVIEWS_REQUEST,
      });
    }
  }, [deleteReviewDone]);
  // useEffect(() => {
  //   if (addReviewDone) {
  //     setOpenAddModal(false);
  //     dispatch({
  //       type: LOAD_REVIEWS_REQUEST,
  //     });
  //   }
  // }, [addReviewDone]);
  return (
    <div className="section reviewManage">
      <p>배송후기 등록/삭제</p>
      <div className="table_container">
        <div className="row_head row">
          <p>No</p>
          <p>상품명</p>
          <p>주문자</p>
          <p>후기 이미지</p>
          <p></p>
        </div>
        {reviews &&
          reviews.map((review, index) => {
            return (
              <div
                className={
                  index % 2 === 0 ? "row_content row" : "row_content row  even"
                }
                key={index}
              >
                <p>{review.id}</p>
                <p>{review.review_name}</p>
                <p>{review.review_orderer}</p>
                <p>{review.review_imgSrc}</p>
                <div
                  className="delete_btn"
                  onClick={() => {
                    deleteReview(review.id);
                  }}
                >
                  삭제
                </div>
              </div>
            );
          })}
      </div>
      {openModal ? (
        <AdminModal
          data={modalMsg}
          onConfirm={handleConfirm}
          onClose={handleClose}
        />
      ) : (
        ""
      )}
      <div
        className="add_btn"
        onClick={() => {
          setOpenAddModal(true);
        }}
      >
        리뷰 추가 하기
      </div>
      {openAddModal ? <AddReviewModal onClose={handleAddClose} /> : ""}
    </div>
  );
};

export default ReviewManage;
