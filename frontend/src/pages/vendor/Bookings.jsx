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

          const data =
            await getVendorBookings();

          setBookings(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchBookings();

  }, []);

  // STATUS COUNTS
  const pendingCount =
    bookings.filter(
      (b) =>
        b.status === "pending"
    ).length;

  const approvedCount =
    bookings.filter(
      (b) =>
        b.status === "approved"
    ).length;

  const completedCount =
    bookings.filter(
      (b) =>
        b.status === "completed"
    ).length;

  return (

    <div className="min-h-screen bg-[#f3f3f5] p-6">

      {/* HERO HEADER */}
      <div className="relative overflow-hidden bg-black rounded-[40px] p-10 md:p-14 mb-10 shadow-2xl">

        {/* GLOW */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/20 rounded-full blur-3xl" />

        <div className="relative z-10">

          <p className="text-lime-400 uppercase tracking-[5px] font-semibold mb-5">

            Vendor Booking Management

          </p>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">

            Customer
            <br />

            Bookings

          </h1>

          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">

            Manage customer ride
            requests, approve luxury
            vehicle bookings and
            monitor rental activity
            in one premium dashboard.

          </p>

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* PENDING */}
        <div className="bg-white rounded-[30px] p-7 shadow-sm">

          <p className="text-gray-500 mb-3 text-lg">

            Pending Requests

          </p>

          <h2 className="text-6xl font-black text-yellow-500">

            {pendingCount}

          </h2>

        </div>

        {/* APPROVED */}
        <div className="bg-lime-100 rounded-[30px] p-7 shadow-sm">

          <p className="text-gray-700 mb-3 text-lg">

            Approved Bookings

          </p>

          <h2 className="text-6xl font-black">

            {approvedCount}

          </h2>

        </div>

        {/* COMPLETED */}
        <div className="bg-black text-white rounded-[30px] p-7 shadow-sm">

          <p className="text-gray-300 mb-3 text-lg">

            Completed Rides

          </p>

          <h2 className="text-6xl font-black">

            {completedCount}

          </h2>

        </div>

      </div>

      {/* LOADING */}
      {
        loading && (

          <div className="bg-white rounded-[35px] p-16 text-center shadow-sm">

            <h2 className="text-3xl font-black mb-4">

              Loading Bookings...

            </h2>

            <p className="text-gray-500">

              Fetching latest booking
              activity.

            </p>

          </div>
        )
      }

      {/* EMPTY STATE */}
      {
        !loading &&
        bookings.length === 0 && (

          <div className="bg-white rounded-[40px] p-16 text-center shadow-sm">

            <div className="max-w-2xl mx-auto">

              <h2 className="text-5xl font-black mb-6">

                No Bookings Yet

              </h2>

              <p className="text-gray-500 text-lg leading-relaxed mb-8">

                Once customers start
                booking your luxury
                vehicles, their booking
                requests will appear
                here for approval and
                management.

              </p>

              <div className="bg-lime-100 inline-flex px-8 py-4 rounded-2xl font-semibold">

                Waiting for customer
                activity

              </div>

            </div>

          </div>
        )
      }

      {/* BOOKINGS GRID */}
      {
        !loading &&
        bookings.length > 0 && (

          <div className="grid gap-8">

            {bookings.map(
              (booking) => (

                <VendorBookingCard
                  key={
                    booking._id
                  }
                  booking={booking}
                />
              )
            )}

          </div>
        )
      }

    </div>
  );
};

export default Bookings;