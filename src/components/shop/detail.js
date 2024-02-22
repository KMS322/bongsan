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
  const handleConfirm = () => {
    dispatch({
      type: ADD_CART_REQUEST,
      data: {
        user_id: me && Number(me.user_id),
        product_id: product.id,
      },
    });
  };
  useEffect(() => {
    if (addCartDone) {
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
            <div className="tag_box">
              <p>#결혼식</p>
              <p>#축하화환</p>
              <p>#화환전문관</p>
            </div>
            <div className="name_box">
              <p className="name">{product.product_name}</p>
              <img src="/images/btn_share.png" alt="" onClick={copyURL} />
            </div>
            <div className="price_box">
              <p>{Number(product.product_truePrice).toLocaleString()}원</p>
              <p>{Number(product.product_falsePrice).toLocaleString()}원</p>
            </div>
            <div
              className="login_box"
              onClick={() => {
                navigate("/login");
              }}
            >
              <p>로그인 후 적립 및 할인 혜택을 받으세요.</p>
              <p>GO ▷</p>
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
            <div className="sale_btn_box">
              <div
                className="sale_btn"
                onClick={() => {
                  setSale(true);
                }}
                style={{ borderColor: sale ? "#2b746a" : "rgb(219, 219, 219)" }}
              >
                <img src="/images/btn_check.png" alt="" />
                <p>할인</p>
              </div>
              <div
                className="sale_btn"
                onClick={() => {
                  setSale(false);
                }}
                style={{ borderColor: sale ? "rgb(219, 219, 219)" : "#2b746a" }}
              >
                <img src="/images/btn_check.png" alt="" />
                <p>적립</p>
              </div>
            </div>
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
            <div className="total_box">
              <p>총 상품 금액</p>
              <p>{Number(product.product_truePrice).toLocaleString()}원</p>
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
                  <p>
                    ★ 영업시간
                    <br />
                    1. 오전 8시~오후 10시(365일 연중무휴)
                    <br />
                    2. 온라인 주문은 24시간 가능하며, 전화주문이나 상담은
                    영업시간에만 가능
                    <br />
                    <br />
                    ★ 배송 가능 시간
                    <br />
                    1. 평일 : 오전 9시~오후 8시
                    <br />
                    2. 토,일 및 공휴일 : 오전 9시~오후 7시
                    <br />
                    <span>
                      (상기 시간 이전에 마감되는 일부 지역, 영업, 배송 가능 시간
                      외 주문건은 다음날 순차적으로 배송되므로 오전 11시 이후에
                      배송됩니다. 토,일 및 공휴일은 예약 주문건과 교통량의 증가,
                      현장상황에 따라 평일 배송 시간보다 지연될 수 있습니다.)
                    </span>
                    <br />
                    <br />
                    ★ 배송비
                    <br />
                    1. 배송비는 무료
                    <br />
                    (단, 읍, 면, 리 단위나 도서산간지역, 외곽지역이나 상품을
                    제작하는 화원과 배송지가 멀리 떨어진 경우는 추가 배송비가
                    발생 될 수 있습니다.)
                    <br />
                    <br />
                    ★ 배송시간
                    <br />
                    1. 당일배송 상품 평균 3시간 내 배송
                    <br />
                    2. 택배상품 2~3일 내 배송
                    <br />
                    3.수도권배송, 광역시배송, 택배배송 농장 사정에 의해 배송시간
                    변경 될 수 있습니다.
                    <br />
                    (단, 도서지역과 섬지역은 당일 중으로 배송되거나 불가 안내될
                    수 있습니다)
                    <br />
                    4. 예식 및 행사 등의 상품은 교통상황이나 현장상황에 따라
                    지연 가능성이 있기에 요청한 시간보다 일찍 배송됩니다.
                    <br />
                    5. 발렌타인데이, 화이트데이, 어버이날, 스승의날, 빼빼로데이,
                    특정기념일이나 인사이동 등의 특수시즌은 평소보다 주문량의
                    폭주로 배송시간 지정이 불가하며, 별도 안내 없이 당일 중으로
                    배송될 수 있습니다.
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
                <p>교환/환불안내</p>
                <p>{openInfo2 ? "△" : "▽"}</p>
              </div>
              {openInfo2 ? (
                <div className="info_content_box">
                  <p>
                    <span>
                      취소, 교환, 환불은 인터넷 쇼핑몰 상에서는 불가능하므로
                      <br />
                      고객센터 1566-5565로 전화 요청하셔야합니다.
                      <br />
                      교환 및 환불은 평일 기준으로 48시간 이내에 100%
                      가능합니다.
                    </span>
                    <br />
                    <br />
                    ★ 교환 및 환불 가능
                    <br />
                    1. 주문한 상품의 품절로 제작 및 배송이 불가능 할 경우
                    <br />
                    2. 배송된 상품이 불량하거나 파손된 경우
                    <br />
                    3. 오배송이나 미배송으로 확인 될 경우
                    <br />
                    <br />
                    * 단, 잘못 된 상품은 회수 후 환불이 원칙이며 회수될 상품의
                    훼손 또는 부자재 누락시 교환 또는 환불이 불가함을
                    안내드립니다.
                    <br />
                    <br />
                    ★ 교환 및 환불 불가
                    <br />
                    1. 생화 상품의 경우 한번 잘려지면 다시 사용할 수 없는 꽃의
                    특성상 제작이 진행된 상품은 고객의 변심에 의한 취소, 교환 및
                    환불이 불가능합니다.
                    <br />
                    2. 살아있는 식물의 특성상 배송 후 관리 미흡에 의한 건에
                    대해서는 교환 및 환불이 불가능합니다.
                    <br />
                    3. 주문자의 배송정보 기재 오류 및 받는 이의 수취 거부 등으로
                    인한 교환 및 환불은 불가능합니다.
                    <br />
                    4. 주문 즉시 상품 제작이 들어가기 때문에 당일 주문건이라도
                    취소가 불가능 할 수 잇습니다.
                    <br />
                    <br />
                    ★ 제품 이미지와 관련된 유의사항
                    <br />
                    1. 계절에 따라 상품 구성 소재(화분의 모양이나 색상,
                    데코식물의 종류나 사이즈, 바구니의 모양이나 색상, 포장지의
                    색상이나 포장 방법,리본의 색상과 장식방법 등)는 이미지와
                    달라질수 있습니다.
                    <br />
                    2. 옵션상품(케이크,캔디,초콜릿,와인,샴페인 등)은 브랜드 및
                    상세종류 지정불가 랜덤입니다.
                    <br />
                    3. 상품의 높이나 넓이가 대략적으로 기재되어 있으나 생물의
                    특성상 모양과 색상이 제각각 다르며 제작하는 방법이나
                    구성등에 따라 높이와 넓이가 다소 달라질 수 있습니다.
                    <br />
                    4. 예약된 상품들은 하루 전 제작되어 예약 배송을 진행하고
                    있으므로 취소시 위약금이 발생할 수 있습니다.
                    <br />
                    5. 화환(축하,근조) 상품의 포인트의 색상이나 소재는 달라질 수
                    있습니다.
                    <br />
                    (이미지와 별도로 생화와 조화가 적절히 혼합되어 제작됨을
                    알려드립니다)
                    <br /> 6. 상품의 특성상 꽃 상품은 수령 후 2시간 이내,
                    관엽식물은 수령 후 3일 이후에는 교환, 환불, 반품은 절대
                    불가합니다.
                    <br />
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
