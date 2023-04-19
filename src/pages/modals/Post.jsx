import React, { useEffect, useState } from "react";
import '../../App.css';
import EditPost from "./EditPost";
import MyButton from "../../components/MyButton";
import Axios from "axios";
import { useParams } from "react-router-dom";

function Post(props) {
  const [isEditPostOpen, setEditPostOpen] = useState(false);
  const [data, setData] = useState(null);

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
      setData(res.data);
    })
    .catch(err => {
      alert("에라가 발생했습니다.");
      console.log(err);
    });
  },[]);

  let urId = localStorage.getItem('userId');

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
          <div className="title"><h3>{data.board.title}</h3> 조회수 : {data.board.views}</div>
          <p className="tags">{data.tags.map((tag)=><span key={tag.tagId}>| {tag.tagName} |</span>)}</p>
          <p className="content">{data.board.content}</p>
          <p>파티 아이디 : {data.party.partyId}</p>
          <p>{data.party.current} / {data.party.total}</p>
        </div>
        { urId === data.board.userId &&
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