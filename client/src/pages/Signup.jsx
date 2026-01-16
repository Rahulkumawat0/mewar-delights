import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        "https://mewar-delights-api.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      // alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#fff7ed" }}
    >
      <div className="card shadow-lg border-0" style={{ width: "420px" }}>
        <div className="card-body p-4">

          <h3 className="text-center fw-bold mb-2" style={{ color: "#7c2d12" }}>
            Join Mewar Delight
          </h3>
          <p className="text-center text-muted mb-4">
            Cooked with tradition, passed through generations
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Name */}
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" }
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn w-100 hero-btn"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <Link to="/login" className="fw-semibold text-decoration-none" style={{ color: "#ffd700" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
