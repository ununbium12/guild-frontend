import Axios from "axios";

const MyPage = () => {

  Axios.defaults.withCredentials = true; //axios 사용 컴포넌트 마다 한번씩 붙여넣을 것

  return(
    <div>
      <h1>마이 페이지 입니다.</h1>
    </div>
  );
};

export default MyPage;