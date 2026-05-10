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

  // FETCH ALL VEHICLES
  const fetchVehicles =
    async () => {

      try {

        const data =
          await getAllVehicles();

        setVehicles(data);

      } catch (error) {

        console.log(error);

        setError(
          "Failed to fetch vehicles"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchVehicles();

  }, []);

  // SEARCH
  const handleSearch =
    async ({
      district,
      location,
    }) => {

      try {

        setLoading(true);

        setError("");

        const data =
          await searchVehicles(
            district,
            location
          );

        setVehicles(data);

      } catch (error) {

        console.log(error);

        setError(
          "No vehicles found"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen bg-[#f3f3f5]">

      {/* HERO SECTION */}
      <div className="relative overflow-hidden bg-black px-6 md:px-12 py-20 rounded-b-[50px] shadow-2xl">

        {/* GLOW */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* TOP TEXT */}
          <div className="max-w-4xl mb-14">

            <p className="text-lime-400 uppercase tracking-[6px] font-semibold mb-6">

              Urban Ride Premium Fleet

            </p>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">

              Discover
              <br />

              Luxury Vehicles

            </h1>

            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl">

              Browse premium cars,
              luxury SUVs and elite
              rental vehicles from
              trusted vendors across
              your city.

            </p>

          </div>

          {/* SEARCH */}
          <VehicleSearch
            onSearch={
              handleSearch
            }
          />

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>

            <h2 className="text-4xl font-black mb-3">

              Available Vehicles

            </h2>

            <p className="text-gray-500 text-lg">

              Premium vehicles ready
              for booking.

            </p>

          </div>

          {/* VEHICLE COUNT */}
          <div className="bg-white rounded-3xl px-8 py-5 shadow-sm border border-gray-100">

            <p className="text-gray-500 text-sm mb-1">

              Total Vehicles

            </p>

            <h3 className="text-5xl font-black">

              {
                vehicles.length
              }

            </h3>

          </div>

        </div>

        {/* ERROR */}
        {
          error && (

            <div className="bg-red-100 border border-red-200 text-red-500 rounded-3xl p-6 mb-10 text-lg font-medium">

              {error}

            </div>
          )
        }

        {/* LOADING */}
        {
          loading ? (

            <div className="bg-white rounded-[40px] p-16 text-center shadow-sm">

              <h2 className="text-5xl font-black mb-4">

                Loading Vehicles...

              </h2>

              <p className="text-gray-500 text-lg">

                Fetching premium
                vehicle collection.

              </p>

            </div>

          ) : vehicles.length === 0 ? (

            <div className="bg-white rounded-[40px] p-16 text-center shadow-sm">

              <h2 className="text-5xl font-black mb-6">

                No Vehicles Found

              </h2>

              <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">

                Try searching with a
                different location or
                district to explore
                more premium rides.

              </p>

            </div>

          ) : (

            /* VEHICLE GRID */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {vehicles.map(
                (vehicle) => (

                  <VehicleCard
                    key={
                      vehicle._id
                    }
                    vehicle={
                      vehicle
                    }
                  />
                )
              )}

            </div>
          )
        }

      </div>

    </div>
  );
};

export default Vehicles;