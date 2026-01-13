// src/components/MiniCart/MiniCart.jsx
import "./MiniCart.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function MiniCart({ visible }) {
  const { cartItems } = useCart();

  if (!visible) return null;

  return (
    <div className="mini-cart shadow">
      <h6 className="mini-cart-title">Item added to cart</h6>

      {cartItems.slice(-1).map((item) => (
        <div className="mini-cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />
          <div>
            <p className="mb-0 fw-semibold">{item.name}</p>
            <small>Qty: {item.quantity}</small>
          </div>
        </div>
      ))}

      <Link to="/cart" className="btn btn-dark btn-sm w-100 mt-2">
        View Cart
      </Link>
    </div>
  );
}

export default MiniCart;