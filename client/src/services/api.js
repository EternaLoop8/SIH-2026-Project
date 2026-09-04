import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV
  ? "http://localhost:3000/api"
  : "https://sih-2026-project-4le9.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Automatically injects bearer token into outbound traffic
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;