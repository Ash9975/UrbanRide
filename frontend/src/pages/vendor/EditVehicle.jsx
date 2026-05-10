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

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  // FETCH VEHICLE
  useEffect(() => {

    const fetchVehicle =
      async () => {

        try {

          const response =
            await api.get(
              `/user/vehicles/${id}`
            );

          setFormData(
            response.data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setPageLoading(false);
        }
      };

    fetchVehicle();

  }, [id]);

  // HANDLE CHANGE
  const handleChange = (e) => {

    // IMAGE INPUT
    if (
      e.target.name ===
      "images"
    ) {

      setFormData({
        ...formData,
        images:
          e.target.files,
      });

      return;
    }

    // NORMAL INPUT
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

        const vehicleData =
          new FormData();

        // APPEND FIELDS
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

        // UPDATE API
        await updateVehicle(
          id,
          vehicleData
        );

        alert(
          "Vehicle updated successfully"
        );

        navigate(
          "/vendor/vehicles"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update vehicle"
        );

      } finally {

        setLoading(false);
      }
    };

  // LOADING SCREEN
  if (pageLoading) {

    return (

      <div className="min-h-screen bg-[#f3f3f5] flex items-center justify-center">

        <div className="bg-white rounded-[35px] p-12 shadow-sm text-center">

          <h1 className="text-4xl font-black mb-4">

            Loading Vehicle...

          </h1>

          <p className="text-gray-500">

            Fetching vehicle details.

          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#f3f3f5] p-6">

      {/* HERO */}
      <div className="relative overflow-hidden bg-black rounded-[40px] p-10 md:p-14 mb-10 shadow-2xl">

        {/* GLOW */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl">

          <p className="text-lime-400 uppercase tracking-[5px] font-semibold mb-5">

            Vendor Vehicle Management

          </p>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">

            Edit Your
            <br />

            Luxury Vehicle

          </h1>

          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">

            Update your premium
            vehicle details, pricing,
            images and listing
            information for customers.

          </p>

        </div>

      </div>

      {/* CURRENT STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* STATUS */}
        <div className="bg-white rounded-[30px] p-6 shadow-sm">

          <p className="text-gray-500 mb-3 text-lg">

            Approval Status

          </p>

          <h2
            className={`text-4xl font-black ${formData.isAdminApproved
                ? "text-green-500"
                : formData.isRejected
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
          >

            {
              formData.isAdminApproved
                ? "Approved"
                : formData.isRejected
                  ? "Rejected"
                  : "Pending"
            }

          </h2>

        </div>

        {/* PRICE */}
        <div className="bg-lime-100 rounded-[30px] p-6 shadow-sm">

          <p className="text-gray-700 mb-3 text-lg">

            Current Price

          </p>

          <h2 className="text-5xl font-black">

            ₹
            {
              formData.price
            }

          </h2>

        </div>

        {/* LOCATION */}
        <div className="bg-black text-white rounded-[30px] p-6 shadow-sm">

          <p className="text-gray-300 mb-3 text-lg">

            Vehicle Location

          </p>

          <h2 className="text-4xl font-black">

            {
              formData.location
            }

          </h2>

        </div>

      </div>

      {/* EXISTING IMAGE */}
      {
        formData.images?.[0] && (

          <div className="bg-white rounded-[40px] p-8 mb-10 shadow-sm">

            <h2 className="text-3xl font-black mb-6">

              Current Vehicle Image

            </h2>

            <img
              src={
                formData.images[0]
              }
              alt={
                formData.title
              }
              className="w-full h-[450px] object-cover rounded-[35px]"
            />

          </div>
        )
      }

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

export default EditVehicle;