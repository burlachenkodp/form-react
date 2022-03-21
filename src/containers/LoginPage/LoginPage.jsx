import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

export const LoginPage = ({ setIsLoggedIn, setUserName }) => {
  let navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogIn = (e) => {
    e.preventDefault();

    localStorage.setItem("isLoggedIn", true)
    localStorage.setItem("userName", login)


    setUserName(login);
    setIsLoggedIn(true);
    navigate("/");
  };

  return (
    <form action="" className="loginForm" onSubmit={handleLogIn}>
      <h2>Login Form</h2>
      <div>
        <input
          type="text"
          placeholder="ИМЯ"
          className="loginFormInput"
          onChange={handleLoginChange}
          required
        ></input>
      </div>
      <div>
        <input
          type="password"
          placeholder="пароль"
          className="loginFormInput"
          onChange={handlePasswordChange}
          required
        ></input>
      </div>
      <div>
        <button type="submit" className="blackBtn">
          ЛОГИН
        </button>
      </div>
    </form>
  );
};
