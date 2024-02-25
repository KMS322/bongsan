import "../../css/detail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../confirmModal";
import { ADD_CART_REQUEST } from "../../reducers/cart";
const Detail = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { me } = useSelector((state) => state.user);
  const { addCartDone } = useSelector((state) => state.cart);
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedKind, setSelectedKind] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [sale, setSale] = useState(true);
  const [cnt, setCnt] = useState(1);
  const [openInfo1, setOpenInfo1] = useState(true);
  const [openInfo2, setOpenInfo2] = useState(true);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const handleKind = (e) => {
    setSelectedKind(e.target.value);
  };
  const handleOption = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleCnt = (e) => {
    setCnt(e.target.value);
  };
  const product =
    products && products.find((product) => product.id === Number(id));
  const copyURL = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("링크가 복사되었습니다.");
      })
      .catch((error) => {
        console.error("URL 복사 실패:", error);
      });
  };
  const handleClose = () => {
    setOpenConfirmModal(false);
  };
  const handleConfirm = (data) => {
    if (data === "장바구니 추가") {
      dispatch({
        type: ADD_CART_REQUEST,
        data: {
          user_id: me && Number(me.user_id),
          product_id: product.id,
          product_cnt: cnt,
        },
      });
    } else if (data === "장바구니 확인") {
      setOpenConfirmModal(false);
      setModalText("");
      window.location.href = "/cart";
    }
  };
  useEffect(() => {
    if (addCartDone && modalText === "장바구니에 추가하시겠습니까?") {
      setOpenConfirmModal(false);
      setModalText("장바구니 확인하러 가기");
      setOpenConfirmModal(true);
    }
  }, [addCartDone]);
  if (product) {
    return (
      <div className="detail">
        <div className="nav_box">
          <p>HOME ▷ 축하화환 ▷ 축화화환 3단</p>
        </div>
        <div className="article_container">
          <div className="detail_container">
            <img src={product.product_mainImgSrc} alt="" />
            {[...Array(8)].map((_, index) => (
              <img
                key={index}
                src={`/details/detail_img${index + 1}.png`}
                alt=""
              />
            ))}
          </div>
          <div className="content_container">
            {/* <div className="tag_box">
              <p>#결혼식</p>
              <p>#축하화환</p>
              <p>#화환전문관</p>
            </div> */}
            <div className="name_box">
              <p className="name">{product.product_name}</p>
              <img src="/images/btn_share.png" alt="" onClick={copyURL} />
            </div>
            <div className="price_box">
              <p>{Number(product.product_truePrice).toLocaleString()}원</p>
              <p>{Number(product.product_falsePrice).toLocaleString()}원</p>
            </div>
            <div className="code_box">
              <div className="title_box">
                <p>상품코드</p>
                <p>배송가능지역</p>
                <p>용도</p>
              </div>
              <div className="content_box">
                <p>d-0053</p>
                <p>전국당일배송</p>
                <p>결혼식 개업 행사 전시회</p>
              </div>
            </div>
            <p className="notice">
              <span>본 상품 이미지는 알뜰 기준으로 제작 되었습니다.</span>
              <br />
              알뜰 차이는 꽃송이의 크기와 풍성도 차이가 있습니다.
              <br />
              배송되는 제품의 화분, 포장의 부속품은 이미지와 별도로 시즌이나
              배송지역에 따라
              <br />
              다를 수 있습니다.
            </p>

            <div className="select_box">
              <p>상품선택</p>
              <select value={selectedKind} onChange={handleKind}>
                <option value="">종류</option>
                <option value="kind1">종류1</option>
                <option value="kind2">종류2</option>
                <option value="kind3">종류3</option>
              </select>
            </div>
            <div className="option_box">
              <div className="option_text_box">
                <p>알뜰</p>
                <div className="option_price_box">
                  <p>{Number(product.product_truePrice).toLocaleString()}원</p>
                  <p>{Number(product.product_falsePrice).toLocaleString()}원</p>
                </div>
              </div>
              <div className="option_select_box">
                <select value={selectedOption} onChange={handleOption}>
                  <option value="">추가옵션 선택</option>
                  <option value="option1">추가옵션1</option>
                  <option value="option2">추가옵션2</option>
                  <option value="option3">추가옵션3</option>
                </select>
              </div>
            </div>
            <div className="cnt_box">
              <p>수량</p>
              <div className="cnt_input_box">
                <input type="number" value={cnt} onChange={handleCnt} min="1" />
                <p>개</p>
              </div>
            </div>
            <div className="total_box">
              <p>총 상품 금액</p>
              <p>
                {(Number(product.product_truePrice) * cnt).toLocaleString()}원
              </p>
            </div>
            <div className="btn_box">
              <div
                className="btn"
                onClick={() => {
                  setModalText("장바구니에 추가하시겠습니까?");
                  setOpenConfirmModal(true);
                }}
              >
                장바구니
              </div>
              <div
                className="btn"
                onClick={() => {
                  navigate("/order", { state: product });
                }}
              >
                구매하기
              </div>
            </div>
            <div className="info_box">
              <div
                className="info_title_box"
                onClick={() => {
                  setOpenInfo1(!openInfo1);
                }}
              >
                <p>배송안내</p>
                <p>{openInfo1 ? "△" : "▽"}</p>
              </div>
              {openInfo1 ? (
                <div className="info_content_box">
                  <p className="content_title">
                    ※주문 - 오후6시 이전 결제건 당일 접수
                  </p>
                  <p>
                    주문서 작성 시 받는 사람과 보내는 사람의 정보를
                    <br />
                    꼼꼼히 체크하셔서 입력해주시기 바랍니다.
                    <br />
                    <br />
                    잘못된 주문 정보로 인한 오배송은 당사에서 책임지지 않으며,
                    <br />
                    이에 발생되는 기타 비용은 고객님께서 부담해주셔야 합니다.
                    <br />
                    <br />
                    기타 문의사항은 010-8951-2304로 연락주시면
                    <br />
                    확인 즉시 답변드리겠습니다. (연중무휴 09:00~18:00)
                    <br />
                    <br />
                    행사 또는 결혼식의 경우
                    <br />
                    미리 예약주문을 해주셔야 배송이 가능하며,
                    <br />
                    당일 주문 시 배송이 어려울 수 있습니다.
                    <br />
                    <br />
                    주문은 오후 6시에 마감되며,
                    <br />
                    이후 주문에 대해서는 익일 접수 및 배송 예정입니다.
                    <br />
                    <br />
                    일부 장례식장과 결혼식장은 지정 상품 이외에는
                    <br />
                    반입이 불가하오니 사전에 꼭 확인하시기 바랍니다.
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="info_box">
              <div
                className="info_title_box"
                onClick={() => {
                  setOpenInfo2(!openInfo2);
                }}
              >
                <p>배송 및 교환/반품</p>
                <p>{openInfo2 ? "△" : "▽"}</p>
              </div>
              {openInfo2 ? (
                <div className="info_content_box">
                  <p>
                    배송비 추가 지역과 금액이 지역사정에 의해 변경될 수 있으며,
                    <br />
                    도서산간 및 일부 지역은 금액이 추가되거나
                    <br />
                    배송이 지연 혹은 불가할 수 있음을 미리 알려드립니다.
                    <br />
                    <br />
                    당일 배송을 희망하실 경우
                    <br />
                    최소 3시간의 여유를 두고 주문해주시기 바랍니다.
                    <br />
                    <br />
                    주말이나 공휴일, 특정기념이 및 성수기엔 배송이 지연될 수
                    있으며
                    <br />
                    당일 배송이 어려울 수 있으니
                    <br />
                    최소 하루 전 미리 예약 주문을 해주시기 바랍니다.
                    <br />
                    <br />
                    주말 오전 예식과 행사의 경우
                    <br />
                    전날 미리 주문 접수를 해주셔야 정상 배송 가능합니다.
                    <br />
                    <br />
                    모든 상품은 재사용이 불가능한 생물(꽃/식물)로 제작되기
                    때문에
                    <br />
                    배송이 시작될 경우 주문 취소, 교환 및 반품(환불)은
                    불가합니다.
                  </p>
                </div>
              ) : (
                ""
              )}
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
  }
};

export default Detail;
