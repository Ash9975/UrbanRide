import { useEffect, useState } from "react";

import {
  getUserBookings,
} from "../../features/bookings/bookingAPI";

const Bookings = () => {

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    const fetchBookings = async () => {
      try {
        const data = await getUserBookings();
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();

  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "bg-green-500";
      case "rejected": return "bg-red-500";
      case "completed": return "bg-blue-500";
      case "pending": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f3f5] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
          <h1 className="text-lg font-black mb-2">Loading Bookings...</h1>
          <p className="text-gray-500 text-sm">Fetching your booking history.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f3f3f5] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
          <h1 className="text-lg font-black text-red-500 mb-2">Error</h1>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="min-h-screen bg-[#f3f3f5] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
          <h1 className="text-lg font-black mb-2">No Bookings Found</h1>
          <p className="text-gray-500 text-sm">Start exploring vehicles and make your first booking.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f3f5] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="mb-6">
          <h1 className="text-2xl font-black mb-1">My Bookings</h1>
          <p className="text-gray-500 text-sm">View and manage your ride bookings.</p>
        </div>

        <div className="space-y-4">

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="grid md:grid-cols-3">

                <img
                  src={booking.vehicleId?.images?.[0] || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=400&auto=format&fit=crop"}
                  alt={booking.vehicleId?.title}
                  className="w-full h-48 md:h-full object-cover"
                />

                <div className="p-5 md:col-span-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h2 className="text-lg font-bold">{booking.vehicleId?.title || "Vehicle"}</h2>
                      <p className="text-gray-400 text-xs">{booking.vehicleId?.company} {booking.vehicleId?.model}</p>
                    </div>
                    <span className={`inline-block ${getStatusColor(booking.status)} text-white px-3 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider w-fit`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="bg-[#f5f5f7] rounded-lg p-3">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Pickup Date</p>
                      <p className="text-xs font-bold">
                        {booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                    <div className="bg-[#f5f5f7] rounded-lg p-3">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Drop Date</p>
                      <p className="text-xs font-bold">
                        {booking.dropOffDate ? new Date(booking.dropOffDate).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                    <div className="bg-[#f5f5f7] rounded-lg p-3">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Pickup</p>
                      <p className="text-xs font-bold">{booking.pickUpLocation || "N/A"}</p>
                    </div>
                    <div className="bg-[#f5f5f7] rounded-lg p-3">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Drop</p>
                      <p className="text-xs font-bold">{booking.dropOffLocation || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-bold text-lg">₹ {booking.totalPrice}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                      Booked on {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : ""}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Bookings;
