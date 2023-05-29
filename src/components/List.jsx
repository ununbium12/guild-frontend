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

const tagOrNameList = [
  {value : "name", name : "제목 혹은 내용"},
  {value : "tag", name : "태그"}
]

const List = () => {
  const [isOpen, setOpen] = useState(false);
  const [sortType, setSortType] = useState('latest');
  const [tonType, setTonType] = useState('name');
  const [list, setList] = useState(null);
  const { isResdata } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  
  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
  }
  
  const onSearch = (e) => {
    e.preventDefault();
    if (search === null || search === '') {
      if (sortType !== 'latest') {
        Axios.get(`http://localhost:8080/api/boards/list?page=0&size=10`)
        .then(res => {
          setList(res.data);
        })
        .catch(err => {
          alert("An error has occurred");
          console.log(err);
        });
      } else {
        Axios.get(`http://localhost:8080/api/boards/list/ASC?page=0&size=10`)
        .then(res => {
          setList(res.data);
        })
        .catch(err => {
          alert("An error has occurred");
          console.log(err);
        });
      }
    } else {
      if (tonType === 'name') {
        Axios.get(`http://localhost:8080/api/boards/search/${search}`)
        .then(res => {
          setList(res.data);
        })
        .catch(err => {
          alert("An error has occurred");
          console.log(err);
        })
      } else if (tonType === 'tag') {
        Axios.get(`http://localhost:8080/api/boards/searchByTagId/${search}`) // 현재 태그 검색이 태그아이디로 검색이 되는 문제가 있음
        .then(res => {
          setList(res.data);
        })
        .catch(err => {
          alert("An error has occurred");
          console.log(err);
        })
      }
    }
  }

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

  const controlOnchange = (e) => {
    setTonType(e.target.value);
  }

  return (
    <div className="GuildList">
      <div className="listCotents">
        <form onSubmit={e => onSearch(e)}>
          <div className="left_col">
            <select
              className="ControlMenu"
              value={tonType}
              onChange={controlOnchange}
            >
              {tagOrNameList.map((it, idx) => (
                <option key={idx} value={it.value}>
                  {it.name}
                </option>
              ))}
            </select>
          </div>
          <input type="text" value={search} placeholder="파티 검색하기" onChange={onChangeSearch} />
          <button type="submit">검색</button>
        </form>
        { list === null ?
          <div>
            로딩 중...
          </div> :
          <div>
            {list.map((it) => (<Item key={it.board.boardId} {...it}/>))}
          </div>
        }
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
};

export default List;
