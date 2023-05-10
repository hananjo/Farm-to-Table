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
              <img
                src={
                  "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683750387/Screen_Shot_2023-05-10_at_1.26.11_PM_ulaidt.png"
                }
                style={{ width: "150px" }}
              />
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
