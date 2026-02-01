import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./OrderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { clearCart } = useCart();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get order data from location state
    if (location.state?.order) {
      setOrderData(location.state.order);
      clearCart(); // Clear cart when order is confirmed
      setLoading(false);
    } else {
      // If no order data, this means user navigated directly to success page
      // or the state was lost. Log and show error state
      console.warn("Order data not found in location state");
      setLoading(false);
    }
  }, []);

  if (!user) {
    navigate("/login");
    return null;
  }

  if (loading) {
    return (
      <div className="success-container">
        <div className="loading">
          <p>Processing your order...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="success-container">
        <div className="success-content" style={{ textAlign: "center", paddingTop: "60px" }}>
          <h2 style={{ color: "#5a0f16", marginBottom: "20px" }}>Order Not Found</h2>
          <p style={{ color: "#666", marginBottom: "30px" }}>
            It looks like you navigated here directly. Please place an order from the checkout page.
          </p>
          <button 
            className="btn btn-view-order"
            onClick={() => navigate("/cart")}
            style={{ 
              background: "linear-gradient(135deg, #5a0f16 0%, #7a1b26 100%)",
              color: "#ffd700",
              padding: "12px 30px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  const handleContinueShopping = () => {
    navigate("/products/all");
  };

  const handleViewOrder = () => {
    navigate("/orders");
  };

  return (
    <div className="success-container">
      <div className="success-content">
        {/* SUCCESS ANIMATION */}
        <div className="success-animation">
          <div className="success-checkmark">
            <div className="checkmark-circle"></div>
            <div className="checkmark-icon">✓</div>
          </div>
        </div>

        {/* SUCCESS MESSAGE */}
        <div className="success-message">
          <h1 className="success-title">Order Placed Successfully! 🎉</h1>
          <p className="success-subtitle">
            Thank you for your order. We're getting it ready for you!
          </p>
        </div>

        {/* ORDER DETAILS CARD */}
        <div className="success-details-card">
          <div className="details-header">
            <h2>Order Details</h2>
          </div>

          <div className="details-grid">
            {/* Order ID */}
            <div className="detail-row">
              <span className="detail-label">📦 Order ID</span>
              <span className="detail-value order-id-value">
                {orderData._id.slice(-12).toUpperCase()}
              </span>
            </div>

            {/* Order Date */}
            <div className="detail-row">
              <span className="detail-label">📅 Order Date</span>
              <span className="detail-value">
                {new Date(orderData.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </span>
            </div>

            {/* Total Items */}
            <div className="detail-row">
              <span className="detail-label">🛍️ Total Items</span>
              <span className="detail-value">{orderData.items.length}</span>
            </div>

            {/* Payment Method */}
            <div className="detail-row">
              <span className="detail-label">💳 Payment Method</span>
              <span className="detail-value">
                {orderData.paymentMethod === "cod"
                  ? "💰 Cash on Delivery"
                  : "🌐 Online Payment"}
              </span>
            </div>
          </div>

          {/* DELIVERY ADDRESS */}
          <div className="section-divider"></div>

          <div className="delivery-info">
            <h3 className="info-title">📍 Delivery Address</h3>
            <div className="address-box">
              <p className="address-name">
                <strong>{orderData.deliveryAddress.fullName}</strong>
              </p>
              <p className="address-text">
                {orderData.deliveryAddress.street}
              </p>
              <p className="address-text">
                {orderData.deliveryAddress.city}, {orderData.deliveryAddress.state}{" "}
                {orderData.deliveryAddress.pincode}
              </p>
              <p className="address-phone">
                📱 {orderData.deliveryAddress.phone}
              </p>
            </div>
          </div>

          {/* ORDER ITEMS */}
          <div className="section-divider"></div>

          <div className="items-section">
            <h3 className="info-title">📦 Your Order Items</h3>
            <div className="items-list">
              {orderData.items.map((item, index) => (
                <div key={index} className="item-preview">
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="item-price">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PRICE SUMMARY */}
          <div className="section-divider"></div>

          <div className="price-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{orderData.subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Charge</span>
              <span>₹{orderData.deliveryCharge}</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount</span>
              <span>₹{orderData.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* WHAT NEXT */}
        <div className="what-next-card">
          <h3>What Happens Next? 🚀</h3>
          <div className="timeline-steps">
            <div className="step active">
              <div className="step-icon">✅</div>
              <div className="step-content">
                <h4>Order Confirmed</h4>
                <p>We received your order</p>
              </div>
            </div>
            <div className="step">
              <div className="step-icon">⚙️</div>
              <div className="step-content">
                <h4>Preparing</h4>
                <p>Our kitchen is preparing your food</p>
              </div>
            </div>
            <div className="step">
              <div className="step-icon">🚚</div>
              <div className="step-content">
                <h4>Shipped</h4>
                <p>Your order is on the way</p>
              </div>
            </div>
            <div className="step">
              <div className="step-icon">🎉</div>
              <div className="step-content">
                <h4>Delivered</h4>
                <p>Enjoy your delicious food!</p>
              </div>
            </div>
          </div>
        </div>

        {/* INFO BOX */}
        <div className="info-box">
          <div className="info-box-content">
            <h4>💡 Order Status & Delivery</h4>
            <ul>
              <li>📧 You'll receive a confirmation email shortly</li>
              <li>
                📱 We'll send SMS updates as your order progresses
              </li>
              <li>📦 Expected delivery within 30-45 minutes</li>
              <li>
                ❓ Questions? Visit your order page for details
              </li>
            </ul>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="success-actions">
          <button className="btn-view-order" onClick={handleViewOrder}>
            📋 View Order Status
          </button>
          <button className="btn-continue-shopping" onClick={handleContinueShopping}>
            🛒 Continue Shopping
          </button>
        </div>

        {/* FOOTER NOTE */}
        <div className="success-footer">
          <p>🎭 Thank you for choosing Mewar Delights! 🎭</p>
          <p className="footer-subtext">
            Cooked with Tradition • Passed through Generations
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
