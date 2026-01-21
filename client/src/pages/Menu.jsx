import { useState, useEffect } from "react";
import FoodCard from "../components/FoodCard/FoodCard";
import { API_BASE_URL } from "../config/api";
import "./Products.css";

function Menu() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="products-page">
        <div className="products-container">
          <div className="loading-spinner"></div>
          <p className="loading-message">Loading our royal menu...</p>
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

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h2 className="products-title">Our Royal Menu</h2>
          <p className="products-subtitle">Discover the finest flavors of authentic Rajasthani cuisine</p>
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

export default Menu;
