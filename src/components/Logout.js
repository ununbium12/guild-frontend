import axios from '../AxiosController';

const Logout = () =>{

  axios.get("http://localhost:8080/api/users/logout")
  .then(res => {
    alert("로그아웃했습니다.");
  }).catch(err => {
    alert("에러가 발생했습니다.");
    console.log(err.response.data.message);
  });
}

export default Logout;