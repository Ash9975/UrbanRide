import { useState } from "react";

import VehicleForm from "../../components/vendor/VehicleForm";

import {
  addVehicle,
} from "../../features/vendor/vendorAPI";

const AddVehicle = () => {

  const [formData, setFormData] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    // IMAGE INPUT
    if (e.target.name === "images") {

      setFormData({
        ...formData,
        images: e.target.files,
      });

      return;
    }

    // NORMAL INPUTS
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        // FORM DATA
        const vehicleData =
          new FormData();

        // APPEND NORMAL FIELDS
        Object.keys(
          formData
        ).forEach((key) => {

          if (
            key !== "images"
          ) {

            vehicleData.append(
              key,
              formData[key]
            );
          }
        });

        // APPEND IMAGES
        if (
          formData.images
        ) {

          for (
            let i = 0;
            i <
            formData.images
              .length;
            i++
          ) {

            vehicleData.append(
              "images",
              formData.images[i]
            );
          }
        }

        // API CALL
        const data =
          await addVehicle(
            vehicleData
          );

        console.log(data);

        alert(
          "Vehicle added successfully"
        );

        // RESET
        setFormData({});

      } catch (error) {

        console.log(error);

        alert(
          "Failed to add vehicle"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen bg-[#f3f3f5] p-6">

      {/* TOP HERO */}
      <div className="bg-black rounded-[40px] p-10 md:p-14 mb-10 relative overflow-hidden shadow-2xl">

        {/* GLOW EFFECT */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl">

          <p className="text-lime-400 uppercase tracking-[5px] font-semibold mb-5">

            Vendor Vehicle Listing

          </p>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">

            Add Your
            <br />

            Luxury Vehicle

          </h1>

          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">

            Expand your premium
            fleet and start getting
            bookings from customers
            through the Urban Ride
            luxury rental platform.

          </p>

        </div>

      </div>

      {/* QUICK INFO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* CARD 1 */}
        <div className="bg-white rounded-[30px] p-6 shadow-sm">

          <h2 className="text-4xl font-black mb-3">

            Premium

          </h2>

          <p className="text-gray-500 leading-relaxed">

            List luxury vehicles
            and attract premium
            customers.

          </p>

        </div>

        {/* CARD 2 */}
        <div className="bg-lime-100 rounded-[30px] p-6 shadow-sm">

          <h2 className="text-4xl font-black mb-3">

            Fast Approval

          </h2>

          <p className="text-gray-700 leading-relaxed">

            Admin verification
            ensures trusted and
            secure listings.

          </p>

        </div>

        {/* CARD 3 */}
        <div className="bg-black text-white rounded-[30px] p-6 shadow-sm">

          <h2 className="text-4xl font-black mb-3">

            Earn More

          </h2>

          <p className="text-gray-300 leading-relaxed">

            Grow your rental
            business with Urban
            Ride marketplace.

          </p>

        </div>

      </div>

      {/* FORM */}
      <VehicleForm
        formData={formData}
        handleChange={
          handleChange
        }
        handleSubmit={
          handleSubmit
        }
        loading={loading}
      />

    </div>
  );
};

export default AddVehicle;