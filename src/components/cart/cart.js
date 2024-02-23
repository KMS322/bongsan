import "../../css/cart.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_CART_REQUEST, DELETE_CART_REQUEST } from "../../reducers/cart";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { me } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);
  const { cartLists, deleteCartDone } = useSelector((state) => state.cart);
  console.log("deleteCartDone : ", deleteCartDone);
  useEffect(() => {
    dispatch({
      type: LOAD_CART_REQUEST,
      data: {
        user_id: me && me.user_id,
      },
    });
  }, []);

  const cartProducts =
    cartLists && cartLists.length > 0
      ? cartLists.map((list) => {
          const product = products.find(
            (product) => product.id === Number(list.product_id)
          );
          return product;
        })
      : [];
  const [allCheck, setAllCheck] = useState(true);
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [cnt, setCnt] = useState([]);
  useEffect(() => {
    const initialCheckboxStates = cartLists && cartLists.map(() => true);
    setCheckboxStates(initialCheckboxStates);

    const initialCnt = cartLists && cartLists.map((item) => item.product_cnt);
    setCnt(initialCnt);
  }, [cartLists]);

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

  const totalPrice =
    cartProducts &&
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
    cartProducts.reduce((total, _, index) => {
      if (checkboxStates[index]) {
        const productCnt = cnt[index];
        return total + productCnt;
      }
      return total;
    }, 0);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const handleOrder = () => {
    const selected =
      cartProducts && cartProducts.filter((_, index) => checkboxStates[index]);
    setSelectedProducts(selected);

    navigate("/order", { state: selected });
  };

  const [selectedSale, setSelectedSale] = useState(true);

  const handleDeleteOne = (id) => {
    const selected = [id];
    console.log("id : ", id);
    dispatch({
      type: DELETE_CART_REQUEST,
      data: {
        productIds: selected,
      },
    });
  };

  const handleDeleteSelected = () => {
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
  };

  const handleDeleteAll = () => {
    const allIds = cartLists.map((item) => item.id);
    dispatch({
      type: DELETE_CART_REQUEST,
      data: {
        productIds: allIds,
      },
    });
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
  }, [deleteCartDone]);

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
                    <img src={product.product_mainImgSrc} alt="" />
                    <p>{product.product_name}</p>
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
                      />
                      <p>개</p>
                    </div>
                  </div>
                  <div className="sale_box">
                    <p>
                      구매혜택
                      <span>
                        {(
                          Number(product.product_truePrice) * 0.1
                        ).toLocaleString()}
                        원
                      </span>{" "}
                      할인 또는{" "}
                      {(
                        Number(product.product_truePrice) * 0.11
                      ).toLocaleString()}
                      원 적립
                    </p>
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
          <div className="login_box">
            <p>로그인 후 적립 및 할인 혜택을 받으세요.</p>
            <p>GO ▷</p>
          </div>
          <div className="pay_box">
            <p>결제 예정 금액</p>
            <div className="btn_box">
              <div
                className="btn"
                style={{ borderColor: selectedSale ? "#2B746A" : "gray" }}
                onClick={() => {
                  setSelectedSale(!selectedSale);
                }}
              >
                <img src="/images/btn_check.png" alt="" />
                <p>할인</p>
              </div>
              <div
                className="btn"
                style={{ borderColor: selectedSale ? "gray" : "#2B746A" }}
                onClick={() => {
                  setSelectedSale(!selectedSale);
                }}
              >
                <img src="/images/btn_check.png" alt="" />
                <p>적립</p>
              </div>
            </div>
            <div className="price_box">
              <div className="price_title">
                <p>주문금액</p>
                <p>적립금액</p>
                <p>할인금액</p>
              </div>
              <div className="price">
                <p>{totalPrice && totalPrice.toLocaleString()}</p>
                <p>
                  {selectedSale
                    ? "0"
                    : totalPrice && (totalPrice * 0.11).toLocaleString()}
                </p>
                <p>
                  -
                  {!selectedSale
                    ? "0"
                    : totalPrice && (totalPrice * 0.1).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="total_box">
              <p>총 {totalQuantity}건</p>
              <p>
                {selectedSale
                  ? totalPrice && (totalPrice * 0.9).toLocaleString()
                  : totalPrice && totalPrice.toLocaleString()}
                원
              </p>
            </div>
            <div className="order_btn" onClick={handleOrder}>
              주문하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
