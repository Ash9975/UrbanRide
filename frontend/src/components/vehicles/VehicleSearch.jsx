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

    <div className="relative overflow-hidden rounded-[40px] bg-black p-8 md:p-10 shadow-2xl mb-12">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-lime-400/20 rounded-full blur-3xl" />

      <div className="relative z-10">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <p className="text-lime-400 font-semibold uppercase tracking-[4px] mb-3">

              Premium Rental Search

            </p>

            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">

              Find Your
              <br />

              Luxury Ride

            </h1>

          </div>

          {/* SMALL INFO CARD */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 min-w-[260px]">

            <h3 className="text-white text-2xl font-black mb-2">

              Urban Ride

            </h3>

            <p className="text-gray-300 leading-relaxed">

              Discover premium
              vehicles across your
              city with secure and
              fast booking.

            </p>

          </div>

        </div>

        {/* SEARCH FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >

          {/* DISTRICT */}
          <div className="bg-white rounded-3xl p-5 shadow-lg">

            <label className="block text-gray-500 text-sm mb-3 font-medium">

              Select District

            </label>

            <input
              type="text"
              placeholder="Nagpur"
              value={district}
              onChange={(e) =>
                setDistrict(
                  e.target.value
                )
              }
              className="w-full text-lg outline-none bg-transparent font-semibold"
            />

          </div>

          {/* LOCATION */}
          <div className="bg-white rounded-3xl p-5 shadow-lg">

            <label className="block text-gray-500 text-sm mb-3 font-medium">

              Pickup Location

            </label>

            <input
              type="text"
              placeholder="Maharashtra"
              value={location}
              onChange={(e) =>
                setLocation(
                  e.target.value
                )
              }
              className="w-full text-lg outline-none bg-transparent font-semibold"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-lime-400 hover:bg-lime-300 rounded-3xl text-black text-xl font-black transition duration-300 shadow-lg hover:scale-[1.02] min-h-[90px]"
          >

            Search Vehicles

          </button>

        </form>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-5">

            <h3 className="text-white text-2xl font-black mb-2">

              Luxury Fleet

            </h3>

            <p className="text-gray-400">

              Premium cars from
              trusted vendors.

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-5">

            <h3 className="text-white text-2xl font-black mb-2">

              Secure Booking

            </h3>

            <p className="text-gray-400">

              Fast and safe booking
              experience.

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-5">

            <h3 className="text-white text-2xl font-black mb-2">

              Premium Support

            </h3>

            <p className="text-gray-400">

              Dedicated customer
              assistance anytime.

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default VehicleSearch;