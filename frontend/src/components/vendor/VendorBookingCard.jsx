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

  const [updating, setUpdating] = useState(false);

  const handleStatusUpdate =
    async (status) => {
      try {
        setUpdating(true);
        await updateBookingStatus(booking._id, status);
        setCurrentStatus(status);
      } catch (error) {
        console.log(error);
        alert("Failed to update status");
      } finally {
        setUpdating(false);
      }
    };

  const statusColor =
    currentStatus === "approved"
      ? "bg-green-500"
      : currentStatus === "rejected"
        ? "bg-red-500"
        : currentStatus === "completed"
          ? "bg-blue-500"
          : "bg-yellow-500";

  return (

    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">

      <div className="relative h-48">
        <img
          src={booking.vehicleId?.images?.[0] || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=400&auto=format&fit=crop"}
          alt={booking.vehicleId?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="absolute top-3 right-3">
          <span className={`${statusColor} text-white px-3 py-1 rounded-lg text-[10px] font-semibold capitalize shadow-lg`}>
            {currentStatus}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 text-white">
          <h2 className="text-lg font-bold mb-0.5">{booking.vehicleId?.title || "Vehicle"}</h2>
          <p className="text-xs text-gray-200">{booking.vehicleId?.location}</p>
        </div>
      </div>

      <div className="p-5">

        <div className="grid sm:grid-cols-2 gap-3 mb-5">
          <div className="bg-[#f5f5f7] p-3 rounded-xl">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">Customer Name</p>
            <h3 className="text-sm font-bold">{booking.userId?.username || "N/A"}</h3>
          </div>
          <div className="bg-[#f5f5f7] p-3 rounded-xl">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">Email Address</p>
            <h3 className="text-xs font-semibold break-all">{booking.userId?.email || "N/A"}</h3>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-lime-50 p-3 rounded-xl">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">Pickup Date</p>
            <h3 className="text-xs font-bold">
              {booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString() : "N/A"}
            </h3>
          </div>
          <div className="bg-[#f5f5f7] p-3 rounded-xl">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">Dropoff Date</p>
            <h3 className="text-xs font-bold">
              {booking.dropOffDate ? new Date(booking.dropOffDate).toLocaleDateString() : "N/A"}
            </h3>
          </div>
          <div className="bg-black text-white p-3 rounded-xl">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">Total Revenue</p>
            <h3 className="text-sm font-black">₹{booking.totalPrice}</h3>
          </div>
        </div>

        <div>
          {currentStatus === "pending" && (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleStatusUpdate("approved")}
                disabled={updating}
                className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
              >
                {updating ? "Updating..." : "Approve Booking"}
              </button>
              <button
                onClick={() => handleStatusUpdate("rejected")}
                disabled={updating}
                className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
              >
                {updating ? "Updating..." : "Reject Booking"}
              </button>
            </div>
          )}

          {currentStatus === "approved" && (
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-sm">
                Booking approved successfully. Customer can now use the vehicle.
              </div>
              <button
                onClick={() => handleStatusUpdate("completed")}
                disabled={updating}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
              >
                {updating ? "Updating..." : "Mark as Completed"}
              </button>
            </div>
          )}

          {currentStatus === "completed" && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-xl text-sm font-medium">
              Ride completed successfully.
            </div>
          )}

          {currentStatus === "rejected" && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm font-medium">
              Booking rejected by vendor.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default VendorBookingCard;
