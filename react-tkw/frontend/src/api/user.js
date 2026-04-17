import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCurrentUser = async (token) => {
    try {
        const res = await axios.get(`${API_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        if (err.response && err.response.status === 401) {
            localStorage.removeItem("token");
            window.dispatchEvent(new Event("storage"));
            window.location.href = "/";
        }
        throw err.response ? err.response.data : { message: "Sunucu hatası" };
    }
};

export const getUserById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/api/users/${id}`);
        return res.data;
    } catch (err) {
        throw err.response ? err.response.data : { message: "Sunucu hatası" };
    }
};

export const updateUserImage = async (file, token) => {
    try {
        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.put(`${API_URL}/api/users/update-image`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return res.data;
    } catch (err) {
        throw err.response ? err.response.data : { message: "Sunucu hatası" };
    }
};

export const updateUser = async (data, token) => {
    try {
        const res = await axios.put(`${API_URL}/api/users/update`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (err) {
        throw err.response ? err.response.data : { message: "Sunucu hatası" };
    }
};
