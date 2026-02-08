import api from "./axios";

/**
 * Register user (multipart/form-data)
 */
export const registerUser = (formData) =>
  api.post("/users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

/**
 * Login user
 */
export const loginUser = async (data) => {
  const res = await api.post("/users/login", data);

  localStorage.setItem(
    "accessToken",
    res.data.data.accessToken
  );

  return res;
};
/**
 * Logout user
 */
export const logoutUser = () =>
  api.post("/users/logout");

/**
 * Get current logged-in user
 */
export const getCurrentUser = () =>
  api.get("/users/current-user");
