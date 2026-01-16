import { Link } from "react-router-dom";

export default function Account() {
  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#fff7ed", minHeight: "100vh" }}
    >
      <div className="container">
        {/* Page Title */}
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: "#6b0f1a" }}>
            My Account
          </h2>
          <p className="text-muted">
            Manage your profile & orders at Mewar Delight
          </p>
        </div>

        <div className="row justify-content-center">
          {/* Profile Card */}
          <div className="col-md-5 mb-4">
            <div className="card shadow border-0 rounded-4">
              <div className="card-body p-4">
                <h5
                  className="fw-semibold mb-3"
                  style={{ color: "#6b0f1a" }}
                >
                  Profile Information
                </h5>

                <p className="mb-2">
                  <strong>Name:</strong> Rahul Kumawat
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> rahul@example.com
                </p>
                <p className="mb-4">
                  <strong>Member Since:</strong> Jan 2026
                </p>

                <button className="btn btn-outline-danger w-100">
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Orders Card */}
          <div className="col-md-5 mb-4">
            <div className="card shadow border-0 rounded-4 h-100">
              <div className="card-body p-4">
                <h5
                  className="fw-semibold mb-3"
                  style={{ color: "#6b0f1a" }}
                >
                  My Orders
                </h5>

                <p className="text-muted">
                  You haven’t placed any orders yet.
                </p>

                <Link to="/menu" className="btn btn-primary w-100">
                  Explore Traditional Sweets
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-5">
          <small className="text-muted">
            Cooked with Tradition • Passed through Generations
          </small>
        </div>
      </div>
    </div>
  );
}
