import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const foods = useSelector(state => state?.product)
  const [searchTerm, setSearchTerm] = useState("");
  const [grocery, setGrocery] = useState([])
  // console.log("FOOD", food)
  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {
    if(foods) {
      const filtered = Object.values(foods).filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
        setGrocery(filtered)
    }
  }, [foods, searchTerm])

  const handleInput = e => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if(grocery.length > 0) {
      const foodId = grocery[0].id
      history.push(`/products/${foodId}`)
    }

  }

  const keyPress = (e) => {
    if(e.key === "Enter") {
      handleSearch(e)
    }
  }

  return (
    <ul className="navbar">
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
          <div className="cart-label">
            <li>
              {sessionUser && (<NavLink exact to="/cart">
              <i class="fa-solid fa-cart-shopping"></i>
              </NavLink>)}
            </li>
          </div>

          <div className="search-container">
          <li>

            <input type='search'
              placeholder="Search an item "
              className="prodsearch"
              value={searchTerm}
              onChange={handleInput}
              onKeyPress={keyPress}
            />
          </li>

        </div>
          <div className="post-product-label">
            {sessionUser && (
              <li>
                <NavLink
                  className="post-product-label2"
                  exact
                  to="/products/new"
                >
                  Post your product
                </NavLink>
              </li>
            )}
          </div>
        </div>
      </div>
    </ul>
  );
}

export default Navigation;
