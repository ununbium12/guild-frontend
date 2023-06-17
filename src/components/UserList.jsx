import React, { useState, useEffect, useContext } from "react";
import Item from "./Item";
import NewPost from "../pages/modals/NewPost";
import Axios from '../AxiosController';
import '../App.css';
import { AuthContext } from "../context/AuthContext";



const UserList = () => {
  const [isOpen, setOpen] = useState(false);
  const [list, setList] = useState(null);
  const { isResdata } = useContext(AuthContext);
  

  
  useEffect(() =>{
    if(isResdata !== "") {
      Axios.get(`http://localhost:8080/api/boards/list/${isResdata}`)
        .then(res =>{
          setList(res.data.data.content);
        })
        .catch(err =>{
          alert("에러 발생")
          console.log(err);
        })
  }else{
    console.log("로그인이 안된 상태의 마이페이지 리스트")
  }
  },[]);


  return (
    <div className="GuildList">
      <div className="listCotents">
        { list === null ?
          <div>
            로딩 중...
          </div> :
          <div>
            {list !== null && list.map((it) => (<Item key={it.board.boardId} {...it}/>))}
          </div>
        }
      </div>
        <div className="menu_wrapper">
          {isOpen && (<NewPost setOpen={setOpen} />)}
        </div>
      
    </div>
  );
};

export default UserList;
