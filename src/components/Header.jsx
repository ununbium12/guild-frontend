import MyButton from "./MyButton"
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import '../App.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMyPage, setIsMyPage] = useState(false);

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

  const buttonText = isMyPage ? 'Home' : 'My Page';

  return(
    <header>
      <div className="header_main">
        <div className="right_col">
          <MyButton
            type={'positiv'}
            text={buttonText}
            onClick={handleClick}
            disabled={isMyPage}
          />
          <div className="headerImg">
            <img
              src={process.env.PUBLIC_URL + `assets/headerImage.jpg`} 
              alt="헤더사진"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;