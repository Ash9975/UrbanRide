import {
  Link,
  useLocation,
} from "react-router-dom";

import { useState } from "react";

import {
  Menu,
  X,
  Bell,
  LayoutDashboard,
  CarFront,
  BookOpen,
  User,
  LogOut,
  ChartNoAxesCombined,
} from "lucide-react";

const Navbar = ({
  user,
  handleLogout,
}) => {

  const location =
    useLocation();

  const [
    mobileMenu,
    setMobileMenu,
  ] = useState(false);

  // role check
  const isVendor =
    user?.isVendor ||
    user?.role === "vendor";

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

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight transition-all duration-300 group-hover:scale-[1.02]">

                <span className="text-black">

                  URBAN

                </span>

                <span className="text-lime-500">

                  RIDE

                </span>

              </h1>

            </Link>

            {/* desktop nav */}
            <div className="hidden lg:flex items-center gap-8">

              {/* common */}
              <Link
                to={
                  isVendor
                    ? "/vendor/dashboard"
                    : "/"
                }
                className={`font-semibold transition-all duration-300 ${location.pathname === "/" ||
                  location.pathname === "/vendor/dashboard"
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
                  }`}
              >

                Home

              </Link>

              <Link
                to={
                  isVendor
                    ? "/vendor/vehicles"
                    : "/vehicles"
                }
                className={`font-semibold transition-all duration-300 ${location.pathname.includes("vehicles")
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
                  }`}
              >

                Vehicles

              </Link>

              {/* user nav */}
              {
                !isVendor && (

                  <Link
                    to="/bookings"
                    className={`font-semibold transition-all duration-300 ${location.pathname === "/bookings"
                      ? "text-black"
                      : "text-gray-500 hover:text-black"
                      }`}
                  >

                    My Bookings

                  </Link>
                )
              }

              {/* vendor nav */}
              {
                isVendor && (
                  <>
                    <Link
                      to="/vendor/dashboard"
                      className={`font-semibold transition-all duration-300 ${location.pathname.includes("/vendor/dashboard")
                        ? "text-lime-600"
                        : "text-gray-500 hover:text-black"
                        }`}
                    >

                      Dashboard

                    </Link>

                    <Link
                      to="/vendor/bookings"
                      className={`font-semibold transition-all duration-300 ${location.pathname.includes("/vendor/bookings")
                        ? "text-lime-600"
                        : "text-gray-500 hover:text-black"
                        }`}
                    >

                      Bookings

                    </Link>
                  </>
                )
              }

            </div>

            {/* right section */}
            <div className="flex items-center gap-3">

              {/* desktop auth */}
              <div className="hidden lg:flex items-center gap-3">

                {
                  user ? (

                    <>
                      {/* notification */}
                      <button className="w-12 h-12 rounded-2xl bg-gray-100 hover:bg-lime-100 flex items-center justify-center transition-all duration-300">

                        <Bell size={20} />

                      </button>

                      {/* profile */}
                      <Link
                        to={
                          isVendor
                            ? "/vendor/profile"
                            : "/profile"
                        }
                        className="flex items-center gap-3 bg-white border border-gray-100 px-3 py-2 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
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

                          <div className="flex items-center gap-2">

                            <h3 className="font-bold text-sm text-black">

                              {user.username}

                            </h3>

                            <span className="text-[10px] px-2 py-1 rounded-full bg-lime-100 text-lime-700 font-semibold uppercase">

                              {
                                isVendor? "Vendor" : "User"
                              }

                            </span>

                          </div>

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

              {/* mobile hamburger */}
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
        className={`lg:hidden fixed top-[72px] left-0 w-full z-40 transition-all duration-300 ${mobileMenu
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-5"
          }`}
      >

        <div className="mx-4 rounded-[30px] bg-white/95 backdrop-blur-2xl shadow-2xl border border-gray-100 overflow-hidden">

          <div className="p-6 space-y-5">

            {/* user profile */}
            {
              user && (

                <div className="flex items-center gap-4 pb-5 border-b">

                  <img
                    src={
                      user?.profilePicture ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="profile"
                    className="w-14 h-14 rounded-2xl object-cover"
                  />

                  <div>

                    <h3 className="font-bold text-lg">

                      {user.username}

                    </h3>

                    <span className="text-xs px-3 py-1 rounded-full bg-lime-100 text-lime-700 font-semibold uppercase">

                      {
                        isVendor
                          ? "Vendor"
                          : "User"
                      }

                    </span>

                  </div>

                </div>
              )
            }

            {/* nav links */}
            <Link
              to="/"
              onClick={() =>
                setMobileMenu(false)
              }
              className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-black transition"
            >

              <LayoutDashboard size={20} />

              Home

            </Link>

            <Link
              to="/vehicles"
              onClick={() =>
                setMobileMenu(false)
              }
              className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-black transition"
            >

              <CarFront size={20} />

              Vehicles

            </Link>

            {/* user menu */}
            {
              !isVendor && (

                <Link
                  to="/bookings"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-black transition"
                >

                  <BookOpen size={20} />

                  My Bookings

                </Link>
              )
            }

            {/* vendor menu */}
            {
              isVendor && (
                <>
                  <Link
                    to="/vendor/dashboard"
                    onClick={() =>
                      setMobileMenu(false)
                    }
                    className="flex items-center gap-3 text-lg font-semibold text-lime-600"
                  >

                    <LayoutDashboard size={20} />

                    Dashboard

                  </Link>

                  <Link
                    to="/vendor/vehicles"
                    onClick={() =>
                      setMobileMenu(false)
                    }
                    className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-black"
                  >

                    <CarFront size={20} />

                    Listed Vehicles

                  </Link>

                  <Link
                    to="/vendor/bookings"
                    onClick={() =>
                      setMobileMenu(false)
                    }
                    className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-black"
                  >

                    <BookOpen size={20} />

                    Booking History

                  </Link>

                  <Link
                    to="/vendor/analytics"
                    onClick={() =>
                      setMobileMenu(false)
                    }
                    className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-black"
                  >

                    <ChartNoAxesCombined size={20} />

                    Analytics

                  </Link>
                </>
              )
            }

            {/* auth */}
            <div className="pt-5 border-t">

              {
                user ? (

                  <div className="space-y-4">

                    <Link
                      to={
                        isVendor
                          ? "/vendor/profile"
                          : "/profile"
                      }
                      onClick={() =>
                        setMobileMenu(false)
                      }
                      className="flex items-center gap-3 text-lg font-semibold text-gray-700"
                    >

                      <User size={20} />

                      Profile

                    </Link>

                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenu(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300"
                    >

                      <LogOut size={18} />

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