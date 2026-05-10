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

      // SIMPLE TEMP PRICE
      const totalPrice = 3000;

      const bookingData = {

        vehicleId,

        pickupDate: formData.pickupDate,

        dropOffDate: formData.dropOffDate,

        // IMPORTANT FIELD NAMES
        pickupLocation:
          formData.pickupLocation,

        dropOffLocation:
          formData.dropOffLocation,

        totalPrice,
      };

      console.log(bookingData);

      const data =
        await createBooking(
          bookingData
        );

      console.log(data);

      alert(
        "Vehicle booked successfully"
      );

    } catch (error) {

      console.log(error);

      alert("Booking failed");

    } finally {

      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-5 rounded mt-10 space-y-4"
    >

      <h2 className="text-2xl font-bold">
        Book This Vehicle
      </h2>

      {/* PICKUP DATE */}
      <input
        type="date"
        name="pickupDate"
        onChange={handleChange}
        className="border p-3 w-full rounded"
      />

      {/* DROP DATE */}
      <input
        type="date"
        name="dropOffDate"
        onChange={handleChange}
        className="border p-3 w-full rounded"
      />

      {/* PICKUP LOCATION */}
      <input
        type="text"
        name="pickupLocation"
        placeholder="Pickup Location"
        onChange={handleChange}
        className="border p-3 w-full rounded"
      />

      {/* DROP LOCATION */}
      <input
        type="text"
        name="dropOffLocation"
        placeholder="Drop Location"
        onChange={handleChange}
        className="border p-3 w-full rounded"
      />

      <button
        className="bg-black text-white px-6 py-3 rounded"
      >
        {
          loading
            ? "Booking..."
            : "Book Now"
        }
      </button>

    </form>
  );
};

export default BookingForm;