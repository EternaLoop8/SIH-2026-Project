import api from "./api";

export const getExperienceDetailById = async (id) => {
    const response = await api.get(`/experience/${id}/details`);

    return response.data;
};