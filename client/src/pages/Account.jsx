import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import "./Account.css";

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [memberSince, setMemberSince] = useState("");

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
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return null;
  }

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
                    <p className="stat-number">0</p>
                  </div>
                </div>

                <div className="stat-item">
                  <span className="stat-icon">❤️</span>
                  <div className="stat-content">
                    <h4>Favorites</h4>
                    <p className="stat-number">0</p>
                  </div>
                </div>

                <div className="stat-item">
                  <span className="stat-icon">⭐</span>
                  <div className="stat-content">
                    <h4>Loyalty Points</h4>
                    <p className="stat-number">0</p>
                  </div>
                </div>

                <div className="stat-item">
                  <span className="stat-icon">🎁</span>
                  <div className="stat-content">
                    <h4>Offers</h4>
                    <p className="stat-number">3</p>
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

                  <button className="action-btn" disabled>
                    <span className="action-icon">📋</span>
                    <div className="action-text">
                      <h5>My Orders</h5>
                      <p>Coming Soon</p>
                    </div>
                    <span className="arrow">→</span>
                  </button>

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
