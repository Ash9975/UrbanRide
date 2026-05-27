import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getVehicleDetails } from "../../features/vehicles/vehicleAPI";

import BookingForm from "../../components/bookings/BookingForm";

const VehicleDetails = () => {

  const { id } = useParams();

  const [vehicle, setVehicle] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const fetchVehicle =
      async () => {

        try {

          const data =
            await getVehicleDetails(id);

          setVehicle(data);

        } catch (error) {

          console.log(error);

          setError(
            "Failed to fetch vehicle"
          );

        } finally {

          setLoading(false);
        }
      };

    fetchVehicle();

  }, [id]);

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen bg-[#f3f3f5] flex items-center justify-center">

        <div className="bg-white rounded-[35px] p-14 shadow-sm text-center">

          <h1 className="text-5xl font-black mb-4">

            Loading Vehicle...

          </h1>

          <p className="text-gray-500">

            Fetching premium vehicle
            details.

          </p>

        </div>

      </div>
    );
  }

  // ERROR
  if (error) {

    return (

      <div className="min-h-screen bg-[#f3f3f5] flex items-center justify-center">

        <div className="bg-white rounded-[35px] p-14 shadow-sm text-center">

          <h1 className="text-5xl font-black text-red-500 mb-4">

            Error

          </h1>

          <p className="text-gray-500">

            {error}

          </p>

        </div>

      </div>
    );
  }

  // NO VEHICLE
  if (!vehicle) {

    return (

      <div className="min-h-screen bg-[#f3f3f5] flex items-center justify-center">

        <div className="bg-white rounded-[35px] p-14 shadow-sm text-center">

          <h1 className="text-5xl font-black mb-4">

            Vehicle Not Found

          </h1>

          <p className="text-gray-500">

            This luxury vehicle
            does not exist.

          </p>

        </div>

      </div>
    );
  }

  return (
  <div className="min-h-screen bg-[#f5f5f7]">

    {/* HERO SECTION */}
    <div className="relative w-full h-[320px] sm:h-[450px] lg:h-[650px] overflow-hidden">

      <img
        src={vehicle.images?.[0]}
        alt={vehicle.title}
        className="w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white max-w-3xl">

        <p className="text-lime-400 uppercase tracking-[3px] text-xs sm:text-sm font-semibold mb-3">

          Premium Luxury Vehicle

        </p>

        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight mb-3">

          {vehicle.title}

        </h1>

        <p className="text-base sm:text-xl text-gray-200">

          {vehicle.company} {vehicle.model}

        </p>

      </div>

      {/* PRICE */}
      <div className="absolute top-5 right-5 bg-black/80 backdrop-blur-md px-5 py-4 rounded-2xl text-white shadow-xl">

        <p className="text-gray-300 text-xs sm:text-sm mb-1">

          Price Per Day

        </p>

        <h2 className="text-2xl sm:text-4xl font-black">

          ₹ {vehicle.price}

        </h2>

      </div>
    </div>

    {/* MAIN CONTAINER */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">

          {/* VEHICLE INFO */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-100">

            <h2 className="text-2xl sm:text-4xl font-black mb-6">

              Vehicle Information

            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div className="bg-[#f5f5f7] rounded-2xl p-5">
                <p className="text-gray-500 text-sm mb-2">
                  Fuel Type
                </p>

                <h3 className="text-2xl font-black capitalize">
                  {vehicle.fuelType}
                </h3>
              </div>

              <div className="bg-[#f5f5f7] rounded-2xl p-5">
                <p className="text-gray-500 text-sm mb-2">
                  Seating Capacity
                </p>

                <h3 className="text-2xl font-black">
                  {vehicle.seats}
                </h3>
              </div>

              <div className="bg-lime-100 rounded-2xl p-5">
                <p className="text-gray-700 text-sm mb-2">
                  Location
                </p>

                <h3 className="text-2xl font-black">
                  {vehicle.location}
                </h3>
              </div>

              <div className="bg-black text-white rounded-2xl p-5">
                <p className="text-gray-300 text-sm mb-2">
                  District
                </p>

                <h3 className="text-2xl font-black">
                  {vehicle.district}
                </h3>
              </div>

            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-100">

            <h2 className="text-2xl sm:text-4xl font-black mb-5">

              About This Vehicle

            </h2>

            <p className="text-gray-600 leading-8 text-base sm:text-lg">

              {vehicle.description ||
                "Experience luxury driving with premium comfort, smooth performance, and high-end safety features. Perfect for city rides, family trips, and business travel."}

            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-8">

          {/* BOOKING CARD */}
          <div className="bg-black text-white rounded-3xl p-5 sm:p-7 shadow-2xl lg:sticky lg:top-5">

            <p className="text-lime-400 uppercase tracking-[3px] text-xs sm:text-sm font-semibold mb-3">

              Book Luxury Ride

            </p>

            <h2 className="text-3xl sm:text-5xl font-black mb-3">

              ₹ {vehicle.price}

            </h2>

            <p className="text-gray-300 mb-6 text-sm sm:text-base">

              Premium rental price per day.

            </p>

            <BookingForm
              vehicleId={vehicle._id}
            />

          </div>

          {/* FEATURES */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-gray-100">

            <h2 className="text-2xl sm:text-3xl font-black mb-6">

              Premium Features

            </h2>

            <div className="space-y-4">

              <div className="bg-[#f5f5f7] rounded-2xl p-5">
                <h3 className="font-bold text-lg mb-2">
                  Luxury Interior
                </h3>

                <p className="text-gray-500 text-sm leading-6">
                  Comfortable premium seating and spacious interior experience.
                </p>
              </div>

              <div className="bg-[#f5f5f7] rounded-2xl p-5">
                <h3 className="font-bold text-lg mb-2">
                  Secure Booking
                </h3>

                <p className="text-gray-500 text-sm leading-6">
                  Safe and verified rental booking platform.
                </p>
              </div>

              <div className="bg-lime-100 rounded-2xl p-5">
                <h3 className="font-bold text-lg mb-2">
                  Premium Support
                </h3>

                <p className="text-gray-700 text-sm leading-6">
                  24/7 assistance for customers and vendors.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
);
};

export default VehicleDetails;