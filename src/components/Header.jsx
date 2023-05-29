import MyButton from "./MyButton"
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import '../App.css';
import Login from "../pages/modals/Login";
import { AuthContext } from "../context/AuthContext";
import Logout from "./Logout";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMyPage, setIsMyPage] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const { isResdata } = useContext(AuthContext);

  console.log(isResdata);


  useEffect(() => {
    setIsMyPage(location.pathname === '/myPage');
  }, [location]);

  const handleClick = () => {
    if (isMyPage) {
      navigate('/');
    } else {
      navigate('/myPage');
    }
  };

  const handleLoginClick = () => {
    setModalOpen(true);
  }

  const handleLogoutClick = () => {
    Logout();
  }

  const buttonText = isMyPage ? 'Home' : 'My Page';

  return(
    <header>
      <div className="header_main">
        <div className="logo">
            <img src="../../assets/logo.png"/>
          to<b>GET</b>her <b>US</b>
        </div>
        <div className="right_col">
          <div className="login_user">
            {
              isResdata !== ""
              ? <p>[{"더미데이터"}]님, 환영합니다.</p>
              : <div>로그인 해주십시오.</div>
            }
          </div>
          {
            isResdata !== ""
            ?<MyButton
              type={'logout'}
              onClick={handleLogoutClick}
              text={'[로그아웃]'}
              className="loginBtn"
            />
            :<MyButton
              type={'login'}
              onClick={handleLoginClick}
              text={'[로그인]'}
              className="loginBtn"
            />
          }
          {isModalOpen && (<Login setModalOpen={setModalOpen} />)}
          <MyButton
            type={'mypage'}
            text={'[마이페이지]'}
            onClick={handleClick}
            disabled={isMyPage}
            className="mypageBtn"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;