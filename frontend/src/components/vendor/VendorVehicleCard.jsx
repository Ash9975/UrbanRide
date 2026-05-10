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

    <div className="bg-white rounded-[35px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition duration-300">

      {/* IMAGE */}
      <div className="relative h-72 overflow-hidden">

        <img
          src={vehicle.images?.[0]}
          alt={vehicle.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/10" />

        {/* STATUS */}
        <div className="absolute top-5 right-5">

          <span
            className={`${statusColor} text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg`}
          >

            {status}

          </span>

        </div>

        {/* TITLE */}
        <div className="absolute bottom-6 left-6 text-white">

          <h2 className="text-4xl font-black">

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

        {/* DETAILS */}
        <div className="grid grid-cols-2 gap-4 mb-6">

          <div className="bg-[#f5f5f7] rounded-2xl p-4">

            <p className="text-gray-500 text-sm mb-1">

              Price / Day

            </p>

            <h3 className="text-2xl font-black">

              ₹ {vehicle.price}

            </h3>

          </div>

          <div className="bg-[#f5f5f7] rounded-2xl p-4">

            <p className="text-gray-500 text-sm mb-1">

              Location

            </p>

            <h3 className="text-xl font-bold">

              {vehicle.location}

            </h3>

          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="mb-6">

          <p className="text-gray-500 leading-relaxed line-clamp-3">

            {vehicle.description}

          </p>

        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">

          {/* EDIT */}
          <Link
            to={`/vendor/vehicles/edit/${vehicle._id}`}
            className="flex-1 bg-black hover:bg-gray-900 text-white py-4 rounded-2xl text-center font-semibold transition"
          >

            Edit Vehicle

          </Link>

          {/* DELETE */}
          <button
            onClick={() => {

              const confirmDelete =
                window.confirm(
                  "Are you sure you want to delete this vehicle?"
                );

              if (confirmDelete) {

                onDelete(vehicle._id);
              }
            }}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold transition"
          >

            Delete

          </button>

        </div>

      </div>

    </div>
  );
};

export default VendorVehicleCard;