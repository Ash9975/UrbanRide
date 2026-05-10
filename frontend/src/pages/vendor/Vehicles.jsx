import { useEffect, useState } from "react";

import VendorVehicleCard from "../../components/vendor/VendorVehicleCard";

import {
  getVendorVehicles,
  deleteVehicle,
} from "../../features/vendor/vendorAPI";

const Vehicles = () => {

  const [vehicles, setVehicles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH VEHICLES
  useEffect(() => {

    fetchVehicles();

  }, []);

  const fetchVehicles =
    async () => {

      try {

        const data =
          await getVendorVehicles();

        setVehicles(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // DELETE VEHICLE
  const handleDelete =
    async (id) => {

      try {

        await deleteVehicle(id);

        setVehicles(
          vehicles.filter(
            (vehicle) =>
              vehicle._id !== id
          )
        );

      } catch (error) {

        console.log(error);
      }
    };

  // COUNTS
  const approvedVehicles =
    vehicles.filter(
      (v) =>
        v.isAdminApproved
    ).length;

  const pendingVehicles =
    vehicles.filter(
      (v) =>
        !v.isAdminApproved &&
        !v.isRejected
    ).length;

  const rejectedVehicles =
    vehicles.filter(
      (v) =>
        v.isRejected
    ).length;

  return (

    <div className="min-h-screen bg-[#f3f3f5] p-6">

      {/* HERO */}
      <div className="relative overflow-hidden bg-black rounded-[40px] p-10 md:p-14 mb-10 shadow-2xl">

        {/* GLOW */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/20 rounded-full blur-3xl" />

        <div className="relative z-10">

          <p className="text-lime-400 uppercase tracking-[5px] font-semibold mb-5">

            Vendor Fleet Management

          </p>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">

            My Luxury
            <br />

            Vehicles

          </h1>

          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">

            Manage your listed
            vehicles, update pricing,
            track approvals and grow
            your luxury rental fleet
            with Urban Ride.

          </p>

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* APPROVED */}
        <div className="bg-white rounded-[30px] p-7 shadow-sm">

          <p className="text-gray-500 mb-3 text-lg">

            Approved Vehicles

          </p>

          <h2 className="text-6xl font-black text-green-500">

            {approvedVehicles}

          </h2>

        </div>

        {/* PENDING */}
        <div className="bg-lime-100 rounded-[30px] p-7 shadow-sm">

          <p className="text-gray-700 mb-3 text-lg">

            Pending Approval

          </p>

          <h2 className="text-6xl font-black">

            {pendingVehicles}

          </h2>

        </div>

        {/* REJECTED */}
        <div className="bg-black text-white rounded-[30px] p-7 shadow-sm">

          <p className="text-gray-300 mb-3 text-lg">

            Rejected Vehicles

          </p>

          <h2 className="text-6xl font-black text-red-400">

            {rejectedVehicles}

          </h2>

        </div>

      </div>

      {/* LOADING */}
      {
        loading && (

          <div className="bg-white rounded-[40px] p-16 text-center shadow-sm">

            <h2 className="text-4xl font-black mb-4">

              Loading Vehicles...

            </h2>

            <p className="text-gray-500">

              Fetching your luxury
              fleet details.

            </p>

          </div>
        )
      }

      {/* EMPTY STATE */}
      {
        !loading &&
        vehicles.length === 0 && (

          <div className="bg-white rounded-[40px] p-16 text-center shadow-sm">

            <div className="max-w-2xl mx-auto">

              <h2 className="text-5xl font-black mb-6">

                No Vehicles Added

              </h2>

              <p className="text-gray-500 text-lg leading-relaxed mb-8">

                Start growing your
                rental business by
                adding your first
                luxury vehicle to the
                Urban Ride platform.

              </p>

              <a
                href="/vendor/add-vehicle"
                className="inline-flex bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold transition"
              >

                Add Vehicle

              </a>

            </div>

          </div>
        )
      }

      {/* VEHICLES GRID */}
      {
        !loading &&
        vehicles.length > 0 && (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {vehicles.map(
              (vehicle) => (

                <VendorVehicleCard
                  key={
                    vehicle._id
                  }
                  vehicle={vehicle}
                  onDelete={
                    handleDelete
                  }
                />
              )
            )}

          </div>
        )
      }

    </div>
  );
};

export default Vehicles;