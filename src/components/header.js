import "../css/header.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from "../reducers/user";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logOutDone } = useSelector((state) => state.user);
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me && logOutDone) {
      window.location.href = "/";
    }
  }, [me, logOutDone]);

  const logout = () => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  };
  return (
    <div className="header">
      <div className="logo_container">
        <div className="img_box">
          <img
            src="/images/logo.png"
            alt=""
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="text_box">
          <p
            onClick={() => {
              navigate("/cart");
            }}
          >
            장바구니
          </p>
          {me && me ? (
            <>
              <p>마이페이지</p>
              <p onClick={logout}>로그아웃</p>
            </>
          ) : (
            <>
              <p
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인
              </p>
              <p
                onClick={() => {
                  navigate("/signin");
                }}
              >
                회원가입
              </p>
            </>
          )}
          <p
            onClick={() => {
              navigate("/review");
            }}
          >
            배송게시판
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
