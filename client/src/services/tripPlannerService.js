import api from "./api.js";

export const createTrip = async (tripData) => {
  const response = await api.post(
    "/trips",
    tripData,
  );

  return response.data;
};

export const getTripById = async (id) => {
  const response = await api.get(
    `/trips/${id}`,
  );

  return response.data;
};