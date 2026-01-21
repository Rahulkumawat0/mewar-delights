import { useState, useEffect } from "react";
import FoodCard from "../components/FoodCard/FoodCard";
import { API_BASE_URL } from "../config/api";
import "./Products.css";

function Products({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryTitles = {
    main: "Main Course",
    snacks: "Snacks",
    sweets: "Sweets",
    all: "All Items"
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        
        // Filter by category if specified
        const filtered = category && category !== "all" 
          ? data.filter(product => product.category === category)
          : data;
        
        setProducts(filtered);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="products-page">
        <div className="products-container">
          <div className="loading-spinner"></div>
          <p className="loading-message">Loading delicious products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="products-container">
          <div className="alert-error">
            ❌ Error loading products: {error}
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="products-page">
        <div className="products-container">
          <div className="alert-info">
            ℹ️ No products found in this category.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h2 className="products-title">{categoryTitles[category] || "Our Menu"}</h2>
          <p className="products-subtitle">Authentic Rajasthani flavors handcrafted with tradition</p>
        </div>
        <div className="products-grid">
          {products.map(food => (
            <div key={food._id}>
              <FoodCard food={food} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
