import React from "react";
import { useEffect, useState } from "react";
import Cart from "./Cart.jsx";
// import { Link } from "react-router-dom";
// import App from "../App.jsx";

const NavBar = ({
  cartItems,
  updateQuantity,
  total,
  onCheckout,
  categories,
  setSelectedCategory,
  selectedCategory,
}) => {
  //state variables for cart
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        {categories.map((category) => (
          <h3
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              cursor: "pointer",
              margin: "0 10px",
              padding: "10px 15px",
              backgroundColor:
                selectedCategory === category ? "#007bff" : "#f0f0f0",
              color: selectedCategory === category ? "white" : "black",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
          >
            {category}
          </h3>
        ))}
        <button onClick={() => setCartOpen(true)}>
          <i
            className="fas fa-shopping-cart"
            style={{ fontSize: "24px", color: "#007bff" }}
          ></i>
        </button>
        <Cart
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          total={total}
          onCheckout={onCheckout}
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
        />
      </div>
    </div>
  );
};
export default NavBar;
