import { React, useState, useEffect } from "react";
import Products from "./components/Products/Products";
import NavBar from "./components/UI/NavBar";
import SideBar from "./components/UI/Sidebar";

import { useQuery, gql } from "@apollo/client";

// GraphQL query
const PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      image_url
      price(currency: AUD)
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(PRODUCTS);
  const [openStatus, setOpenStatus] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartSize, setCartSize] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // update the cartTotal whenever something changed in the cart
  useEffect(() => {
    console.log("Inside useEffect");
    updateCartTotal(cartItems);
  }, [cartItems]);

  // cart open and close 
  const openCartHandler = () => {
    setOpenStatus(true);
  };

  const closeCartHandler = () => {
    setOpenStatus(false);
  };

  const addToCartHandler = (id) => {
    openCartHandler();
    let cart = [...cartItems];
    // obtained from useQuery
    let { products } = data;
    // get item from products collection with id
    let currProduct = products.find((product) => product.id === id);
    // does the item already exist in the cart? If so, increment; if not, add to cart
    if (cart.some((item) => item.id === currProduct.id)) {
      console.log(`${currProduct.title} is already in cart!`);
      let updatedCart = cart.map((item) => {
        if (item.id === currProduct.id) {
          item.quantity++;
        }
        return item;
      });
      setCartItems([...updatedCart]);
    } else {
      // add to cart if it's not in the card
      // add to cart immutably
      setCartItems([
        ...cart,
        {
          id: currProduct.id,
          title: currProduct.title,
          image_url: currProduct.image_url,
          quantity: 1,
          price: currProduct.price,
        },
      ]);
    }
  };

  const removeFromCartHandler = (id) => {
    let cart = [...cartItems];
    // decrement if quantity > 1
    // remove from cart if quantity === 1
    let currProduct = cart.find((item) => item.id === id);
    if (currProduct.quantity > 1) {
      currProduct.quantity--;
      console.log("I'm decrementing the quantity");
      console.log({ currProduct });
      let updatedCart = cart.map((product) => {
        if (product.id === currProduct.id) {
          product.quanitity--;
        }
        return product;
      });
      setCartItems([...updatedCart]);
    } else {
      let updatedCart = cart.filter((item) => item.id !== id);
      setCartItems([...updatedCart]);
      console.log(`Removing ${currProduct.title} from cart`);
    }
  };

  // called in useEffect every time on mount and evert time the cart updates
  const updateCartTotal = (cart) => {
    let total = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    let totalItems = cart.reduce(
      (total, product) => total + product.quantity,
      0
    );
    console.log({ cart });
    setCartTotal(total);
    setCartSize(totalItems);
  };

  return (
    <>
      <NavBar cartSize={cartSize} openCart={openCartHandler} />
      <main>
        <div className="section__header">
          <h1>All Products</h1>
          <p>A 360° look at Lumin</p>
        </div>
        <div className="section__content">
          <Products
            addToCart={addToCartHandler}
            error={error}
            loading={loading}
            data={data}
          />
        </div>
      </main>
      <SideBar
        open={openStatus}
        closeSideBar={closeCartHandler}
        cart={cartItems}
        incrementProduct={addToCartHandler}
        decrementProduct={removeFromCartHandler}
        cartTotal={cartTotal}
      />
    </>
  );
}

export default App;
