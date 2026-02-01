import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";
import "./AdminOrders.css";

export default function AdminOrders({ token }) {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  
  // Modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  useEffect(() => {
    filterAndSortOrders();
  }, [orders, statusFilter, searchTerm, sortBy]);

  const fetchAllOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/admin/all?status=all`,
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
      setOrders(data.orders);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortOrders = () => {
    let filtered = [...orders];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Search by order ID or customer name
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order._id.toLowerCase().includes(searchLower) ||
        order.user.name.toLowerCase().includes(searchLower) ||
        order.user.email.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredOrders(filtered);
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setUpdateStatus(order.status);
    setShowModal(true);
  };

  const closeOrderModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setUpdateStatus("");
  };

  const updateOrderStatus = async () => {
    if (!selectedOrder || !updateStatus) return;

    setIsUpdating(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/${selectedOrder._id}`,
        {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ status: updateStatus })
        }
      );

      if (!response.ok) {
        setError("Failed to update order status");
        setIsUpdating(false);
        return;
      }

      // Update local state
      const updatedOrders = orders.map(order =>
        order._id === selectedOrder._id
          ? { ...order, status: updateStatus }
          : order
      );
      setOrders(updatedOrders);
      
      setSuccess(`Order status updated to ${updateStatus}!`);
      setTimeout(() => setSuccess(null), 3000);
      
      closeOrderModal();
    } catch (err) {
      console.error("Error updating order:", err);
      setError("Error updating order. Please try again.");
    } finally {
      setIsUpdating(false);
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
    <div className="admin-orders-container">
      {/* Success Message */}
      {success && (
        <div className="alert alert-success alert-dismissible fade show">
          {success}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccess(null)}
          ></button>
        </div>
      )}

      {/* Error Message */}
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

      {/* Controls Section */}
      <div className="orders-controls">
        <div className="controls-row">
          {/* Search */}
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search by Order ID, Customer Name or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          {/* Status Filter */}
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">⏳ Pending</option>
            <option value="paid">✅ Paid</option>
            <option value="processing">⚙️ Processing</option>
            <option value="shipped">🚚 Shipped</option>
            <option value="delivered">🎉 Delivered</option>
            <option value="cancelled">❌ Cancelled</option>
          </select>

          {/* Sort */}
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          {/* Refresh Button */}
          <button
            className="btn-refresh"
            onClick={fetchAllOrders}
            disabled={isLoading}
          >
            🔄 Refresh
          </button>
        </div>

        {/* Results Count */}
        <div className="results-count">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
      </div>

      {/* Orders List */}
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading orders...</p>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Items</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className={`order-row status-${order.status}`}>
                  <td className="order-id">#{order._id.slice(-6).toUpperCase()}</td>
                  <td className="customer-info">
                    <div className="customer-name">{order.user.name}</div>
                    <div className="customer-email">{order.user.email}</div>
                  </td>
                  <td className="status-cell">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {getStatusIcon(order.status)} {order.status}
                    </span>
                  </td>
                  <td className="amount">₹{order.totalAmount}</td>
                  <td className="items-count">{order.items.length} item(s)</td>
                  <td className="date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="action">
                    <button
                      className="btn-view-update"
                      onClick={() => openOrderModal(order)}
                    >
                      View & Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-orders-message">
          <p>No orders found matching your filters.</p>
        </div>
      )}

      {/* Order Detail Modal */}
      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={closeOrderModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details</h3>
              <button className="btn-close-modal" onClick={closeOrderModal}>✕</button>
            </div>

            <div className="modal-body">
              {/* Order Header */}
              <div className="modal-section">
                <h5>Order Information</h5>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Order ID</label>
                    <p>#{selectedOrder._id}</p>
                  </div>
                  <div className="info-item">
                    <label>Status</label>
                    <p>
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(selectedOrder.status) }}
                      >
                        {getStatusIcon(selectedOrder.status)} {selectedOrder.status}
                      </span>
                    </p>
                  </div>
                  <div className="info-item">
                    <label>Total Amount</label>
                    <p>₹{selectedOrder.totalAmount}</p>
                  </div>
                  <div className="info-item">
                    <label>Date</label>
                    <p>{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="modal-section">
                <h5>Customer Information</h5>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Name</label>
                    <p>{selectedOrder.user.name}</p>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <p>{selectedOrder.user.email}</p>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              {selectedOrder.deliveryAddress && (
                <div className="modal-section">
                  <h5>Delivery Address</h5>
                  <div className="address-box">
                    <p><strong>{selectedOrder.deliveryAddress.fullName}</strong></p>
                    <p>{selectedOrder.deliveryAddress.street}</p>
                    <p>{selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.state} - {selectedOrder.deliveryAddress.pincode}</p>
                    <p>Phone: {selectedOrder.deliveryAddress.phone}</p>
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="modal-section">
                <h5>Items ({selectedOrder.items.length})</h5>
                <div className="items-list">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="item-row">
                      <span className="item-name">{item.name}</span>
                      <span className="item-qty">Qty: {item.quantity}</span>
                      <span className="item-price">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="modal-section summary-section">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{selectedOrder.subtotal}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Charge:</span>
                  <span>₹{selectedOrder.deliveryCharge}</span>
                </div>
                <div className="summary-row total">
                  <span>Total Amount:</span>
                  <span>₹{selectedOrder.totalAmount}</span>
                </div>
              </div>

              {/* Update Status Section */}
              <div className="modal-section status-update-section">
                <h5>Update Order Status</h5>
                <div className="status-update-form">
                  <select
                    className="status-select"
                    value={updateStatus}
                    onChange={(e) => setUpdateStatus(e.target.value)}
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="paid">✅ Paid</option>
                    <option value="processing">⚙️ Processing</option>
                    <option value="shipped">🚚 Shipped</option>
                    <option value="delivered">🎉 Delivered</option>
                    <option value="cancelled">❌ Cancelled</option>
                  </select>
                  <button
                    className="btn-update-status"
                    onClick={updateOrderStatus}
                    disabled={isUpdating || updateStatus === selectedOrder.status}
                  >
                    {isUpdating ? "Updating..." : "Update Status"}
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-close-modal-footer" onClick={closeOrderModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
