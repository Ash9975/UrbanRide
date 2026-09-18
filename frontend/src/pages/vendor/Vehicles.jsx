import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles =
    async () => {
      try {
        const data = await getVendorVehicles();
        setVehicles(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async (id) => {
      try {
        await deleteVehicle(id);
        setVehicles(vehicles.filter((vehicle) => vehicle._id !== id));
      } catch (error) {
        console.log(error);
      }
    };

  const approvedVehicles =
    vehicles.filter((v) => v.isAdminApproved).length;

  const pendingVehicles =
    vehicles.filter((v) => !v.isAdminApproved && !v.isRejected).length;

  const rejectedVehicles =
    vehicles.filter((v) => v.isRejected).length;

  return (

    <div className="space-y-6">

      {/* HERO */}
      <div className="relative overflow-hidden bg-black rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-lime-400/15 rounded-full blur-3xl" />

        <div className="relative z-10">
          <p className="text-lime-400 uppercase tracking-[3px] text-[10px] font-semibold mb-2">
            Vendor Fleet Management
          </p>
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
            My Luxury<br />Vehicles
          </h1>
          <p className="text-gray-300 text-sm max-w-lg leading-relaxed">
            Manage your listed vehicles, update pricing, track approvals and grow your luxury rental fleet with Urban Ride.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Approved Vehicles</p>
          <h2 className="text-3xl font-black text-green-500">{approvedVehicles}</h2>
        </div>

        <div className="bg-lime-100 rounded-xl p-5 shadow-sm">
          <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Pending Approval</p>
          <h2 className="text-3xl font-black">{pendingVehicles}</h2>
        </div>

        <div className="bg-black text-white rounded-xl p-5 shadow-sm">
          <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Rejected Vehicles</p>
          <h2 className="text-3xl font-black text-red-400">{rejectedVehicles}</h2>
        </div>

      </div>

      {loading && (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
          <h2 className="text-base font-black mb-1">Loading Vehicles...</h2>
          <p className="text-gray-500 text-sm">Fetching your luxury fleet details.</p>
        </div>
      )}

      {!loading && vehicles.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
          <div className="max-w-sm mx-auto">
            <h2 className="text-lg font-black mb-3">No Vehicles Added</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Start growing your rental business by adding your first luxury vehicle to the Urban Ride platform.
            </p>
            <Link
              to="/vendor/add-vehicle"
              className="inline-flex bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-semibold transition"
            >
              Add Vehicle
            </Link>
          </div>
        </div>
      )}

      {!loading && vehicles.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {vehicles.map((vehicle) => (
            <VendorVehicleCard
              key={vehicle._id}
              vehicle={vehicle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Vehicles;
