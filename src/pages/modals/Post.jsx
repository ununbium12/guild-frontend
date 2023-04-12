import React from "react";
import '../../App.css';

function Post ({idx, setItemOpen}) {
  
  // 모달 끄기
  const handleClose = () => {
    setItemOpen(false);
  };

  return(
    <div className="modelbox">
      <div className="modelContent">
        <button className="closeModel" onClick={handleClose}>
          X
        </button>
        <div className="contents">
          <p>현재  모달 창이 열렸습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default Post;