import React from "react";
import { NavLink, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Header.css";

function Header({ user, logout }) {
  const notify = () => {
    toast("Go Sign In !");
  };
  return (
    <div className="header-container">
      <div className="header-container-title">
        <h1>Covid Tracker App</h1>
      </div>

      <div className="header-link">
        {user ? (
          <>
            {" "}
            <NavLink
              to="/covid"
              className={({ isActive }) =>
                isActive ? "active-nav-link" : undefined
              }
            >
              Covid
            </NavLink>
            <NavLink
              to="/covid"
              className={({ isActive }) =>
                isActive ? "active-nav-link" : undefined
              }
            >
              Welcome <strong>{user.username}</strong>
            </NavLink>
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            {" "}
            <NavLink
              to="/sign-up"
              onClick={notify}
              className={({ isActive }) =>
                isActive ? "active-nav-link" : undefined
              }
            >
              Covid
            </NavLink>
            <NavLink
              to="/sign-up"
              className={({ isActive }) =>
                isActive ? "active-nav-link" : undefined
              }
            >
              Sign up
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "active-nav-link" : undefined
              }
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
