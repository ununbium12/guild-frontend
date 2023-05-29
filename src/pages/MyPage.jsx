import '../App.css';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MyPage = () => {

  const { isResdata } = useContext(AuthContext);

  return(
    <div className="pages container clearfix">
      <h1>마이 페이지 입니다.</h1>
      <img
        className="profileCon"
        src={process.env.PUBLIC_URL + `assets/pf.png`} 
        alt="프로필 사진"
      />
      { isResdata !== null ?
        <h3> </h3> : <h3 className="profileName">{"더미데이터"}님 안녕하세요</h3>
      }
      <div className="profileBtn">
        { isResdata !== null ?
          <div></div> : <button className="passwordChange">비밀번호 변경</button>
        }
        <br />
        { isResdata !== null ?
          <div></div> : <button className="registerOut">회원탈퇴</button>
        }
      </div>      
    </div>
  );
};

export default MyPage;