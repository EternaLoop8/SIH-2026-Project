import api from "./api.js";

export const getDestinationById = async (id) => {
  const response = await api.get(`/destinations/${id}/details`);

  return response.data;
};
