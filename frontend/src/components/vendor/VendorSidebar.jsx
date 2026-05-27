// vendorsidebar.jsx

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  LayoutDashboard,
  CarFront,
  PlusCircle,
  BookOpen,
  X,
  House,
} from "lucide-react";

import useAuth from "../../features/auth/useAuth";

const VendorSidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {

  const { user } =
    useAuth();

  const location =
    useLocation();

  const navLinks = [

    {
      name: "Vendor Home",
      path: "/",
      icon: <House size={20} />,
    },

    {
      name: "Dashboard",
      path: "/vendor/dashboard",
      icon: <LayoutDashboard size={20} />,
    },

    {
      name: "My Vehicles",
      path: "/vendor/vehicles",
      icon: <CarFront size={20} />,
    },

    {
      name: "Add Vehicle",
      path: "/vendor/add-vehicle",
      icon: <PlusCircle size={20} />,
    },

    {
      name: "Bookings",
      path: "/vendor/bookings",
      icon: <BookOpen size={20} />,
    },
  ];

  return (

    <>
      {/* overlay */}
      {
        sidebarOpen && (

          <div
            onClick={() =>
              setSidebarOpen(false)
            }
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )
      }

      <div
        className={`fixed top-0 left-0 h-screen w-[280px] bg-black text-white p-5 flex flex-col justify-between z-50 transition-all duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        <div>

          <div className="flex items-center justify-between mb-10">

            <div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-wide">

                URBAN
                <span className="text-lime-400">

                  RIDE

                </span>

              </h1>

              <p className="text-gray-400 mt-1 text-sm">

                Vendor Dashboard

              </p>

            </div>

            <button
              onClick={() =>
                setSidebarOpen(false)
              }
              className="lg:hidden"
            >

              <X size={24} />

            </button>

          </div>

          <nav className="flex flex-col gap-3">

            {
              navLinks.map(
                (link) => (

                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() =>
                      setSidebarOpen(false)
                    }
                    className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-medium transition-all duration-300 ${
                      location.pathname ===
                      link.path
                        ? "bg-lime-400 text-black"
                        : "bg-white/5 hover:bg-lime-400 hover:text-black"
                    }`}
                  >

                    {link.icon}

                    {link.name}

                  </Link>
                )
              )
            }

          </nav>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-[30px] p-5 mt-10">

          <div className="flex items-center gap-4 mb-5">

            <img
              src={
                user?.profilePicture ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Vendor"
              className="w-16 h-16 rounded-2xl object-cover"
            />

            <div>

              <h2 className="text-lg font-bold">

                {
                  user?.username ||
                  "Vendor"
                }

              </h2>

              <p className="text-gray-400 text-sm">

                Premium Partner

              </p>

            </div>

          </div>

          <div className="bg-lime-400 rounded-2xl p-4 text-black">

            <p className="text-sm font-medium">

              Vendor Status

            </p>

            <h3 className="text-2xl font-black">

              Active

            </h3>

          </div>

        </div>

      </div>

    </>
  );
};

export default VendorSidebar;