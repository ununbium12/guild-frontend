import Axios from "axios";

const Home = () => {

  Axios.defaults.withCredentials = true; //axios 사용 컴포넌트 마다 한번씩 붙여넣을 것

  return(
    <div>
      <h1>더 그레이트 마제스티 글로리 오브 더 탑 팀장 정우성</h1>
    </div>
  );
};

export default Home;