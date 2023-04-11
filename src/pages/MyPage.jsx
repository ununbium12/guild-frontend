import Axios from "axios";

const MyPage = () => {

  Axios.defaults.withCredentials = true; //axios 사용 컴포넌트 마다 한번씩 붙여넣을 것

  return(
    <div className="pages container clearfix">
      <h1>마이 페이지 입니다.</h1>
      <img
        className="profileCon"
        src={process.env.PUBLIC_URL + `assets/pf.png`} 
        alt="프로필 사진"
      />
      <h3 className="profileName">000님 안녕하세요</h3>
      <div className="profileBtn">
        <button className="passwordChange">비밀번호 변경</button><br/>
        <button className="registerOut">회원탈퇴</button>
      </div>
    </div>
  );
};

export default MyPage;