import React from "react";
import { useEffect, useState } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock_info: "",
  });

  //fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:4000/api/products");
      const productsData = await res.json();
      console.log(productsData);
      setProducts(productsData.products);
    };
    fetchProducts();
  }, []);

  return (
    <div className="products">
      {products &&
        products.map((product) => (
          <div key={product._id}>
            <h2 className="product-name">{product.name}</h2>
            <p className="product_id">{product.product_id}</p>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-category">{product.category} </p>
            <p className="brand">{product.brand}</p>
            <p className="product-stock_info">{product.stock_info}</p>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        ))}
    </div>
  );
}
