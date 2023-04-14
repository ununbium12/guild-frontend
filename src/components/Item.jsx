import React, { useState } from "react";
import MyButton from "./MyButton";
import Post from "../pages/modals/Post";
import '../App.css';
import EditPost from "../pages/modals/EditPost";

function Item (props) {

  const [isPostOpen, setPostOpen] = useState(false);
  const [isEditPostOpen, setEditPostOpen] = useState(false);

  const onPostClick = () => {
    setPostOpen(true);
  };

  const onEditPostClick = () => {
    setEditPostOpen(true);
  };

  const board = props.board;

  const tags = props.tags;
  const tagNames = tags.map(tag => tag.tagName).join(', ');
  console.log(tagNames);
  
  let urId = localStorage.getItem('userId');

  const strDate = new Date(parseInt(board.writeDate)).toLocaleDateString();

  return (
    <div className="contents">
      <div className="Item">
        <div onClick={onPostClick} className="info_wrapper">
          <div className="post_date">{strDate}</div>
          <div className="post_title">{board.title}</div>
          <div className="post_content_preview">{board.content.slice(0, 25)}</div>
          <div className="post_tegs">{tagNames}</div>
        </div>
        {isPostOpen && (<Post setPostOpen={setPostOpen} />)}
        <div className="btn_wrapper">
          {urId === board.userId ?
            <MyButton
              onClick={onEditPostClick}
              text={"수정하기"}
            /> : ""}
        </div>
        {isEditPostOpen && (<EditPost setEditPostOpen={setEditPostOpen} />)}
      </div>
    </div>
  );
};

export default Item;