import api from "./api";

export const getExperience = async() => {
    const response = await api.get("/experience");
    return response.data;
};

export const getExperienceById = async(id) => {
    const response = await api.get(`/experience/${id}`);
    return response.data;
};