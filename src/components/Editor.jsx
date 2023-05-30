import Axios from 'axios';
import { useState, useEffect } from 'react';
import '../App.css';

const Editor = ({ isEdit }) =>{
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

  useEffect(() => {
    Axios.post()
  })

  return(
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={""}>
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
          <button type="submit">작성완료</button>
        </form>
      </div>
    </div>
  )

}

export default Editor
