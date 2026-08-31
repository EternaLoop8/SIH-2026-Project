import api from "./api";

export const getBusiness = async() => {
    const response = await api.get("/business");
    return response.data;
};

export const getBusinessById = async(id) => {
    const response = await api.get(`/business/${id}`);
    return response.data;
};