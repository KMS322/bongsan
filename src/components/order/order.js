import "../../css/order.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const Order = () => {
  const location = useLocation();
  const { state } = location;
  console.log("state : ", state);
  const [userName, setUserName] = useState("");
  const [userTel, setUserTel] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverTel, setReceiverTel] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverDetailAddress, setReceiverDetailAddress] = useState("");
  const [requirement, setRequirement] = useState("");
  const [deliveryDate, setDeliveryData] = useState("");
  const [deliveryHour, setDeliveryHour] = useState("");
  const [deliveryMinute, setDeliveryMinute] = useState("");
  const [event, setEvent] = useState("");
  const [checkRibbon, setCheckRibbon] = useState(true);
  const [ribbonLeft, setRibbonLeft] = useState("");
  const [ribbonRight, setRibbonRight] = useState("");
  const [checkCard, setCheckCard] = useState(true);
  const [cardText, setCardText] = useState("");
  const [checkBill, setCheckBill] = useState(false);
  const [billName, setBillName] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [billEmail, setBillEmail] = useState("");
  const [payOption, setPayOption] = useState("");
  const [agree, setAgree] = useState(false);
  const [totalTruePrice, setTotalTruePrice] = useState(0);
  const [totalFalsePrice, setTotalFalsePrice] = useState(0);

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleUserTel = (e) => {
    setUserTel(e.target.value);
  };

  const handleReceiverName = (e) => {
    setReceiverName(e.target.value);
  };
  const handleReceiverTel = (e) => {
    setReceiverTel(e.target.value);
  };
  const handleReceiverAddress = (e) => {
    setReceiverAddress(e.target.value);
  };
  const handleReceiverDetailAddress = (e) => {
    setReceiverDetailAddress(e.target.value);
  };
  const handleRequirement = (e) => {
    setRequirement(e.target.value);
  };
  const handleDeliveryDate = (e) => {
    setDeliveryData(e.target.value);
  };
  const handleDeliveryHour = (e) => {
    setDeliveryHour(e.target.value);
  };
  const handleDeliveryMinute = (e) => {
    setDeliveryMinute(e.target.value);
  };
  const handleEvent = (e) => {
    setEvent(e.target.value);
  };
  const handleRibbonLeft = (e) => {
    setRibbonLeft(e.target.value);
  };
  const handleRibbonRight = (e) => {
    setRibbonRight(e.target.value);
  };
  const handleCardText = (e) => {
    setCardText(e.target.value);
  };
  const handleBillName = (e) => {
    setBillName(e.target.value);
  };
  const handleBillNumber = (e) => {
    setBillNumber(e.target.value);
  };
  const handleBillEmail = (e) => {
    setBillEmail(e.target.value);
  };
  useEffect(() => {
    if (state && state.length > 0) {
      const totalFalsePrice =
        state &&
        state.reduce((acc, product) => {
          return acc + Number(product.product_falsePrice) * product.product_cnt;
        }, 0);
      setTotalFalsePrice(totalFalsePrice);
      const totalTruePrice =
        state &&
        state.reduce((acc, product) => {
          return acc + Number(product.product_truePrice) * product.product_cnt;
        }, 0);
      setTotalTruePrice(totalTruePrice);
    }
  }, [state]);
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="order">
      <p>주문결제</p>
      <div className="article_container">
        <div className="order_container">
          {state &&
            state.map((product, index) => {
              return (
                <div className="product_box" key={index}>
                  <img src={product.product_mainImgSrc} alt="" />
                  <p>
                    {product.product_name} X {product.product_cnt}개
                  </p>
                  <p>
                    {(
                      Number(product.product_falsePrice) * product.product_cnt
                    ).toLocaleString()}
                    원
                  </p>
                  <p>
                    {(
                      Number(product.product_truePrice) * product.product_cnt
                    ).toLocaleString()}
                    원
                  </p>
                </div>
              );
            })}
          <div className="order_box">
            <div className="left_box">
              <p className="title">주문자 정보</p>
              <input
                type="text"
                value={userName}
                onChange={handleUserName}
                placeholder="주문자성명"
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <div
                  className="text_balloon"
                  style={{ display: "inline-block", marginLeft: "5px" }}
                >
                  커서 갖다댔을 시 생기는 텍스트
                </div>
              )}
              <input
                type="text"
                value={userTel}
                onChange={handleUserTel}
                placeholder="핸드폰"
              />
              <p className="title" style={{ marginTop: "1vw" }}>
                주문 시 요청사항
              </p>
              <textarea
                type="text"
                value={requirement}
                onChange={handleRequirement}
                placeholder="요청사항"
              />
              <p className="title" style={{ marginTop: "2vw" }}>
                배송 정보
              </p>
              <div className="receiver_box">
                <input
                  type="text"
                  value={receiverName}
                  onChange={handleReceiverName}
                  placeholder="받으시는분"
                />
                <select value={event} onChange={handleEvent}>
                  <option value="">선택</option>
                  <option value="신랑측">신랑측</option>
                  <option value="신부측">신부측</option>
                  <option value="상주">상주</option>
                  <option value="고인">고인</option>
                </select>
              </div>

              <input
                type="text"
                value={receiverTel}
                onChange={handleReceiverTel}
                placeholder="핸드폰번호"
              />

              <div className="address_box">
                <input
                  type="text"
                  value={receiverAddress}
                  onChange={handleReceiverAddress}
                  placeholder="주소"
                  readOnly
                />
                <div className="search_box">검색</div>
              </div>
              <input
                type="text"
                value={receiverDetailAddress}
                onChange={handleReceiverDetailAddress}
                placeholder="상세주소"
              />
              <p className="detail_text">
                배송지역에 따라 추가 배송비가 부과될수 있습니다.
                <br />
                (추가 배송비는 상품 하나씩 각각 부과됩니다.)
              </p>

              <p className="add_text">
                행사 또는 예식의 경우 필히 시간을 기입하시고, 케익주문시 초의
                갯수를 입력하세요.
              </p>
              <p className="title" style={{ marginTop: "2vw" }}>
                계산서 발행
              </p>
              <div className="event_radio_box">
                <div
                  className="radio_box"
                  onClick={() => {
                    setCheckBill(true);
                  }}
                >
                  <img
                    src={
                      checkBill
                        ? "/images/radio_on.png"
                        : "/images/radio_off.png"
                    }
                    alt=""
                  />
                  <p>필요</p>
                </div>
                <div
                  className="radio_box"
                  onClick={() => {
                    setCheckBill(false);
                  }}
                >
                  <img
                    src={
                      checkBill
                        ? "/images/radio_off.png"
                        : "/images/radio_on.png"
                    }
                    alt=""
                  />
                  <p>불필요</p>
                </div>
              </div>
              {checkBill ? (
                <>
                  <input
                    type="text"
                    value={billName}
                    onChange={handleBillName}
                    placeholder="사업자 대표명"
                  />
                  <input
                    type="text"
                    value={billNumber}
                    onChange={handleBillNumber}
                    placeholder="사업자등록번호"
                  />
                  <input
                    type="text"
                    value={billEmail}
                    onChange={handleBillEmail}
                    placeholder="이메일"
                  />
                </>
              ) : (
                ""
              )}
            </div>
            <div className="right_box">
              <p className="title">행사 시작 시간(도착 희망 시간)</p>
              <div className="select_box">
                <input
                  type="text"
                  value={deliveryDate}
                  onChange={handleDeliveryDate}
                  placeholder="2024-02-23"
                />
                <select value={deliveryHour} onChange={handleDeliveryHour}>
                  <option value="">시</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                </select>
                <select value={deliveryMinute} onChange={handleDeliveryMinute}>
                  <option value="">분</option>
                  <option value="00">00</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
                <select value={event} onChange={handleEvent}>
                  <option value="">선택</option>
                  <option value="예식 시작">예식 시작</option>
                  <option value="행사 시작">행사 시작</option>
                  <option value="까지 도착">까지 도착</option>
                </select>
              </div>
              <p className="select_text">
                (안내) 결혼/개업식등 행사와 예식의 경우 행사,예식을
                선택해주셔야합니다.
                <br />
                <br /> (안내) 당일 주문 배송시 현재 시간부터 최소한 3시간 정도는
                여유를 주셔야 합니다.(급한 주문일경우 1566-5565로 미리 전화상담
                부탁드립니다.)
                <br />
                <br /> 배송가능한 시간은 09:00 부터 22:00입니다.
                <br />
                <br /> ★11시 이전 배송을 원하시는 경우 하단의 요청사항에
                행사시간 기입하시고 꼭 전화부탁드립니다!
              </p>
              <p className="title" style={{ marginTop: "2vw" }}>
                리본 문구
              </p>
              <div className="event_radio_box">
                <div
                  className="radio_box"
                  onClick={() => {
                    setCheckRibbon(true);
                  }}
                >
                  <img
                    src={
                      checkRibbon
                        ? "/images/radio_on.png"
                        : "/images/radio_off.png"
                    }
                    alt=""
                  />
                  <p>선택</p>
                </div>
                <div
                  className="radio_box"
                  onClick={() => {
                    setCheckRibbon(false);
                  }}
                >
                  <img
                    src={
                      checkRibbon
                        ? "/images/radio_off.png"
                        : "/images/radio_on.png"
                    }
                    alt=""
                  />
                  <p>미선택</p>
                </div>
              </div>
              {checkRibbon ? (
                <>
                  <input
                    type="text"
                    value={ribbonLeft}
                    onChange={handleRibbonLeft}
                    placeholder="보내는 사람_왼쪽"
                  />
                  <input
                    type="text"
                    value={ribbonRight}
                    onChange={handleRibbonRight}
                    placeholder="경조 메세지_오른쪽"
                  />
                </>
              ) : (
                ""
              )}
              <p className="title" style={{ marginTop: "2vw" }}>
                카드 문구
              </p>
              <div className="event_radio_box">
                <div
                  className="radio_box"
                  onClick={() => {
                    setCheckCard(true);
                  }}
                >
                  <img
                    src={
                      checkCard
                        ? "/images/radio_on.png"
                        : "/images/radio_off.png"
                    }
                    alt=""
                  />
                  <p>선택</p>
                </div>
                <div
                  className="radio_box"
                  onClick={() => {
                    setCheckCard(false);
                  }}
                >
                  <img
                    src={
                      checkCard
                        ? "/images/radio_off.png"
                        : "/images/radio_on.png"
                    }
                    alt=""
                  />
                  <p>미선택</p>
                </div>
              </div>
              {checkCard ? (
                <textarea
                  type="text"
                  value={cardText}
                  onChange={handleCardText}
                  placeholder="작성내용"
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="pay_container">
          <div className="pay_box">
            <p className="title" style={{ marginTop: "2vw" }}>
              결제 방법
            </p>
            <div className="payOption_box">
              <div
                className="payOption"
                onClick={() => {
                  setPayOption("무통장입금");
                }}
                style={{
                  borderColor: payOption === "무통장입금" ? "#2b746a" : "",
                }}
              >
                <img
                  src={
                    payOption === "무통장입금"
                      ? "/images/btn_check.png"
                      : "/images/btn_unCheck.png"
                  }
                  alt=""
                />
                <p>무통장입금</p>
              </div>
              <div
                className="payOption"
                onClick={() => {
                  setPayOption("계좌이체");
                }}
                style={{
                  borderColor: payOption === "계좌이체" ? "#2b746a" : "",
                }}
              >
                <img
                  src={
                    payOption === "계좌이체"
                      ? "/images/btn_check.png"
                      : "/images/btn_unCheck.png"
                  }
                  alt=""
                />
                <p>계좌이체</p>
              </div>
              <div
                className="payOption"
                onClick={() => {
                  setPayOption("신용카드");
                }}
                style={{
                  borderColor: payOption === "신용카드" ? "#2b746a" : "",
                }}
              >
                <img
                  src={
                    payOption === "신용카드"
                      ? "/images/btn_check.png"
                      : "/images/btn_unCheck.png"
                  }
                  alt=""
                />
                <p>신용카드</p>
              </div>
              <div
                className="payOption"
                onClick={() => {
                  setPayOption("네이버페이");
                }}
                style={{
                  borderColor: payOption === "네이버페이" ? "#2b746a" : "",
                }}
              >
                <img
                  src={
                    payOption === "네이버페이"
                      ? "/images/btn_check.png"
                      : "/images/btn_unCheck.png"
                  }
                  alt=""
                />
                <p>네이버페이</p>
              </div>
            </div>
            <p className="title" style={{ marginTop: "2vw" }}>
              결제 금액
            </p>
            <div className="price_box">
              <div className="price_title">
                <p>주문금액</p>
                <p>할인금액</p>
              </div>
              <div className="price">
                <p>{totalFalsePrice.toLocaleString()}원</p>
                <p>-{(totalFalsePrice - totalTruePrice).toLocaleString()}원</p>
              </div>
            </div>
            <div className="total_box">
              <p>총 결제금액</p>
              <p>{totalTruePrice.toLocaleString()}원</p>
            </div>
            <div
              className="argree_box"
              onClick={() => {
                setAgree(!agree);
              }}
            >
              <img
                src={
                  agree
                    ? "/images/btn_checked.png"
                    : "/images/btn_unChecked.png"
                }
                alt=""
              />
              <p>내용을 확인하였으며 결제에 동의합니다.</p>
            </div>
            <p className="info_text">개인정보 수집이용 및 제공 동의</p>
            <div className="agree_text">
              <p>
                수집하는 개인정보 항목
                <br />
                회사는 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은
                개인정보를 수집하고 있습니다.
                <br />
                <br />
                수집항목 : 이름, 생년월일, 로그인ID, 비밀번호, 자택 전화번호,
                자택 주소, 휴대전화번호, 이메일, 결혼여부, 기념일, 주민등록번호,
                아이핀, 신용카드 정보, 은행계좌 정보, 접속 로그, 쿠키, 접속 IP
                정보, 결제기록
                <br />
                <br />
                개인정보 수집방법 : 홈페이지(회원가입, 주문)
                <br />
                <br />
                개인정보의 수집 및 이용목적
                <br />
                회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
              </p>
            </div>
            <div className="pay_btn">결제하기</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
