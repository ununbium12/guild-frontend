import React from "react";
import Axios from '../AxiosController';
import List from "../components/List";

const Home = () => {

  Axios.defaults.withCredentials = true; //axios 사용 컴포넌트 마다 한번씩 붙여넣을 것

  return(
    <div className="HomeMain">
      <div className="HomeContainer">
        <List />
      </div>
        <div className="RankingContainer">
          <div className="real-time-ranking">
            <h2>실시간 인기 태그</h2>
            <ol>
              <li>게임</li>
              <li>여가</li>
              <li>서울</li>
              <li>문화</li>
              <li>생활</li>
            </ol>
          </div>
        </div>
    </div>
  );
};

export default Home;