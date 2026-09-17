import useAuth from "../../features/auth/useAuth";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Bell,
  LogOut,
  House,
  Menu,
} from "lucide-react";

const VendorTopbar = ({
  setSidebarOpen,
}) => {

  const navigate = useNavigate();

  const location = useLocation();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const currentPage =
    location.pathname
      .split("/")
      .pop()
      .replace("-", " ");

  return (

    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40">

      <div className="flex items-center gap-3">

        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden w-9 h-9 rounded-lg bg-[#f5f5f5] flex items-center justify-center"
        >
          <Menu size={18} />
        </button>

        <div>
          <p className="text-gray-400 text-[10px] uppercase tracking-wider">Vendor Panel</p>
          <h1 className="text-base sm:text-lg font-black capitalize">{currentPage}</h1>
        </div>

      </div>

      <div className="flex items-center gap-2">

        <Link
          to="/"
          className="w-9 h-9 rounded-lg bg-[#f5f5f5] flex items-center justify-center hover:bg-lime-100 transition"
        >
          <House size={16} />
        </Link>

        <button className="w-9 h-9 rounded-lg bg-[#f5f5f5] flex items-center justify-center hover:bg-lime-100 transition">
          <Bell size={16} />
        </button>

        <button
          onClick={handleLogout}
          className="w-9 h-9 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
        >
          <LogOut size={14} />
        </button>

      </div>

    </div>
  );
};

export default VendorTopbar;
