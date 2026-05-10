import api from "../../services/api";

export const loginUser = async (formData, role) => {

  let endpoint = "";

  // USER LOGIN
  if (role === "user") {
    endpoint = "/auth/login";
  }

  // VENDOR LOGIN
  else if (role === "vendor") {
    endpoint = "/vendor/auth/login";
  }

  // ADMIN LOGIN
  else if (role === "admin") {
    endpoint = "/admin/auth/login";
  }

  const response = await api.post(
    endpoint,
    formData
  );

  return response.data;
};