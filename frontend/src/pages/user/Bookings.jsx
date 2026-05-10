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

        const data =
          await getUserBookings();

        setBookings(data);

      } catch (error) {

        console.log(error);

        setError(
          "Failed to fetch bookings"
        );

      } finally {

        setLoading(false);
      }
    };

    fetchBookings();

  }, []);

  // LOADING
  if (loading) {

    return (
      <h1 className="text-center mt-10">
        Loading bookings...
      </h1>
    );
  }

  // ERROR
  if (error) {

    return (
      <h1 className="text-center mt-10 text-red-500">
        {error}
      </h1>
    );
  }

  // EMPTY
  if (!bookings.length) {

    return (
      <h1 className="text-center mt-10">
        No bookings found
      </h1>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5">

      <h1 className="text-4xl font-bold mb-8">
        My Bookings
      </h1>

      <div className="grid gap-6">

        {bookings.map((booking) => (

          <div
            key={booking._id}
            className="border rounded-xl overflow-hidden shadow"
          >

            <div className="grid md:grid-cols-3">

              {/* IMAGE */}
              <img
                src={
                  booking.vehicleId?.images?.[0]
                }
                alt={
                  booking.vehicleId?.title
                }
                className="w-full h-60 object-cover"
              />

              {/* CONTENT */}
              <div className="p-5 md:col-span-2 space-y-3">

                <h2 className="text-2xl font-bold">
                  {
                    booking.vehicleId?.title
                  }
                </h2>

                <p className="text-gray-500">
                  {
                    booking.vehicleId?.company
                  }
                </p>

                <p>
                  Pickup Date:
                  {" "}
                  {
                    new Date(
                      booking.pickupDate
                    ).toLocaleDateString()
                  }
                </p>

                <p>
                  Drop Date:
                  {" "}
                  {
                    new Date(
                      booking.dropOffDate
                    ).toLocaleDateString()
                  }
                </p>

                <p>
                  Pickup:
                  {" "}
                  {booking.pickUpLocation}
                </p>

                <p>
                  Drop:
                  {" "}
                  {booking.dropOffLocation}
                </p>

                <p className="font-bold text-xl">
                  ₹ {booking.totalPrice}
                </p>

                {/* STATUS */}
                <span className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm">

                  {booking.status}

                </span>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Bookings;