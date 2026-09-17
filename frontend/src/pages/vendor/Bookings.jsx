import { useEffect, useState } from "react";

import VendorBookingCard from "../../components/vendor/VendorBookingCard";

import {
  getVendorBookings,
} from "../../features/vendor/vendorAPI";

const Bookings = () => {

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchBookings =
      async () => {
        try {
          const data = await getVendorBookings();
          setBookings(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchBookings();

  }, []);

  const pendingCount =
    bookings.filter((b) => b.status === "pending").length;

  const approvedCount =
    bookings.filter((b) => b.status === "approved").length;

  const completedCount =
    bookings.filter((b) => b.status === "completed").length;

  return (

    <div className="space-y-6">

      {/* HERO */}
      <div className="relative overflow-hidden bg-black rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-lime-400/15 rounded-full blur-3xl" />

        <div className="relative z-10">
          <p className="text-lime-400 uppercase tracking-[3px] text-[10px] font-semibold mb-2">
            Vendor Booking Management
          </p>
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
            Customer<br />Bookings
          </h1>
          <p className="text-gray-300 text-sm max-w-lg leading-relaxed">
            Manage customer ride requests, approve luxury vehicle bookings and monitor rental activity.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Pending Requests</p>
          <h2 className="text-3xl font-black text-yellow-500">{pendingCount}</h2>
        </div>

        <div className="bg-lime-100 rounded-xl p-5 shadow-sm">
          <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Approved Bookings</p>
          <h2 className="text-3xl font-black">{approvedCount}</h2>
        </div>

        <div className="bg-black text-white rounded-xl p-5 shadow-sm">
          <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Completed Rides</p>
          <h2 className="text-3xl font-black">{completedCount}</h2>
        </div>

      </div>

      {loading && (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
          <h2 className="text-base font-black mb-1">Loading Bookings...</h2>
          <p className="text-gray-500 text-sm">Fetching latest booking activity.</p>
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
          <div className="max-w-sm mx-auto">
            <h2 className="text-lg font-black mb-3">No Bookings Yet</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Once customers start booking your luxury vehicles, their booking requests will appear here.
            </p>
            <div className="bg-lime-100 inline-flex px-5 py-2.5 rounded-xl text-sm font-semibold">
              Waiting for customer activity
            </div>
          </div>
        </div>
      )}

      {!loading && bookings.length > 0 && (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <VendorBookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Bookings;
