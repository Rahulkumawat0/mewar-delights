import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import "./Checkout.css";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [termsError, setTermsError] = useState("");

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (cartItems.length === 0) {
    return <Navigate to="/cart" />;
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = 50;
  const totalAmount = subtotal + deliveryCharge;

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.street.trim()) newErrors.street = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Pincode must be 6 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handlePlaceOrder = async () => {
    // Clear previous errors
    setGeneralError("");
    setTermsError("");

    if (!validateForm()) {
      setGeneralError("Please fix the errors in the form");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!termsAccepted) {
      setTermsError("Please accept terms and conditions to proceed");
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
      return;
    }

    setIsLoading(true);

    try {
      const orderData = {
        userId: user.id,
        items: cartItems.map(item => ({
          product: item._id || item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        deliveryAddress: formData,
        subtotal,
        deliveryCharge,
        totalAmount,
        paymentMethod,
        termsAccepted,
        notes: notes || null
      };

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (!response.ok) {
        setGeneralError(result.message || "Failed to create order. Please try again.");
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // Navigate to success page with order data
      console.log("Order created successfully, navigating to success page:", result.order);
      navigate("/success", { 
        state: { 
          order: result.order,
          totalAmount: totalAmount
        } 
      });

    } catch (error) {
      console.error("Error placing order:", error);
      setGeneralError("Something went wrong. Please check your connection and try again.");
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="checkout-container">
      <div className="container my-5">
        <h2 className="checkout-title">🏰 Royal Checkout</h2>

        {/* General Error Message */}
        {generalError && (
          <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
            <strong>⚠️ Error:</strong> {generalError}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setGeneralError("")}
            ></button>
          </div>
        )}

        <div className="row g-4">
          {/* LEFT: ADDRESS & PAYMENT */}
          <div className="col-lg-7">
            {/* Delivery Address Card */}
            <div className="checkout-card">
              <div className="card-header">
                <h5 className="mb-0">📍 Delivery Address</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="fullName"
                      className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                    {errors.fullName && <div className="invalid-feedback d-block">{errors.fullName}</div>}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="tel"
                      name="phone"
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      name="street"
                      className={`form-control ${errors.street ? "is-invalid" : ""}`}
                      placeholder="Street Address"
                      value={formData.street}
                      onChange={handleInputChange}
                    />
                    {errors.street && <div className="invalid-feedback d-block">{errors.street}</div>}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="city"
                      className={`form-control ${errors.city ? "is-invalid" : ""}`}
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    {errors.city && <div className="invalid-feedback d-block">{errors.city}</div>}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="state"
                      className={`form-control ${errors.state ? "is-invalid" : ""}`}
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                    {errors.state && <div className="invalid-feedback d-block">{errors.state}</div>}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="pincode"
                      className={`form-control ${errors.pincode ? "is-invalid" : ""}`}
                      placeholder="Pincode (6 digits)"
                      value={formData.pincode}
                      onChange={handleInputChange}
                    />
                    {errors.pincode && <div className="invalid-feedback d-block">{errors.pincode}</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="checkout-card mt-4">
              <div className="card-header">
                <h5 className="mb-0">💳 Payment Method</h5>
              </div>
              <div className="card-body">
                <div className="form-check mb-3">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="cod">
                    💰 Cash on Delivery (Pay when order arrives)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="razorpay"
                    name="paymentMethod"
                    value="razorpay"
                    disabled
                  />
                  <label className="form-check-label text-muted" htmlFor="razorpay">
                    🌐 Online Payment (Coming Soon)
                  </label>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="checkout-card mt-4">
              <div className="card-header">
                <h5 className="mb-0">📝 Special Instructions (Optional)</h5>
              </div>
              <div className="card-body">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Add any special delivery instructions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="checkout-card mt-4">
              <div className="card-body">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="terms">
                    I agree to the terms and conditions, and privacy policy
                  </label>
                </div>
                {termsError && <div className="text-danger mt-2 small"><strong>✗ {termsError}</strong></div>}
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="col-lg-5">
            <div className="checkout-card sticky-top" style={{ top: "20px" }}>
              <div className="card-header">
                <h5 className="mb-0">📦 Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="order-items">
                  {cartItems.map((item) => (
                    <div key={item._id || item.id} className="order-item">
                      <span>{item.name} × {item.quantity}</span>
                      <span className="fw-bold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="order-divider"></div>

                <div className="order-summary-section">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery Charge</span>
                    <span>₹{deliveryCharge}</span>
                  </div>
                </div>

                <div className="order-divider"></div>

                <div className="order-total">
                  <span>Total Amount</span>
                  <span className="total-price">₹{totalAmount}</span>
                </div>

                <button
                  className="btn btn-place-order w-100 mt-4"
                  onClick={handlePlaceOrder}
                  disabled={isLoading || !termsAccepted}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-mini"></span> Processing...
                    </>
                  ) : (
                    "🛍️ Place Order"
                  )}
                </button>

                <Link to="/cart" className="btn btn-outline-secondary w-100 mt-2">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
