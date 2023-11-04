import React, { useContext, useState } from "react";
import MyButton from "./MyButton";
import Post from "../pages/modals/Post";
import '../App.css';
import EditPost from "../pages/modals/EditPost";
import { AuthContext } from "../context/AuthContext";
import Axios from "../AxiosController"

function Item (props) {

  const [isPostOpen, setPostOpen] = useState(false);
  const [isEditPostOpen, setEditPostOpen] = useState(false);
  const { isResdata } = useContext(AuthContext);

  const onPostClick = () => {
    setPostOpen(true);
  };

  const onEditPostClick = () => {
    setEditPostOpen(true);
  };

  const board = props.board;

  const tags = props.tags;
  const tagNames = tags.map(tag => "#" + tag.tagName).join('  ');

  const strDate = new Date(parseInt(board.writeDate)).toLocaleDateString();

  const JoinParty = () => {
    if(isResdata === null){
      alert("로그인을 해주세요.");
      window.location.reload();
    }else{
      const data = {
        partyId: board.partyId, 
        userId: isResdata, 
      };
  
  
      Axios.post("/api/party/join", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          
          console.log("Successfully joined the party", response.data);
          alert("파티참가 완료되었습니다.");
          window.location.reload();
        })
        .catch((error) => {
  
          console.error("Error joining the party", error);
        });
    }
    
  };

  return (
    <div className="contents">
      <div className="Item">
        <div onClick={onPostClick} className="info_wrapper">
          
          <div className="post_date">{strDate}</div>
          <div className="post_title">{board.title}</div>
          <div className="post_content_preview">{board.content.slice(0, 25)}</div>
          <div className="post_tegs">{tagNames}</div>
          <div className="btn_wrapper">
          {isResdata === board.userId ?
            <MyButton
              type={'editPost'}
              onClick={onEditPostClick}
              text={"수정하기"}
            /> : 
              <MyButton type={'joinParty'}
              onClick={JoinParty} 
              text={"파티참가"}/> }
          </div>
        </div>
        {isPostOpen && (<Post setPostOpen={setPostOpen} board={board.boardId} />)}
        {isEditPostOpen && (<EditPost setEditPostOpen={setEditPostOpen} isEdit={true} board={board.boardId} />)}
      </div>
    </div>
  );
};

export default Item;