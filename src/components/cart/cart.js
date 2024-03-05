import "../../css/cart.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_CART_REQUEST, DELETE_CART_REQUEST } from "../../reducers/cart";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../confirmModal";
import Cookies from "js-cookie";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { me } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);
  const { cartLists, deleteCartDone } = useSelector((state) => state.cart);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [deletedId, setDeletedId] = useState(0);
  const [cookiesCart, setCookiesCart] = useState([]);
  useEffect(() => {
    if (!me) {
      const cartItemsString = Cookies.get("cart") || "[]";
      const cartItems = JSON.parse(cartItemsString);
      setCookiesCart(cartItems);
      // 쿠키에서 불러온 데이터를 Redux 스토어에 저장
    } else {
      dispatch({
        type: LOAD_CART_REQUEST,
        data: {
          user_id: me && me.user_id,
        },
      });
    }
  }, [dispatch, me]);

  let cartProducts;
  if (me) {
    cartProducts =
      cartLists && cartLists.length > 0
        ? cartLists.map((list) => {
            const product =
              products &&
              products.find(
                (product) => product.id === Number(list.product_id)
              );
            return product;
          })
        : [];
  } else {
    cartProducts =
      cookiesCart && cookiesCart.length > 0
        ? cookiesCart.map((list) => {
            const product =
              products &&
              products.find(
                (product) => product.id === Number(list.product_id)
              );
            return product;
          })
        : [];
  }
  console.log("cartProducts1 : ", cartProducts);
  const [allCheck, setAllCheck] = useState(true);
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [cnt, setCnt] = useState([]);
  useEffect(() => {
    let initialCheckboxStates;
    if (me) {
      initialCheckboxStates = cartLists && cartLists.map(() => true);
    } else {
      initialCheckboxStates = cookiesCart && cookiesCart.map(() => true);
    }
    setCheckboxStates(initialCheckboxStates);

    let initialCnt;
    if (me) {
      initialCnt = cartLists && cartLists.map((item) => item.product_cnt);
    } else {
      initialCnt = cookiesCart && cookiesCart.map((item) => item.product_cnt);
    }
    setCnt(initialCnt);
  }, [cartLists, me, cookiesCart]);

  const handleSelectAll = () => {
    const newState = cartProducts && cartProducts.map(() => !allCheck);
    setCheckboxStates(newState);
    setAllCheck(!allCheck);
  };

  const handleCntChange = (index, value) => {
    const newCnt = [...cnt];
    newCnt[index] = value;
    setCnt(newCnt);
  };

  const totalFalsePrice =
    cartProducts &&
    cnt &&
    cartProducts.reduce((total, product, index) => {
      if (checkboxStates[index]) {
        const productPrice = Number(product.product_falsePrice);
        const productCnt = cnt[index];
        return total + productPrice * productCnt;
      }
      return total;
    }, 0);

  const totalTruePrice =
    cartProducts &&
    cnt &&
    cartProducts.reduce((total, product, index) => {
      if (checkboxStates[index]) {
        const productPrice = Number(product.product_truePrice);
        const productCnt = cnt[index];
        return total + productPrice * productCnt;
      }
      return total;
    }, 0);

  const totalQuantity =
    cartProducts &&
    cnt &&
    cartProducts.reduce((total, _, index) => {
      if (checkboxStates[index]) {
        const productCnt = parseInt(cnt[index]);
        return total + productCnt;
      }
      return total;
    }, 0);

  const handleOrder = () => {
    const selected = cartProducts.filter((_, index) => checkboxStates[index]);

    const selectedProducts = selected.map((product, index) => ({
      ...product,
      product_cnt: cnt[index],
    }));

    navigate("/order", { state: selectedProducts });
  };

  const handleDeleteOne = (id) => {
    setModalText("이 항목을 삭제하겠습니까?");
    setOpenConfirmModal(true);
    setDeletedId(id);
  };

  const handleDeleteSelected = () => {
    setModalText("선택된 항목을 삭제하겠습니까?");
    setOpenConfirmModal(true);
  };

  const handleDeleteAll = () => {
    setModalText("전체 항목을 삭제하겠습니까?");
    setOpenConfirmModal(true);
  };

  useEffect(() => {
    if (deleteCartDone) {
      dispatch({
        type: LOAD_CART_REQUEST,
        data: {
          user_id: me && me.user_id,
        },
      });
    }
  }, [dispatch, deleteCartDone, me]);

  const handleClose = () => {
    setOpenConfirmModal(false);
  };
  const handleConfirm = (data) => {
    if (data === "항목 삭제") {
      setOpenConfirmModal(false);
      const selected = [deletedId];
      dispatch({
        type: DELETE_CART_REQUEST,
        data: {
          productIds: selected,
        },
      });
    } else if (data === "선택된 항목 삭제") {
      setOpenConfirmModal(false);
      const selectedIds =
        cartLists &&
        cartLists.reduce((selected, _, index) => {
          if (checkboxStates[index]) {
            selected.push(cartLists[index].id);
          }
          return selected;
        }, []);
      dispatch({
        type: DELETE_CART_REQUEST,
        data: {
          productIds: selectedIds,
        },
      });
    } else if (data === "전체 항목 삭제") {
      setOpenConfirmModal(false);
      const allIds = cartLists.map((item) => item.id);
      dispatch({
        type: DELETE_CART_REQUEST,
        data: {
          productIds: allIds,
        },
      });
    }
  };

  return (
    <div className="cart">
      <p>장바구니</p>
      <div className="allCheck_box">
        <img
          src={
            allCheck ? "/images/btn_checked.png" : "/images/btn_unChecked.png"
          }
          alt=""
          onClick={handleSelectAll}
        />
        <p>전체선택</p>
      </div>
      <div className="article_container">
        <div className="cart_container">
          {cartProducts &&
            cnt &&
            cartProducts.map((product, index) => {
              return (
                <div className="cart_box" key={index}>
                  <div className="content_box">
                    <img
                      src={
                        checkboxStates[index]
                          ? "/images/btn_checked.png"
                          : "/images/btn_unChecked.png"
                      }
                      alt=""
                      onClick={() => {
                        const newState = [...checkboxStates];
                        newState[index] = !newState[index];
                        setCheckboxStates(newState);
                      }}
                    />
                    <img
                      src={`/products/${product && product.product_mainImgSrc}`}
                      alt=""
                    />
                    <p>{product && product.product_name}</p>
                    <p>
                      {Number(
                        product.product_falsePrice && product.product_falsePrice
                      ).toLocaleString()}
                      원
                    </p>
                    <p>
                      {Number(product.product_truePrice).toLocaleString()}원
                    </p>
                    <img
                      src="/images/btn_delete.png"
                      alt=""
                      onClick={() => {
                        handleDeleteOne(cartLists[index].id);
                      }}
                    />
                    <div className="cnt_box">
                      <p>수량</p>
                      <input
                        type="number"
                        value={cnt[index]}
                        onChange={(e) => handleCntChange(index, e.target.value)}
                        min="1"
                      />
                      <p>개</p>
                    </div>
                  </div>
                </div>
              );
            })}

          <div className="btn_box">
            <div className="btn" onClick={handleDeleteSelected}>
              선택 삭제
            </div>
            <div className="btn" onClick={handleDeleteAll}>
              전체 삭제
            </div>
          </div>
        </div>
        <div className="pay_container">
          <div className="pay_box">
            <p>결제 예정 금액</p>
            <div className="price_box">
              <div className="price_title">
                <p>주문금액</p>
                <p>할인금액</p>
              </div>
              <div className="price">
                <p>{totalFalsePrice && totalFalsePrice.toLocaleString()}</p>
                <p>
                  {totalFalsePrice &&
                    totalTruePrice &&
                    (totalFalsePrice - totalTruePrice).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="total_box">
              <p>총 {totalQuantity}건</p>
              <p>{totalTruePrice && totalTruePrice.toLocaleString()}원</p>
            </div>
            <div className="order_btn" onClick={handleOrder}>
              주문하기
            </div>
          </div>
        </div>
      </div>
      {openConfirmModal ? (
        <ConfirmModal
          data={modalText}
          onConfirm={handleConfirm}
          onClose={handleClose}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
