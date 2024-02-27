import "../../css/login.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST } from "../../reducers/user";
const Login = () => {
  const dispatch = useDispatch();
  const { logInDone, logInError } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [userID, onChangeId] = useInput("");
  const [userPW, onChangePW] = useInput("");
  const [pwVisible, setPwVisible] = useState(false);
  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  useEffect(() => {
    if (logInDone) {
      navigate("/");
    }
  }, [logInDone]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        userID,
        userPW,
      },
    });
  };
  return (
    <div className="login">
      <p className="title">
        안녕하세요!
        <br />
        봉산플라워에 오신 것을 환영합니다.
      </p>
      <form className="input_box_container">
        <label className="input_box">
          <input
            type="text"
            name="userID"
            value={userID}
            onChange={onChangeId}
            placeholder="아이디"
          />
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
      </form>
      <p className="find">아이디/비밀번호 찾기</p>
      <button className="submit_btn" onClick={onSubmitForm}>
        로그인
      </button>
      <button
        className="signin_btn"
        onClick={() => {
          navigate("/signin");
        }}
      >
        회원가입
      </button>
    </div>
  );
};

export default Login;
