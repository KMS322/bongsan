import "../../css/orderTest.css";
import React, { useEffect, useState } from "react";
const OrderTest = () => {
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const IMP = window.IMP && window.IMP;
  IMP.init("imp63564407");
  var today = new Date();
  var hours = today.getHours(); // 시
  var minutes = today.getMinutes(); // 분
  var seconds = today.getSeconds(); // 초
  var milliseconds = today.getMilliseconds();
  var makeMerchantUid = hours + minutes + seconds + milliseconds;

  const requestPay = () => {
    IMP.request_pay(
      {
        pg: "kakaopay.TC0ONETIME",
        pay_method: "card",
        merchant_uid: "IMP" + makeMerchantUid,
        name: "만두 10kg",
        amount: 1,
        buyer_email: "Iamport@chai.finance",
        buyer_name: "아임포트 기술지원팀",
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울특별시 강남구 삼성동",
        buyer_postcode: "123-456",
        m_redirect_url: "complete.html",
      },
      function (rsp) {
        const { status, err_msg } = rsp;
        if (rsp.success) {
          console.log(rsp);
        } else if (err_msg) {
          alert(err_msg);
          console.log(rsp);
        } else if (status === "paid") {
          const { img_uid } = rsp;
        }
      }
    );
  };

  // const tossPay = () => {
  //   IMP.request_pay(
  //     {
  //       pg: "tosspay.tosstest",
  //       pay_method: "card",
  //       merchant_uid: makeMerchantUid, //상점에서 생성한 고유 주문번호
  //       name: "만두 10kg", //필수 파라미터 입니다.
  //       amount: 1004,
  //       buyer_email: "iamport@siot.do",
  //       buyer_name: "구매자이름",
  //       buyer_tel: "010-1234-5678",
  //       buyer_addr: "서울특별시 강남구 삼성동",
  //       buyer_postcode: "123-456",
  //       m_redirect_url: "complete.html",
  //     },
  //     function (rsp) {
  //       // callback
  //       if (rsp.success) {
  //         console.log(rsp);
  //       } else {
  //         console.log(rsp);
  //       }
  //     }
  //   );
  // };

  // const naverPay = () => {
  //   IMP.request_pay(
  //     {
  //       pg: "naverpay",
  //       merchant_uid: "order_no_0001", // 상점에서 관리하는 주문 번호
  //       name: "주문명:결제테스트",
  //       amount: 1004,
  //       buyer_email: "test@portone.io",
  //       buyer_name: "구매자이름",
  //       buyer_tel: "010-1234-5678",
  //       buyer_addr: "서울특별시 강남구 삼성동",
  //       buyer_postcode: "123-456",
  //       naverUseCfm: "20221231", // 이용완료일자(필요시 설정합니다)
  //       naverPopupMode: true, // 팝업모드 활성화
  //       m_redirect_url: "{결제 완료 후 리디렉션 될 URL}",
  //       naverPurchaserName: "구매자이름",
  //       naverPurchaserBirthday: "20151201",
  //       naverChainId: "sAMplEChAINid",
  //       naverMerchantUserKey: "가맹점의 사용자 키",
  //       naverCultureBenefit: true, // 문화비 소득공제 적용여부
  //       naverProducts: [
  //         {
  //           categoryType: "BOOK",
  //           categoryId: "GENERAL",
  //           uid: "107922211",
  //           name: "한국사",
  //           payReferrer: "NAVER_BOOK",
  //           sellerId: "sellerA",
  //           count: 10,
  //         },
  //         {
  //           categoryType: "MUSIC",
  //           categoryId: "CD",
  //           uid: "299911002",
  //           name: "러블리즈",
  //           payReferrer: "NAVER_BOOK",
  //           sellerId: "sellerB",
  //           count: 1,
  //         },
  //       ],
  //     },
  //     function (rsp) {
  //       // callback 로직
  //       /* ...중략... */
  //     }
  //   );
  // };

  // const kgPay = () => {
  //   IMP.request_pay(
  //     {
  //       pg: "html5_inicis",
  //       pay_method: "card",
  //       merchant_uid: "IMP" + makeMerchantUid,
  //       name: "만두 10kg",
  //       amount: 1004,
  //       buyer_email: "Iamport@chai.finance",
  //       buyer_name: "아임포트 기술지원팀",
  //       buyer_tel: "010-1234-5678",
  //       buyer_addr: "서울특별시 강남구 삼성동",
  //       buyer_postcode: "123-456",
  //       m_redirect_url: "complete.html",
  //     },
  //     function (rsp) {
  //       // callback
  //       if (rsp.success) {
  //         console.log(rsp);
  //       } else {
  //         console.log(rsp);
  //       }
  //     }
  //   );
  // };
  return (
    <div className="orderTest">
      <div className="btn" onClick={requestPay}>
        카카오 결제
      </div>
      {/* <div className="btn" onClick={tossPay}>
        토스 페이
      </div>
      <div className="btn" onClick={naverPay}>
        네이버 페이
      </div>
      <div className="btn" onClick={kgPay}>
        KG이니시스
      </div> */}
    </div>
  );
};

export default OrderTest;
