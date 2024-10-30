import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import StarRating from "./StarRating";

const ProductDisplay = ({ addToCart, selectedCategory }) => {
  //state variables
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetching data from backend
        const response = await fetch("http://localhost:4000/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  //Displays all the products and filters the products to display based on the category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  //Displays reviews for the selected products
  const handleShowReviews = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {/* array of products */}
      {filteredProducts.map((product) => (
        <div
          key={product.product_id}
          style={{
            maxWidth: "300px",
            margin: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <h3>
            <strong>{product.brand}'s </strong>
            {product.product_name}
          </h3>
          <img
            src={product.imageUrl}
            alt={product.product_name}
            style={{ width: "100%", height: "auto", borderRadius: "5px" }}
          />
          <p>{product.description}</p>
          <p>
            <strong>Price:</strong> ${product.price.toFixed(2)}
          </p>

          <p>
            <strong>Average Rating:</strong>
            <StarRating
              rating={Math.round(
                product.reviews.length > 0
                  ? (
                      product.reviews.reduce(
                        (sum, review) => sum + review.rating,
                        0
                      ) / product.reviews.length
                    ).toFixed(1)
                  : 0
              )}
            />
          </p>
          <button
            onClick={() => handleShowReviews(product)}
            style={{ marginTop: "10px", padding: "10px 15px" }}
          >
            Show Reviews
          </button>

          {isModalOpen && selectedProduct && (
            <Modal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              reviews={selectedProduct.reviews}
            />
          )}

          <button
            onClick={() => addToCart(product)}
            style={{
              marginTop: "10px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <i
              className="fas fa-shopping-cart"
              style={{ fontSize: "24px", color: "#007bff" }}
            ></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductDisplay;
