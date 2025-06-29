// src/api/productService.js
import axios from "axios";

// Instancia global de Axios con la baseURL de tu backend
const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Interceptor para agregar Content-Type solo cuando sea necesario
API.interceptors.request.use((config) => {
    // Solo agregar Content-Type: application/json si NO es FormData
    if (!(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
    }
    // Si es FormData, NO establecer Content-Type manualmente
    // El navegador lo hará automáticamente con el boundary correcto
    return config;
});
export const getAllInactiveProducts = async (token) => {
    const response = await API.get("/admin/product/", {
        headers: token
            ? { Authorization: `Bearer ${token}` }
            : undefined
    });
    // Si el backend entrega los datos como .data.data:
    return response.data.data.map(item => ({
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
        phoneNumber: "",
        comments: [],
    }));
};
export const setProductActive = async (id, token) => {
    const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;
    const response = await API.patch(
        `/admin/product/activation/${id}`,
        {},        // cuerpo vacío si no necesitas enviar datos
        config     // configuración con headers
    );
    return response.data

}
export const deleteProduct = async (id, token) => {
    const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;
    const response = await API.delete(
        `/product/delete/${id}`,config
    );
    return response.data

}