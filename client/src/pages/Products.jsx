import { useState, useEffect } from "react";
import FoodCard from "../components/FoodCard/FoodCard";
import { API_BASE_URL } from "../config/api";

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
      <div className="container my-5">
        <h2 className="text-center mb-4">{categoryTitles[category] || "Our Menu"}</h2>
        <div className="text-center">
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <h2 className="text-center mb-4">{categoryTitles[category] || "Our Menu"}</h2>
        <div className="alert alert-danger">
          Error loading products: {error}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container my-5">
        <h2 className="text-center mb-4">{categoryTitles[category] || "Our Menu"}</h2>
        <div className="alert alert-info">
          No products found in this category.
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{categoryTitles[category] || "Our Menu"}</h2>
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

export default Products;
