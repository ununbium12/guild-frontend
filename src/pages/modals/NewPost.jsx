import "../../App.css";
import Axios from '../../AxiosController';
import Editor from "../../components/Editor";

function NewPost(props) {

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div className="modelbox" onClick={handleClose}>
      <div className="modelContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeModel" onClick={handleClose}>
          X
        </button>
        <div className="contents">
          <Editor setOpen={props} />
        </div>
      </div>
    </div>
  );
}

export default NewPost;
