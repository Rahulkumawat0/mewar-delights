import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";
import "./Auth.css";

export default function Login() {
  const { register, handleSubmit, formState: { errors } }= useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError("");

    // Create abort controller for 8 second timeout
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 8000);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: abortController.signal
      });

      clearTimeout(timeoutId);
      const result = await res.json();

      if (!res.ok) {
        setApiError(result.message || "Login failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // Successful login
      login(result.user, result.token);
      setIsLoading(false);
      navigate("/");

    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        setApiError("Connection timeout. Please check your internet and try again.");
      } else if (!navigator.onLine) {
        setApiError("No internet connection. Please check your network.");
      } else {
        setApiError("An error occurred. Please try again.");
        console.error("Login error:", error);
      }
      setIsLoading(false);
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card-body">

          {/* Header */}
          <h3 className="auth-title">Welcome Back</h3>
          <p className="auth-subtitle">Taste tradition, one login away</p>

          {/* Error Message */}
          {apiError && (
            <div className="auth-error-banner">
              <span>⚠️</span> {apiError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="you@example.com"
                disabled={isLoading}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format"
                  }
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="••••••••"
                disabled={isLoading}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters"
                  }
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Button */}
            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span> Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="auth-footer">
            New here?{" "}
            <Link to="/signup">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
