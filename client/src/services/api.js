import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV
  ? "http://localhost:3000/api"
  : "https://sih-2026-project-4le9.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;