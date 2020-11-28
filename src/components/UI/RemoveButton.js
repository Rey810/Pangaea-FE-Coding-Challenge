const removeButton = (props) => {
  // from Toolbar
  const { removeFromCart } = props;
  return (
    <div className="cartItem__remove">
      <button type="button" aria-label="cart close" onClick={removeFromCart}>
        <svg
          aria-hidden="true"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default removeButton;
