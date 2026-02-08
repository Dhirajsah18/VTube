import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import AuthLayout from "../layout/AuthLayout";
import { loginUser } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  // 👇 redirect back to requested page (or home)
  const redirectTo = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser(form);

      // backend returns user inside data
      setUser(res.data.data);

      // 👇 go back to protected page user wanted
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-xl font-semibold text-center mb-6">
        Login to{" "}
        <span className="font-semibold">
          <span className="text-orange-400">V</span>Tube
        </span>
      </h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 text-red-400 px-4 py-2 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-neutral-400">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="
              w-full px-3 py-2 rounded-lg
              bg-neutral-800 border border-neutral-700
              text-sm placeholder:text-neutral-500
              focus:outline-none focus:ring-2 focus:ring-orange-400/40
            "
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-neutral-400">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="
              w-full px-3 py-2 rounded-lg
              bg-neutral-800 border border-neutral-700
              text-sm placeholder:text-neutral-500
              focus:outline-none focus:ring-2 focus:ring-orange-400/40
            "
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full mt-2 px-4 py-2 rounded-lg
            bg-orange-400 hover:bg-orange-500 active:bg-orange-600
            text-black font-medium transition
            disabled:opacity-60
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-sm text-neutral-400 text-center">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="text-orange-400 hover:text-orange-300"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
