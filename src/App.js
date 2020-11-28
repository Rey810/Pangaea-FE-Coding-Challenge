import { React, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import NavBar from "./components/UI/NavBar";
import Products from "./components/Products/Products";
import SideBar from "./components/UI/Sidebar";

// GraphQL query
// default currency === USD
// currency passed as variable to 'refetch' for currency-related UI updates
const PRODUCTS = gql`
  query GetProducts($currency: Currency! = USD) {
    products {
      id
      title
      image_url
      price(currency: $currency)
    }
  }
`;

function App() {
  // uses "PRDODUCTS" graphql query to fetch data from https://pangaea-interviews.now.sh/api/graphql
  // caches data by default
  // refetch is called in refetchProductsHandler (passed as props to <Sidebar />)
  const { loading, error, data, refetch } = useQuery(PRODUCTS);

  // # of items in cart
  // 0 items in cart initially
  // type Integer
  // called from: updateCartTotal
  const [cartSize, setCartSize] = useState(0);

  // sets the default currency for UI: "USD"
  // type String
  // called from: refetchProductsHandler
  const [currCurrency, setCurrCurrency] = useState("USD");

  // total cart price
  // type Integer
  const [cartTotal, setCartTotal] = useState(0);

  // array of cart product objects
  // eg.  {
  //        id: 2,
  //        title: "Premium-Grade Moisturizing Balm",
  //        quantity: 2,
  //        price: 29,
  //        image_url: "https://image"
  //      }
  // called in:
  //    1. addToCartHandler
  //    2. removeFromCartHandler
  //    3. updateCartCurrency
  const [cartItems, setCartItems] = useState([]);

  // sidebar open/close status
  // called from <Sidebar /> and <NavBar />
  const [openStatus, setOpenStatus] = useState(false);

  // updates cartTotal when cartItems changes
  useEffect(() => {
    if (!data) return;
    console.log("[App] useEffect cartTotal");
    updateCartTotal(cartItems);
  }, [cartItems]);

  // updates currency value of cartItems when currCurrency changes
  useEffect(() => {
    if (!data) return;
    console.log("1. [App] useEffect currCurrency");
    console.log(`2. The currency is now ${currCurrency}`);
    updateCartCurrency(currCurrency);
  }, [currCurrency]);

  // re-fetch products (checks cache first)
  // Called from Sidebar when currency changes
  const refetchProductsHandler = async (event) => {
    console.log(`Refetch products with currency: ${event.target.value}`);
    const newCurrency = event.target.value;
    await refetch({ currency: newCurrency });
    setCurrCurrency(event.target.value);
  };

  // Updates prices in cart (item price and cart total price)
  const updateCartCurrency = (currency) => {
    console.log("1. [App] updateCartCurrency");
    console.log("2. I'm updating the currency!");

    // cartItems === cart items state
    let oldCart = [...cartItems];

    // data is from from graphql query
    let { products } = data;
    console.log({ products });
    console.log({ oldCart });

    // create new cart object with updated prices
    let newCart = products.reduce((newCart, product) => {
      // only create new obj for items in old cart
      if (oldCart.some((item) => item.id === product.id)) {
        let cartItemObj = {
          ...product,
          price: product.price,
        };
        newCart.push(cartItemObj);
      }
      console.log({ newCart });
      return newCart;
    }, []);

    // update the quantity of each item from oldCart
    let cart = newCart.map((item, index) => {
      console.log("inside newCart map to add quantity");
      if (item.id === oldCart[index].id) {
        console.log("item.id === newCart[index].id");
        item.quantity = oldCart[index].quantity;
      }
      return item;
    });
    setCartItems(cart);
  };

  // adds item to cart and opens sidebar
  const addToCartHandler = (id) => {
    openCartHandler();
    console.log("[App] addToCartHandler");
    let cart = [...cartItems];
    // obtained from useQuery
    let { products } = data;
    // get selected item from products array on id
    let currProduct = products.find((product) => product.id === id);
    // does the item already exist in the cart?
    // if so, increment; if not, add to cart
    if (cart.some((item) => item.id === currProduct.id)) {
      // INCREMENT
      console.log(`${currProduct.title} is already in cart!`);
      let updatedCart = cart.map((item) => {
        if (item.id === currProduct.id) {
          item.quantity++;
        }
        return item;
      });
      setCartItems([...updatedCart]);
    } else {
      // ADD TO CART
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

  // remove from cart item total or remove from cart entirely
  const removeFromCartHandler = (id) => {
    let cart = [...cartItems];
    // decrement if quantity > 1
    // remove from cart if quantity === 1
    let currProduct = cart.find((item) => item.id === id);
    // DECREMENT
    if (currProduct.quantity > 1) {
      currProduct.quantity--;
      console.log("[App] removeFromCartHandler");
      let updatedCart = cart.map((product) => {
        if (product.id === currProduct.id) {
          product.quanitity--;
        }
        return product;
      });
      setCartItems([...updatedCart]);
    } else {
      // REMOVE
      let updatedCart = cart.filter((item) => item.id !== id);
      setCartItems([...updatedCart]);
      console.log(`Removing ${currProduct.title} from cart`);
    }
  };

  // removes entire product (entire quantity) from cart
  const removeProductHandler = (id) => {
    console.log("remove product from cart");
    let oldCart = [...cartItems];
    let newCart = oldCart.filter((product) => product.id !== id);
    console.log(newCart);
    setCartItems(newCart);
  };

  // adds up total price and total number of cart items
  const updateCartTotal = (cart) => {
    let totalPrice = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    let totalItems = cart.reduce(
      (total, product) => total + product.quantity,
      0
    );
    console.log("[App] updateCartTotal");
    setCartTotal(totalPrice);
    setCartSize(totalItems);
  };

  // cart open
  const openCartHandler = () => {
    setOpenStatus(true);
  };

  // cart close
  const closeCartHandler = () => {
    setOpenStatus(false);
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
            currency={currCurrency}
          />
        </div>
      </main>
      <SideBar
        open={openStatus}
        cart={cartItems}
        closeSideBar={closeCartHandler}
        incrementProduct={addToCartHandler}
        decrementProduct={removeFromCartHandler}
        removeProduct={removeProductHandler}
        cartTotal={cartTotal}
        cartCurrency={currCurrency}
        refetchProducts={refetchProductsHandler}
      />
    </>
  );
}

export default App;
