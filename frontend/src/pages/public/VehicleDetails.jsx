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
          const data = await getVehicleDetails(id);
          setVehicle(data);
        } catch (error) {
          console.log(error);
          setError("Failed to fetch vehicle");
        } finally {
          setLoading(false);
        }
      };

    fetchVehicle();

  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f3f5] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
          <h1 className="text-lg font-black mb-2">Loading Vehicle...</h1>
          <p className="text-gray-500 text-sm">Fetching premium vehicle details.</p>
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

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-[#f3f3f5] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
          <h1 className="text-lg font-black mb-2">Vehicle Not Found</h1>
          <p className="text-gray-500 text-sm">This luxury vehicle does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">

      {/* HERO */}
      <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[500px] overflow-hidden">
        <img
          src={vehicle.images?.[0]}
          alt={vehicle.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />

        <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 text-white max-w-2xl">
          <p className="text-lime-400 uppercase tracking-[2px] text-[10px] sm:text-xs font-semibold mb-2">
            Premium Luxury Vehicle
          </p>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight mb-2">
            {vehicle.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-200">
            {vehicle.company} {vehicle.model}
          </p>
        </div>

        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-3 rounded-xl text-white shadow-xl">
          <p className="text-gray-300 text-[10px] sm:text-xs mb-0.5">Price Per Day</p>
          <h2 className="text-lg sm:text-2xl font-black">₹ {vehicle.price}</h2>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-5">

            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg sm:text-xl font-black mb-5">Vehicle Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#f5f5f7] rounded-xl p-4">
                  <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Fuel Type</p>
                  <h3 className="text-sm font-bold capitalize">{vehicle.fuelType}</h3>
                </div>
                <div className="bg-[#f5f5f7] rounded-xl p-4">
                  <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Seating Capacity</p>
                  <h3 className="text-sm font-bold">{vehicle.seats}</h3>
                </div>
                <div className="bg-lime-50 rounded-xl p-4">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Location</p>
                  <h3 className="text-sm font-bold">{vehicle.location}</h3>
                </div>
                <div className="bg-black text-white rounded-xl p-4">
                  <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">District</p>
                  <h3 className="text-sm font-bold">{vehicle.district}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg sm:text-xl font-black mb-4">About This Vehicle</h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                {vehicle.description ||
                  "Experience luxury driving with premium comfort, smooth performance, and high-end safety features. Perfect for city rides, family trips, and business travel."}
              </p>
            </div>

          </div>

          <div className="space-y-5">

            <div className="bg-black text-white rounded-2xl p-5 sm:p-6 shadow-xl lg:sticky lg:top-20">
              <p className="text-lime-400 uppercase tracking-[2px] text-[10px] font-semibold mb-2">
                Book Luxury Ride
              </p>
              <h2 className="text-2xl sm:text-3xl font-black mb-2">₹ {vehicle.price}</h2>
              <p className="text-gray-300 mb-5 text-xs">Premium rental price per day.</p>
              <BookingForm vehicleId={vehicle._id} />
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-black mb-4">Premium Features</h2>
              <div className="space-y-3">
                <div className="bg-[#f5f5f7] rounded-xl p-4">
                  <h3 className="font-bold text-sm mb-1">Luxury Interior</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">Comfortable premium seating and spacious interior.</p>
                </div>
                <div className="bg-[#f5f5f7] rounded-xl p-4">
                  <h3 className="font-bold text-sm mb-1">Secure Booking</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">Safe and verified rental booking platform.</p>
                </div>
                <div className="bg-lime-50 rounded-xl p-4">
                  <h3 className="font-bold text-sm mb-1">Premium Support</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">24/7 assistance for customers and vendors.</p>
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
