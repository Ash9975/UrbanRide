import {
  updateBookingStatus,
} from "../../features/vendor/vendorAPI";

import { useState } from "react";

const VendorBookingCard = ({
  booking,
}) => {

  const [
    currentStatus,
    setCurrentStatus,
  ] = useState(
    booking.status || "pending"
  );

  const handleStatusUpdate =
    async (status) => {

      try {

        await updateBookingStatus(
          booking._id,
          status
        );

        setCurrentStatus(status);

      } catch (error) {

        console.log(error);
      }
    };

  // STATUS COLORS
  const statusColor =
    currentStatus === "approved"
      ? "bg-green-500"
      : currentStatus === "rejected"
        ? "bg-red-500"
        : currentStatus === "completed"
          ? "bg-blue-500"
          : "bg-yellow-500";

  return (

    <div className="bg-white rounded-[35px] overflow-hidden shadow-sm border border-gray-100">

      {/* TOP IMAGE */}
      <div className="relative h-72">

        <img
          src={
            booking.vehicleId
              ?.images?.[0]
          }
          alt={
            booking.vehicleId
              ?.title
          }
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        {/* STATUS BADGE */}
        <div className="absolute top-5 right-5">

          <span
            className={`${statusColor} text-white px-5 py-2 rounded-full text-sm font-semibold capitalize shadow-lg`}
          >

            {currentStatus}

          </span>

        </div>

        {/* VEHICLE INFO */}
        <div className="absolute bottom-6 left-6 text-white">

          <h2 className="text-4xl font-black mb-2">

            {
              booking.vehicleId
                ?.title
            }

          </h2>

          <p className="text-lg text-gray-200">

            {
              booking.vehicleId
                ?.location
            }

          </p>

        </div>

      </div>

      {/* CONTENT */}
      <div className="p-8">

        {/* USER DETAILS */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-[#f5f5f7] p-5 rounded-3xl">

            <p className="text-gray-500 text-sm mb-2">

              Customer Name

            </p>

            <h3 className="text-2xl font-bold">

              {
                booking.userId
                  ?.username
              }

            </h3>

          </div>

          <div className="bg-[#f5f5f7] p-5 rounded-3xl">

            <p className="text-gray-500 text-sm mb-2">

              Email Address

            </p>

            <h3 className="text-xl font-semibold break-all">

              {
                booking.userId
                  ?.email
              }

            </h3>

          </div>

        </div>

        {/* BOOKING DETAILS */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-lime-50 p-5 rounded-3xl">

            <p className="text-gray-500 text-sm mb-2">

              Pickup Date

            </p>

            <h3 className="text-xl font-bold">

              {
                booking.pickupDate
                  ?.slice(0, 10)
              }

            </h3>

          </div>

          <div className="bg-[#f5f5f7] p-5 rounded-3xl">

            <p className="text-gray-500 text-sm mb-2">

              Dropoff Date

            </p>

            <h3 className="text-xl font-bold">

              {
                booking.dropOffDate
                  ?.slice(0, 10)
              }

            </h3>

          </div>

          <div className="bg-black text-white p-5 rounded-3xl">

            <p className="text-gray-300 text-sm mb-2">

              Total Revenue

            </p>

            <h3 className="text-3xl font-black">

              ₹
              {
                booking.totalPrice
              }

            </h3>

          </div>

        </div>

        {/* ACTIONS */}
        <div className="mt-6">

          {/* PENDING */}
          {
            currentStatus ===
            "pending" && (

              <div className="flex flex-wrap gap-4">

                <button
                  onClick={() =>
                    handleStatusUpdate(
                      "approved"
                    )
                  }
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold transition"
                >

                  Approve Booking

                </button>

                <button
                  onClick={() =>
                    handleStatusUpdate(
                      "rejected"
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold transition"
                >

                  Reject Booking

                </button>

              </div>
            )
          }

          {/* APPROVED */}
          {
            currentStatus ===
            "approved" && (

              <div className="space-y-5">

                <div className="bg-green-50 border border-green-200 text-green-700 p-5 rounded-3xl">

                  Booking approved successfully.
                  Customer can now use the vehicle.

                </div>

                <button
                  onClick={() =>
                    handleStatusUpdate(
                      "completed"
                    )
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold transition"
                >

                  Mark as Completed

                </button>

              </div>
            )
          }

          {/* COMPLETED */}
          {
            currentStatus ===
            "completed" && (

              <div className="bg-blue-50 border border-blue-200 text-blue-700 p-5 rounded-3xl font-medium">

                Ride completed successfully.

              </div>
            )
          }

          {/* REJECTED */}
          {
            currentStatus ===
            "rejected" && (

              <div className="bg-red-50 border border-red-200 text-red-700 p-5 rounded-3xl font-medium">

                Booking rejected by vendor.

              </div>
            )
          }

        </div>

      </div>

    </div>
  );
};

export default VendorBookingCard;