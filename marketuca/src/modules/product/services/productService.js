// src/api/productService.js
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getProductById = async (id, token) => {
    // Construye los headers solo si hay token
    const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;

    const response = await API.get(`/product/${id}`, config);

    // Si response.data.data es un objeto producto, no hagas map
    const item = response.data.data;

    return {
        id: item.id,
        title: item.product,
        description: item.description,
        price: item.price,
        condition: item.condition,
        image: item.images?.[0],
        images: item.images || [],
        category: item.categoryName
            ? item.categoryName
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
            : "otros",
        categoryId: "otros",
        seller: item.userName ?? "",
        phoneNumber: item.phoneNumber,
        comments: [],
    };
};

export const getCommentByProductId = async (id, token) => {
    const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;

    const response = await API.get(`/comments/product/${id}`, config);
    return Array.isArray(response.data.data)
        ? response.data.data.map(item => ({
            code: item.code,
            comment: item.comment,
            username: item.username,
            productCode: item.productCode,
        }))
        : [];
};
export const postComment = async (productId, comment, token) => {
    const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;

    const body = {
        productId: productId,
        comment: comment,
    };

    const response = await API.post('/comments/create', body, config);

    // Devuelve el comentario recién creado
    return response.data.data;
};