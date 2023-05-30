import React, { useContext } from "react";
import "../../App.css";
import { AuthContext } from "../context/AuthContext";

function EditPost(props) {
  const { isResdata } = useContext(AuthContext);

  // 모달 끄기
  const handleClose = () => {
    props.setEditPostOpen(false);
  };

  return (
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
}

export default EditPost;
