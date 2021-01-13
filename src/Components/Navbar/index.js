import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useAuthState, useAuthDispatch, logout } from "../../Context";

import "./navabr.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAuthDispatch();
  const { user } = useAuthState();
  const toggleHandle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleLogout = () => {
    logout(dispatch);
    window.location = "/";
  };
  return (
    <header className="page-header">
      <div className="page-header__top">
        <div className="page-header__brand">Quiz</div>
        <div className="page-header__toggle" onClick={toggleHandle}>
          ☰
        </div>
      </div>
      <nav className="page-header__bottom">
        <div
          id="navigation"
          className={`navigation ${open ? "navigation--visible" : ""}`}
          onClick={() => (open ? setOpen(false) : null)}
        >
          {user && (
            <>
              {user.isAdmin && (
                <NavLink className="navigation__item" to="/questions">
                  Questions
                </NavLink>
              )}
              <NavLink className="navigation__item" to="/answers">
                Answers
              </NavLink>

              <div className="navigation__item" onClick={handleLogout}>
                Logout
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
