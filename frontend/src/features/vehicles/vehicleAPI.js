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

  const params = new URLSearchParams();
  if (district) params.append("district", district);
  if (location) params.append("location", location);

  const response = await api.get(
    `/user/vehicles/search?${params.toString()}`
  );

  return response.data;
};
