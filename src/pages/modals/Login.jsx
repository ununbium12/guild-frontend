import React, { useState } from "react";
import Axios from "axios";

function Login(props) {

  const handleClose = () => {
    props.setModalOpen(false);
  };

  const [isInfo, setInfo] = useState({
    userId : "",
    password : ""
  });

  const onChange = (e) => {
	  const { name, value } = e.target
	  const nextInputs = { ...isInfo,  [name]: value,}
	  setInfo(nextInputs);      
  }

  function letLogin () {
    if(isInfo.userId === "") {
      // 반응형으로 바뀔예정
      alert("아이디를 입력해주세요.");
      return;
    } else if (isInfo.password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    } else {
      const data = {
        'userId' : isInfo.userId,
        'password' : isInfo.password
      };
      Axios.post("./api/uasrs/login",
        JSON.stringify(data),
        {
          headers : {
            "Content-Type" : "application/json",
          },
        }).then((res) => {
          if(res.data == "0" || res.data == "1") {
            alert("로그인에 실패했습니다.");
          } else {
            let userId = isInfo.userId;
            localStorage.setItem("userId", userId);
            props.setModalOpen(false);
          }
        })
    }
  }

  function letRegister () {

  };

  return (
    <div className="modelbox">
      <div className="modelContent">
        <button className="closeModel" onClick={handleClose}>
          X
        </button>
        <div className="title">로그인 창</div>
        <div className="contents">
          <p>현재 Login 모달 창이 열렸습니다.</p>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                <input className="input_Id" type="text" id="userId" name="userId" placeholder="아이디" onChange={onChange} />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                <input className="input_Pw" type="text" id="password" name="password" placeholder="비밀번호" onChange={onChange}  />
              </div>
            </div>
          </div>
          <div className="form-row">
            <input className="btn_Login" type="button" onClick={letLogin} id="loginBtn" value="로그인"/>
            <input className="btn_Register" type="button" onClick={letRegister} id="registerBtn" value="회원가입"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;