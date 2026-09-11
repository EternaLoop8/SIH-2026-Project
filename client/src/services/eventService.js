import api from "./api.js";

export const getEvents = async () => {
  const response = await api.get("/events");

  return response.data;
};

export const getEventById = async (id) => {
  const response = await api.get(`/events/${id}`);

  return response.data;
};

export const createEvent = async (formData) => {
  const response = await api.post("/events", formData);

  return response.data;
};