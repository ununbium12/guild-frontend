import React, { useEffect } from 'react';
import axios from '../AxiosController';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/users/logout')
      .then((res) => {
        alert('로그아웃했습니다.');
        navigate('/');
      })
      .catch((err) => {
        alert('에러가 발생했습니다.');
        console.log(err.response.data.message);
      });
  }, [navigate]);

  return null; // 렌더링할 내용이 없기 때문에 null을 반환합니다.
};

export default Logout;
