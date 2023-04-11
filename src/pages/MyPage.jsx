import Axios from "axios";
import profile from "../images/pf.png"

const MyPage = () => {

  Axios.defaults.withCredentials = true; //axios 사용 컴포넌트 마다 한번씩 붙여넣을 것

  return(
    <div className="pages container clearfix">
      <h1>마이 페이지 입니다.</h1>
      <img src={profile} className="profileCon"/>
      <h3 className="profileName">000님 안녕하세요</h3>
      <div className="profileBtn">
        <button className="passwordChange">비밀번호 변경</button><br/>
        <button className="registerOut">회원탈퇴</button>
      </div>
    </div>
  );
};

export default MyPage;