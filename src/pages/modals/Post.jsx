import React, { useEffect, useState, useContext } from "react";
import '../../App.css';
import EditPost from "./EditPost";
import MyButton from "../../components/MyButton";
import Axios from '../../AxiosController';
import { AuthContext } from "../../context/AuthContext";

function Post(props) {
  const [isEditPostOpen, setEditPostOpen] = useState(false);
  const [data, setData] = useState([]);
  const { isResdata } = useContext(AuthContext);

  Axios.defaults.withCredentials = true; //axios 사용 컴포넌트 마다 한번씩 붙여넣을 것

  const handleClose = () => {
    props.setPostOpen(false);
  };

  const onEditPostClick = () => {
    setEditPostOpen(true);
  };

  const idx = props.board;

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/boards/${idx}`)
    .then(res => {
      if(res.data == null) {
        alert("생성되지 않은 개시물 입니다.");        
      }
      setData([res.data]);
      console.log(res.data)
    })
    .catch(err => {
      alert("에라가 발생했습니다.");
      console.log(err);
    });
  },[]);

  // 첫 배열이 무조건 [] 공백으로 찍혀서 만약 배열이 빈 공백일 때는 문자열 공백을 넣어서 오류가 안나도록 안나오게 만들었다.
  const boardTitle = data.length > 0 ? data[0].board.title : "";
  const boardContent = data.length > 0 ? data[0].board.content : "";
  const partyTotal = data.length > 0 ? data[0].party.total : "";
  const partyCurrent = data.length > 0 ? data[0].party.current : "";
  const Tags = data.length > 0 ? data[0].tags : [];
  const boardViews = data.length > 0 ? data[0].board.views : "";
  const party = data.length > 0 ? data[0].party.partyId : "";

  
  if(data == null) {
    return <div className="Loding">로딩 중...</div>
  } else {
      return (
        <div className="modelbox">
        <div className="modelContent">
          <button className="closeModel" onClick={handleClose}>
            X
          </button>
          <div className="contents">
            <div className="title">{boardTitle}</div>
            <div className="views">조회수 : {boardViews}</div>
            <div className="user_content">{boardContent}</div>
            <div className="users_total">인원 : {partyCurrent} / {partyTotal}</div>
            <div className="tags">
              {Tags.map((tag, index) => (
              <span key={index} className="tag">#{tag.tagName} </span>
              ))}
            </div>
          </div>
          { isResdata !== null 
            ? <div></div> 
            :
            <div className="btn_wrapper">
              <MyButton onClick={onEditPostClick} text={"수정하기"} />
            </div>
          }
        </div>
        {isEditPostOpen && (
          <EditPost setEditPostOpen={setEditPostOpen} />
        )}
      </div>
      )
  }
}

export default Post;