import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
  );

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4" style={{ color: "#5a0f16" }}>
        Your Royal Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <Link to="/menu" className="btn btn-dark mt-3">
            Explore Menu
          </Link>
        </div>
      ) : (
        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="card mb-3 shadow-sm border-0"
              >
                <div className="row g-0 align-items-center">
                  <div className="col-md-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text text-muted">₹{item.price}</p>

                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.id, -1)}>
                            −
                          </button>
                          <span className="mx-3">{item.quantity}</span>
                          <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.id, 1)}>
                            +
                          </button>
                        </div>

                        <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 p-3">
              <h4 className="mb-3" style={{ color: "#7a1b26" }}>
                Order Summary
              </h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery</span>
                <span>₹50</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Total</span>
                <span>₹{subtotal + 50}</span>
              </div>
              <Link to="/Checkout">
                <button className="btn btn-dark w-100">
                    Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
