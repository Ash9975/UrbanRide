import {
  Link,
  useLocation,
} from "react-router-dom";

import { useState } from "react";

import {
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";

const Navbar = ({
  user,
  isVendor,
  handleLogout,
}) => {

  const location =
    useLocation();

  const [
    mobileMenu,
    setMobileMenu,
  ] = useState(false);

  return (

    <>
      {/* navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-200 shadow-sm">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-16 sm:h-20 flex items-center justify-between">

            {/* logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
            >

              <h1 className="text-xl sm:text-3xl font-black tracking-tight transition-all duration-300 group-hover:scale-[1.02]">

                <span className="text-black">

                  URBAN

                </span>

                <span className="text-lime-500">

                  RIDE

                </span>

              </h1>

            </Link>

            {/* desktop nav links */}
            <div className="hidden lg:flex items-center gap-8">

              <Link
                to="/"
                className={`font-semibold transition-all duration-300 ${
                  location.pathname === "/"
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >

                Home

              </Link>

              <Link
                to="/vehicles"
                className={`font-semibold transition-all duration-300 ${
                  location.pathname === "/vehicles"
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >

                Vehicles

              </Link>

              {
                user && user._id && (

                  <Link
                    to="/bookings"
                    className={`font-semibold transition-all duration-300 ${
                      location.pathname === "/bookings"
                        ? "text-black"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >

                    My Bookings

                  </Link>
                )
              }

              {
                isVendor && (

                  <Link
                    to="/vendor/dashboard"
                    className="flex items-center gap-2 bg-lime-100 text-lime-700 px-5 py-2 rounded-2xl font-semibold hover:bg-lime-200 transition-all duration-300"
                  >

                    <LayoutDashboard size={18} />

                    Vendor Panel

                  </Link>
                )
              }

            </div>

            {/* right side */}
            <div className="flex items-center gap-3">

              {/* mobile login button */}
              {
                !user && (

                  <Link
                    to="/login"
                    className="lg:hidden bg-black text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-sm hover:bg-gray-900 transition-all duration-300"
                  >

                    Login

                  </Link>
                )
              }

              {/* desktop profile/login */}
              <div className="hidden lg:flex items-center gap-3">

                {
                  user && user._id ? (

                    <>

                      {/* profile */}
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 bg-white border border-gray-100 px-3 py-2 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                      >

                        <img
                          src={
                            user?.profilePicture ||
                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          }
                          alt="profile"
                          className="w-11 h-11 rounded-xl object-cover border"
                        />

                        <div>

                          <p className="text-xs text-gray-500">

                            Welcome

                          </p>

                          <h3 className="font-bold text-sm text-black">

                            {user.username}

                          </h3>

                        </div>

                      </Link>

                      {/* logout */}
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-sm hover:shadow-lg"
                      >

                        Logout

                      </button>

                    </>

                  ) : (

                    <Link
                      to="/login"
                      className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-sm hover:shadow-xl"
                    >

                      Login

                    </Link>
                  )
                }

              </div>

              {/* hamburger button */}
              <button
                onClick={() =>
                  setMobileMenu(
                    !mobileMenu
                  )
                }
                className="lg:hidden bg-white border border-gray-200 shadow-sm p-3 rounded-2xl hover:bg-gray-50 transition-all duration-300"
              >

                {
                  mobileMenu
                    ? <X size={22} />
                    : <Menu size={22} />
                }

              </button>

            </div>

          </div>

        </div>

      </nav>

      {/* mobile menu */}
      <div
        className={`lg:hidden fixed top-[80px] left-0 w-full transition-all duration-300 ease-in-out z-40 ${
          mobileMenu
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-5"
        }`}
      >

        <div className="mx-4 rounded-[30px] bg-white/95 backdrop-blur-2xl shadow-2xl border border-gray-100 overflow-hidden">

          <div className="p-6 space-y-6">

            {/* nav links */}
            <Link
              to="/"
              onClick={() =>
                setMobileMenu(false)
              }
              className="block text-lg font-semibold text-gray-700 hover:text-black transition"
            >

              Home

            </Link>

            <Link
              to="/vehicles"
              onClick={() =>
                setMobileMenu(false)
              }
              className="block text-lg font-semibold text-gray-700 hover:text-black transition"
            >

              Vehicles

            </Link>

            {
              user && user._id && (

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
                  className="block text-lg font-semibold text-lime-600"
                >

                  Vendor Panel

                </Link>
              )
            }

            {/* mobile auth section */}
            <div className="pt-4 border-t">

              {
                user && user._id ? (

                  <div className="space-y-4">

                    <Link
                      to="/profile"
                      onClick={() =>
                        setMobileMenu(false)
                      }
                      className="flex items-center gap-4"
                    >

                      <img
                        src={
                          user?.profilePicture ||
                          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt="profile"
                        className="w-14 h-14 rounded-2xl object-cover"
                      />

                      <div>

                        <p className="text-sm text-gray-500">

                          Welcome

                        </p>

                        <h3 className="font-bold text-lg">

                          {user.username}

                        </h3>

                      </div>

                    </Link>

                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenu(false);
                      }}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300"
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
                  >

                    <button className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-2xl font-semibold transition-all duration-300">

                      Login

                    </button>

                  </Link>
                )
              }

            </div>

          </div>

        </div>

      </div>

    </>
  );
};

export default Navbar;