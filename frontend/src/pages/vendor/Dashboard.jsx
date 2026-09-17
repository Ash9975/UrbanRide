import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getVendorAnalytics,
} from "../../features/vendor/vendorAPI";

const Dashboard = () => {

  const [analytics, setAnalytics] =
    useState({
      totalVehicles: 0,
      totalBookings: 0,
      totalRevenue: 0,
    });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getVendorAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnalytics();
  }, []);

  return (

    <div className="space-y-6">

      {/* TOP SECTION */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-xl sm:text-2xl font-black leading-tight mb-1">Vendor Dashboard</h1>
          <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
            Manage vehicles, bookings, revenue and grow your premium rental business with Urban Ride.
          </p>
        </div>

        <div className="bg-lime-100 rounded-xl px-5 py-3 w-full sm:w-auto">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Vendor Status</p>
          <h2 className="text-sm font-black">Active Partner</h2>
          <p className="text-gray-500 text-[10px]">Premium Vendor Access</p>
        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

        <div className="bg-white rounded-2xl p-5 shadow-sm relative overflow-hidden hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-lime-100 rounded-full -mr-8 -mt-8" />
          <p className="text-gray-500 mb-1 text-xs relative z-10">Total Vehicles</p>
          <h2 className="text-3xl sm:text-4xl font-black relative z-10">{analytics.totalVehicles}</h2>
          <p className="mt-2 text-gray-400 text-[10px] relative z-10">Active listed vehicles</p>
        </div>

        <div className="bg-black text-white rounded-2xl p-5 shadow-sm relative overflow-hidden hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
          <div className="absolute bottom-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-8 -mb-8" />
          <p className="text-gray-400 mb-1 text-xs relative z-10">Total Bookings</p>
          <h2 className="text-3xl sm:text-4xl font-black relative z-10">{analytics.totalBookings}</h2>
          <p className="mt-2 text-gray-400 text-[10px] relative z-10">Customer reservations</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm relative overflow-hidden hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-lime-100 rounded-full -mr-8 -mt-8" />
          <p className="text-gray-500 mb-1 text-xs relative z-10">Total Revenue</p>
          <h2 className="text-3xl sm:text-4xl font-black relative z-10">₹{analytics.totalRevenue}</h2>
          <p className="mt-2 text-gray-400 text-[10px] relative z-10">Overall earnings</p>
        </div>

      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        <Link
          to="/vendor/add-vehicle"
          className="bg-black text-white rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
        >
          <h2 className="text-base font-bold mb-2">Add Vehicle</h2>
          <p className="text-gray-300 text-xs mb-4">List a new luxury vehicle.</p>
          <button className="bg-lime-400 text-black w-full py-2.5 rounded-xl text-sm font-semibold">
            Add Now
          </button>
        </Link>

        <Link
          to="/vendor/vehicles"
          className="bg-white rounded-2xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
        >
          <h2 className="text-base font-bold mb-2">My Fleet</h2>
          <p className="text-gray-500 text-xs mb-4">Manage listed vehicles.</p>
          <button className="bg-black text-white w-full py-2.5 rounded-xl text-sm font-semibold">
            Manage Fleet
          </button>
        </Link>

        <Link
          to="/vendor/bookings"
          className="bg-lime-100 rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
        >
          <h2 className="text-base font-bold mb-2">Bookings</h2>
          <p className="text-gray-600 text-xs mb-4">Manage customer reservations.</p>
          <button className="bg-black text-white w-full py-2.5 rounded-xl text-sm font-semibold">
            View Bookings
          </button>
        </Link>

      </div>

    </div>
  );
};

export default Dashboard;
