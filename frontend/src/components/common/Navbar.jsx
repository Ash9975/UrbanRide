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

  const isVendor =
    user?.isVendor ||
    user?.role === "vendor";

  return (

    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-200 shadow-sm">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-16 flex items-center justify-between">

            <Link
              to="/"
              className="flex items-center gap-2 group"
            >
              <h1 className="text-xl sm:text-2xl font-black tracking-tight transition-all duration-300 group-hover:scale-[1.02]">
                <span className="text-black">URBAN</span>
                <span className="text-lime-500">RIDE</span>
              </h1>
            </Link>

            <div className="hidden lg:flex items-center gap-7">

              <Link
                to={isVendor ? "/vendor/dashboard" : "/"}
                className={`text-sm font-semibold transition-all duration-300 ${location.pathname === "/" || location.pathname === "/vendor/dashboard" ? "text-black" : "text-gray-500 hover:text-black"}`}
              >
                Home
              </Link>

              <Link
                to={isVendor ? "/vendor/vehicles" : "/vehicles"}
                className={`text-sm font-semibold transition-all duration-300 ${location.pathname.includes("vehicles") ? "text-black" : "text-gray-500 hover:text-black"}`}
              >
                Vehicles
              </Link>

              {!isVendor && (
                <Link
                  to="/bookings"
                  className={`text-sm font-semibold transition-all duration-300 ${location.pathname === "/bookings" ? "text-black" : "text-gray-500 hover:text-black"}`}
                >
                  My Bookings
                </Link>
              )}

              {isVendor && (
                <>
                  <Link
                    to="/vendor/dashboard"
                    className={`text-sm font-semibold transition-all duration-300 ${location.pathname.includes("/vendor/dashboard") ? "text-lime-600" : "text-gray-500 hover:text-black"}`}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/vendor/bookings"
                    className={`text-sm font-semibold transition-all duration-300 ${location.pathname.includes("/vendor/bookings") ? "text-lime-600" : "text-gray-500 hover:text-black"}`}
                  >
                    Bookings
                  </Link>
                </>
              )}

            </div>

            <div className="flex items-center gap-3">

              <div className="hidden lg:flex items-center gap-3">

                {user ? (
                  <>
                    <button className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-lime-100 flex items-center justify-center transition-all duration-300">
                      <Bell size={18} />
                    </button>

                    <Link
                      to={isVendor ? "/vendor/profile" : "/profile"}
                      className="flex items-center gap-2.5 bg-white border border-gray-100 px-3 py-1.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <img
                        src={user?.profilePicture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                        alt="profile"
                        className="w-9 h-9 rounded-lg object-cover border"
                      />

                      <div>
                        <p className="text-[10px] text-gray-400 leading-none">Welcome</p>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-xs text-black">{user.username}</h3>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-lime-100 text-lime-700 font-semibold uppercase">
                            {isVendor ? "Vendor" : "User"}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="bg-black hover:bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Login
                  </Link>
                )}

              </div>

              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="lg:hidden bg-white border border-gray-200 shadow-sm p-2.5 rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                {mobileMenu ? <X size={20} /> : <Menu size={20} />}
              </button>

            </div>

          </div>

        </div>

      </nav>

      {/* mobile menu */}
      <div
        className={`lg:hidden fixed top-16 left-0 w-full z-40 transition-all duration-300 ${mobileMenu ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-5"}`}
      >
        <div className="mx-4 mt-2 rounded-2xl bg-white/95 backdrop-blur-2xl shadow-2xl border border-gray-100 overflow-hidden">

          <div className="p-5 space-y-1">

            {user && (
              <div className="flex items-center gap-3 pb-4 border-b mb-3">
                <img
                  src={user?.profilePicture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt="profile"
                  className="w-11 h-11 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-bold text-sm">{user.username}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-lime-100 text-lime-700 font-semibold uppercase">
                    {isVendor ? "Vendor" : "User"}
                  </span>
                </div>
              </div>
            )}

            <Link to="/" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-black hover:bg-gray-50 rounded-xl px-3 py-3 transition">
              <LayoutDashboard size={18} /> Home
            </Link>

            <Link to="/vehicles" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-black hover:bg-gray-50 rounded-xl px-3 py-3 transition">
              <CarFront size={18} /> Vehicles
            </Link>

            {!isVendor && (
              <Link to="/bookings" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-black hover:bg-gray-50 rounded-xl px-3 py-3 transition">
                <BookOpen size={18} /> My Bookings
              </Link>
            )}

            {isVendor && (
              <>
                <Link to="/vendor/dashboard" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 text-sm font-semibold text-lime-600 hover:bg-lime-50 rounded-xl px-3 py-3 transition">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <Link to="/vendor/vehicles" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-black hover:bg-gray-50 rounded-xl px-3 py-3 transition">
                  <CarFront size={18} /> Listed Vehicles
                </Link>
                <Link to="/vendor/bookings" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-black hover:bg-gray-50 rounded-xl px-3 py-3 transition">
                  <BookOpen size={18} /> Booking History
                </Link>
                <Link to="/vendor/analytics" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-black hover:bg-gray-50 rounded-xl px-3 py-3 transition">
                  <ChartNoAxesCombined size={18} /> Analytics
                </Link>
              </>
            )}

            <div className="pt-3 border-t mt-3">

              {user ? (
                <div className="space-y-2">
                  <Link
                    to={isVendor ? "/vendor/profile" : "/profile"}
                    onClick={() => setMobileMenu(false)}
                    className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-black hover:bg-gray-50 rounded-xl px-3 py-3 transition"
                  >
                    <User size={18} /> Profile
                  </Link>

                  <button
                    onClick={() => { handleLogout(); setMobileMenu(false); }}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setMobileMenu(false)}>
                  <button className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-300">
                    Login
                  </button>
                </Link>
              )}

            </div>

          </div>

        </div>
      </div>

    </>
  );
};

export default Navbar;
