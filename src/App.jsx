import { useEffect, useState } from "react";
import "./App.css";
import ProductDisplay from "./components/ProductDisplay";
import Cart from "./components/Cart";
import "./components/Cart.css";
import Checkout from "./components/Checkout";

import HomePage from "./components/HomePage";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from "./components/Login";
import ProductOrders from "./components/ProductOrders";
import BabyNames from "./components/BabyNames";

function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const [isCartVisible, setIsCartVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Furniture",
    "Diapers",
    "Strollers",
    "Electronics",
    "Skin Products",
  ];
  //"Toys",
  //"Skin Products",
  //"Footwear",

  const handleLogin = (user) => {
    console.log("Logged in user:", user); // Handles user login
    setIsLoggedIn(true);
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.product_id === product.product_id
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter((item) => item.product_id !== productId));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.product_id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cart.filter((item) => item.product_id !== productId));
  };
  const toggleCart = () => {
    setIsCartVisible((prevState) => !prevState);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    setIsCheckout(true);

    // checkout logic
  };
  const handleCheckoutSuccess = () => {
    setCartItems([]); // Clears the cart
    setIsCheckout(false); //Goto product display/main page
  };

  return (
    <>
      <div className="app-container">
        <div className="product-display">
          {!isCheckout ? (
            <>
              <BabyNames />
              <HomePage
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                total={total}
                onCheckout={handleCheckout}
                isOpen={isCartOpen}
                categories={categories}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                login={handleLogin}
              />
              <ProductDisplay
                addToCart={addToCart}
                selectedCategory={selectedCategory}
              />{" "}
            </>
          ) : (
            <Checkout
              cartItems={cartItems}
              total={total}
              onCheckoutSuccess={handleCheckoutSuccess}
              onBack={() => setIsCheckout(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
