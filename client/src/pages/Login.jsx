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

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        setIsLoading(false);
        return;
      }

      login(result.user, result.token);

      // 🎯 Redirect after login
      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
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

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required"
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
