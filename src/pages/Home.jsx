import React from "react";
import Axios from "axios";
import List from "../components/List";

const Home = () => {

  Axios.defaults.withCredentials = true; //axios 사용 컴포넌트 마다 한번씩 붙여넣을 것

  return(
    <div className="HomeMain">
      <List />
    </div>
  );
};

export default Home;