import { useEffect, useState } from "react";

import VehicleCard from "../../components/vehicles/VehicleCard";

import VehicleSearch from "../../components/vehicles/VehicleSearch";

import {
  getAllVehicles,
  searchVehicles,
} from "../../features/vehicles/vehicleAPI";

const Vehicles = () => {

  const [vehicles, setVehicles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchVehicles =
    async () => {
      try {
        const data = await getAllVehicles();
        setVehicles(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch vehicles");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSearch =
    async ({ district, location }) => {
      try {
        setLoading(true);
        setError("");
        const data = await searchVehicles(district, location);
        setVehicles(data);
      } catch (error) {
        console.log(error);
        setError("No vehicles found");
      } finally {
        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen bg-[#f3f3f5]">

      {/* HERO SECTION */}
      <div className="relative overflow-hidden bg-black px-6 md:px-12 py-14 rounded-b-3xl shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/15 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl mb-10">
            <p className="text-lime-400 uppercase tracking-[4px] text-[10px] font-semibold mb-3">
              Urban Ride Premium Fleet
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              Discover<br />Luxury Vehicles
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl">
              Browse premium cars, luxury SUVs and elite rental vehicles from
              trusted vendors across your city.
            </p>
          </div>

          <VehicleSearch onSearch={handleSearch} />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black mb-1">Available Vehicles</h2>
            <p className="text-gray-500 text-sm">Premium vehicles ready for booking.</p>
          </div>

          <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">Total Vehicles</p>
            <h3 className="text-2xl font-black">{vehicles.length}</h3>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl p-4 mb-8 text-sm font-medium">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <h2 className="text-lg font-black mb-2">Loading Vehicles...</h2>
            <p className="text-gray-500 text-sm">Fetching premium vehicle collection.</p>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <h2 className="text-lg font-black mb-3">No Vehicles Found</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
              Try searching with a different location or district to explore more premium rides.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

export default Vehicles;
