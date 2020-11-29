import React from "react";
import RemoveButton from "./RemoveButton";
import { useQuery, gql } from "@apollo/client";

// GraphQL query
const CURRENCIES = gql`
  query GetCurrencies {
    currency
  }
`;

function Sidebar(props) {
  // used to populate dropdown (currency options)
  const { loading, error, data } = useQuery(CURRENCIES);

  // from <App />
  const {
    // is the cart open?
    open,
    // removes item from cart
    removeProduct,
    closeSideBar,
    // all the cart items
    cart,
    // incrementor fn
    incrementProduct,
    // decrementor fn
    decrementProduct,
    // total price
    cartTotal,
    // fetch data and set currency fn
    refetchProducts,
    // current currency
    cartCurrency,
    // is there an error in <App/>
    parentError,
  } = props;

  // error from currency graphql query
  if (error) {
    console.error(error);
  }

  //determines whether sidebar is open or closed
  let openStatus = open ? "open" : "closed";

  // before currency data is ready
  let currencies = null;
  // when currencies are being loaded
  if (loading) {
    currencies = <option value="loading">Loading...</option>;
  }

  // sets available options in dropdown if currency data is available
  if (data) {
    currencies = data.currency.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ));
  }

  // initial sidebar display
  let cartItems = <p>No items in cart...</p>;

  // if there are items in the cart
  if (cart) {
    cartItems = cart.map((item) => {
      return (
        // cart item card
        <div key={item.id} className="cartItem__container">
          <div className="cartItem__title">
            <h6>{item.title}</h6>
          </div>
          <RemoveButton removeFromCart={() => removeProduct(item.id)} />
          <div className="cartItem__quantity__container">
            <div className="buttons__container">
              <button
                className="quantity__minus"
                disabled={parentError}
                onClick={() => decrementProduct(item.id)}
              >
                -
              </button>
              <span className="cartItem__quantity">{item.quantity}</span>
              <button
                className="quantity__plus"
                disabled={parentError}
                onClick={() => incrementProduct(item.id)}
              >
                +
              </button>
            </div>
          </div>
          <div className="cartItem__price">
            <span>{cartCurrency} </span>
            <span>{(item.price * item.quantity).toFixed(2)}</span>
          </div>
          <div className="cartItem__image">
            <img src={item.image_url} alt={item.title} />
          </div>
        </div>
      );
    });
  }

  return (
    <div className={`sidebar__container ${openStatus}`}>
      <div className="sidebar__backdrop" onClick={closeSideBar}></div>
      <div className="sidebar">
        <div className="sidebar__header">
          <div className="sidebar__header-top">
            <div className="sidebar__close" onClick={closeSideBar}>
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
              <h5>YOUR CART</h5>
            </div>
          </div>
          <div className="currency__dropdown" onChange={refetchProducts}>
            <select name="currency" id="currency-select">
              {currencies}
            </select>
          </div>
        </div>
        <div className="sidebar__content">{cartItems}</div>
        <div className="sidebar__footer">
          <div className="subtotal__container">
            <span>Subtotal </span>
            <span>
              {cartCurrency} {cartTotal.toFixed(2)}
            </span>
          </div>
          <div className="subtotal__checkout">
            <button type="button" onClick={() => alert("Off we goooooo!")}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
