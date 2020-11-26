import React from "react";

import { useQuery, gql } from "@apollo/client";

// GraphQL query
const CURRENCIES = gql`
  query GetCurrencies {
    currency
  }
`;

function Sidebar(props) {
  const { loading, error, data } = useQuery(CURRENCIES);
  // prop received from app upon button click (to open sidebar)
  const { open, cart, incrementProduct, decrementProduct, cartTotal } = props;

  let currencies = null;

  // sets available options in dropdown if currency data is available
  if (data) {
    currencies = data.currency.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ));
  }

  if (error) {
    console.error(error);
    return;
  }

  if (loading) return <option>Loading</option>;

  let cartItems = <p>No items in cart...</p>;
  if (cart) {
    cartItems = cart.map((item) => {
      return (
        <div key={item.id} className="cartItem__container">
          <div className="cartItem__title">{item.title}</div>
          <div className="cartItem__quantity__container">
            <div className="buttons__container">
              <button
                className="quantity__minus"
                onClick={() => decrementProduct(item.id)}
              >
                -
              </button>
              <span className="cartItem__quantity">{item.quantity}</span>
              <button
                className="quantity__plus"
                onClick={() => incrementProduct(item.id)}
              >
                +
              </button>
            </div>
          </div>
          <div className="cartItem__price">{item.price.toFixed(2)}</div>
          <div className="cartItem__image">
            <img src={item.image_url} alt={item.title} />
          </div>
        </div>
      );
    });
  }

  //determines whether sidebar is open or closed
  let openStatus = open ? "open" : "closed";

  return (
    <div className={`sidebar__container ${openStatus}`}>
      <div className="sidebar__backdrop" onClick={props.closeSideBar}></div>
      <div className="sidebar">
        <div className="sidebar__header">
          <div className="sidebar__header-top">
            <div className="sidebar__close" onClick={props.closeSideBar}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </div>
            <div className="sidebar__title">
              <span>YOUR CART</span>
            </div>
          </div>
          <div className="currency__dropdown">
            <select name="currency" id="currency-select">
              {currencies}
            </select>
          </div>
        </div>
        <div className="sidebar__content">{cartItems}</div>
        <div className="sidebar__footer">
          <div className="subtotal__container">
            <span>Subtotal</span>
            <span>ZAR {cartTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
