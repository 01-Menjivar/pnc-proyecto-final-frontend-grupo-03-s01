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

export const getAllProducts = async (token) => {
    const response = await API.get("/products/", {
        headers: token
            ? { Authorization: `Bearer ${token}` }
            : undefined
    });
    // Si el backend entrega los datos como .data.data:
    return response.data.data.map(item => ({
        id: item.code,
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


// Opción 2: Si tu backend espera JSON + archivos por separado
export const postProductAlternative = async (formDataObj, images, token) => {
    const formData = new FormData();

    // Crear un blob JSON explícito
    const productData = {
        product: formDataObj.title,
        description: formDataObj.description,
        price: Number(formDataObj.price),
        condition: formDataObj.condition,
        categoryName: formDataObj.category.toLowerCase(),
        location: formDataObj.location,
    };

    // Crear un Blob con tipo application/json explícito
    const jsonBlob = new Blob([JSON.stringify(productData)], {
        type: 'application/json'
    });

    formData.append("product", jsonBlob, "product.json");

    // Agregar imágenes
    if (images && images.length > 0) {
        images.forEach((file, index) => {
            formData.append("images", file, file.name || `image_${index}.jpg`);
        });
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        console.error('Error al enviar producto:', error);
        throw error;
    }
};
