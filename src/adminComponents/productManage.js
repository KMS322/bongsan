import "../css/admin/section.css";
import "../css/admin/productManage.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_PRODUCTS_REQUEST } from "../reducers/product";
import { DELETE_PRODUCT_REQUEST } from "../reducers/admin";
import AdminModal from "./adminModal";
import AddModal from "./addModal";
const ProductManage = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const { products } = useSelector((state) => state.product);
  const { deleteProductDone, addProductDone } = useSelector(
    (state) => state.admin
  );
  const [deletedId, setDeletedId] = useState(null);
  const deleteProduct = (id) => {
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
        type: DELETE_PRODUCT_REQUEST,
        data: {
          deletedId,
        },
      });
    }
  };
  useEffect(() => {
    if (deleteProductDone) {
      setOpenModal(false);
      dispatch({
        type: LOAD_PRODUCTS_REQUEST,
      });
    }
  }, [deleteProductDone]);
  useEffect(() => {
    if (addProductDone) {
      setOpenAddModal(false);
      dispatch({
        type: LOAD_PRODUCTS_REQUEST,
      });
    }
  }, [addProductDone]);
  return (
    <div className="section productManage">
      <p>상품 등록/삭제</p>
      <div className="table_container">
        <div className="row_head row">
          <p>No</p>
          <p>카테고리</p>
          <p>상품명</p>
          <p>썸네일 이미지</p>
          <p></p>
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

                <p>{product.product_mainImgSrc}</p>
                <div
                  className="delete_btn"
                  onClick={() => {
                    deleteProduct(product.id);
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
        상품 추가 하기
      </div>
      {openAddModal ? <AddModal onClose={handleAddClose} /> : ""}
    </div>
  );
};

export default ProductManage;
