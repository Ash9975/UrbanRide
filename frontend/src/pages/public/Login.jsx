import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../features/auth/authAPI";
import useAuth from "../../features/auth/useAuth";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [selectedRole, setSelectedRole] =
    useState("user");

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await loginUser(formData, selectedRole);
      login(data);

      if (selectedRole === "admin") {
        navigate("/admin/dashboard");
      } else if (selectedRole === "vendor") {
        navigate("/vendor/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#efeff1] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div
          className="relative hidden md:flex flex-col justify-between p-10 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10">
            <h1 className="text-3xl font-black text-white leading-tight">
              URBAN<span className="text-lime-400">RIDE</span>
            </h1>
            <p className="text-gray-200 mt-4 text-sm max-w-sm">
              Premium luxury vehicle rental platform with secure booking and professional ride experience.
            </p>
          </div>

          <div className="relative z-10 text-white">
            <h2 className="text-2xl font-black mb-3">Luxury Car Rental</h2>
            <p className="text-gray-200 text-sm">
              Book premium vehicles for business, travel, weddings and luxury rides.
            </p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-10 flex flex-col justify-center">

          <div className="mb-8">
            {selectedRole === "vendor" ? (
              <>
                <h1 className="text-2xl md:text-3xl font-black mb-2">Vendor Portal</h1>
                <p className="text-gray-500 text-sm">
                  Manage vehicles, bookings, earnings and grow your rental business with Urban Ride.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-lime-50 p-3 rounded-xl">
                    <h3 className="font-bold text-lg">24/7</h3>
                    <p className="text-[10px] text-gray-500">Booking Access</p>
                  </div>
                  <div className="bg-black text-white p-3 rounded-xl">
                    <h3 className="font-bold text-lg">Vendor</h3>
                    <p className="text-[10px] text-gray-300">Dashboard Control</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl md:text-3xl font-black mb-2">Welcome Back</h1>
                <p className="text-gray-500 text-sm">
                  Login to continue your luxury vehicle booking experience.
                </p>
                <div className="mt-4 bg-gray-50 p-4 rounded-xl">
                  <p className="text-xs text-gray-600 space-y-1">
                    <span className="block">✔ Luxury vehicles</span>
                    <span className="block">✔ Premium rides</span>
                    <span className="block">✔ Secure bookings</span>
                  </p>
                </div>
              </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole("user")}
                className={`py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedRole === "user" ? "bg-black text-white" : "bg-gray-100 text-black"}`}
              >
                User Login
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("vendor")}
                className={`py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedRole === "vendor" ? "bg-lime-400 text-black" : "bg-gray-100 text-black"}`}
              >
                Vendor Login
              </button>
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold transition"
            >
              {loading ? "Logging in..." : `Login as ${selectedRole}`}
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Premium Vehicle Rental Marketplace Platform
          </div>

          <div className="text-xs text-center font-semibold text-gray-400 mt-1">
            Create new account <Link to="/signup" className="text-lime-600 hover:underline">Sign Up</Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
