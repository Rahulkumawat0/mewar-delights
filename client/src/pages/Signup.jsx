import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "../config/api";
import "./Auth.css";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError("");

    // Create abort controller for 8 second timeout
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 8000);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        }),
        signal: abortController.signal
      });

      clearTimeout(timeoutId);
      const result = await res.json();

      if (!res.ok) {
        setApiError(result.message || "Registration failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // Successful registration - redirect to login
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        setApiError("Connection timeout. Please check your internet and try again.");
      } else if (!navigator.onLine) {
        setApiError("No internet connection. Please check your network.");
      } else {
        setApiError("An error occurred. Please try again.");
        console.error("Signup error:", error);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card-body">

          <h3 className="auth-title">Join Mewar Delights</h3>
          <p className="auth-subtitle">Cooked with tradition, passed through generations</p>

          {/* Error Message */}
          {apiError && (
            <div className="auth-error-banner">
              <span>⚠️</span> {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">

            {/* Name */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter your full name"
                disabled={isLoading}
                {...register("name", { 
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters"
                  },
                  maxLength: {
                    value: 50,
                    message: "Name must be less than 50 characters"
                  }
                })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email</label>
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
                <div className="invalid-feedback">{errors.email.message}</div>
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
                    message: "Password must be at least 6 characters" 
                  },
                  maxLength: {
                    value: 50,
                    message: "Password must be less than 50 characters"
                  }
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                placeholder="••••••••"
                disabled={isLoading}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => 
                    value === password || "Passwords do not match"
                })}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span> Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
