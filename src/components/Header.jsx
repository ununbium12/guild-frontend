import MyButton from "./MyButton"
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import '../App.css';
import Login from "../pages/modals/Login";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMyPage, setIsMyPage] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

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

  const buttonText = isMyPage ? 'Home' : 'My Page';

  return(
    <header>
      <div className="header_main">
        <div className="logo">
            <img src="../../assets/logo.png"/>
          to<b>GET</b>her <b>US</b>
        </div>
        <div className="right_col">
          <MyButton
          type={'positiv'}
          onClick={handleLoginClick}
          text={'Login'}
          />
          {isModalOpen && (<Login setModalOpen={setModalOpen} />)}
          <MyButton
            type={'positiv'}
            text={buttonText}
            onClick={handleClick}
            disabled={isMyPage}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;