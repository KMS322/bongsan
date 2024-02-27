import "../../css/signin.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST, CHECK_ID_REQUEST } from "../../reducers/user";
const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signUpDone, signUpError, checkIdDone, checkIdError } = useSelector(
    (state) => state.user
  );
  const [userID, onChangeId] = useInput("");
  const [userPW, onChangePW] = useInput("");
  const [pwVisible, setPwVisible] = useState(false);
  const [pwCheckVisible, setPwCheckVisible] = useState(false);
  const [userName, onChangeUserName] = useInput("");
  const [userEmail, onChangeUserEmail] = useInput("");
  const [userTel, onChangeUserTel] = useInput("");
  const [checkListAll, setCheckListAll] = useState(false);
  const [checkList1, setCheckList1] = useState(false);
  const [checkList2, setCheckList2] = useState(false);
  const [checkList3, setCheckList3] = useState(false);
  const [checkList4, setCheckList4] = useState(false);
  const [openContent1, setOpenContent1] = useState(false);
  const [openContent2, setOpenContent2] = useState(false);
  const [checkIdComplete, setCheckIdComplete] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (checkList1 && checkList2 && checkList3 && checkList4) {
      setCheckListAll(true);
    }
  }, [checkList1, checkList2, checkList3, checkList4]);

  useEffect(() => {
    if (checkIdError) {
      alert(checkIdError);
    }
  }, [checkIdError]);

  useEffect(() => {
    if (checkIdDone) {
      alert("사용 가능한 아이디 입니다.");
      setCheckIdComplete(userID);
    }
  }, [checkIdDone]);

  useEffect(() => {
    if (signUpDone) {
      navigate("/");
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== userPW);
  };
  const checkId = (e) => {
    e.preventDefault();
    dispatch({
      type: CHECK_ID_REQUEST,
      data: {
        userID,
      },
    });
  };
  const onSubmitForm = (e) => {
    e.preventDefault();

    dispatch(
      {
        type: SIGN_UP_REQUEST,
        data: {
          userID,
          userPW,
          userName,
          userEmail,
          userTel,
          checkList1,
          checkList2,
          checkList3,
          checkList4,
        },
      },
      [
        userID,
        userPW,
        userName,
        userEmail,
        userTel,
        checkList1,
        checkList2,
        checkList3,
        checkList4,
      ]
    );
  };
  return (
    <div className="singin">
      <p className="title">봉산플라워 회원가입</p>
      <form className="input_box_container">
        <label className="input_box">
          <input
            type="text"
            name="userID"
            value={userID}
            onChange={onChangeId}
            placeholder="아이디"
          />
          <div
            className="check_id"
            style={{
              backgroundColor: checkIdComplete ? "#2B746A" : "#b6b6b6",
            }}
            onClick={checkId}
          >
            중복확인
          </div>
        </label>
        <label className="input_box">
          <input
            type={pwVisible ? "text" : "password"}
            name="userPW"
            value={userPW}
            onChange={onChangePW}
            placeholder="비밀번호"
          />
          <img
            src={
              pwVisible
                ? "/images/btn_pwVisible.png"
                : "/images/btn_pwinVisible.png"
            }
            onClick={() => setPwVisible(!pwVisible)}
            alt=""
          />
        </label>
        <label
          className="input_box"
          style={{ marginBottom: passwordError ? "" : "1.6vw" }}
        >
          <input
            type={pwCheckVisible ? "text" : "password"}
            name="userPWCheck"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            placeholder="비밀번호 확인"
          />
          <img
            src={
              pwCheckVisible
                ? "/images/btn_pwVisible.png"
                : "/images/btn_pwinVisible.png"
            }
            onClick={() => setPwCheckVisible(!pwCheckVisible)}
            alt=""
          />
        </label>
        {passwordError && (
          <div style={{ color: "red", marginBottom: "1.6vw" }}>
            비밀번호가 일치하지 않습니다.
          </div>
        )}
        <label className="input_box">
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={onChangeUserName}
            placeholder="이름"
          />
        </label>
        <label className="input_box">
          <input
            type="text"
            name="userEmail"
            value={userEmail}
            onChange={onChangeUserEmail}
            placeholder="이메일"
          />
        </label>
        <label className="input_box">
          <input
            type="text"
            name="userTel"
            value={userTel}
            onChange={onChangeUserTel}
            placeholder="휴대전화번호"
          />
        </label>
      </form>
      <div className="check_container">
        <div className="check_box">
          <img
            src={
              checkListAll
                ? "/images/btn_checked.png"
                : "/images/btn_unChecked.png"
            }
            alt=""
            onClick={() => {
              if (!checkListAll) {
                setCheckList1(true);
                setCheckList2(true);
                setCheckList3(true);
                setCheckList4(true);
                setCheckListAll(true);
              } else {
                setCheckList1(false);
                setCheckList2(false);
                setCheckList3(false);
                setCheckList4(false);
                setCheckListAll(false);
              }
            }}
          />
          <p>아래 내용에 모두 동의합니다.</p>
        </div>
        <div className="check_box">
          <img
            src={
              checkList1
                ? "/images/btn_checked.png"
                : "/images/btn_unChecked.png"
            }
            alt=""
            onClick={() => {
              setCheckList1(!checkList1);
              if (checkList1) {
                setCheckListAll(false);
              }
            }}
          />
          <p>
            이용약관 <span>(필수)</span>
          </p>
          <div
            className="content_box"
            onClick={() => {
              setOpenContent1(!openContent1);
            }}
          >
            <p>내용보기</p>
            <p>{openContent1 ? "▽" : "△"}</p>
          </div>
        </div>
        {openContent1 ? (
          <div className="content">
            <p>
              전자상거래(인터넷사이버몰) 표준약관
              <br />
              표준약관 제10023호
              <br />
              <br />
              제1조(목적)
              <br />이 약관은 (주)에코그룹(전자상거래 사업자)가 운영하는
              (주)에코그룹 몰(이하 “몰”이라 한다)에서 제공하는 인터넷 관련
              서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버 몰과 이용자의
              권리·의무 및 책임사항을 규정함을 목적으로 합니다.
              <br />
              <br />
              ※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에
              반하지 않는 한 이 약관을 준용합니다」
              <br />
              <br />
              제2조(정의)
              <br />
              ①“몰” 이란 (주)에코그룹가 재화 또는 용역(이하 “재화등”이라 함)을
              이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여
              재화등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러
              사이버몰을 운영하는 사업자의 의미로도 사용합니다.
              <br />
              <br />
              제2조(정의)
              <br />
              ①“몰” 이란 (주)에코그룹가 재화 또는 용역(이하 “재화등”이라 함)을
              이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여
              재화등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러
              사이버몰을 운영하는 사업자의 의미로도 사용합니다.
              <br />
              <br />
              제2조(정의)
              <br />
              ①“몰” 이란 (주)에코그룹가 재화 또는 용역(이하 “재화등”이라 함)을
              이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여
              재화등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러
              사이버몰을 운영하는 사업자의 의미로도 사용합니다.
              <br />
              <br />
              제2조(정의)
              <br />
              ①“몰” 이란 (주)에코그룹가 재화 또는 용역(이하 “재화등”이라 함)을
              이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여
              재화등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러
              사이버몰을 운영하는 사업자의 의미로도 사용합니다.
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="check_box">
          <img
            src={
              checkList2
                ? "/images/btn_checked.png"
                : "/images/btn_unChecked.png"
            }
            alt=""
            onClick={() => {
              setCheckList2(!checkList2);
              if (checkList1) {
                setCheckListAll(false);
              }
            }}
          />
          <p>
            개인정보 수집 및 이용 <span>(필수)</span>
          </p>
          <div
            className="content_box"
            onClick={() => {
              setOpenContent2(!openContent2);
            }}
          >
            <p>내용보기</p>
            <p>{openContent2 ? "▽" : "△"}</p>
          </div>
        </div>
        {openContent2 ? (
          <div className="content">
            <p>
              전자상거래(인터넷사이버몰) 표준약관
              <br />
              표준약관 제10023호
              <br />
              <br />
              제1조(목적)
              <br />이 약관은 (주)에코그룹(전자상거래 사업자)가 운영하는
              (주)에코그룹 몰(이하 “몰”이라 한다)에서 제공하는 인터넷 관련
              서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버 몰과 이용자의
              권리·의무 및 책임사항을 규정함을 목적으로 합니다.
              <br />
              <br />
              ※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에
              반하지 않는 한 이 약관을 준용합니다」
              <br />
              <br />
              제2조(정의)
              <br />
              ①“몰” 이란 (주)에코그룹가 재화 또는 용역(이하 “재화등”이라 함)을
              이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여
              재화등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러
              사이버몰을 운영하는 사업자의 의미로도 사용합니다.
              <br />
              <br />
              제2조(정의)
              <br />
              ①“몰” 이란 (주)에코그룹가 재화 또는 용역(이하 “재화등”이라 함)을
              이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여
              재화등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러
              사이버몰을 운영하는 사업자의 의미로도 사용합니다.
              <br />
              <br />
              제2조(정의)
              <br />
              ①“몰” 이란 (주)에코그룹가 재화 또는 용역(이하 “재화등”이라 함)을
              이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여
              재화등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러
              사이버몰을 운영하는 사업자의 의미로도 사용합니다.
              <br />
              <br />
              제2조(정의)
              <br />
              ①“몰” 이란 (주)에코그룹가 재화 또는 용역(이하 “재화등”이라 함)을
              이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여
              재화등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러
              사이버몰을 운영하는 사업자의 의미로도 사용합니다.
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="check_box">
          <img
            src={
              checkList3
                ? "/images/btn_checked.png"
                : "/images/btn_unChecked.png"
            }
            alt=""
            onClick={() => {
              setCheckList3(!checkList3);
              if (checkList1) {
                setCheckListAll(false);
              }
            }}
          />
          <p>SNS 마케팅 수신동의 (선택)</p>
        </div>
        <div className="check_box">
          <img
            src={
              checkList4
                ? "/images/btn_checked.png"
                : "/images/btn_unChecked.png"
            }
            alt=""
            onClick={() => {
              setCheckList4(!checkList4);
              if (checkList1) {
                setCheckListAll(false);
              }
            }}
          />
          <p>이메일 마케팅 수신동의 (선택)</p>
        </div>
      </div>
      <button className="submit_btn" onClick={onSubmitForm}>
        회원가입
      </button>
      <button
        className="back_btn"
        onClick={() => {
          navigate("/");
        }}
      >
        취소
      </button>
    </div>
  );
};

export default Signin;
