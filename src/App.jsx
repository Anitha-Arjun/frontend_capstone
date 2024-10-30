import { useEffect, useState } from "react";
import "./App.css";
import ProductDisplay from "./components/ProductDisplay";
import Cart from "./components/Cart";
import "./components/Cart.css";
import Checkout from "./components/Checkout";

import HomePage from "./components/HomePage";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from "./components/Login";

function App() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const [isCartVisible, setIsCartVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  //Different categories of baby products
  const categories = [
    "All",
    "Furniture",
    "Diapers",
    "Strollers",
    "Electronics",
    "Skin Products",
  ];

  //authorizing the users
  const handleAuthSuccess = (user) => {
    console.log("Logged in user:", user);
    setIsAuthenticated(true);
  };

  //Adding products to the cart
  const addToCart = (product) => {
    //checks if the product already exist in cart
    const existingItem = cartItems.find(
      (item) => item.product_id === product.product_id
    );
    //if exists, increase quantity by 1
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      //new product add to the cart
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  //function to update the quantity -- if the quantity is 0, removes the item from the cart. Otherwise, updates the quantity in cart
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

  //removes the item from the cart by the product id
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

  //function to handle checkout
  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    setIsCheckout(true);
  };

  //Function to handle the checkout success
  const handleCheckoutSuccess = () => {
    // Clears the cart
    setCartItems([]);
    //Goto product display/main page
    setIsCheckout(false);
  };

  return (
    <>
      <div className="app-container">
        {!isAuthenticated ? (
          <Login onLoginSuccess={handleAuthSuccess} />
        ) : (
          <div className="product-display">
            {!isCheckout ? (
              <>
                <HomePage
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  total={total}
                  onCheckout={handleCheckout}
                  isOpen={isCartOpen}
                  categories={categories}
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                  login={handleAuthSuccess}
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
        )}
      </div>
    </>
  );
}

export default App;
