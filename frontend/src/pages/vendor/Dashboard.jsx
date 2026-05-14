import { useEffect, useState } from "react";

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

    <div className="min-h-screen bg-[#f3f3f5] px-4 py-5 sm:px-6 lg:px-8">
      {/* TOP HEADER */}
      <div className="bg-white rounded-[28px] sm:rounded-[35px] p-5 sm:p-8shadow-sm mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Vendor Dashboard
          </h1>

          <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl">

            Manage your luxury
            vehicle fleet, monitor
            bookings, track revenue
            and grow your rental
            business with Urban Ride.

          </p>

        </div>

        {/* STATUS CARD */}
        <div className="bg-lime-100 rounded-3xl px-8 py-6 w-full sm:w-auto">

          <p className="text-sm text-gray-600 mb-2">

            Vendor Status

          </p>

          <h2 className="text-3xl font-black mb-2">

            Active Partner

          </h2>

          <p className="text-gray-600">

            Premium Vendor Access

          </p>

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

        {/* TOTAL VEHICLES */}
        <div className="bg-white rounded-[24px] sm:rounded-[30px] p-5 sm:p-8 shadow-sm relative overflow-hidden">

          <div className="absolute top-0 right-0 w-32 h-32 bg-lime-100 rounded-full -mr-10 -mt-10" />

          <p className="text-gray-500 mb-3 text-lg relative z-10">

            Total Vehicles

          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black relative z-10">

            {
              analytics.totalVehicles
            }

          </h2>

          <p className="mt-4 text-gray-400 relative z-10">

            Active listed vehicles

          </p>

        </div>

        {/* BOOKINGS */}
        <div className="bg-black text-white rounded-[24px] sm:rounded-[30px] p-5 sm:p-8 shadow-sm relative overflow-hidden">

          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mb-10" />

          <p className="text-gray-300 mb-3 text-lg relative z-10">

            Total Bookings

          </p>

          <h2 className="text-6xl font-black relative z-10">

            {
              analytics.totalBookings
            }

          </h2>

          <p className="mt-4 text-gray-400 relative z-10">

            Customer reservations

          </p>

        </div>

        {/* REVENUE */}
        <div className="bg-white rounded-[24px] sm:rounded-[30px] p-5 sm:p-8 shadow-sm relative overflow-hidden">

          <div className="absolute top-0 right-0 w-32 h-32 bg-lime-100 rounded-full -mr-10 -mt-10" />

          <p className="text-gray-500 mb-3 text-lg relative z-10">

            Total Revenue

          </p>

          <h2 className="text-6xl font-black relative z-10">

            ₹
            {
              analytics.totalRevenue
            }

          </h2>

          <p className="mt-4 text-gray-400 relative z-10">

            Overall earnings

          </p>

        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

        <a
          href="/vendor/add-vehicle"
          className="bg-black text-white rounded-[24px] sm:rounded-[30px] p-5 sm:p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 "
        >

          <h2 className="text-2xl sm:text-3xl font-black mb-4">

            Add Vehicle

          </h2>

          <p className="text-gray-300 mb-6">

            List a new luxury
            vehicle for customers.

          </p>

          <button className="bg-lime-400 text-black w-full sm:w-fit px-5 py-3 rounded-2xl font-semibold">

            Add Now

          </button>

        </a>

        <a
          href="/vendor/vehicles"
          className="bg-white rounded-[24px] sm:rounded-[30px] p-5 sm:p-8 hover:scale-[1.02] transition shadow-sm"
        >

          <h2 className="text-3xl font-black mb-4">

            My Fleet

          </h2>

          <p className="text-gray-500 mb-6">

            Manage your listed
            vehicles and availability.

          </p>

          <button className="bg-black text-white w-full sm:w-fit px-5 py-3 rounded-2xl font-semibold">

            Manage Fleet

          </button>

        </a>

        <a
          href="/vendor/bookings"
          className="bg-lime-100 rounded-[24px] sm:rounded-[30px] p-5 sm:p-8 hover:scale-[1.02] transition"
        >

          <h2 className="text-3xl font-black mb-4">

            Bookings

          </h2>

          <p className="text-gray-700 mb-6">

            Approve or manage
            customer reservations.

          </p>

          <button className="bg-black text-white w-full sm:w-fit px-5 py-3 rounded-2xl font-semibold">

            View Bookings

          </button>

        </a>

      </div>

      {/* BUSINESS INSIGHT SECTION */}
      <div className="bg-white rounded-[35px] p-10 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        <div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6">

            Grow Your
            <br />

            Rental Business

          </h2>

          <p className="text-gray-500 text-lg mb-8 leading-relaxed">

            Urban Ride helps vendors
            manage luxury vehicles,
            increase bookings and
            deliver premium customer
            experiences through a
            modern rental platform.

          </p>

          <div className="flex flex-col sm:flex-row gap-4">

            <div className="bg-lime-100 px-6 py-4 rounded-2xl">

              <h3 className="text-3xl font-black">

                24/7

              </h3>

              <p className="text-gray-600">

                Booking Access

              </p>

            </div>

            <div className="bg-black text-white px-6 py-4 rounded-2xl">

              <h3 className="text-3xl font-black">

                Secure

              </h3>

              <p className="text-gray-300">

                Vendor System

              </p>

            </div>

          </div>

        </div>

        <div>

          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
            alt="Luxury Car"
            className="rounded-[35px] h-[280px] sm:h-[360px] lg:h-[420px] w-full object-cover"
          />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;