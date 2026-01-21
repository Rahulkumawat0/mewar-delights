import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

export default function Login() {
  const { register, handleSubmit, formState: { errors } }= useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      login(result.user, result.token);

      // 🎯 Redirect after login
      navigate("/");

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#fff7ed" }}
    >
      <div className="card shadow-lg border-0" style={{ width: "420px" }}>
        <div className="card-body p-4">

          {/* Header */}
          <h3 className="text-center fw-bold mb-2" style={{ color: "#7c2d12" }}>
            Welcome Back
          </h3>
          <p className="text-center text-muted mb-4">
            Taste tradition, one login away
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Email */}
            <div className="mb-3">
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
            <div className="mb-3">
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
            <button
              type="submit"
              className="btn w-100 hero-btn"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-center mt-3 mb-0">
            New here?{" "}
            <Link to="/signup" className="fw-semibold text-decoration-none" style={{ color: "#ffd700" }}>
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
