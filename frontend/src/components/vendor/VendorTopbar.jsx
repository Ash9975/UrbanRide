import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Bell,
  LogOut,
  House,
} from "lucide-react";

const VendorTopbar = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const user =
    JSON.parse(
      localStorage.getItem(
        "currentUser"
      )
    );

  const handleLogout = () => {

    localStorage.removeItem(
      "currentUser"
    );

    localStorage.removeItem(
      "token"
    );

    navigate("/login");
  };

  return (

    <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between sticky top-0 z-40">

      {/* LEFT */}
      <div>

        <p className="text-gray-500 text-sm">

          Vendor Panel

        </p>

        <h1 className="text-3xl font-black">

          {
            location.pathname
              .split("/")
              .pop()
              .replace("-", " ")
              .toUpperCase()
          }

        </h1>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* HOME */}
        <Link
          to="/"
          className="w-14 h-14 rounded-2xl bg-[#f5f5f5] flex items-center justify-center hover:bg-lime-100 transition"
        >

          <House size={24} />

        </Link>

        {/* NOTIFICATION */}
        <button
          className="w-14 h-14 rounded-2xl bg-[#f5f5f5] flex items-center justify-center hover:bg-lime-100 transition"
        >

          <Bell size={24} />

        </button>


        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-14 h-14 rounded-2xl bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
        >

          <LogOut size={22} />

        </button>

      </div>

    </div>
  );
};

export default VendorTopbar;