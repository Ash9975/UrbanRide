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

    <div className="min-h-screen bg-[#f3f3f5] p-6">

      {/* HERO IMAGE */}
      <div className="relative overflow-hidden rounded-[40px] shadow-2xl mb-10">

        <img
          src={vehicle.images?.[0]}
          alt={vehicle.title}
          className="w-full h-[650px] object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/30" />

        {/* CONTENT */}
        <div className="absolute bottom-10 left-10 text-white max-w-3xl">

          <p className="text-lime-400 uppercase tracking-[5px] font-semibold mb-5">

            Premium Luxury Vehicle

          </p>

          <h1 className="text-6xl md:text-8xl font-black leading-tight mb-5">

            {vehicle.title}

          </h1>

          <p className="text-2xl text-gray-200">

            {vehicle.company}
            {" "}
            {vehicle.model}

          </p>

        </div>

        {/* PRICE BADGE */}
        <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-md px-8 py-5 rounded-3xl text-white shadow-lg">

          <p className="text-gray-300 text-sm mb-2">

            Price Per Day

          </p>

          <h2 className="text-5xl font-black">

            ₹ {vehicle.price}

          </h2>

        </div>

      </div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

        {/* LEFT DETAILS */}
        <div className="lg:col-span-2 space-y-8">

          {/* VEHICLE INFO */}
          <div className="bg-white rounded-[35px] p-8 shadow-sm">

            <h2 className="text-4xl font-black mb-8">

              Vehicle Information

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* FUEL */}
              <div className="bg-[#f5f5f7] rounded-3xl p-6">

                <p className="text-gray-500 mb-2">

                  Fuel Type

                </p>

                <h3 className="text-3xl font-black">

                  {vehicle.fuelType}

                </h3>

              </div>

              {/* SEATS */}
              <div className="bg-[#f5f5f7] rounded-3xl p-6">

                <p className="text-gray-500 mb-2">

                  Seating Capacity

                </p>

                <h3 className="text-3xl font-black">

                  {vehicle.seats}

                </h3>

              </div>

              {/* LOCATION */}
              <div className="bg-lime-100 rounded-3xl p-6">

                <p className="text-gray-700 mb-2">

                  Location

                </p>

                <h3 className="text-3xl font-black">

                  {vehicle.location}

                </h3>

              </div>

              {/* DISTRICT */}
              <div className="bg-black text-white rounded-3xl p-6">

                <p className="text-gray-300 mb-2">

                  District

                </p>

                <h3 className="text-3xl font-black">

                  {vehicle.district}

                </h3>

              </div>

            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="bg-white rounded-[35px] p-8 shadow-sm">

            <h2 className="text-4xl font-black mb-6">

              About This Vehicle

            </h2>

            <p className="text-gray-500 leading-relaxed text-lg">

              {
                vehicle.description
              }

            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-8">

          {/* BOOKING CARD */}
          <div className="bg-black text-white rounded-[35px] p-8 shadow-2xl sticky top-5">

            <p className="text-lime-400 uppercase tracking-[4px] font-semibold mb-4">

              Book Luxury Ride

            </p>

            <h2 className="text-5xl font-black mb-4">

              ₹ {vehicle.price}

            </h2>

            <p className="text-gray-300 mb-8">

              Premium rental price
              per day.

            </p>

            {/* BOOKING FORM */}
            <BookingForm
              vehicleId={
                vehicle._id
              }
            />

          </div>

          {/* PREMIUM FEATURES */}
          <div className="bg-white rounded-[35px] p-8 shadow-sm">

            <h2 className="text-3xl font-black mb-6">

              Premium Features

            </h2>

            <div className="space-y-5">

              <div className="bg-[#f5f5f7] rounded-2xl p-5">

                <h3 className="font-bold text-xl mb-2">

                  Luxury Interior

                </h3>

                <p className="text-gray-500">

                  Comfortable premium
                  seating experience.

                </p>

              </div>

              <div className="bg-[#f5f5f7] rounded-2xl p-5">

                <h3 className="font-bold text-xl mb-2">

                  Secure Booking

                </h3>

                <p className="text-gray-500">

                  Safe and verified
                  rental platform.

                </p>

              </div>

              <div className="bg-lime-100 rounded-2xl p-5">

                <h3 className="font-bold text-xl mb-2">

                  Premium Support

                </h3>

                <p className="text-gray-700">

                  24/7 assistance for
                  customers and vendors.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default VehicleDetails;