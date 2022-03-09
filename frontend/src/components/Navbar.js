import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../images/logo.png";
import AddFood from "../components/AddFood";

const Navbar = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);

  const toogle = () => {
    setButtonPopup(!buttonPopup);
  };

  if (buttonPopup) {
    document.body.classList.add("active-scroll");
  } else {
    document.body.classList.remove("active-scroll");
  }

  return (
    <>
      <nav className="navbar container">
        <div className="container-nav">
          <div className="navbar-image">
            <Link to="/">
              <img src={Logo} alt="logo-foodies" />
            </Link>
          </div>
          <ul className="navbar-links">
            {/* <li>
              <Link to="/admin">Login</Link>
            </li> */}
            <li className="left">
              <Link to="/">Home</Link>
            </li>

            {localStorage.getItem("rememberMe") !== "true" ? (
              <>
                <li className="center">
                  <Link to="/contact">Contact us</Link>
                </li>
                <li className="right">
                  <Link to="/about">About us</Link>
                </li>
              </>
            ) : null}
            {localStorage.getItem("rememberMe") === "true" ? (
              <>
                <li className="center">
                  <Link to="/foods">Foods</Link>
                </li>
                <li className="center">
                  <Link to="/category">Category</Link>
                </li>
                <li className="center">
                  <Link to="/admin/users">Admins</Link>
                </li>
                <li className="center">
                  <Link to="/message">Messages</Link>
                </li>
                <li className="right">
                  <Link to="/" onClick={props.logOut}>
                    logout
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
          <button className="nav__btn" onClick={toogle}>
            Add your food
          </button>
          <i class="fa-solid fa-bars menu__icon"></i>
        </div>
      </nav>
      <AddFood model={buttonPopup} setModel={setButtonPopup} />
    </>
  );
};

export default Navbar;
