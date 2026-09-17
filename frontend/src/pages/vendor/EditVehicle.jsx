import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import VehicleForm from "../../components/vendor/VehicleForm";

import api from "../../services/api";

import {
  updateVehicle,
} from "../../features/vendor/vendorAPI";

const EditVehicle = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  useEffect(() => {

    const fetchVehicle =
      async () => {
        try {
          const response = await api.get(`/user/vehicles/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setPageLoading(false);
        }
      };

    fetchVehicle();

  }, [id]);

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
          if (key !== "images") {
            vehicleData.append(key, formData[key]);
          }
        });

        if (formData.images) {
          for (let i = 0; i < formData.images.length; i++) {
            vehicleData.append("images", formData.images[i]);
          }
        }

        await updateVehicle(id, vehicleData);
        alert("Vehicle updated successfully");
        navigate("/vendor/vehicles");

      } catch (error) {
        console.log(error);
        alert("Failed to update vehicle");
      } finally {
        setLoading(false);
      }
    };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[#f3f3f5] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
          <h1 className="text-base font-black mb-2">Loading Vehicle...</h1>
          <p className="text-gray-500 text-sm">Fetching vehicle details.</p>
        </div>
      </div>
    );
  }

  return (

    <div className="space-y-6">

      <div className="relative overflow-hidden bg-black rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-lime-400/15 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <p className="text-lime-400 uppercase tracking-[3px] text-[10px] font-semibold mb-2">
            Vendor Vehicle Management
          </p>
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
            Edit Your<br />Luxury Vehicle
          </h1>
          <p className="text-gray-300 text-sm max-w-lg leading-relaxed">
            Update your premium vehicle details, pricing, images and listing information for customers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Approval Status</p>
          <h2 className={`text-xl font-black ${formData.isAdminApproved ? "text-green-500" : formData.isRejected ? "text-red-500" : "text-yellow-500"}`}>
            {formData.isAdminApproved ? "Approved" : formData.isRejected ? "Rejected" : "Pending"}
          </h2>
        </div>
        <div className="bg-lime-100 rounded-xl p-5 shadow-sm">
          <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Current Price</p>
          <h2 className="text-xl font-black">₹{formData.price}</h2>
        </div>
        <div className="bg-black text-white rounded-xl p-5 shadow-sm">
          <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Vehicle Location</p>
          <h2 className="text-xl font-black">{formData.location}</h2>
        </div>
      </div>

      {formData.images?.[0] && (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-base font-black mb-4">Current Vehicle Image</h2>
          <img
            src={formData.images[0]}
            alt={formData.title}
            className="w-full h-64 sm:h-80 object-cover rounded-xl"
          />
        </div>
      )}

      <VehicleForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
};

export default EditVehicle;
