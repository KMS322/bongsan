import "../../css/order.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";

const Order = () => {
  const location = useLocation();
  const { state } = location;
  const [formData, setFormData] = useState({
    userName: [],
    userTel: [],
    requirement: [],
    receiverName: [],
    receiverTel: [],
    receiverAddress: [],
    receiverDetailAddress: [],
    receiverPosition: [],
    deliveryDate: [],
    deliveryHour: [],
    deliveryMinute: [],
    event: [],
    checkRibbon: [],
    ribbonLeft: [],
    ribbonRight: [],
    checkCard: [],
    cardText: [],
    checkBill: [],
    billName: [],
    billNumber: [],
    billEmail: [],
    modalOpen: [],
  });
  const [payOption, setPayOption] = useState("");
  const [agree, setAgree] = useState(false);
  const [checkBill, setCheckBill] = useState(false);
  const [billName, setBillName] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [billEmail, setBillEmail] = useState("");
  const [totalTruePrice, setTotalTruePrice] = useState(0);
  const [totalFalsePrice, setTotalFalsePrice] = useState(0);
  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY >= (10 * window.innerWidth) / 100) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const handleComplete = (data, index) => {
    const updatedFormData = { ...formData };
    updatedFormData.receiverAddress[index] = data.address;
    setFormData(updatedFormData);
  };
  const handleChange = (e, fieldName, index, tf) => {
    const updatedFormData = { ...formData };
    if (!tf) {
      updatedFormData[fieldName][index] = e.target.value;
    } else {
      updatedFormData[fieldName][index] = tf;
    }
    setFormData(updatedFormData);
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
    if (state) {
      state.map((item, index) => {
        if (
          item.product_category === "축하화환" ||
          item.product_category === "근조화환"
        ) {
          formData.checkRibbon[index] = true;
        } else if (item.product_category === "행사용 상품") {
          formData.checkRibbon[index] = false;
          formData.checkCard[index] = false;
        } else {
          formData.checkRibbon[index] = true;
          formData.checkCard[index] = true;
          formData.modalOpen[index] = false;
        }
      });
    }
  }, [state]);
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

  const handlePay = () => {
    const orderDatas = [];

    state.forEach((product, index) => {
      const orderInfo = {};
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          orderInfo[key] = formData[key][index];
        }
      }
      orderDatas.push({
        productInfo: product,
        orderInfo: orderInfo,
      });
      if (
        !formData.userName[index] ||
        !formData.userTel[index] ||
        !formData.requirement[index]
      ) {
        window.confirm(
          `${index + 1}번째 상품의 주문 정보를 모두 입력해주세요.`
        );
        return;
      }
      if (
        !formData.receiverAddress[index] ||
        !formData.receiverDetailAddress[index]
      ) {
        window.confirm(
          `${index + 1}번째 상품의 배송 정보를 모두 입력해주세요.`
        );
        return;
      }
      if (
        !formData.deliveryDate[index] ||
        !formData.deliveryHour[index] ||
        !formData.deliveryMinute[index] ||
        !formData.event[index]
      ) {
        window.confirm(
          `${index + 1}번째 상품의 시간 정보를 모두 입력해주세요.`
        );
        return;
      }
      if (formData.checkRibbon[index]) {
        if (!formData.ribbonLeft[index] || !formData.ribbonRight[index]) {
          window.confirm(
            `${index + 1}번째 상품의 리본 문구를 모두 입력해주세요.`
          );
          return;
        }
      }
      if (formData.checkCard[index]) {
        if (!formData.cardText[index]) {
          window.confirm(
            `${index + 1}번째 상품의 카드 문구를 모두 입력해주세요.`
          );
          return;
        }
      }
      if (checkBill) {
        if (!billName || !billNumber || !billEmail) {
          window.confirm(
            `계산서 발행을 희망할 시에 사업자 정보를 모두 입력해주세요.`
          );
          return;
        }
      }
      if (!agree) {
        window.confirm(`개인정보 수집이용 및 제공에 동의해주세요.`);
        return;
      }
    });
  };
  return (
    <div className="order">
      <p>주문결제</p>
      <div className="article_container">
        <div className="order_container">
          {state &&
            state.map((product, index) => {
              return (
                <div className="box_container" key={index}>
                  <div className="product_box">
                    <img
                      src={`/products/${product.product_mainImgSrc}`}
                      alt=""
                    />
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
                  <div className="order_box">
                    <div className="left_box">
                      <p className="title">
                        주문자 정보 <sup>*</sup>
                      </p>
                      <input
                        type="text"
                        value={formData.userName[index] || ""}
                        onChange={(e) => {
                          handleChange(e, "userName", index);
                        }}
                        placeholder="주문자성명"
                        onFocus={() => setShowTooltip(true)}
                        onBlur={() => setShowTooltip(false)}
                        required
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
                        value={formData.userTel[index] || ""}
                        onChange={(e) => {
                          handleChange(e, "userTel", index);
                        }}
                        placeholder="핸드폰"
                      />
                      <p className="title" style={{ marginTop: "1vw" }}>
                        주문 시 요청사항 <sup>*</sup>
                      </p>
                      <textarea
                        type="text"
                        value={formData.requirement[index] || ""}
                        onChange={(e) => {
                          handleChange(e, "requirement", index);
                        }}
                        placeholder="요청사항"
                      />
                      <p className="title" style={{ marginTop: "2vw" }}>
                        배송 정보 <sup>*</sup>
                      </p>
                      <div className="receiver_box">
                        <input
                          type="text"
                          value={formData.receiverName[index] || ""}
                          onChange={(e) => {
                            handleChange(e, "receiverName", index);
                          }}
                          placeholder="받으시는분"
                          required
                        />
                        <select
                          value={formData.receiverPosition[index] || ""}
                          onChange={(e) => {
                            handleChange(e, "receiverPosition", index);
                          }}
                        >
                          <option value="">선택</option>
                          <option value="신랑측">신랑측</option>
                          <option value="신부측">신부측</option>
                          <option value="상주">상주</option>
                          <option value="고인">고인</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        value={formData.receiverTel[index] || ""}
                        onChange={(e) => {
                          handleChange(e, "receiverTel", index);
                        }}
                        placeholder="핸드폰번호"
                      />
                      <div className="address_box">
                        <input
                          type="text"
                          value={formData.receiverAddress[index] || ""}
                          onChange={(e) => {
                            handleChange(e, "receiverAddress", index);
                          }}
                          placeholder="주소"
                          readOnly
                        />
                        <div
                          className="search_box"
                          onClick={(e) => {
                            handleChange(e, "receiverAddress", index, "");
                            handleChange(
                              e,
                              "modalOpen",
                              index,
                              !formData.modalOpen[index]
                            );
                          }}
                        >
                          검색
                        </div>
                      </div>
                      {formData.modalOpen[index] && (
                        <div>
                          <DaumPostcode
                            onComplete={(e) => {
                              handleComplete(e, index);
                            }}
                            autoClose
                            animation
                          />
                        </div>
                      )}
                      <input
                        type="text"
                        value={formData.receiverDetailAddress[index] || ""}
                        onChange={(e) => {
                          handleChange(e, "receiverDetailAddress", index);
                        }}
                        placeholder="상세주소"
                      />
                      <p className="detail_text">
                        일부 지역 및 도서산간지역의 경우 지역에 따라 추가
                        배송비가 발생할 수 있으며, 2개 이상 구매하실 경우 상품
                        각각마다 추가 배송비가 발생합니다.
                      </p>

                      <p className="add_text">
                        행사 또는 예식의 경우 필히 시간을 기입하시고, 케익주문시
                        초의 갯수를 입력하세요.
                      </p>
                    </div>
                    <div className="right_box">
                      <p className="title">행사 시작 시간(도착 희망 시간)</p>
                      <div className="select_box">
                        <input
                          type="text"
                          value={formData.deliveryDate[index] || ""}
                          onChange={(e) => {
                            handleChange(e, "deliveryDate", index);
                          }}
                          placeholder="2024-02-23"
                        />
                        <select
                          value={formData.deliveryHour[index] || ""}
                          onChange={(e) => {
                            handleChange(e, "deliveryHour", index);
                          }}
                        >
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
                        <select
                          value={formData.deliveryMinute[index] || ""}
                          onChange={(e) => {
                            handleChange(e, "deliveryMinute", index);
                          }}
                        >
                          <option value="">분</option>
                          <option value="00">00</option>
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="30">30</option>
                          <option value="40">40</option>
                          <option value="50">50</option>
                        </select>
                        <select
                          value={formData.event[index] || ""}
                          onChange={(e) => {
                            handleChange(e, "event", index);
                          }}
                        >
                          <option value="">선택</option>
                          <option value="예식 시작">예식 시작</option>
                          <option value="행사 시작">행사 시작</option>
                          <option value="까지 도착">까지 도착</option>
                        </select>
                      </div>
                      <p className="select_text">
                        * 결혼식이나 개업식 등 행사의 경우 시작 시간을 입력해
                        주시면
                        <br /> 시작 전에 도착할 수 있도록 접수해드리겠습니다.
                        <br />* 당일 배송을 희망하실 경우 최소 3시간의 여유를
                        두고 주문해주시기
                        <br /> 바랍니다. <br />* 오전 예식이나 행사의 경우 전날
                        미리 주문 접수를 해주셔야 정상 <br />
                        배송 가능합니다.
                      </p>
                      {product.product_category === "행사용상품" ? (
                        ""
                      ) : (
                        <>
                          <p className="title" style={{ marginTop: "2vw" }}>
                            리본 문구
                          </p>
                          {product.product_category === "축하화환" ||
                          product.product_category === "근조화환" ? (
                            ""
                          ) : (
                            <div className="event_radio_box">
                              <div
                                className="radio_box"
                                onClick={(e) => {
                                  handleChange(e, "checkRibbon", index, true);
                                }}
                              >
                                <img
                                  src={
                                    formData.checkRibbon[index]
                                      ? "/images/radio_on.png"
                                      : "/images/radio_off.png"
                                  }
                                  alt=""
                                />
                                <p>선택</p>
                              </div>
                              <div
                                className="radio_box"
                                onClick={(e) => {
                                  handleChange(e, "checkRibbon", index, false);
                                }}
                              >
                                <img
                                  src={
                                    formData.checkRibbon[index]
                                      ? "/images/radio_off.png"
                                      : "/images/radio_on.png"
                                  }
                                  alt=""
                                />
                                <p>미선택</p>
                              </div>
                            </div>
                          )}
                          {formData.checkRibbon[index] ? (
                            <>
                              <input
                                type="text"
                                value={formData.ribbonLeft[index] || ""}
                                onChange={(e) => {
                                  handleChange(e, "ribbonLeft", index);
                                }}
                                placeholder="보내는 사람_왼쪽"
                              />
                              <input
                                type="text"
                                value={formData.ribbonRight[index] || ""}
                                onChange={(e) => {
                                  handleChange(e, "ribbonRight", index);
                                }}
                                placeholder="경조 메세지_오른쪽"
                              />
                            </>
                          ) : (
                            ""
                          )}
                          {product.product_category === "축하화환" ||
                          product.product_category === "근조화환" ? (
                            ""
                          ) : (
                            <>
                              <p className="title" style={{ marginTop: "2vw" }}>
                                카드 문구
                              </p>
                              <div className="event_radio_box">
                                <div
                                  className="radio_box"
                                  onClick={(e) => {
                                    handleChange(e, "checkCard", index, true);
                                  }}
                                >
                                  <img
                                    src={
                                      formData.checkCard[index]
                                        ? "/images/radio_on.png"
                                        : "/images/radio_off.png"
                                    }
                                    alt=""
                                  />
                                  <p>선택</p>
                                </div>
                                <div
                                  className="radio_box"
                                  onClick={(e) => {
                                    handleChange(e, "checkCard", index, false);
                                  }}
                                >
                                  <img
                                    src={
                                      formData.checkCard[index]
                                        ? "/images/radio_off.png"
                                        : "/images/radio_on.png"
                                    }
                                    alt=""
                                  />
                                  <p>미선택</p>
                                </div>
                              </div>
                              {formData.checkCard[index] ? (
                                <textarea
                                  type="text"
                                  value={formData.cardText[index] || ""}
                                  onChange={(e) => {
                                    handleChange(e, "cardText", index);
                                  }}
                                  placeholder="작성내용"
                                />
                              ) : (
                                ""
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {/* <div
          className={
            isScrolled ? "pay_container fixed_container" : "pay_container"
          }
        > */}
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
                    checkBill ? "/images/radio_on.png" : "/images/radio_off.png"
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
                    checkBill ? "/images/radio_off.png" : "/images/radio_on.png"
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
            <p className="title" style={{ marginTop: "2vw" }}>
              결제 금액
            </p>
            <div className="price_box">
              <div className="price_title">
                <p>주문금액</p>
                <p>할인금액</p>
                <p>추가 배송비</p>
              </div>
              <div className="price">
                <p>{totalFalsePrice.toLocaleString()}원</p>
                <p>-{(totalFalsePrice - totalTruePrice).toLocaleString()}원</p>
                <p>10,000원</p>
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
            <div className="pay_btn" onClick={handlePay}>
              결제하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
