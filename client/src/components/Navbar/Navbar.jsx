import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/logo.png";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";


function Navbar() {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="royal-header">

      {/* DESKTOP HEADER (UNCHANGED) */}
      <div className="top-grid desktop-only">
        <div className="top-left">
          <div className="px-2">✉️ support@mewardelights.com</div>
          <div className="px-2">📞 +91 87809 48614</div>
        </div>

        <div className="top-center">
          <Link to="/"><img src={logo} alt="Mewar Delights Logo" /></Link>
        </div>

        <div className="top-right">
          <Link to="/cart">
            <button className="icon-btn">🛒 Cart
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
            </button>
          </Link>
          <Link to={isLoggedIn ? "/account" : "/login"}>
            <button className="icon-btn">
              {isLoggedIn ? "My Account" : "Login"}
            </button>
          </Link>
        </div>
      </div>

      {/* MOBILE HEADER (NEW – CLEAN) */}
      <div className="mobile-header mobile-only">
        <button
          className="mobile-icon"
          data-bs-toggle="collapse"
          data-bs-target="#mobileMenu"
        >
          ☰
        </button>

        <Link to="/">
          <img src={logo} alt="Mewar Delights Logo" className="mobile-logo" />
        </Link>

        <Link to="/cart">
          <button className="mobile-icon">🛒
            {cartCount > 0 && (
              <span className="cart-badge mobile-badge">{cartCount}</span>
            )}
          </button>
        </Link>
      </div>

      {/* DESKTOP MENU */}
      <nav className="menu-bar desktop-only">
        <ul className="menu-list">
          <li><Link to="/products/all">All Items</Link></li>
          <li><Link to="/products/main">Main Course</Link></li>
          <li><Link to="/products/snacks">Snacks</Link></li>
          <li><Link to="/products/sweets">Sweets</Link></li>
        </ul>
      </nav>

      {/* MOBILE MENU */}
      <div id="mobileMenu" className="collapse mobile-menu">
        <ul>
          <li><Link to="/products/all">All Items</Link></li>
          <li><Link to="/products/main">Main Course</Link></li>
          <li><Link to="/products/snacks">Snacks</Link></li>
          <li><Link to="/products/sweets">Sweets</Link></li>
          <li className="divider"></li>
          <li>📞 +91 98765 43210</li>
          <li>✉️ support@mewardelights.com</li>
          <li className="divider"></li>
          <li>
            <Link to={isLoggedIn ? "/account" : "/login"}>
              {isLoggedIn ? "My Account" : "Login"}
            </Link>
          </li>
        </ul>
      </div>

    </header>
  );
}

export default Navbar;
