import { useState } from "react";

import { createBooking } from "../../features/bookings/bookingAPI";

const BookingForm = ({ vehicleId }) => {

  const [formData, setFormData] = useState({
    pickupDate: "",
    dropOffDate: "",
    pickupLocation: "",
    dropOffLocation: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Calculate price based on days
      const start = new Date(formData.pickupDate);
      const end = new Date(formData.dropOffDate);
      const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
      const totalPrice = days * 3000;

      const bookingData = {
        vehicleId,
        pickupDate: formData.pickupDate,
        dropOffDate: formData.dropOffDate,
        pickupLocation: formData.pickupLocation,
        dropOffLocation: formData.dropOffLocation,
        totalPrice,
      };

      const data = await createBooking(bookingData);

      if (data.success) {
        alert("Vehicle booked successfully");
        setFormData({
          pickupDate: "",
          dropOffDate: "",
          pickupLocation: "",
          dropOffLocation: "",
        });
      } else {
        alert(data.message || "Booking failed");
      }
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message || "Booking failed";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">

      <div>
        <label className="block text-gray-400 text-[10px] uppercase tracking-wider mb-1.5 font-medium">
          Pickup Date
        </label>
        <input
          type="date"
          name="pickupDate"
          value={formData.pickupDate}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-lime-400 transition placeholder:text-gray-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-400 text-[10px] uppercase tracking-wider mb-1.5 font-medium">
          Drop Off Date
        </label>
        <input
          type="date"
          name="dropOffDate"
          value={formData.dropOffDate}
          onChange={handleChange}
          min={formData.pickupDate || new Date().toISOString().split("T")[0]}
          className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-lime-400 transition placeholder:text-gray-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-400 text-[10px] uppercase tracking-wider mb-1.5 font-medium">
          Pickup Location
        </label>
        <input
          type="text"
          name="pickupLocation"
          placeholder="Enter pickup address"
          value={formData.pickupLocation}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-lime-400 transition placeholder:text-gray-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-400 text-[10px] uppercase tracking-wider mb-1.5 font-medium">
          Drop Off Location
        </label>
        <input
          type="text"
          name="dropOffLocation"
          placeholder="Enter drop address"
          value={formData.dropOffLocation}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-lime-400 transition placeholder:text-gray-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-lime-400 hover:bg-lime-300 disabled:bg-lime-600 text-black py-3 rounded-xl text-sm font-bold transition-all duration-300 mt-2"
      >
        {loading ? "Booking..." : "Book Now"}
      </button>

    </form>
  );
};

export default BookingForm;
