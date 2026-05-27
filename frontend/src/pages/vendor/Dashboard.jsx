import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VendorSidebar from "../../components/vendor/VendorSidebar";
import VendorTopbar from "../../components/vendor/VendorTopbar";
import {
  getVendorAnalytics,
} from "../../features/vendor/vendorAPI";

import {
  ChevronRight,
  LayoutDashboard,
  CarFront,
  BookOpen,
  ChartNoAxesCombined,
} from "lucide-react";



const Dashboard = () => {

  const [analytics, setAnalytics] =
    useState({
      totalVehicles: 0,
      totalBookings: 0,
      totalRevenue: 0,
    });

  const [sidebarOpen,
    setSidebarOpen] =
    useState(false);

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const data =
          await getVendorAnalytics();

        setAnalytics(data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchAnalytics();

  }, []);

  return (

    <div className="min-h-screen bg-[#f3f3f5] flex overflow-hidden">

      {/* main content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 lg:ml-0 w-full overflow-y-auto">

        {/* top section */}
        <div className="bg-white rounded-[30px] p-5 sm:p-8 shadow-sm mb-8 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

          <div>

            <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-4">

              Vendor Dashboard

            </h1>

            <p className="text-gray-500 text-sm sm:text-lg max-w-2xl leading-relaxed">

              Manage vehicles, bookings, revenue and grow your premium rental business with Urban Ride.

            </p>

          </div>

          <div className="bg-lime-100 rounded-3xl px-6 py-5 w-full sm:w-fit">

            <p className="text-sm text-gray-600 mb-2">

              Vendor Status

            </p>

            <h2 className="text-2xl sm:text-3xl font-black mb-1">

              Active Partner

            </h2>

            <p className="text-gray-600 text-sm">

              Premium Vendor Access

            </p>

          </div>

        </div>

        {/* stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">

          <div className="bg-white rounded-[28px] p-6 shadow-sm relative overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-100 rounded-full -mr-10 -mt-10" />

            <p className="text-gray-500 mb-3 text-lg relative z-10">

              Total Vehicles

            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black relative z-10">

              {analytics.totalVehicles}

            </h2>

            <p className="mt-4 text-gray-400 relative z-10">

              Active listed vehicles

            </p>

          </div>

          <div className="bg-black text-white rounded-[28px] p-6 shadow-sm relative overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mb-10" />

            <p className="text-gray-300 mb-3 text-lg relative z-10">

              Total Bookings

            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black relative z-10">

              {analytics.totalBookings}

            </h2>

            <p className="mt-4 text-gray-400 relative z-10">

              Customer reservations

            </p>

          </div>

          <div className="bg-white rounded-[28px] p-6 shadow-sm relative overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-100 rounded-full -mr-10 -mt-10" />

            <p className="text-gray-500 mb-3 text-lg relative z-10">

              Total Revenue

            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black relative z-10">

              ₹{analytics.totalRevenue}

            </h2>

            <p className="mt-4 text-gray-400 relative z-10">

              Overall earnings

            </p>

          </div>

        </div>

        {/* actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">

          <Link
            to="/vendor/add-vehicle"
            className="bg-black text-white rounded-[28px] p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >

            <h2 className="text-2xl font-black mb-4">

              Add Vehicle

            </h2>

            <p className="text-gray-300 mb-6">

              List a new luxury vehicle.

            </p>

            <button className="bg-lime-400 text-black w-full py-3 rounded-2xl font-semibold">

              Add Now

            </button>

          </Link>

          <Link
            to="/vendor/vehicles"
            className="bg-white rounded-[28px] p-6 shadow-sm hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >

            <h2 className="text-2xl font-black mb-4">

              My Fleet

            </h2>

            <p className="text-gray-500 mb-6">

              Manage listed vehicles.

            </p>

            <button className="bg-black text-white w-full py-3 rounded-2xl font-semibold">

              Manage Fleet

            </button>

          </Link>

          <Link
            to="/vendor/bookings"
            className="bg-lime-100 rounded-[28px] p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >

            <h2 className="text-2xl font-black mb-4">

              Bookings

            </h2>

            <p className="text-gray-700 mb-6">

              Manage customer reservations.

            </p>

            <button className="bg-black text-white w-full py-3 rounded-2xl font-semibold">

              View Bookings

            </button>

          </Link>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;