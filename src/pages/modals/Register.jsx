import React, {useState, useContext, useEffect, useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register  = (props) => {
  //입력받은 요소들의 ref 생성
  const userIdRef = useRef('');
  const userNameRef = useRef('');
  const passwordFormRef = useRef('');
  const rePasswordFormRef = useRef('');

  const navigate = useNavigate();
  const { login, isResdata } = useContext(AuthContext);

  const [ isUserId, setUserId ] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const [isUserIdAvailable, setUserIdAvailable] = useState(false); // 아이디 사용 가능 여부 상태 추가


    //로그인된 상태면 들어올수 없음
    useEffect(() => {
      if(isResdata !== ""){
        navigate('/');
      }
    },[isResdata, navigate])

  const [inputs, setInputs] = useState({
    userId: '',
    userName: '',
    password: '',
    rePassword: '',
    regDate: null
  });

  // 모달 끄기
  const handleClose = () => {
    props.setEditPostOpen(false);
  };

  //userId 중복 여부 확인용 userId 호출
  useEffect(() => {
    if (inputs.userId !== "") {
      axios.get(`http://localhost:8080/api/users/isIdDup/${inputs.userId}`)
        .then((res) => {
          setUserId(res.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        })
    }
  }, [inputs.userId]);

  //입력받은 값 받음
  const onChangeValue = (e) => {
    const { name, value } = e.target;
    const nextInputs = { ...inputs, [name]: value };
    setInputs(nextInputs);
    setUserIdError("");
    setUserNameError("");
    setPasswordError("");
    setRePasswordError("");
  }

  //비밀번호 유효성검사
  function CheckPass(str) {
    let reg1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
    return (reg1.test(str));
  }

  //아이디 중복 체크
  const onClick = () => {
    if (isUserId === true) {
      setUserIdAvailable(false);
      setUserIdError("이미 사용중인 아이디입니다.");
      userIdRef.current.focus();
    } else if (inputs.userId === "") {
      setUserIdAvailable(false);
      setUserIdError("아이디를 입력해주세요!!");
    } else {
      setUserIdAvailable(true);
      setUserIdError("사용 가능한 아이디입니다.");
    }
  }


  //회웝가입버튼 누를시 실행
  //아이디, 유저이름, 비밀번호, 비번 중복 등 모두 통과시 userdata 값 저장
  function handleRegistration() {
    if (inputs.userId === "") {
      setUserIdError("아이디를 입력해주세요!");
      userIdRef.current.focus();
      return;
    } else if (isUserId === true) {
      setUserIdAvailable(false);
      setUserIdError("이미 사용중인 아이디입니다.");
    } else if (inputs.userName === "") {
      setUserNameError("유저 이름을 입력해주세요!");
      userNameRef.current.focus();
      return;
    } else if (inputs.password === "") {
      setPasswordError("비밀번호를 입력해주세요!");
      passwordFormRef.current.focus();
      return;
    } else if (inputs.rePassword === "") {
      setRePasswordError("비밀번호 중복 확인을 입력해주세요!");
      rePasswordFormRef.current.focus();
      return;
    } else if (CheckPass(inputs.password) === false) {
      setPasswordError("비밀번호는 영문+숫자 6자를 조합하여 입력해주세요!");
      passwordFormRef.current.focus();
      return;
    } else if (inputs.rePassword !== inputs.password) {
      setRePasswordError("비밀번호가 동일하지 않습니다!");
      rePasswordFormRef.current.focus();
      return;
    } else {
      const userdata = {
        userId: inputs.userId,
        userName: inputs.userName,
        password: inputs.password,
      };
      axios.post("http://localhost:8080/api/users/signup",
        JSON.stringify(userdata), {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          //성공했을시 로그인 화면으로
          alert("성공했습니다");
          LoginPage();
        })
        .catch((err) => {
          //에러발생 로그에 메세지 확인해보세용
          alert("에러가 발생했습니다.");
          console.log(err.response.data.message);
        });
    }
  }

  function LoginPage() {
    props.setEditPostOpen(false);
  }

  return (
    <div className="modelbox">
      <div className="modelContent">
        <button className="closeModel" onClick={handleClose}>
          X
        </button>
        <div className="title">회원가입 페이지</div>
        <div className="contents">
          <p>현재 Register 모달 창이 열렸습니다.</p>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                <input className="input_Id" type="text" id="userId" name="userId" placeholder="아이디" onChange={onChangeValue}ref={userIdRef} />
                <input className="buttonId" type="button" onClick={onClick} id="btnUserId" value="중복체크" />
                {userIdError && <p className="error">{userIdError}</p>}
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                <input className="inputId" type="text" id="userName" name="userName" placeholder="유저이름" onChange={onChangeValue} ref={userNameRef} />
                {userNameError && <p className="error">{userNameError}</p>}
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                <input className="inputId" type="password" id="password" name="password" placeholder="비밀번호" onChange={onChangeValue} ref={passwordFormRef} />
                {passwordError && <p className="error">{passwordError}</p>}
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                <input className="inputId" type="password" id="rePassword" name="rePassword" placeholder="비밀번호 재입력" onChange={onChangeValue} ref={rePasswordFormRef} />
                {rePasswordError && <p className="error">{rePasswordError}</p>}
              </div>
            </div>
          </div>
          
          <div className="form-Row">
          <input className="btn_Login" type="button" onClick={handleRegistration} id="loginBtn" value="회원가입" disabled={!isUserIdAvailable} />
          <input className="btn_getLogin" type="button" onClick={LoginPage} id="getLoginBtn" value="로그인 하러가기"/>
        </div>
        </div>
      </div>
    </div>
  )
};

export default Register;
