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

      // Vendor fields
      businessName: "",
      drivingLicense: "",
      gstNumber: "",
      vehicleCount: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      return alert(
        "Passwords do not match"
      );
    }

    try {

      setLoading(true);

      const data =
        await signupUser(
          formData,
          selectedRole
        );

      console.log(data);

      alert(
        "Account created successfully"
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Signup failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#efeff1] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-7xl bg-white rounded-[40px] overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div
          className="relative hidden lg:flex flex-col justify-between p-12 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop')",
          }}
        >

          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10">

            <h1 className="text-5xl font-black text-white leading-tight">

              URBAN
              <span className="text-lime-400">
                RIDE
              </span>

            </h1>

            <p className="text-gray-200 mt-6 text-lg max-w-md">

              Join India's premium luxury
              car rental marketplace.

            </p>

          </div>

          <div className="relative z-10 text-white">

            <h2 className="text-4xl font-black mb-4">

              Drive Luxury

            </h2>

            <p className="text-gray-200">

              Premium rides, trusted vendors
              and secure vehicle booking.

            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 md:p-10 lg:p-14 overflow-y-auto">

          <div className="mb-8">

            <h1 className="text-4xl md:text-5xl font-black mb-3">

              Create Account

            </h1>

            <p className="text-gray-500 text-lg">

              Start your UrbanRide journey

            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* ROLE SELECTOR */}
            <div className="grid grid-cols-2 gap-4">

              <button
                type="button"
                onClick={() =>
                  setSelectedRole("user")
                }
                className={`py-4 rounded-2xl font-semibold transition ${selectedRole === "user"
                    ? "bg-black text-white"
                    : "bg-gray-100"
                  }`}
              >

                User Signup

              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedRole("vendor")
                }
                className={`py-4 rounded-2xl font-semibold transition ${selectedRole === "vendor"
                    ? "bg-lime-400 text-black"
                    : "bg-gray-100"
                  }`}
              >

                Vendor Signup

              </button>

            </div>

            {/* USERNAME */}
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
              required
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
              required
            />

            {/* PHONE */}
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
              required
            />

            {/* ADDRESS */}
            <textarea
              name="address"
              placeholder="Address"
              rows="3"
              onChange={handleChange}
              className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
              required
            />

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
              required
            />

            {/* CONFIRM PASSWORD */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
              required
            />

            {/* VENDOR EXTRA FIELDS */}
            {
              selectedRole === "vendor" && (
                <>

                  <div className="border-t pt-6">

                    <h2 className="text-2xl font-bold mb-5">

                      Vendor Information

                    </h2>

                    <div className="space-y-5">

                      <input
                        type="text"
                        name="businessName"
                        placeholder="Business Name"
                        onChange={handleChange}
                        className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
                      />

                      <input
                        type="text"
                        name="drivingLicense"
                        placeholder="Driving License Number"
                        onChange={handleChange}
                        className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
                      />

                      <input
                        type="text"
                        name="gstNumber"
                        placeholder="GST Number"
                        onChange={handleChange}
                        className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
                      />

                      <input
                        type="number"
                        name="vehicleCount"
                        placeholder="Number of Vehicles"
                        onChange={handleChange}
                        className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
                      />

                    </div>

                  </div>

                </>
              )
            }

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-2xl font-semibold text-lg transition"
            >

              {
                loading
                  ? "Creating Account..."
                  : `Signup as ${selectedRole}`
              }

            </button>

          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center text-gray-500">

            Already have an account?

            <Link
              to="/login"
              className="text-lime-600 font-semibold ml-2"
            >

              Login

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;