import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signupUser } from "../../features/auth/authAPI";


const Signup = () => {

  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] =
    useState("user");

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
      confirmPassword: "",
      businessName: "",
      drivingLicense: "",
      gstNumber: "",
      vehicleCount: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "vehicleCount"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);
      const data = await signupUser(formData, selectedRole);
      console.log(data);
      alert("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#efeff1] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div
          className="relative hidden lg:flex flex-col justify-between p-10 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10">
            <h1 className="text-3xl font-black text-white leading-tight">
              URBAN<span className="text-lime-400">RIDE</span>
            </h1>
            <p className="text-gray-200 mt-4 text-sm max-w-sm">
              Join India's premium luxury car rental marketplace.
            </p>
          </div>

          <div className="relative z-10 text-white">
            <h2 className="text-2xl font-black mb-3">Drive Luxury</h2>
            <p className="text-gray-200 text-sm">
              Premium rides, trusted vendors and secure vehicle booking.
            </p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 md:p-8 lg:p-10 overflow-y-auto max-h-screen">

          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-black mb-2">Create Account</h1>
            <p className="text-gray-500 text-sm">Start your UrbanRide journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole("user")}
                className={`py-3 rounded-xl text-sm font-semibold transition ${selectedRole === "user" ? "bg-black text-white" : "bg-gray-100"}`}
              >
                User Signup
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("vendor")}
                className={`py-3 rounded-xl text-sm font-semibold transition ${selectedRole === "vendor" ? "bg-lime-400 text-black" : "bg-gray-100"}`}
              >
                Vendor Signup
              </button>
            </div>

            <input type="text" name="username" placeholder="Full Name" onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400" required />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400" required />
            <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400" required />
            <textarea name="address" placeholder="Address" rows="2" onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400 resize-none" required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400" required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400" required />

            {selectedRole === "vendor" && (
              <div className="border-t pt-4 mt-2">
                <h2 className="text-sm font-bold mb-3">Vendor Information</h2>
                <div className="space-y-3">
                  <input type="text" name="businessName" placeholder="Business Name" onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400" />
                  <input type="text" name="drivingLicense" placeholder="Driving License Number" onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400" />
                  <input type="text" name="gstNumber" placeholder="GST Number" onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400" />
                  <input type="number" name="vehicleCount" placeholder="Number of Vehicles" onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400" />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold transition"
            >
              {loading ? "Creating Account..." : `Signup as ${selectedRole}`}
            </button>

          </form>

          <div className="mt-5 text-center text-sm text-gray-500">
            Already have an account?
            <Link to="/login" className="text-lime-600 font-semibold ml-1">Login</Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;
