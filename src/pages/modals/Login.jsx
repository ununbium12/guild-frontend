import React from "react";

function Login(props) {

  const handleClose = () => {
    props.setModalOpen(false);
  };

  return (
    <div className="modelbox">
      <div className="modelContent">
        <button className="closeModel" onClick={handleClose}>
          X
        </button>
        <div className="contents">
          <p>현재 Login 모달 창이 열렸습니다.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;