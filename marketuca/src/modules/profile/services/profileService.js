
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

export const getMyProducts = async (token) => {
    const response = await API.get("/product/my", {
        headers: token
            ? { Authorization: `Bearer ${token}` }
            : undefined
    });

    // Devuelve directamente el array original de productos:
    return response.data.data; // <- aquí ya es un array
};
export const updatePassword = async (oldPassword, newPassword, token) => {
    try {
        const response = await API.patch("/user/password", {
            oldPassword,
            newPassword,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data; // contiene { data: "", message: "Password reset successfully" }
    } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        throw error;
    }
};
export const updatePhoneNumber= async (phoneNumber, token) => {
    try {
        const response = await API.patch("/user/phoneNumber", {
            phoneNumber
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error al actualizar la telefono:", error);
        throw error;
    }
};