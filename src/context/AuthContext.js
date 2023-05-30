import axios from "../AxiosController";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ isResdata, setResdata ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = () => {
    axios.get("http://localhost:8080/api/users/isLogin")
      .then(res => {
        setResdata(res.data);
        console.log(res.data + "에러 부분");
        if (res.data === undefined) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const login = (authInfo) => {
    navigate('/');
  };

  const logout = () => {
    navigate('/');
  }

  return(
    <AuthContext.Provider value={{ isResdata, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };