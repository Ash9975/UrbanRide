import { useState } from "react";
import { useNavigate } from "react-router-dom";

import VehicleForm from "../../components/vendor/VehicleForm";

import {
  addVehicle,
} from "../../features/vendor/vendorAPI";

const AddVehicle = () => {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      company: "",
      model: "",
      year: "",
      registrationNumber: "",
      price: "",
      basePackage: "",
      fuelType: "",
      transmission: "",
      seats: "",
      carType: "",
      district: "",
      location: "",
      description: "",
      images: null,
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    if (e.target.name === "images") {
      setFormData({
        ...formData,
        images: e.target.files,
      });
      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const vehicleData = new FormData();

        Object.keys(formData).forEach((key) => {
          if (key === "images") {
            if (formData.images) {
              for (let i = 0; i < formData.images.length; i++) {
                vehicleData.append("images", formData.images[i]);
              }
            }
          } else if (formData[key] !== "" && formData[key] !== null) {
            vehicleData.append(key, formData[key]);
          }
        });

        const data = await addVehicle(vehicleData);
        console.log(data);
        alert("Vehicle added successfully! It will be listed after admin approval.");
        navigate("/vendor/vehicles");

      } catch (error) {
        console.log(error);
        const message = error.response?.data?.message || "Failed to add vehicle";
        alert(message);
      } finally {
        setLoading(false);
      }
    };

  return (

    <div className="space-y-6">

      <div className="bg-black rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-lime-400/15 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <p className="text-lime-400 uppercase tracking-[3px] text-[10px] font-semibold mb-2">
            Vendor Vehicle Listing
          </p>
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
            Add Your<br />Luxury Vehicle
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed max-w-lg">
            Expand your premium fleet and start getting bookings from customers through the Urban Ride luxury rental platform.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-black mb-1">Premium</h2>
          <p className="text-gray-500 text-xs leading-relaxed">List luxury vehicles and attract premium customers.</p>
        </div>
        <div className="bg-lime-100 rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-black mb-1">Fast Approval</h2>
          <p className="text-gray-600 text-xs leading-relaxed">Admin verification ensures trusted and secure listings.</p>
        </div>
        <div className="bg-black text-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-black mb-1">Earn More</h2>
          <p className="text-gray-300 text-xs leading-relaxed">Grow your rental business with Urban Ride marketplace.</p>
        </div>
      </div>

      <VehicleForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
};

export default AddVehicle;
