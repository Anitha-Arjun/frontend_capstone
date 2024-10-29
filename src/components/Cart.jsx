import React from "react";
import "./Cart.css";

const Cart = ({
  cartItems,
  updateQuantity,
  total,
  onCheckout,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="cart-title">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.product_id} className="cart-item">
                <div className="cart-item-details">
                  <img
                    src={item.imageUrl}
                    alt={item.product_name}
                    className="cart-item-image"
                  />
                  <div>
                    <h4 className="cart-item-name">{item.product_name}</h4>
                    <p className="cart-item-price">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() =>
                      updateQuantity(item.product_id, item.quantity - 1)
                    }
                    className="quantity-button"
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product_id, item.quantity + 1)
                    }
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
        <button
          onClick={onCheckout}
          disabled={cartItems.length === 0}
          className={`checkout-button ${
            cartItems.length === 0 ? "disabled" : ""
          }`}
        >
          Checkout
        </button>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default Cart;
