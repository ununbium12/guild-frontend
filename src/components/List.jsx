import React, { useState, useEffect, useContext } from "react";
import Item from "./Item";
import NewPost from "../pages/modals/NewPost";
import MyButton from "./MyButton";
import Axios from '../AxiosController';
import '../App.css';
import { AuthContext } from "../context/AuthContext";

const sortOptionList = [
  {value : "latest", name : "최신 순"},
  {value : "oldest", name : "오래된 순"},
]

const List = () => {
  const [isOpen, setOpen] = useState(false);
  const [sortType, setSortType] = useState('latest');
  const [list, setList] = useState(null);
  const { isResdata } = useContext(AuthContext);

  const onClick = () => {
    if(isResdata === null) {
      setOpen(true);
    } else {
      alert("로그인 후 이용가능하십니다.");
    }
  };

  useEffect(() => {
    if (sortType === 'latest') {
      Axios.get(`http://localhost:8080/api/boards/list?page=0&size=10`)
        .then(res => {
          setList(res.data);
        })
        .catch(err => {
          alert("에러가 발생했습니다.");
          console.log(err);
        });
    } else {
      Axios.get(`http://localhost:8080/api/boards/list/ASC?page=0&size=10`)
        .then(res => {
          setList(res.data);
        })
        .catch(err => {
          alert("에러가 발생했습니다.");
          console.log(err);
        });
    }
  }, [sortType]);

  const controlMenuOnChange = (e) => {
    setSortType(e.target.value);
  }

  if (list == null) {
    return (
      <div>로딩 중...</div>
    );
  } else {
    return (
      <div className="GuildList">
        <div className="listCotents">
          {list.map((it) => (<Item key={it.board.boardId} {...it}/>))}
        </div>
        <div className="menu_wrapper">
          <div className="left_col">
            <select
              className="ControlMenu"
              value={sortType}
              onChange={controlMenuOnChange}
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
              type={'positive'}
              text={'새 개시물 쓰기'}
              onClick={onClick}
            />
            {isOpen && (<NewPost setOpen={setOpen} />)}
          </div>
        </div>
      </div>
    );
  }
};

export default List;
