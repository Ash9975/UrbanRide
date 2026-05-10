import api from "../../services/api";

// ADD VEHICLE
export const addVehicle = async (
  vehicleData
) => {

  try {

    const response =
      await api.post(
        "/vendor/vehicles",
        vehicleData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;

  } catch (error) {

    console.log(
      "ADD VEHICLE API ERROR:",
      error
    );

    throw error;
  }
};

// GET MY VEHICLES
export const getVendorVehicles = async () => {

  const response = await api.get(
    "/vendor/vehicles"
  );

  return response.data;
};

// DELETE VEHICLE
export const deleteVehicle = async (id) => {

  const response = await api.delete(
    `/vendor/vehicles/${id}`
  );

  return response.data;
};

// UPDATE VEHICLE
export const updateVehicle = async (
  id,
  formData
) => {

  const response = await api.put(
    `/vendor/vehicles/${id}`,
    formData
  );

  return response.data;
};

// GET BOOKINGS
export const getVendorBookings = async () => {

  const response = await api.get(
    "/vendor/bookings"
  );

  return response.data;


};

// update booking status

export const updateBookingStatus =
  async (id, status) => {

    const response =
      await api.put(
        `/vendor/bookings/${id}`,
        { status }
      );

    return response.data;
  };

// vendorAnalytics
export const getVendorAnalytics = async () => {

  const response = await api.get(
    "/vendor/analytics"
  );

  return response.data;
};