// vendortopbar.jsx
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

  const navigate =
    useNavigate();

  const location =
    useLocation();

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

    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-40">

      <div className="flex items-center gap-4">

        <button
          className="lg:hidden w-12 h-12 rounded-2xl bg-[#f5f5f5] flex items-center justify-center"
        >
          <Menu size={22} />
        </button>

        <div>

          <p className="text-gray-500 text-xs sm:text-sm">

            Vendor Panel

          </p>

          <h1 className="text-xl sm:text-3xl font-black capitalize">

            {currentPage}

          </h1>

        </div>

      </div>

      <div className="flex items-center gap-3 sm:gap-5">

        <Link
          to="/"
          className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-[#f5f5f5] flex items-center justify-center hover:bg-lime-100 transition"
        >

          <House size={22} />

        </Link>

        <button
          className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-[#f5f5f5] flex items-center justify-center hover:bg-lime-100 transition"
        >

          <Bell size={22} />

        </button>

        <button
          onClick={handleLogout}
          className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
        >

          <LogOut size={20} />

        </button>

      </div>

    </div>
  );
};

export default VendorTopbar;