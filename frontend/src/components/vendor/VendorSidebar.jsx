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
    { name: "Vendor Home", path: "/", icon: <House size={18} /> },
    { name: "Dashboard", path: "/vendor/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "My Vehicles", path: "/vendor/vehicles", icon: <CarFront size={18} /> },
    { name: "Add Vehicle", path: "/vendor/add-vehicle", icon: <PlusCircle size={18} /> },
    { name: "Bookings", path: "/vendor/bookings", icon: <BookOpen size={18} /> },
  ];

  return (

    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-black text-white p-4 flex flex-col justify-between z-50 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >

        <div>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-xl font-black tracking-wide">
                URBAN<span className="text-lime-400">RIDE</span>
              </h1>
              <p className="text-gray-400 mt-0.5 text-[10px]">Vendor Dashboard</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? "bg-lime-400 text-black"
                    : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-8">

          <div className="flex items-center gap-3 mb-4">
            <img
              src={user?.profilePicture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="Vendor"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-sm font-bold">{user?.username || "Vendor"}</h2>
              <p className="text-gray-400 text-[10px]">Premium Partner</p>
            </div>
          </div>

          <div className="bg-lime-400 rounded-lg p-3 text-black">
            <p className="text-[10px] font-medium uppercase tracking-wider">Vendor Status</p>
            <h3 className="text-sm font-black">Active</h3>
          </div>

        </div>

      </div>

    </>
  );
};

export default VendorSidebar;
