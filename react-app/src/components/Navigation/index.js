import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul>
      <div className="nav-bar-container">
        <div className="home-button">
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
        </div>
        <div className="nav-right">
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}

          <li>
            <NavLink exact to="/cart">
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/products/new">
              Post your product
            </NavLink>
          </li>
        </div>
      </div>
    </ul>
  );
}

export default Navigation;
