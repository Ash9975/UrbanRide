import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    console.log(selectedRole);

    try {

      setLoading(true);

      const data =
        await loginUser(
          formData,
          selectedRole
        );

      console.log(data);

      login(data);

      // ROLE BASED REDIRECT
      if (
        selectedRole === "admin"
      ) {

        navigate(
          "/admin/dashboard"
        );

      } else if (
        selectedRole === "vendor"
      ) {

        navigate(
          "/vendor/dashboard"
        );

      } else {

        navigate("/");
      }

    } catch (error) {

      console.log(
        error.response?.data
      );

      alert(
        error.response?.data?.message
        || "Login failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#efeff1] flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-6xl bg-white rounded-[40px] overflow-hidden shadow-2xl grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div
          className="relative hidden md:flex flex-col justify-between p-12 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop')",
          }}
        >

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10">

            <h1 className="text-5xl font-black text-white leading-tight">

              URBAN
              <span className="text-lime-400">
                RIDE
              </span>

            </h1>

            <p className="text-gray-200 mt-6 text-lg max-w-md">

              Premium luxury vehicle
              rental platform with
              secure booking and
              professional ride
              experience.

            </p>

          </div>

          <div className="relative z-10 text-white">

            <h2 className="text-4xl font-black mb-4">

              Luxury Car Rental

            </h2>

            <p className="text-gray-200">

              Book premium vehicles
              for business, travel,
              weddings and luxury
              rides.

            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-10 md:p-16 flex flex-col justify-center">

          <div className="mb-10">

            {
              selectedRole === "vendor"
                ? (
                  <>
                    <h1 className="text-5xl font-black mb-4">

                      Vendor Portal

                    </h1>

                    <p className="text-gray-500 text-lg">

                      Manage vehicles,
                      bookings, earnings and
                      grow your rental
                      business with Urban Ride.

                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-4">

                      <div className="bg-lime-50 p-4 rounded-2xl">

                        <h3 className="font-bold text-2xl">

                          24/7

                        </h3>

                        <p className="text-sm text-gray-500">

                          Booking Access

                        </p>

                      </div>

                      <div className="bg-black text-white p-4 rounded-2xl">

                        <h3 className="font-bold text-2xl">

                          Vendor

                        </h3>

                        <p className="text-sm text-gray-300">

                          Dashboard Control

                        </p>

                      </div>

                    </div>
                  </>
                )
                : (
                  <>
                    <h1 className="text-5xl font-black mb-4">

                      Welcome Back

                    </h1>

                    <p className="text-gray-500 text-lg">

                      Login to continue your
                      luxury vehicle booking
                      experience.

                    </p>

                    <div className="mt-6 bg-gray-100 p-5 rounded-2xl">

                      <p className="text-sm text-gray-600">

                        ✔ Luxury vehicles
                        <br />

                        ✔ Premium rides
                        <br />

                        ✔ Secure bookings

                      </p>

                    </div>
                  </>
                )
            }

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* ROLE SELECTOR */}
            <div className="grid grid-cols-2 gap-4">

              {/* user button */}
              <button
                type="button"
                onClick={() => {

                  console.log("user clicked");

                  setSelectedRole("user");
                }}
                className={`py-4 rounded-2xl font-semibold transition-all duration-300 ${selectedRole === "user"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black"
                  }`}
              >

                User Login

              </button>

              {/* vendor button */}
              <button
                type="button"
                onClick={() => {

                  console.log("vendor clicked");

                  setSelectedRole("vendor");
                }}
                className={`py-4 rounded-2xl font-semibold transition-all duration-300 ${selectedRole === "vendor"
                    ? "bg-lime-400 text-black"
                    : "bg-gray-100 text-black"
                  }`}
              >

                Vendor Login

              </button>

            </div>

            {/* EMAIL */}
            <div>

              <label className="block mb-2 font-medium">

                Email Address

              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={
                  handleChange
                }
                className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
                required
              />

            </div>

            {/* PASSWORD */}
            <div>

              <label className="block mb-2 font-medium">

                Password

              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={
                  handleChange
                }
                className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
                required
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-2xl font-semibold text-lg transition"
            >

              {
                loading
                  ? "Logging in..."
                  : `Login as ${selectedRole}`
              }

            </button>

          </form>



          {/* FOOTER */}
          <div className="mt-10 text-center text-gray-500">

            Premium Vehicle Rental
            Marketplace Platform

          </div>

          <div className="text-sm tect text-center font-semibold text-gray-400" >Create new account <a href="/signup" className="text-orange-600 sy">Sign Up</a></div>

        </div>

      </div>

    </div>
  );
};

export default Login;