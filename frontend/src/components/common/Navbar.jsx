import {
  Link,
  useLocation,
} from "react-router-dom";

import { useState } from "react";
import { Menu, X, LayoutDashboard } from "lucide-react";

import useAuth from "../../features/auth/useAuth";


const Navbar = ({ user, isVendor, handleLogout }) => {

  const location = useLocation();

  const [mobileMenu, SetMobileMenu] = useState(false);

  // const storedUser =localStorage.getItem("user");

  // const user =
  //   storedUser &&
  //     storedUser !== "undefined"
  //     ? JSON.parse(storedUser)
  //     : null;

  // const isVendor =
  //   user?.role === "vendor";

  // const hideNavbarAuth =
  //   location.pathname === "/login";



  // const handleLogout = () => {

  //   localStorage.removeItem(
  //     "user"
  //   );

  //   localStorage.removeItem(
  //     "token"
  //   );

  //   window.location.href = "/";
  // };

  return (

    <>
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm">

        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 ">

          <div className="h-20 flex items-center justify-between">

            {/* logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
            >

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight transition-all duration-300 group-hover:scale-[1.02]">
                <span className="text-black"> URBAN</span>
                <span className="text-lime-500">RIDE </span>
              </h1>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className={`relative font-semibold transition-all duration-300 ${location.pathname === "/" ? " text-balck" : "text-gray-500 hover:text-black"}`}>
                Home
              </Link>

              <Link
                to="/vehicles"
                className={`relative font-semibold transition-all duration-300 ${location.pathname === "/vehicles" ? "text-black" : " text-gray-500 hover:text-black"}`}>
                Vehicles
              </Link>

              {user && (
                <Link
                  to="/bookings"
                  className={`relative font-semibold transition-all duration-300 ${location.pathname === "/bookings" ? "text-black" : "text-gray-500 hover:text-black"}`}>
                  My Bookings
                </Link>
              )}

              {isVendor && (
                <Link
                  to="/vendor/dashboard"
                  className="flex items-center gap-2 bg-lime-100 text-lime-700 px-5 py-2 rounded-2xl font-semibold hover:bg-lime-200 transition-all duration-300"
                >
                  <LayoutDashboard size={18} />
                  Vendor Panel
                </Link>
              )}

              <div className="flex items-center gap3">
                {user ? (
                  <div className="hidden sm:flex items-center gap-3">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 bg-white/90 border border-gray-100 px-3 py-2 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                      <img
                        src={
                          user?.profilePicture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt="profile"
                        className="w-11 h-11 rounded-xl object-cover border" />

                      <div className="hidden xl:block">

                        <p className="text-xs text-gray-500">
                          Welcome
                        </p>

                        <h3 className="font-bold text-sm">
                          {user.username}
                        </h3>
                      </div>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-sm hover:shadow-lg">
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="hidden sm:flex bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-sm hover:shadow-xl">
                    Login
                  </Link>
                )}

                <button
                  onClick={() =>
                    SetMobileMenu(!mobileMenu)
                  }
                  className="lg:hidden bg-white border border-gray-200 shadow-sm p-3 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                  {mobileMenu ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className={`lg:hidden fixed top-30 left-0 w-full bg-whhite/95 backdrop-blur-2xl border-b border-gray-200 shadow-2xl transition-all duration-500 overflow-hidden z-40 $
        mobileMenu ? "max-h-screen opacity-100 " : "max-h-0 opacity-0" 
      }`}>
        <div className=" px-6 py-8 space-y-6">
          <Link
            to="/"
            onClick={() => SetMobileMenu(false)}
            className="block text-lg text-gray-700 hover:text-black font-semibold transition-all ">
            Home
          </Link>

          <Link
          to="/vehicles"
          onClick={()=>
            SetMobileMenu(false)
          }
          className="block text-lg font-semibold text-gray-700 hover:text-black transition-all ">
            Vehicles
          </Link>

          {
            user && (

              <Link
                to="/bookings"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="block text-lg font-semibold text-gray-700 hover:text-black transition"
              >

                My Bookings

              </Link>
            )
          }

          {
            isVendor && (

              <Link
                to="/vendor/dashboard"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="flex items-center gap-2 text-lg font-semibold text-lime-600"
              >

                <LayoutDashboard
                  size={20}
                />

                Vendor Panel

              </Link>
            )
          }

          {
            user ? (

              <div className="pt-6 border-t">

                <Link
                  to="/profile"
                  className="flex items-center gap-4 mb-5"
                >

                  <img
                    src={
                      user?.profilePicture ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="profile"
                    className="w-14 h-14 rounded-2xl object-cover border"
                  />

                  <div>

                    <p className="text-sm text-gray-500">

                      Logged in as

                    </p>

                    <h3 className="font-bold text-lg">

                      {
                        user.username
                      }

                    </h3>

                  </div>

                </Link>

                <button
                  onClick={
                    handleLogout
                  }
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold transition"
                >

                  Logout

                </button>

              </div>

            ) : (

              <Link
                to="/login"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="block"
              >

                <button className="w-full bg-black text-white py-4 rounded-2xl font-semibold">

                  Login

                </button>

              </Link>
            )
          }
        </div>
      </div>
      </>
  );
};

export default Navbar;