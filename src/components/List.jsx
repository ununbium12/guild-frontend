import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Item from "./Item";
import MyButton from "./MyButton";
import Axios from 'axios';

const sortOptionList = [
  {value : "latest", name : "최신 순"},
  {value : "oldest", name : "오래된 순"},
]

const List = () => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('latest');
  const [List, setList] = useState([]);

  useEffect(() => {
    if (sortType === 'latest') {
      Axios.get(`http://localhost:8080/api/boards/list?page=0&size=10`)
        .then(res => {
          setList(res.data.content);
        })
        .catch(err => {
          alert("에라가 발생했습니다.");
          console.log(err);
        });
    } else {
      Axios.get(`http://localhost:8080/api/boards/list/ASC?page=0&size=10`)
        .then(res => {
          setList(res.data.content);
        })
        .catch(err => {
          alert("에라가 발생했습니다.");
          console.log(err);
        });
    }
  }, [sortType]);

  const controlmenuOnChange = (e) => {
    setSortType(e.target.value);
    if (e.target.value === 'latest') {
      Axios.get(`http://localhost:8080/api/boards/list?page=0&size=10`)
        .then(res => {
          setList(res.data.content);
        })
        .catch(err => {
          alert("에라가 발생했습니다.");
          console.log(err);
        });
    } else {
      Axios.get(`http://localhost:8080/api/boards/list/ASC?page=0&size=10`)
        .then(res => {
          setList(res.data.content);
        })
        .catch(err => {
          alert("에라가 발생했습니다.");
          console.log(err);
        });
    }
  }

  if (List == null) {
    return (
      <div>로딩</div>
    );
  } else {
  return (
    <div className="BlogList">
      <div className="menu_wrapper">
        <div className="left_col">
          <select
            className="ControlMenu"
            value={sortType}
            onChange={controlmenuOnChange}
          >
            {sortOptionList.map((it, idx) => (
              <option key={idx} value={it.value}>
                {it.name}
              </option>
            ))}
          </select>
        </div>
        <div className="right_col">
          <MyButton 
            type = {'positive'}
            text={'새 개시물 쓰기'}
            onClick={() => navigate('/NewPost')}
          />
        </div>
      </div>
      {List.map((it) => (<Item key={it.idx} {...it} />))}
    </div>
  ); }
};

export default List;