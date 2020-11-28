import React from "react";

function Products(props) {
  if (props.loading) return null;
  if (props.error) return <p>Error: {props.error}</p>;

  const { currency } = props;

  return (
    <div className="products__container">
      {props.data.products.map((item) => (
        <li key={item.id}>
          <img className="item__image" src={item.image_url} alt={item.title} />{" "}
          <h2 className="item__title">{item.title}</h2>
          <div className="item__price__container">
            <div>From:</div>
            <div>
              {currency} {item.price.toFixed(2)}
            </div>
          </div>
          <button
            onClick={() => props.addToCart(item.id)}
            className="item__add"
          >
            Add to Cart
          </button>
        </li>
      ))}
    </div>
  );
}

export default Products;
