import React from "react";
import Spinner from "../UI/Spinner/Spinner";

function Products(props) {
  const { currency, data, loading } = props;

  // while waiting for product data to be fetched
  if (loading) return <Spinner />;

  let products = null;

  if (data) {
    products = data.products.map((item) => (
      <li key={item.id}>
        <img className="item__image" src={item.image_url} alt={item.title} />{" "}
        <h2 className="item__title">{item.title}</h2>
        <div className="item__price__container">
          <div>From:</div>
          <div>
            {currency} {item.price.toFixed(2)}
          </div>
        </div>
        <button onClick={() => props.addToCart(item.id)} className="item__add">
          Add to Cart
        </button>
      </li>
    ));
  }

  return <div className="products__container">{products}</div>;
}

export default Products;
