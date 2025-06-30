
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getUserInfo = async (email, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                email: email
            }
        };

        const response = await API.get("/user/email", config);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
        throw error;
    }
};

export const getProductsByEmail = async (email, token) => {
    const response = await API.get("/product/user", {
        headers: token
            ? { Authorization: `Bearer ${token}` }
            : undefined,
        params: {
            email: email
        }
    });

    return response.data.data; // Devuelve el array de productos
};
