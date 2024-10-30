import NavBar from "./NavBar.jsx";
import Weather from "./Weather.jsx";

const HomePage = ({
  cartItems,
  updateQuantity,
  total,
  onCheckout,
  isOpen,
  categories,
  setSelectedCategory,
  selectedCategory,
  login,
}) => {
  return (
    <div>
      <div className="banner">
        <div className="text-container">
          <h1 className="text-left">Little</h1>
          <img src="/images/image.png" alt="logo" className="banner-image" />
          <h1 className="text-right">Sprouts</h1>
          {/* Third Party Weather API to display the current weather in Houstion */}
          <Weather className="weather-align-right" />
        </div>
      </div>

      <NavBar
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        total={total}
        onCheckout={onCheckout}
        isOpen={isOpen}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        login={login}
      />

      <div></div>
    </div>
  );
};

export default HomePage;
