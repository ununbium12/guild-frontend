import React from "react";
import '../../App.css';

function EditPost (props) {

 // 모달 끄기
  const handleClose = () => {
    props.setPostOpen(true);
  };

  return(
    <div className="modelbox">
      <div className="modelContent">
        <button className="closeModel" onClick={handleClose}>
          X
        </button>
        <div className="contents">
          <p>현재 Eidtpost 모달 창이 열렸습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default EditPost;