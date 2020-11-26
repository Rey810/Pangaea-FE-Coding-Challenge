import React from "react";

function NavBar(props) {
  let { cartSize, openCart } = props;
  return (
    <nav>
      <div className="header__left">
        <li className="nav__item logo">LUMIN</li>
        <li className="nav__item">Shop</li>
        <li className="nav__item">Learn</li>
      </div>
      <div className="header__right">
        <li className="nav__item">Account</li>
        <li className="nav__item cart" onClick={openCart}>
          <svg
            class="cart w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          <span>{cartSize}</span>
        </li>
      </div>
    </nav>
  );
}

export default NavBar;
