const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/sendEmail", async (req, res, next) => {
  try {
    console.log("req.body : ", req.body);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        // user: "mangeune@gmail.com",
        // pass: "rcwpspivuiccmstk",
        user: "creamoff2021@gmail.com",
        pass: "ktdldgctfcczdfmy",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    req.body.orderDatas.map((data, index) => {
      const mailOptions = {
        from: req.body.name,
        // to: "mangeune@gmail.com",
        to: "kms930322@naver.com",
        subject: `[웹]봉산플라워 : ${data.orderInfo.userName}님 주문`,
        html: `<html><body>
        <h3>주문자 정보</h3>
        <p>주문자 성명 : ${data.orderInfo.userName}</p>
        <p>주문자 핸드폰번호 : ${data.orderInfo.userTel}</p>
        <p>주문시 요청사항 : ${data.orderInfo.requirement}</p>
        <p>주문시 요청사항 : ${data.orderInfo.requirement}</p>
        <h3>배송 정보</h3>
        <p>받으시는 분 : ${data.orderInfo.receiverName}(${data.orderInfo.receiverPosition})</p>
        <p>핸드폰번호 : ${data.orderInfo.receiverTel}</p>
        <p>주소 : ${data.orderInfo.receiverAddress} ${data.orderInfo.receiverDetailAddress}</p>
        <p>행사 시간(도착 희망 시간) : ${data.orderInfo.deliveryDate} ${data.orderInfo.deliveryHour}시 ${data.orderInfo.deliveryMinute}분 (${data.orderInfo.event})</p>

        <h3>주문 내역</h3>
        <p>상품명 : ${data.productInfo.product_name}</p>
        <p>갯수 : ${data.productInfo.product_cnt}개</p>
        </body></html>`,
      };

      mailOptions.html += `
  ${
    data.orderInfo.checkRibbon
      ? `<p>리본 문구(왼쪽) : ${data.orderInfo.ribbonLeft}</p>`
      : ""
  }
  ${
    data.orderInfo.checkRibbon
      ? `<p>리본 문구(오른쪽) : ${data.orderInfo.ribbonRight}</p>`
      : ""
  }
  ${
    data.orderInfo.checkCard
      ? `<p>카드 문구 : ${data.orderInfo.cardText}</p>`
      : ""
  }
  ${
    data.orderInfo.checkBill
      ? `
        <h3>계산서 발행 여부 : 필요</h3>
        <p>사업자 대표명 : ${data.orderInfo.billName}</p>
        <p>사업자등록번호 : ${data.orderInfo.billNumber}</p>
        <p>계산서발행 이메일 : ${data.orderInfo.billEmail}</p>
      `
      : "<h3>계산서 발행 여부 : 불필요</h3>"
  }
  ${
    data.orderInfo.checkBill
      ? `
        <p>계산서 발행 필요</p>
        <p>사업자 대표명 : ${data.orderInfo.billName}</p>
        <p>사업자등록번호 : ${data.orderInfo.billNumber}</p>
        <p>계산서발행 이메일 : ${data.orderInfo.billEmail}</p>
      `
      : ""
  }
`;
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Email Send " + info.response);
          res.status(200).send("Email sended");
        }
      });
    });

    res.status(200).send("send email");
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;
