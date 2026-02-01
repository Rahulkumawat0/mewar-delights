import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedAdminRoute Component
 * Only allows access to admin users
 * Redirects non-admin users to home page
 */
export default function ProtectedAdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh" 
      }}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Check if user exists and has admin role
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is admin (you may need to fetch this from server)
  // For now, we'll check from localStorage or props
  const isAdmin = user.role === "admin" || localStorage.getItem("userRole") === "admin";

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
