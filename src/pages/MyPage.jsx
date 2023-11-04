import '../App.css';
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import UserList from '../components/UserList';

const MyPage = () => {

  const { isResdata } = useContext(AuthContext);
  const navigate = useNavigate();

  //로그인안된 상태면 들어올수 없음
  useEffect(() => {
    if(isResdata === ""){
      navigate('/');
    }
  },[isResdata, navigate])

  return(
    <div>
      <div className="pages container clearfix">
        <div className='mypageProfile'>
          <img
            className="profileCon"
            src={process.env.PUBLIC_URL + `assets/pf.png`} 
            alt="프로필 사진"
          />
          { isResdata === "" ?
            <h3> </h3> : <h3 className="profileName">{"더미데이터"}님 안녕하세요</h3>
          }
          {/*
            <div className="profileBtn">
            { isResdata === "" ?
              <div></div> : <button className="passwordChange">비밀번호 변경</button>
            }
            <br />
            { isResdata === "" ?
              <div></div> : <button className="registerOut" onClick={userOut}>회원탈퇴</button>
            }
          </div>  
          */}
            
        </div>
        <div className='myPageBoard'>
            <UserList/>
          </div>
      </div>
    </div>
  );
};

export default MyPage;