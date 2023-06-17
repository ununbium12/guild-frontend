import Axios from '../AxiosController';
import { useState, useEffect, useContext, useRef } from 'react';
import '../App.css';
import { AuthContext } from "../context/AuthContext";
import MyButton from './MyButton';

const Editor = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [partyTotal, setPartyTotal] = useState("");
  const [tagName, setTagName] = useState("");
  const [tagList, setTagList] = useState([]);
  const [tagId, setTagId] = useState([]);
  const { isResdata } = useContext(AuthContext);
  const contentRef = useRef();
  const titleRef = useRef();
  const tagNameRef = useRef();
  const partyTotalRef = useRef();


  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (props.idx !== undefined) {
      Axios.get(`http://localhost:8080/api/boards/${props.idx}`, config)
        .then(res => {
          setTitle(res.data.data.board.title);
          setContent(res.data.data.board.content);
          setPartyTotal(res.data.data.party.total);
          console.log(res.data.data.tags);
          setTagList(res.data.data.tags.map(tag => tag.tagName));
          setTagId(res.data.data.tags.map(tag => tag.tagId));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const handleSubmit = () => {
    if (content.length < 1 && title.length < 1 && tagName.length < 1 && partyTotal < 1) {
      titleRef.current.focus();
      contentRef.current.focus();
      partyTotalRef.current.focus();
      tagNameRef.current.focus();
      return;
    }
    if (window.confirm(props.isEdit ? "게시글을 수정하시겠습니까?" : "새 게시물을 업로드 하시겠습니까?")) {
      if (!props.isEdit) {
        // 새 게시물 작성
        const data = {
          userId: isResdata,
          title: title,
          content: content,
          total: parseInt(partyTotal),
          tagName: tagList,
        }
        Axios.post("http://localhost:8080/api/boards/write",
          JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
          },
        })
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
        const data = {
          boardId: props.idx,
          userId: isResdata,
          title: title,
          content: content,
          total: parseInt(partyTotal),
          tagId: tagId,
          tagName: tagList,
        };        
        Axios.put("http://localhost:8080/api/boards/update", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(res => {
          alert("게시물이 수정되었습니다.");
          window.location.reload();
        })
        .catch(err => {
          alert("게시물 수정 중 문제가 발생했습니다.");
          console.log(err.response.data.message);
          window.location.reload();
        });
      }
    }
  }
  console.log(props.idx + isResdata + "데이터 확인 부분")
  const handleRemove = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
        const data = {
          boardId: props.idx,
          userId: isResdata,
        }
      Axios.post(`http://localhost:8080/api/boards/delete`,
        JSON.stringify(data),{
          headers:{
            "Content-Type": "application/json",
          },
        })
        .then((res) =>{
          alert("DB에서 삭제가 완료되었습니다");
        }).catch((err) =>{
          console.log(err.response.data.message);
        })
    }
  }

  const handleTagNameChange = (e) => {
    setTagName(e.target.value);
  };

  const addTag = () => {
    const newTag = tagName.trim();
    if (newTag) {
      setTagList((prevTagList) => [...prevTagList, newTag]);
      setTagId((prevTagId) => [...prevTagId, -1]); // -1은 아직 ID가 없는 새로운 태그를 나타냅니다
      setTagName('');
    }
  };  

  const deleteTag = (deletedTag) => {
    setTagList((prevTagList) =>
      prevTagList.filter((tag) => tag !== deletedTag)
    );
    setTagId((prevTagId) =>
      prevTagId.filter((_, index) => index !== deletedTag)
    );
  };   

  return (
    <div className="modal">
      <div className="modal-content">
        <div className='postContent'>
          {
            !props.isEdit ?
              <h2 className="title">새 게시글 쓰기</h2> :
              <h2 className="title">게시글 수정하기</h2>
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
            <input
              id='tags'
              type="text"
              className='tags_input'
              placeholder='태그를 입력해주세요'
              ref={tagNameRef}
              value={tagName}
              onChange={handleTagNameChange}
            />
            <button onClick={addTag}>추가</button>
            <div className='addtag'>
              <ul>
                  {tagList.map((tag, index) => (
                    <li key={index}>
                      {tag} <button onClick={() => deleteTag(tag)}>X</button>
                    </li>
                  ))}
                </ul>
            </div>
          </div>
        </div>
        <div className='postBtn'>
          <div className='control_box'>
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
          <div className='remove_box'>
            {
              !props.isEdit ?
                <div></div> :
                <MyButton
                  text={'삭제하기'}
                  type={'negative'}
                  onClick={handleRemove} // 삭제하기 API 걸어야하는 부분
                />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor;
