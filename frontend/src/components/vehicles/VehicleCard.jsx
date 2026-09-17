import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {

  return (

    <Link
      to={`/vehicles/${vehicle._id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition duration-300 block"
    >

      <div className="relative h-52 overflow-hidden">
        <img
          src={vehicle.images?.[0]}
          alt={vehicle.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
          ₹ {vehicle.price}/day
        </div>

        <div className="absolute bottom-3 left-3 text-white">
          <h2 className="text-lg font-bold leading-tight">
            {vehicle.title}
          </h2>
          <p className="text-xs text-gray-200 mt-0.5">
            {vehicle.company} {vehicle.model}
          </p>
        </div>
      </div>

      <div className="p-4">

        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">Location</p>
            <h3 className="text-sm font-bold">{vehicle.location}</h3>
          </div>
          <div className="bg-lime-50 px-3 py-1.5 rounded-lg">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">District</p>
            <h3 className="text-xs font-bold">{vehicle.district}</h3>
          </div>
        </div>

        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
          {vehicle.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Category</p>
            <h3 className="text-xs font-bold">Premium Vehicle</h3>
          </div>
          <button className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-semibold transition">
            View Details
          </button>
        </div>

      </div>

    </Link>
  );
};

export default VehicleCard;
