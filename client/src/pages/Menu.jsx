import { useState, useEffect } from "react";
import FoodCard from "../components/FoodCard/FoodCard";
import { API_BASE_URL } from "../config/api";

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
      <div className="container my-5">
        <h2 className="text-center mb-4">Our Royal Menu</h2>
        <div className="text-center">
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <h2 className="text-center mb-4">Our Royal Menu</h2>
        <div className="alert alert-danger">
          Error loading products: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Royal Menu</h2>
      <div className="row g-4">
        {products.map(food => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={food._id}>
            <FoodCard food={food} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
