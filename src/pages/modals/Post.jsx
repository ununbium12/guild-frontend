import React, { useState } from "react";
import '../../App.css';
import EditPost from "./EditPost";
import MyButton from "../../components/MyButton";

function Post(props) {
  const [isEditPostOpen, setEditPostOpen] = useState(false);

  const handleClose = () => {
    props.setPostOpen(false);
  };

  const onEditPostClick = () => {
    setEditPostOpen(true);
  };

  const board = props.board;

  let urId = localStorage.getItem('userId');

  return (
    <div className="modelbox">
      <div className="modelContent">
        <button className="closeModel" onClick={handleClose}>
          X
        </button>
        <div className="contents">
          <p>현재 post 모달 창이 열렸습니다.</p>
        </div>
        <div className="btn_wrapper">
          <MyButton onClick={onEditPostClick} text={"수정하기"} />
        </div>
      </div>
      {isEditPostOpen && (
        <EditPost setEditPostOpen={setEditPostOpen} board={board} />
      )}
    </div>
  );
}

export default Post;