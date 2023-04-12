import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import Header from './Header';




const Editor = (props) =>{
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categoryInputValue, setCategoryInputValue] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCategoryInputChange = (event) =>{
    setCategoryInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the title, content, and category
    // For example, you can pass them to a function passed as a prop
    props.onSubmit(title, content, category);
    // Clear the inputs
    setTitle("");
    setContent("");
    setCategory("");
    // Close the modal
    props.onClose();
  };
  return(
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">모집제목</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
          <label htmlFor="content">모집내용</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
          />
          <div>
        <label htmlFor="category">Category:</label>
        {categoryInputValue ? (
          <input
            id="category"
            type="text"
            value={categoryInputValue}
            onChange={handleCategoryInputChange}
          />
        ) : (
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            <option value="news">News</option>
            <option value="sports">Sports</option>
            <option value="politics">Politics</option>
          </select>
        )}
      </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )

}

export default Editor
