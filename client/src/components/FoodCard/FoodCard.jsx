import "./FoodCard.css";
import { useCart } from "../../context/CartContext";
import MiniCart from "../MiniCart/MiniCart";
import { useState } from "react";

function FoodCard({ food }) {
  const { addToCart } = useCart();
  const [showMiniCart, setShowMiniCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(food);
    setShowMiniCart(true);

    setTimeout(() => {
      setShowMiniCart(false);
    }, 2000);
  };

  return (
    <>
      <div className="food-card">
        <img src={food.image} alt={food.name} />
        <div className="food-info">
          <h5>{food.name}</h5>
          <p>{food.description}</p>
          <div className="food-footer">
            <span>₹{food.price}</span>
            <button className="addToCartbtn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <MiniCart visible={showMiniCart} />
    </>
  );
}

export default FoodCard;
