import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaPizzaSlice } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentCount, clearCurrentUser } from "../../redux/actions/user";
import { AiOutlineShoppingCart } from "react-icons/ai";

function Navbar({ show }) {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user);

  const currentCounter = useSelector((state) => state.count);

  const logout = () => {
    dispatch(clearCurrentUser());
    dispatch(clearCurrentCount())
    navigate("/");
  };

  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenu = () => {
    setClick(false);
  };
  return (
    <div className="navbars">
      <div className="navbar-container container">
        <Link
          to="/cart"
          type="button"
          className="btn btn-primary position-relative cart-one"
        >
          <AiOutlineShoppingCart className="icon" />

          {currentUser &&
            (show ? (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {currentCounter}
              </span>
            ) : null)}
        </Link>

        <div className="menu-icon" onClick={handleClick}>
          <FaPizzaSlice className="icons" />
        </div>

        <ul className={click ? "nav-menus active" : "nav-menus"}>
          <li className="nav-items ">
            <NavLink to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </NavLink>
          </li>
          <li className="nav-items">
            <NavLink
              to="/pizzas"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Pizzas
            </NavLink>
          </li>
          <li className="nav-items">
            <NavLink
              to="/desserts"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Desserts
            </NavLink>
          </li>
          <li className="nav-items">
            <NavLink
              to="/fullMenu"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Full Menu
            </NavLink>
          </li>
          {!currentUser?.userId ? (
            <div className="button__wrapper">
              <li className="nav-btn">
                <button>
                  <Link to="/logIn">SignIn</Link>
                </button>
              </li>
            </div>
          ) : (
            <div className="button__wrapper">
              <li className="nav-btn" onClick={logout}>
                <button>
                  <Link to="/signUp">Logout</Link>
                </button>
              </li>
              <li className="nav-btn loggedName">
                <Link to="/userDetails" className="nav-links">
                  Hello {currentUser?.username}
                </Link>
              </li>
            </div>
          )}
          <Link
            to="/cart"
            type="button"
            className="btn btn-primary position-relative cart-two"
          >
            <AiOutlineShoppingCart className="icon" />

            {currentUser &&
              (show ? (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {currentCounter}
                </span>
              ) : null)}
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
