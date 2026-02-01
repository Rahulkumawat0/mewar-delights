import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import "./OrderHistory.css";

function OrderHistory() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/user/${user.id}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        setError("Failed to fetch orders");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    const statusColors = {
      pending: "#ff9800",
      paid: "#4caf50",
      processing: "#2196f3",
      shipped: "#9c27b0",
      delivered: "#4caf50",
      cancelled: "#f44336"
    };
    return statusColors[status] || "#999";
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: "⏳",
      paid: "✅",
      processing: "⚙️",
      shipped: "🚚",
      delivered: "🎉",
      cancelled: "❌"
    };
    return icons[status] || "📦";
  };

  return (
    <div className="order-history-container">
      <div className="container my-5">
        <h2 className="order-history-title">📦 Your Orders</h2>

        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3" style={{ color: "#5a0f16" }}>
              Loading your orders...
            </p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger alert-dismissible fade show">
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError(null)}
            ></button>
          </div>
        )}

        {!isLoading && orders.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🛍️</div>
            <h4>No Orders Yet</h4>
            <p>You haven't placed any orders yet. Start shopping now!</p>
            <Link to="/products/all" className="btn btn-place-order-alt">
              🛒 Explore Products
            </Link>
          </div>
        )}

        {!isLoading && orders.length > 0 && (
          <div className="orders-grid">
            {orders.map((order) => (
              <div
                key={order._id}
                className="order-card"
                onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
              >
                <div className="order-card-header">
                  <div className="order-id-section">
                    <span className="order-label">Order ID</span>
                    <span className="order-id">{order._id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="order-date">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </div>
                </div>

                <div className="order-status-bar">
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusBadgeColor(order.status) }}
                  >
                    {getStatusIcon(order.status)} {order.status.toUpperCase()}
                  </span>
                  <span className="order-amount">₹{order.totalAmount}</span>
                </div>

                {/* EXPANDED DETAILS */}
                {selectedOrder === order._id && (
                  <div className="order-details">
                    <div className="details-section">
                      <h6>📍 Delivery Address</h6>
                      <p>
                        {order.deliveryAddress.fullName}
                        <br />
                        {order.deliveryAddress.street}
                        <br />
                        {order.deliveryAddress.city}, {order.deliveryAddress.state}{" "}
                        {order.deliveryAddress.pincode}
                        <br />
                        <strong>📱 {order.deliveryAddress.phone}</strong>
                      </p>
                    </div>

                    <div className="details-section">
                      <h6>📦 Items Ordered</h6>
                      <div className="items-list">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="item-row">
                            <span>{item.name}</span>
                            <span className="qty">x{item.quantity}</span>
                            <span className="price">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="details-section">
                      <h6>💰 Payment Details</h6>
                      <div className="payment-info">
                        <div className="info-row">
                          <span>Subtotal:</span>
                          <span>₹{order.subtotal}</span>
                        </div>
                        <div className="info-row">
                          <span>Delivery Charge:</span>
                          <span>₹{order.deliveryCharge}</span>
                        </div>
                        <div className="info-row total">
                          <span>Total Amount:</span>
                          <span>₹{order.totalAmount}</span>
                        </div>
                        <div className="info-row">
                          <span>Payment Method:</span>
                          <span className="badge-method">
                            {order.paymentMethod === "cod"
                              ? "💰 Cash on Delivery"
                              : "💳 Online Payment"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="details-section">
                        <h6>📝 Special Instructions</h6>
                        <p className="notes">{order.notes}</p>
                      </div>
                    )}

                    <div className="order-timeline">
                      <h6>📅 Order Timeline</h6>
                      <div className="timeline">
                        <div className={`timeline-item ${["pending", "paid", "processing", "shipped", "delivered"].includes(order.status) ? "completed" : ""}`}>
                          <div className="timeline-dot"></div>
                          <div className="timeline-text">
                            <strong>Order Placed</strong>
                            <small>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </small>
                          </div>
                        </div>

                        <div className={`timeline-item ${["paid", "processing", "shipped", "delivered"].includes(order.status) ? "completed" : ""}`}>
                          <div className="timeline-dot"></div>
                          <div className="timeline-text">
                            <strong>Payment {order.status === "paid" ? "Confirmed" : "Pending"}</strong>
                            <small>
                              {order.paymentDetails?.paidAt
                                ? new Date(order.paymentDetails.paidAt).toLocaleDateString()
                                : "Awaiting payment"}
                            </small>
                          </div>
                        </div>

                        <div className={`timeline-item ${["processing", "shipped", "delivered"].includes(order.status) ? "completed" : ""}`}>
                          <div className="timeline-dot"></div>
                          <div className="timeline-text">
                            <strong>Processing</strong>
                            <small>Your order is being prepared</small>
                          </div>
                        </div>

                        <div className={`timeline-item ${["shipped", "delivered"].includes(order.status) ? "completed" : ""}`}>
                          <div className="timeline-dot"></div>
                          <div className="timeline-text">
                            <strong>Shipped</strong>
                            <small>On the way to you</small>
                          </div>
                        </div>

                        <div className={`timeline-item ${order.status === "delivered" ? "completed" : ""}`}>
                          <div className="timeline-dot"></div>
                          <div className="timeline-text">
                            <strong>Delivered</strong>
                            <small>Order received</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="order-card-footer">
                  <span className="items-count">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </span>
                  <span className="expand-icon">
                    {selectedOrder === order._id ? "▲" : "▼"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && orders.length > 0 && (
          <div className="text-center mt-5">
            <Link to="/products/all" className="btn btn-place-order-alt">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
