import "../../App.css";
import Editor from "../../components/Editor";

function EditPost(props) {

  // 모달 끄기
  const handleClose = () => {
    props.setEditPostOpen(false);
  };

  const idx = props.board;
  const isEdit = props.isEdit;

  return (
    <div className="modelbox">
      <div className="modelContent">
        <button className="closeModel" onClick={handleClose}>
          X
        </button>
        <div className="contents">
          <Editor idx={idx} isEdit={isEdit} />
        </div>
      </div>
    </div>
  );
}

export default EditPost;
