import NavBar from "./NavBar.jsx";

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
