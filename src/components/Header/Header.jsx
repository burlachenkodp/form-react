import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import LogoutIcon from "@mui/icons-material/Logout";

export const Header = ({ isLoggedIn, setIsLoggedIn, userName }) => {
  const handleLogOut = () => {
    localStorage.setItem("isLoggedIn", false)

    setIsLoggedIn(false);
  };

  return (
    <header>
      {isLoggedIn ? (
        <nav>
          <h1>Добро пожаловать, {userName}</h1>
          <NavLink to="/login" className="usual-link" onClick={handleLogOut}>
            <LogoutIcon />
            Выход
          </NavLink>
        </nav>
      ) : (
        "Добро пожаловать, незнакомец!"
      )}
    </header>
  );
};
