import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../api/auth.api";
import logo from "../../assets/vtube-logo.png";

export default function Navbar({ onMenuClick }) {
  const { user, setUser, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (location.pathname === "/search") {
      const params = new URLSearchParams(location.search);
      setSearchQuery(params.get("q") || "");
      return;
    }
    setSearchQuery("");
  }, [location.pathname, location.search]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout failed");
    } finally {
      // clear auth state no matter what
      setUser(null);
      navigate("/login");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950 border-b border-neutral-800">
      <div className="flex items-center justify-between px-4 md:px-6 h-14">

        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-800"
          >
            <HiMenu className="text-xl" />
          </button>

          <Link to="/" className="flex items-center">
            <img src={logo} alt="VTube" className="h-7 w-auto" />
          </Link>
        </div>

        {/* Center */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-xl mx-6"
        >
          <input
            type="text"
            placeholder="Search videos or channels"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full px-4 py-2 rounded-full
              bg-neutral-900 border border-neutral-800
              text-sm placeholder:text-neutral-500
              focus:outline-none focus:ring-2 focus:ring-orange-400/40
            "
          />
        </form>

        {/* Right */}
        <div className="flex items-center gap-3">
          {loading && null}

          {/* ❌ Not logged in */}
          {!loading && !user && (
            <>
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-lg
                           bg-neutral-800 hover:bg-neutral-700
                           text-orange-400 text-sm font-medium"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-3 py-1.5 rounded-lg
                           bg-orange-400 hover:bg-orange-500
                           text-black text-sm font-medium"
              >
                Sign up
              </Link>
            </>
          )}

          {/* ✅ Logged in */}
          {!loading && user && (
            <div className="flex items-center gap-3">
              <Link
                to={`/c/${user.username}`}
                className="flex items-center gap-2"
              >
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-sm text-neutral-200">
                  {user.username}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="
                  px-3 py-1.5 rounded-lg
                  bg-orange-600 hover:bg-neutral-700
                  text-neutral-100 hover:text-orange-600
                  text-sm font-medium transition
                "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
