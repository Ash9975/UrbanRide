import {
  Link,
  useLocation,
} from "react-router-dom";

import useAuth from "../../features/auth/useAuth";


const Navbar = () => {

  const location =
    useLocation();

  const storedUser =
    localStorage.getItem("user");

  const user =
    storedUser &&
      storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null;

  const isVendor =
    user?.role === "vendor";

  const hideNavbarAuth =
    location.pathname === "/login";

  const handleLogout = () => {

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    window.location.href = "/";
  };

  return (

    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >

          <h1 className="text-3xl font-black tracking-wide">

            URBAN
            <span className="text-lime-500">

              RIDE

            </span>

          </h1>

        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className={`font-semibold transition ${location.pathname === "/"
              ? "text-black"
              : "text-gray-500 hover:text-black"
              }`}
          >

            Home

          </Link>

          <Link
            to="/vehicles"
            className={`font-semibold transition ${location.pathname ===
              "/vehicles"
              ? "text-black"
              : "text-gray-500 hover:text-black"
              }`}
          >

            Vehicles

          </Link>

          {
            user && (

              <Link
                to="/bookings"
                className={`font-semibold transition ${location.pathname ===
                  "/bookings"
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
                className="font-semibold text-lime-600 hover:text-lime-500 transition"
              >

                Vendor Panel

              </Link>
            )
          }

        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {
            user ? (

              <div className="flex items-center gap-4">

                {/* PROFILE */}
                <Link
                  to="/profile"
                  className="flex items-center gap-3 bg-white shadow-sm border border-gray-100 px-4 py-2 rounded-2xl hover:shadow-md transition"
                >

                  <img
                    src={
                      user?.profilePicture ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="profile"
                    className="w-12 h-12 rounded-xl object-cover"
                  />

                  <div className="hidden md:block">

                    <p className="text-sm text-gray-500">

                      Welcome

                    </p>

                    <h3 className="font-bold">

                      {
                        user.username
                      }

                    </h3>

                  </div>

                </Link>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-semibold transition"
                >

                  Logout

                </button>

              </div>

            ) : (
              // logout
              <Link
                to="/login"
                className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-2xl font-semibold transition"
              >

                Login

              </Link>
            )
          }

        </div>

      </div>

    </header>
  );
};

export default Navbar;