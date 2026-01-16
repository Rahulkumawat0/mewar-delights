// src/pages/Checkout.jsx
import { useCart } from "../context/CartContext";
import { Link, Navigate } from "react-router-dom";

function Checkout() {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <Navigate to="/cart" />;
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = 50;
  const total = subtotal + deliveryCharge;

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ color: "#5a0f16" }}>
        Royal Checkout
      </h2>

      <div className="row g-4">
        {/* LEFT: ADDRESS & PAYMENT */}
        <div className="col-lg-7">
          {/* Delivery Address */}
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">Delivery Address</h5>

              <div className="row g-3">
                <div className="col-md-6">
                  <input className="form-control" placeholder="Full Name" />
                </div>
                <div className="col-md-6">
                  <input className="form-control" placeholder="Phone Number" />
                </div>
                <div className="col-12">
                  <input className="form-control" placeholder="Street Address" />
                </div>
                <div className="col-md-6">
                  <input className="form-control" placeholder="City" />
                </div>
                <div className="col-md-6">
                  <input className="form-control" placeholder="Pincode" />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">Payment Method</h5>

              <div className="form-check mb-2">
                <input type="radio" className="form-check-input" checked readOnly />
                <label className="form-check-label">Cash on Delivery</label>
              </div>
              <div className="form-check mb-2">
                <input type="radio" className="form-check-input" disabled />
                <label className="form-check-label text-muted">
                  Online Payment (Coming Soon)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">Order Summary</h5>

              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between mb-2"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}

                  <hr />

                  <div className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Delivery</span>
                    <span>₹{deliveryCharge}</span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between fw-bold mb-3">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>

                  {/* AUTH PLACEHOLDER */}
                  <Link to="/" className="btn btn-dark w-100">
                    Place Order
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
