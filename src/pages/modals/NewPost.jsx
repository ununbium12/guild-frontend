import React, {useState} from "react";
import '../../App.css';
import axios from "axios";
import Editor from "../../components/Editor";

function NewPost ({setOpen}) {
  
  // 모달 끄기
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="modelbox" onClick={handleClose}>
      <div className="modelContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeModel" onClick={handleClose}>
          X
        </button>
        <div className="contents">
          <Editor/>
        </div>
      </div>
    </div>
  );
}

export default NewPost;