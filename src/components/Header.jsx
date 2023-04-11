import MyButton from "./MyButton"
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

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
        </div>
      </div>
    </header>
  );
};

export default Header;