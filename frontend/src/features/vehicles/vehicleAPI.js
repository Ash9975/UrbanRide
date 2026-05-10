import api from "../../services/api";

// GET ALL VEHICLES
export const getAllVehicles = async () => {

  const response = await api.get(
    "/user/vehicles"
  );

  return response.data;
};

// GET SINGLE VEHICLE
export const getVehicleDetails = async (id) => {

  const response = await api.get(
    `/user/vehicles/${id}`
  );

  return response.data;
};

// SEARCH VEHICLES
export const searchVehicles = async (
  district,
  location
) => {

  const response = await api.get(
    `/user/vehicles/search?district=${district}&location=${location}`
  );

  return response.data;
};