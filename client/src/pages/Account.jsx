import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";
import "./Account.css";

export default function Account() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [memberSince, setMemberSince] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Format the member since date
    const joinDate = new Date();
    setMemberSince(joinDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }));

    // Fetch user's orders
    fetchOrders();
  }, [user, navigate, token]);

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

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        
        // Calculate total spent
        const total = data.reduce((sum, order) => sum + order.totalAmount, 0);
        setTotalSpent(total);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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

  if (!user) {
    return null;
  }

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="account-page">
      {/* HERO SECTION */}
      <div className="account-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome, {user.name}! 👋</h1>
          <p>Manage your Mewar Delights account</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="account-container">
        <div className="container-fluid">
          <div className="row g-4">
            {/* PROFILE CARD */}
            <div className="col-lg-4 col-md-6">
              <div className="profile-card">
                <div className="profile-header">
                  <div className="profile-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="profile-body">
                  <h3 className="profile-name">{user.name}</h3>
                  
                  <div className="profile-details">
                    <div className="detail-item">
                      <span className="detail-label">📧 Email</span>
                      <p className="detail-value">{user.email}</p>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">📅 Member Since</span>
                      <p className="detail-value">{memberSince}</p>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">✨ Account Status</span>
                      <p className="detail-value active-status">Active</p>
                    </div>
                  </div>

                  <button className="btn-logout" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              </div>
            </div>

            {/* QUICK STATS */}
            <div className="col-lg-4 col-md-6">
              <div className="stats-card">
                <div className="stat-item">
                  <span className="stat-icon">🛒</span>
                  <div className="stat-content">
                    <h4>Orders</h4>
                    <p className="stat-number">{orders.length}</p>
                  </div>
                </div>

                <div className="stat-item">
                  <span className="stat-icon">💰</span>
                  <div className="stat-content">
                    <h4>Total Spent</h4>
                    <p className="stat-number">₹{totalSpent}</p>
                  </div>
                </div>

                <div className="stat-item">
                  <span className="stat-icon">⭐</span>
                  <div className="stat-content">
                    <h4>Loyalty Points</h4>
                    <p className="stat-number">{Math.floor(totalSpent / 100)}</p>
                  </div>
                </div>

                <div className="stat-item">
                  <span className="stat-icon">🎁</span>
                  <div className="stat-content">
                    <h4>Offers</h4>
                    <p className="stat-number">{orders.length > 2 ? 3 : 1}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="col-lg-4 col-md-6">
              <div className="actions-card">
                <h3 className="actions-title">Quick Actions</h3>

                <div className="action-list">
                  <a href="/menu" className="action-btn">
                    <span className="action-icon">🍲</span>
                    <div className="action-text">
                      <h5>Browse Menu</h5>
                      <p>Explore our delicious dishes</p>
                    </div>
                    <span className="arrow">→</span>
                  </a>

                  <a href="/cart" className="action-btn">
                    <span className="action-icon">🛍️</span>
                    <div className="action-text">
                      <h5>View Cart</h5>
                      <p>Check your shopping cart</p>
                    </div>
                    <span className="arrow">→</span>
                  </a>

                  <Link to="/orders" className="action-btn">
                    <span className="action-icon">📋</span>
                    <div className="action-text">
                      <h5>My Orders</h5>
                      <p>Track your deliveries</p>
                    </div>
                    <span className="arrow">→</span>
                  </Link>

                  <button className="action-btn" disabled>
                    <span className="action-icon">⚙️</span>
                    <div className="action-text">
                      <h5>Settings</h5>
                      <p>Coming Soon</p>
                    </div>
                    <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS SECTION */}
      {!isLoading && orders.length > 0 && (
        <div className="recent-orders-section">
          <div className="container-fluid">
            <h2 className="section-title">📦 Recent Orders</h2>
            <div className="recent-orders-grid">
              {recentOrders.map((order) => (
                <div key={order._id} className="recent-order-card">
                  <div className="order-header-mini">
                    <div className="order-id-mini">Order {order._id.slice(-6).toUpperCase()}</div>
                    <span
                      className="status-badge-mini"
                      style={{ backgroundColor: getStatusBadgeColor(order.status) }}
                    >
                      {getStatusIcon(order.status)} {order.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="order-body-mini">
                    <div className="order-info-row">
                      <span className="label">Items:</span>
                      <span className="value">{order.items.length}</span>
                    </div>
                    <div className="order-info-row">
                      <span className="label">Amount:</span>
                      <span className="value fw-bold">₹{order.totalAmount}</span>
                    </div>
                    <div className="order-info-row">
                      <span className="label">Date:</span>
                      <span className="value">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          year: "2-digit"
                        })}
                      </span>
                    </div>
                  </div>

                  <Link to="/orders" className="view-details-btn">
                    View Details →
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-4">
              <Link to="/orders" className="btn-view-all-orders">
                View All Orders ({orders.length})
              </Link>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading-section">
          <p>Loading your orders...</p>
        </div>
      )}

      {/* BENEFITS SECTION */}
      <div className="benefits-section">
        <div className="container-fluid">
          <h2 className="section-title">Why Order from Mewar Delights?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🏆</div>
              <h4>Royal Recipes</h4>
              <p>Authentic dishes from the heart of Mewar</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌟</div>
              <h4>Fresh & Quality</h4>
              <p>Carefully selected ingredients for best taste</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h4>Quick Delivery</h4>
              <p>Fast and reliable delivery to your doorstep</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">💝</div>
              <h4>Special Offers</h4>
              <p>Exclusive deals and loyalty rewards</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="account-footer">
        <p>🎭 Cooked with Tradition • Passed through Generations 🎭</p>
        <p className="small-text">© 2026 Mewar Delights. All rights reserved.</p>
      </div>
    </div>
  );
}
