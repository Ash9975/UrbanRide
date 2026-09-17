import { useState } from "react";

const VehicleSearch = ({
  onSearch,
}) => {

  const [
    district,
    setDistrict,
  ] = useState("");

  const [
    location,
    setLocation,
  ] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    onSearch({
      district,
      location,
    });
  };

  return (

    <div className="relative overflow-hidden rounded-2xl bg-black p-6 md:p-8 shadow-2xl">

      <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/15 rounded-full blur-3xl" />

      <div className="relative z-10">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

          <div>
            <p className="text-lime-400 font-semibold uppercase tracking-[3px] text-[10px] mb-2">
              Premium Rental Search
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
              Find Your<br />Luxury Ride
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 min-w-[220px]">
            <h3 className="text-white text-sm font-bold mb-1">Urban Ride</h3>
            <p className="text-gray-300 text-xs leading-relaxed">
              Discover premium vehicles across your city with secure and fast booking.
            </p>
          </div>

        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          <div className="bg-white rounded-xl p-4 shadow-lg">
            <label className="block text-gray-400 text-[10px] mb-2 font-medium uppercase tracking-wider">
              Select District
            </label>
            <input
              type="text"
              placeholder="Nagpur"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full text-sm outline-none bg-transparent font-semibold"
            />
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg">
            <label className="block text-gray-400 text-[10px] mb-2 font-medium uppercase tracking-wider">
              Pickup Location
            </label>
            <input
              type="text"
              placeholder="Maharashtra"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-sm outline-none bg-transparent font-semibold"
            />
          </div>

          <button
            type="submit"
            className="bg-lime-400 hover:bg-lime-300 rounded-xl text-black text-sm font-bold transition duration-300 shadow-lg hover:scale-[1.01]"
          >
            Search Vehicles
          </button>

        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-white text-sm font-bold mb-1">Luxury Fleet</h3>
            <p className="text-gray-400 text-xs">Premium cars from trusted vendors.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-white text-sm font-bold mb-1">Secure Booking</h3>
            <p className="text-gray-400 text-xs">Fast and safe booking experience.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-white text-sm font-bold mb-1">Premium Support</h3>
            <p className="text-gray-400 text-xs">Dedicated customer assistance anytime.</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default VehicleSearch;
