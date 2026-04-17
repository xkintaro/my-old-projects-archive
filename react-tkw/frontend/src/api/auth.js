import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const userRegister = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, formData);
        localStorage.setItem("token", response.data.token);
        window.location.href = "/profile";
        return response.data;
    } catch (err) {
        if (err.response && err.response.data) throw err.response.data;
        throw { message: "Sunucuya bağlanılamıyor." };
    }
};

export const userLogin = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, formData);
        localStorage.setItem("token", response.data.token);
        window.location.href = "/profile";
        return response.data;
    } catch (err) {
        if (err.response && err.response.data) throw err.response.data;
        throw { message: "Sunucuya bağlanılamıyor." };
    }
};

export const userLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
};
