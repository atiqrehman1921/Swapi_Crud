import React, { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    
    const checkActive = () => {
      const active = sessionStorage.getItem("Active") === "1";
      setIsActive(active);
    };

    checkActive();

    const intervalId = setInterval(checkActive, 1000);

    return () => clearInterval(intervalId);
  }, []);
  

  const handleLogout = () => {
    sessionStorage.removeItem("Active");
    setIsActive(false);
    navigate("/");
  };

  return (
    <header className="header flex justify-between items-center px-6 py-4">
      <NavLink to="/" className="logo flex items-center text-white font-bold text-xl">
      <BsStarFill className="logo-icon" />
      <span className="ml-[20px]">Shining Star</span>
      </NavLink>


      <nav className="nav-buttons flex gap-3">
        {isActive ? (
          <button
            onClick={handleLogout}
            className="btn btn-outline-light bg-white text-primary"
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-outline-light bg-white text-primary"
                  : "btn btn-outline-light"
              }
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-outline-light bg-white text-primary"
                  : "btn btn-outline-light"
              }
            >
              Login
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
