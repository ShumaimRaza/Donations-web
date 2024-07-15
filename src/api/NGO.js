import axios from "axios";
import {HOST} from "../Constants";

// API call to fetch pending photo verifications
const apiClient = axios.create({
    baseURL: HOST+"/ngo",
    withCredentials: true
});

export const getAllNGO = async () => {
    try {
        const response = await apiClient.get('/ngos');
        console.log("API response:", response); // Debugging log
        return response.data;
    } catch (error) {
        console.error("API error:", error.response); // Debugging log
        throw new Error(error.response?.data?.message || 'Failed to fetch data');
    }
};

export const getPendingNGO = async () => {
    try {
        const response = await apiClient.get('/pending');
        console.log("API response:", response); // Debugging log
        return response.data;
    } catch (error) {
        console.error("API error:", error.response); // Debugging log
        throw new Error(error.response?.data?.message || 'Failed to fetch data');
    }
};

export const validateNGO = async (ngo, validation) => {
    console.log("NGO ID: ",ngo)
    try {
        const response = await apiClient.post('/validate', {ngo, validation});
        console.log("API response:", response); // Debugging log
        return response.data;
    } catch (error) {
        console.error("API error:", error.response); // Debugging log
        throw new Error(error.response?.data?.message || 'Failed to fetch data');
    }
};
