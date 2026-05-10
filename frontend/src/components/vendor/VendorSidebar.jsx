import { Link } from "react-router-dom";

import useAuth from "../../features/auth/useAuth";

const VendorSidebar = () => {

  const { user } = useAuth();

  return (

    <div className="w-64 h-screen fixed left-0 top-0 bg-black text-white p-5 flex flex-col justify-between">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="mb-12">

          <h1 className="text-4xl font-black tracking-wide">

            URBAN
            <span className="text-lime-400">

              RIDE

            </span>

          </h1>

          <p className="text-gray-400 mt-2">

            Vendor Dashboard

          </p>

        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-4">

          <Link
            to="/vendor/dashboard"
            className="bg-white/5 hover:bg-lime-400 hover:text-black transition px-5 py-4 rounded-2xl font-medium"
          >

            Dashboard

          </Link>

          <Link
            to="/vendor/vehicles"
            className="bg-white/5 hover:bg-lime-400 hover:text-black transition px-5 py-4 rounded-2xl font-medium"
          >

            My Vehicles

          </Link>

          <Link
            to="/vendor/add-vehicle"
            className="bg-white/5 hover:bg-lime-400 hover:text-black transition px-5 py-4 rounded-2xl font-medium"
          >

            Add Vehicle

          </Link>

          <Link
            to="/vendor/bookings"
            className="bg-white/5 hover:bg-lime-400 hover:text-black transition px-5 py-4 rounded-2xl font-medium"
          >

            Bookings

          </Link>

        </nav>

      </div>

      {/* BOTTOM PROFILE CARD */}
      <div className="bg-white/5 border border-white/10 rounded-[30px] p-5 mt-10">

        {/* PROFILE */}
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

            <h2 className="text-xl font-bold">

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

        {/* STATUS */}
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
  );
};

export default VendorSidebar;