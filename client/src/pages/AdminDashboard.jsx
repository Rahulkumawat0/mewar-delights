import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import AdminOrders from "./AdminOrders";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is admin
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchDashboardStats();
    }
  }, [activeTab]);

  const fetchDashboardStats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/admin/stats`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        setError("Failed to fetch statistics");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setStats(data.stats);
      setRecentOrders(data.recentOrders);
      setError(null);
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "#ff9800",
      paid: "#4caf50",
      processing: "#2196f3",
      shipped: "#9c27b0",
      delivered: "#4caf50",
      cancelled: "#f44336"
    };
    return colors[status] || "#999";
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
    <div className="admin-dashboard-container">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-title-section">
            <h1 className="admin-title">🍱 Admin Dashboard</h1>
            <p className="admin-subtitle">Mewar Delights Order Management</p>
          </div>
          <div className="admin-user-info">
            <span className="admin-badge">👑 Admin</span>
            <span className="admin-name">{user.name}</span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="admin-nav-tabs">
        <button
          className={`admin-tab ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          📊 Dashboard
        </button>
        <button
          className={`admin-tab ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          📦 Manage Orders
        </button>
      </div>

      {/* Tab Content */}
      <div className="admin-content">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="dashboard-tab">
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

            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading dashboard...</p>
              </div>
            ) : stats ? (
              <>
                {/* Statistics Cards */}
                <div className="stats-grid">
                  {/* Total Orders Card */}
                  <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-content">
                      <p className="stat-label">Total Orders</p>
                      <p className="stat-value">{stats.totalOrders}</p>
                    </div>
                  </div>

                  {/* Pending Card */}
                  <div className="stat-card pending">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-content">
                      <p className="stat-label">Pending</p>
                      <p className="stat-value">{stats.pendingOrders}</p>
                    </div>
                  </div>

                  {/* Paid Card */}
                  <div className="stat-card paid">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                      <p className="stat-label">Paid</p>
                      <p className="stat-value">{stats.paidOrders}</p>
                    </div>
                  </div>

                  {/* Processing Card */}
                  <div className="stat-card processing">
                    <div className="stat-icon">⚙️</div>
                    <div className="stat-content">
                      <p className="stat-label">Processing</p>
                      <p className="stat-value">{stats.processingOrders}</p>
                    </div>
                  </div>

                  {/* Shipped Card */}
                  <div className="stat-card shipped">
                    <div className="stat-icon">🚚</div>
                    <div className="stat-content">
                      <p className="stat-label">Shipped</p>
                      <p className="stat-value">{stats.shippedOrders}</p>
                    </div>
                  </div>

                  {/* Delivered Card */}
                  <div className="stat-card delivered">
                    <div className="stat-icon">🎉</div>
                    <div className="stat-content">
                      <p className="stat-label">Delivered</p>
                      <p className="stat-value">{stats.deliveredOrders}</p>
                    </div>
                  </div>

                  {/* Cancelled Card */}
                  <div className="stat-card cancelled">
                    <div className="stat-icon">❌</div>
                    <div className="stat-content">
                      <p className="stat-label">Cancelled</p>
                      <p className="stat-value">{stats.cancelledOrders}</p>
                    </div>
                  </div>

                  {/* Total Revenue Card */}
                  <div className="stat-card revenue">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                      <p className="stat-label">Total Revenue</p>
                      <p className="stat-value">₹{stats.totalRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Recent Orders Section */}
                <div className="recent-orders-section">
                  <h3 className="section-title">📋 Recent Orders</h3>
                  <div className="recent-orders-list">
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                        <div key={order._id} className="recent-order-item">
                          <div className="order-header">
                            <span className="order-id">Order #{order._id.slice(-6).toUpperCase()}</span>
                            <span
                              className="order-status-badge"
                              style={{ backgroundColor: getStatusColor(order.status) }}
                            >
                              {getStatusIcon(order.status)} {order.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="order-body">
                            <div className="order-customer">
                              <strong>{order.user.name}</strong> - {order.user.email}
                            </div>
                            <div className="order-amount">
                              ₹{order.totalAmount}
                            </div>
                          </div>
                          <div className="order-footer">
                            <small>{new Date(order.createdAt).toLocaleDateString()}</small>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="no-orders">No orders yet</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <p>No data available</p>
            )}
          </div>
        )}

        {/* Orders Management Tab */}
        {activeTab === "orders" && (
          <AdminOrders token={token} />
        )}
      </div>
    </div>
  );
}
