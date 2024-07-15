import axios from "axios";
import {HOST} from "../Constants";

// API call to fetch pending photo verifications
const apiClient = axios.create({
    baseURL: HOST + "/campaign",
    withCredentials: true
});


export const createCampaignApi = async (title, description, total, type, image) => {
    try {
        // Create FormData Object
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("total", total);
        formData.append("image", image);
        formData.append("type", type);
        const response = await axios({
            method: "POST",
            data: formData,
            withCredentials: true,
            url: `${HOST}/campaign`,
            headers: {'Content-Type': 'multipart/form-data'}
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error registering user.';
        console.error("Registration error:", errorMessage);
        throw new Error(errorMessage);
    }
};

export const getAllCampaigns = async () => {
    try {
        const response = await apiClient.get('/');
        console.log("API response:", response);
        return response.data;
    } catch (error) {
        console.error("API error:", error.response);
        throw new Error(error.response?.data?.message || 'Failed to fetch data');
    }
};

export const getMyCampaigns = async () => {
    try {
        const response = await apiClient.get('/my');
        console.log("API response:", response);
        return response.data;
    } catch (error) {
        console.error("API error:", error.response);
        throw new Error(error.response?.data?.message || 'Failed to fetch data');
    }
};

export const getCampaign = async (id) => {
    try {
        const response = await apiClient.get(`/campaign/${id}`);
        console.log("API response:", response);
        return response.data;
    } catch (error) {
        console.error("API error:", error.response);
        throw new Error(error.response?.data?.message || 'Failed to fetch data');
    }
};


export const validateNGO = async (ngo, validation) => {
    console.log("NGO ID: ", ngo)
    try {
        const response = await apiClient.post('/validate', {ngo, validation});
        console.log("API response:", response); // Debugging log
        return response.data;
    } catch (error) {
        console.error("API error:", error.response); // Debugging log
        throw new Error(error.response?.data?.message || 'Failed to fetch data');
    }
};
