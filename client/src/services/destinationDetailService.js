import api from "./api.js";

export const getDestinationDetailById = async (id) => {
  const response = await api.get(`/destinations/${id}/details`);

  return response.data;
};