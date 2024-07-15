import axios from "axios";
import {HOST} from "../Constants";

// API call to fetch pending photo verifications
const apiClient = axios.create({
    baseURL: HOST + "/auth",
    withCredentials: true
});

export const getUserApi = async () => {
    try {
        const response = await apiClient.get('/user');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch data');
    }
};

export const loginApi = async (identifier, password) => {
    try {
        const response = await axios({
            method: "POST",
            data: {
                identifier: identifier,
                password: password,
            },
            withCredentials: true,
            url: `${HOST}/auth/login`,
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error logging in');
    }
};

export const registerApi = async (ngo) => {
    try {

        // Create FormData Object
        const formData = new FormData();

        // Append all fields, including the file
        for (const key in ngo) {
            formData.append(key, ngo[key]); // Directly append, no need for special file handling
        }
        const response = await axios({
            method: "POST",
            data: formData,
            withCredentials: true,
            url: `${HOST}/auth/register`,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error registering user.';
        console.error("Registration error:", errorMessage);
        throw new Error(errorMessage);
    }
};


export const logoutApi = async () => {
    try {
        const response = await axios({
            method: "get",
            withCredentials: true,
            url: `${HOST}/auth/logout`
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch data');
    }
};