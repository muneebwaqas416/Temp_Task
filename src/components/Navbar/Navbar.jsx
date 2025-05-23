import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useTheme } from "../../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useGetCartItemsQuery } from "../../store/cartApi";
import CartModal from "../Cart/CartModal";
import './Navbar.css';

const Navbar = () => {
  const [navHeight, setNavHeight] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { data: cartItems = [] } = useGetCartItemsQuery("user123");

  const gotoHome = () => {
    navigate('/');
  }

  return (
    <>
      <nav className={navHeight ? "show nav" : "nav"}>
        <div className="logo" onClick={() => gotoHome()}>PROPERTY RENTALS</div>
        <ul>
          <li>
            <Link to={"/aboutus"}>ABOUT US</Link>
          </li>
          <li>
            <Link to={"/villas"}>VILLAS</Link>
          </li>
          <li>
            <Link to={"/contact"}>CONTACT</Link>
          </li>
          <li className="cart-icon" onClick={() => setIsCartOpen(true)}>
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </li>
          <li className="theme-toggle">
            <button onClick={toggleTheme} className="theme-switch">
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </li>
        </ul>
        <RxHamburgerMenu
          className="hamburger"
          onClick={() => setNavHeight(!navHeight)}
        />
      </nav>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;