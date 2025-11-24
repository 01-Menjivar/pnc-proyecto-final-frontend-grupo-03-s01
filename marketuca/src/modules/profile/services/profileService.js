
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getUserInfo = async (email, token) => {
    try {
        const config = {
            params: {
                email: email
            }
        };
        
        // Si se pasa un token específico, usarlo en lugar del de localStorage
        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`
            };
        }

        const response = await API.get("/user/email", config);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
        throw error;
    }
};

export const getMyProducts = async () => {
    const response = await API.get("/product/my");
    return response.data.data;
};

export const updatePassword = async (oldPassword, newPassword) => {
    try {
        const response = await API.patch("/user/password", {
            oldPassword,
            newPassword,
        });

        return response.data;
    } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        throw error;
    }
};

export const updatePhoneNumber= async (phoneNumber) => {
    try {
        const response = await API.patch("/user/phoneNumber", {
            phoneNumber
        });

        return response.data;
    } catch (error) {
        console.error("Error al actualizar la telefono:", error);
        throw error;
    }
};

export const postReview = async (email, rating, comment) =>{
    const body = {
        revieweeEmail: email,
        rating: rating,
        comment: comment
    }
    const response = await API.post('/reviews/create', body);
    return response.data.data
}

export const getReviewsBySellerEmail = async (email) =>{
    const response = await API.get(`/reviews/seller/${email}`);
    return response.data.data
}

export const getReviewsByUser = async () =>{
    const response = await API.get('/reviews/user');
    return response.data.data
}

export const deleteReviewById = async (reviewId) =>{
    const response = await API.delete(`/reviews/delete/${reviewId}`);
    return response.data.data
}

export const getReviewById = async (reviewId) =>{
    const response = await API.get(`/reviews/${reviewId}`);
    return response.data.data
}

export const updateReviewById = async (revieweeEmail, reviewId, rating, comment) =>{
    const body = {
        revieweeEmail: revieweeEmail,
        rating: rating,
        comment: comment
    }
    const response = await API.patch(`/reviews/update/${reviewId}`, body);
    return response.data.data
}
