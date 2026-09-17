import { Link } from "react-router-dom";

const VendorVehicleCard = ({
  vehicle,
  onDelete,
}) => {

  const status =
    vehicle.isAdminApproved
      ? "Approved"
      : vehicle.isRejected
        ? "Rejected"
        : "Pending";

  const statusColor =
    vehicle.isAdminApproved
      ? "bg-green-500"
      : vehicle.isRejected
        ? "bg-red-500"
        : "bg-yellow-500";

  return (

    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition duration-300">

      <div className="relative h-52 overflow-hidden">
        <img
          src={vehicle.images?.[0]}
          alt={vehicle.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="absolute top-3 right-3">
          <span className={`${statusColor} text-white px-3 py-1 rounded-lg text-[10px] font-semibold shadow-lg`}>
            {status}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 text-white">
          <h2 className="text-lg font-bold">{vehicle.title}</h2>
          <p className="text-xs text-gray-200 mt-0.5">
            {vehicle.company} {vehicle.model}
          </p>
        </div>
      </div>

      <div className="p-4">

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#f5f5f7] rounded-lg p-3">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">Price / Day</p>
            <h3 className="text-sm font-bold">₹ {vehicle.price}</h3>
          </div>
          <div className="bg-[#f5f5f7] rounded-lg p-3">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">Location</p>
            <h3 className="text-xs font-bold">{vehicle.location}</h3>
          </div>
        </div>

        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
          {vehicle.description}
        </p>

        <div className="flex gap-3">
          <Link
            to={`/vendor/vehicles/edit/${vehicle._id}`}
            className="flex-1 bg-black hover:bg-gray-900 text-white py-2.5 rounded-xl text-center text-xs font-semibold transition"
          >
            Edit Vehicle
          </Link>
          <button
            onClick={() => {
              const confirmDelete = window.confirm("Are you sure you want to delete this vehicle?");
              if (confirmDelete) {
                onDelete(vehicle._id);
              }
            }}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-xs font-semibold transition"
          >
            Delete
          </button>
        </div>

      </div>

    </div>
  );
};

export default VendorVehicleCard;
