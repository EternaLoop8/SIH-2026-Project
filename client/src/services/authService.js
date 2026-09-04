import api from "./api";

// Export as 'register' to match AuthContext.jsx
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Alias export in case other components still call apiRegister
export const apiRegister = register;

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

export const getAdminProfile = async () => {
  const response = await api.get("/auth/admin-dashboard");
  return response.data;
};