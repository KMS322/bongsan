import "../../css/review.css";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_REVIEWS_REQUEST } from "../../reducers/review";
const Board = () => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.review);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    dispatch({
      type: LOAD_REVIEWS_REQUEST,
    });
  }, []);
  const arrCnt = 12;

  const newRivews = [];
  if (reviews) {
    for (let i = 0; i < reviews.length; i += arrCnt) {
      const newArr = reviews.slice(i, i + arrCnt);
      newRivews.push(newArr);
    }
  }

  return (
    <div className="review">
      <p>배송사진방</p>
      <div className="article_container">
        {reviews &&
          newRivews[currentPage].map((review, index) => {
            return (
              <div className="article" key={index}>
                <img src={`reviews/${review.review_imgSrc}`} alt="" />
                <p>{review.review_name}</p>
                <p>{dayjs(review.createdAt).format("YYYY-MM-DD")}</p>
              </div>
            );
          })}
      </div>
      <div className="page_box">
        {reviews &&
          newRivews.map((review, index) => {
            return (
              <p
                style={{
                  color: index === currentPage ? "#2B746A" : "inherit",
                  fontWeight: index === currentPage ? "700" : "inherit",
                }}
                onClick={() => {
                  setCurrentPage(index);
                }}
              >
                {index + 1}
              </p>
            );
          })}
      </div>
    </div>
  );
};

export default Board;
