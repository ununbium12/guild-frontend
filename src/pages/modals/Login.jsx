import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import { AuthContext } from "../../context/AuthContext";
import '../../App.css';

function Login(props) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login, isResdata } = useContext(AuthContext);

  const [isEditPostOpen, setEditPostOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    props.setModalOpen(false);
  };


  //로그인된 상태면 들어올수 없음
  useEffect(() => {
    if(isResdata !== ""){
      navigate('/');
    }
  },[isResdata, navigate])

  function handleUserIdChange(e) {
    setUserId(e.target.value);
    setUserIdError("");
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setPasswordError("");
  }
  //엔터키로 실행
  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      letLogin();
    }
  };

  function letLogin() {
    let isValid = true;

    if (userId.trim() === "") {
      setUserIdError("아이디를 입력해주세요");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("비밀번호를 입력해주세요.");
      isValid = false;
    }

    if (isValid) {
      axios
        .post("http://localhost:8080/api/users/login", { userId, password })
        .then((res) => {
          if (res && res.data) {
            if (res.data.error === null || res.data.data !== null) {
              // 로그인이 성공한 경우
              login();
              window.location.reload();
              alert("로그인 되었습니다.");
            } else {
              // 로그인이 실패한 경우
              console.log(res.data.error.errorId);
              alert("입력한 정보가 올바르지 않습니다.");
            }
          } else {
            // 응답이나 데이터가 정의되지 않은 경우 처리
            console.log(res.data.error.message);
            alert("로그인 중 오류가 발생했습니다.1");
          }          
        })
        .catch((err) => {
          // 에러가 발생한 경우 처리
          if (err.response && err.response.data) {
            console.log(err.response.data.message);
            alert("로그인 중 오류가 발생했습니다.2");
          } else {
            console.log(err);
            alert("로그인 중 오류가 발생했습니다.3");
          }
        });
    }
    
    
  }

  function letRegister () {
    setEditPostOpen(true);
  };

  return (
    <div className="modelbox">
      <div className="modelContent login">
        <button className="closeModel" onClick={handleClose}>
          X
        </button>
        <div className="contents_login">
          <div className="title">로그인</div>
          <div className="contents">
            <p></p>
            <div className="form-row inputId">
              <div className="form-item">
                <div className="form-input input_Id">
                  <input className="input_Id" type="text" id="userId" name="userId" placeholder="아이디" onChange={handleUserIdChange} onKeyDown={handleOnKeyPress}/>
                  <div className="errorTxt">{userIdError && <p className="error">{userIdError}</p>}</div>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <div className="form-input">
                  <input className="input_Pw" type="password" id="password" name="password" placeholder="비밀번호" onChange={handlePasswordChange} onKeyDown={handleOnKeyPress}  />
                  <div className="errorTxt">{passwordError && <p className="error">{passwordError}</p>}</div>
                </div>
              </div>
            </div>
            <div className="form-row">
              <input className="btn_Login" type="button" onClick={letLogin} id="loginBtn" value="로그인"/>
              <input className="btn_Register" type="button" onClick={letRegister} id="registerBtn" value="회원가입"/>
            </div>
            {isEditPostOpen && (
                <Register setEditPostOpen={setEditPostOpen} />
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;