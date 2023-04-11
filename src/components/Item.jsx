import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import '../App.css';

const Item = ({ idx, content, writeDate, title, userId, setOpenList}) => {

  // 모달 끄기
  const handleClose = () => {
    setOpenList(false);
  };
  
  let urId = localStorage.getItem('userId');

  const navigate = useNavigate();

  const strDate = new Date(parseInt(writeDate)).toLocaleDateString();

  const goDeatail = () => {
    navigate(`/post/${idx}`);
  };

  const goEdit = () => {
    navigate(`/edit/${idx}`);
  };

    return (
      <div className="modelbox">
        <div className="modelContent">
          <button className="closeModel" onClick={handleClose}>
            X
          </button>
          <div className="contents">
            <div className="Item">
              <div onClick={goDeatail} className="info_wrapper">
                <div className="blog_date">{strDate}</div>
                <div className="blog_title">{title}</div>
                <div className="blog_content_preview">{content.slice(0, 25)}</div>
              </div>
              <div className="btn_wrapper">
                {urId === userId ?
                  <MyButton
                    onClick={goEdit}
                    text={"수정하기"}
                  /> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Item;