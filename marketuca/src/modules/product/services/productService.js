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

export const getProductById = async (id) => {
    const response = await API.get(`/product/${id}`);
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

export const getCommentByProductId = async (id) => {
    const response = await API.get(`/comments/product/${id}`);
    return Array.isArray(response.data.data)
        ? response.data.data.map(item => ({
            id: item.id,
            comment: item.comment,
            username: item.username,
            productId: item.productId,
        }))
        : [];
};

export const getCommentsByUser = async () =>{
    const response = await API.get('/comments/user');
    return response.data
}

export const postComment = async (productId, comment) => {
    const body = {
        productId: productId,
        comment: comment,
    };

    const response = await API.post('/comments/create', body);
    return response.data.data;
};

export const DeleteProductById = async (id) => {
    const response = await API.delete(`/product/delete/${id}`);
    return response.data;
};

export const DeleteCommentById = async (id) => {
    const response = await API.delete(`/comments/delete/${id}`);
    return response.data;
};