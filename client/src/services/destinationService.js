import api from "./api";

export const getDestinations = async () => {
  const response = await api.get("/destinations");

  return response.data;
};

export const getDestinationById = async (id) => {
  const response = await api.get(`/destinations/${id}`);

  return response.data;
}