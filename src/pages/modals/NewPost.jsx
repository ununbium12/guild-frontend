import React from "react";
import '../../App.css';

function NewPost ({setOpen}) {
  
  // 모달 끄기
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="modelbox">
      <div className="modelContent">
        <button className="closeModel" onClick={handleClose}>
          X
        </button>
        <div className="contents">
          <p>현재 모달 창이 열렸습니다.</p>
        </div>
      </div>
    </div>
  );
}

export default NewPost;