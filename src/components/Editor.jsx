import Axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react';
import '../App.css';
import { AuthContext } from "../context/AuthContext";
import MyButton from './MyButton';

const Editor = ( props , { isEdit, modalClose }) =>{
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [partyTotal, setPartyTotal] = useState("");
  const [tagName, setTagName] = useState("");
  const [category, setCategory] = useState("");
  const { isResdata } = useContext(AuthContext);
  const contentRef = useRef();
  const titleRef = useRef();
  const tagNameRef = useRef();
  const partyTotalRef = useRef();


  useEffect(() => {
    const config = {
      headers:{
        "Content-Type": "application/json",
      },
    };

    if(props.idx !== undefined) { 
    Axios.get(`http://localhost:8080/api/boards/${props.idx}`, config)
      .then(res => {
        setTitle(res.data.board.title, ...title);
        setContent(res.data.board.content, ...content);
        setPartyTotal(res.data.party, ...partyTotal);
        setTagName(res.data.tags.tagName, ...tagName);
      })
      .catch(err => {
        console.log(err);
      });
    }
  },[]);

  const handleSubmit = () => {
    if(content.length < 1 && title.length < 1 && tagName.length < 1 && partyTotal < 1) {
      titleRef.current.focus();
      contentRef.current.focus();
      partyTotal.current.focus();
      tagNameRef.current.focus();
      return;
    }
    if(window.confirm(isEdit? "게시글을 수정하시겠습니까?" : "새 게시물을 업로드 하시겠습니까?")) {     
      if(!isEdit) {
        // 새 게시물 작성
        Axios.post("http://localhost:8080/api/boards/write")
        .then(res => {
          alert("게시물이 업로드 되었습니다.");
          window.location.reload()
          
        })
        .catch(err => {
          alert("업로드 하는데 문제가 생겼습니다.");
          console.log(err.response.data.message);
          window.location.reload()
        })
      } else {
        // 기존 게시글 수정

      }
    }
  }

  return(
    <div className="modal">
      <div className="modal-content">
        <section>
          {
            !isEdit ? 
            <h2 htmlFor="title">새 게시글 쓰기</h2> :
            <h2 htmlFor="title">게시글 수정하기</h2>
          }
          <div className='title_div'>
            <input 
              id='title'
              type="text"
              className='title_input'
              placeholder='제목을 입력해주세요.'
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='content_div'>
            <textarea
              id='content'
              className='constent_area'
              placeholder='내용을 입력해주세요'
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className='partyTotal_div'>
            <input
              id='partyTotal'
              type="number"
              className='partyTotal_input'
              placeholder='숫자만 입력해주세요'
              ref={partyTotalRef}
              value={partyTotal}
              onChange={(e) => setPartyTotal(e.target.value)}
              min={1}
            />
          </div>
          <div className='tags_div'>
            <label htmlFor="category">태그 :</label>
            <input
              id='tags' 
              type="text"
              className='tags_input'
              placeholder='태그를 입력해주세요'
              ref={tagNameRef}
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              disabled={category !== "직접선택하기"}
            />
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">태그 선택하기</option>
              <option value="문화">문화</option>
              <option value="게임">게임</option>
              <option value="영화">영화</option>
              <option value="여가">여가</option>
              <option value="생활">생활</option>
              <option value="직접선택하기">직접 선택하기</option>
            </select>
          </div>
        </section>
        <section>
          <div className='control_box'>
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
          <div className='remove_box'>
            {
              !isEdit ?
              <div></div> :
              <MyButton
              text={'삭제하기'}
              type={'negative'}
              onClick={""} // 삭제하기 API 걸어야하는 부분
            />
            }
          </div>
        </section>
      </div>
    </div>
  )

}

export default Editor
