import api from "../../services/api";

export const loginUser = async (formData, role) => {

  let endpoint = "";

  // USER LOGIN
  if (role === "user") {
    endpoint = "/auth/login";
    console.log("User login endpoint:", endpoint);
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

export const signupUser = async (
  formData,
  role
) => {

  let endpoint = "";

  // USER SIGNUP
  if (role === "user") {

    endpoint = "/auth/signup";

  }

  // VENDOR SIGNUP
  else if (role === "vendor") {

    endpoint =
      "/vendor/auth/signup";

  }

  // ADMIN SIGNUP
  else if (role === "admin") {

    endpoint =
      "/admin/auth/signup";
  }

  const response =
    await api.post(
      endpoint,
      formData
    );

  return response.data;
};