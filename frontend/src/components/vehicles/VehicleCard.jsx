import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {

  return (

    <Link
      to={`/vehicles/${vehicle._id}`}
      className="bg-white rounded-[35px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition duration-300 block"
    >

      {/* IMAGE SECTION */}
      <div className="relative h-72 overflow-hidden">

        <img
          src={vehicle.images?.[0]}
          alt={vehicle.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/10" />

        {/* PRICE BADGE */}
        <div className="absolute top-5 right-5 bg-black text-white px-5 py-2 rounded-full shadow-lg">

          <span className="font-semibold">

            ₹ {vehicle.price}/day

          </span>

        </div>

        {/* TITLE */}
        <div className="absolute bottom-6 left-6 text-white">

          <h2 className="text-4xl font-black leading-tight">

            {vehicle.title}

          </h2>

          <p className="text-lg text-gray-200 mt-1">

            {vehicle.company}
            {" "}
            {vehicle.model}

          </p>

        </div>

      </div>

      {/* CONTENT */}
      <div className="p-6">

        {/* LOCATION */}
        <div className="flex items-center justify-between mb-5">

          <div>

            <p className="text-gray-500 text-sm mb-1">

              Location

            </p>

            <h3 className="text-xl font-bold">

              {vehicle.location}

            </h3>

          </div>

          <div className="bg-lime-100 px-4 py-3 rounded-2xl">

            <p className="text-sm text-gray-600">

              District

            </p>

            <h3 className="font-bold">

              {vehicle.district}

            </h3>

          </div>

        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-500 leading-relaxed line-clamp-3 mb-6">

          {vehicle.description}

        </p>

        {/* FOOTER */}
        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-400">

              Luxury Rental

            </p>

            <h3 className="font-bold text-lg">

              Premium Vehicle

            </h3>

          </div>

          <button className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-2xl font-semibold transition">

            View Details

          </button>

        </div>

      </div>

    </Link>
  );
};

export default VehicleCard;