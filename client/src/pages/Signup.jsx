import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthLayout from "../layout/AuthLayout";
import { registerUser } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

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

    if (
      !form.fullname ||
      !form.username ||
      !form.email ||
      !form.password ||
      !avatar
    ) {
      setError("All fields and avatar are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("fullname", form.fullname);
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);

      // ✅ SAME VARIABLE NAMES AS STATE
      formData.append("avatar", avatar);
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      const res = await registerUser(formData);

      // backend returns user in data
      setUser(res.data.data);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-xl font-semibold text-center mb-6">
        Create your{" "}
        <span className="font-bold">
          <span className="text-orange-400">V</span>Tube
        </span>{" "}
        account
      </h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 text-red-400 px-4 py-2 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm mb-1 text-neutral-400">
            Full Name
          </label>
          <input
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm mb-1 text-neutral-400">
            Username
          </label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="johndoe"
            className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40"
          />
        </div>

        {/* Email */}
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
            className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40"
          />
        </div>

        {/* Password */}
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
            className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40"
          />
        </div>

        {/* Avatar */}
        <div>
          <label className="block text-sm mb-1 text-neutral-400">
            Avatar (required)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="block w-full text-sm text-neutral-400"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm mb-1 text-neutral-400">
            Cover Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="block w-full text-sm text-neutral-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 px-4 py-2 rounded-lg bg-orange-400 hover:bg-orange-500 active:bg-orange-600 text-black font-medium transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="mt-6 text-sm text-neutral-400 text-center">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-orange-400 hover:text-orange-300"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
