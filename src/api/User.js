import axios from "axios";
import {HOST} from "../Constants";

// API call to fetch pending photo verifications
const apiClient = axios.create({
    baseURL: HOST,
    withCredentials: true
});

export const getPendingPhotoVerifications = async () => {
    try {
        const response = await apiClient.get('/user/getPendingPhotoVerifications');
        console.log("API response:", response); // Debugging log
        return response.data;
    } catch (error) {
        console.error("API error:", error.response); // Debugging log
        throw new Error(error.response?.data?.message || 'Failed to fetch data');
    }
};
