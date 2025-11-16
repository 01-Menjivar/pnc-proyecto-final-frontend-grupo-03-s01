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
    const response = await API.get("/product/", {
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
        categoryName: item.categoryName,
        seller: item.userName ?? "",
        phoneNumber: item.phoneNumber,
        comments: [],
    }));
};
export const postProduct = async (formDataObj, images, token) => {
    const formData = new FormData();

    // Objeto con los datos del producto
    const productData = {
        product: formDataObj.title,
        description: formDataObj.description,
        price: Number(formDataObj.price),
        condition: formDataObj.condition,
        categoryName: formDataObj.categoryName,
    };

    // Convertir el objeto a JSON como Blob
    const jsonBlob = new Blob([JSON.stringify(productData)], {
        type: "application/json",
    });

    // Agregar el JSON al FormData como archivo
    formData.append("product", jsonBlob, "product.json");

    // Agregar imágenes
    if (images && images.length > 0) {
        images.forEach((file, index) => {
            formData.append("images", file, file.name || `image_${index}.jpg`);
        });
    }

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/product/create`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error al enviar producto:", error);
        if (error.response) {
            throw new Error(
                `Error ${error.response.status}: ${error.response.data}`
            );
        } else {
            throw new Error("Error desconocido al enviar producto.");
        }
    }
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
        categoryName: formDataObj.categoryName,
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
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/product/create`, {
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
export const likeProduct = async (productId, token) => {
    const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;
    try {
        const res = await API.post(
            `/likes/add`,
            {productId},
            config
        );

       if(res.status === 201 || res.status === 200) return res.data;
    }
    catch (error) {
        console.error("Error al agregar like:", error);
    }

}
export const dislikeProduct = async (likeId, token) => {
    const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;
    try {
        const res = await API.delete(
            `/likes/delete/${likeId}`,
            config
        );

        if(res.status === 202 || res.status === 200) return res.data;
    }
    catch (error) {
        console.error("Error al eliminar like:", error);
    }

}
export const getLikes = async (token) => {
    const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;

    try {
        const response = await API.get(`/likes/`, config);

        // El API responde con status 200 para GET exitosos
        if (response.status === 200 && response.data?.data) {
            return response.data.data.map((like) => ({
                likeId: like.id,
                productId: like.product,
            }));
        } else {
            console.log("Respuesta de likes sin datos o status incorrecto:", response.status, response.data);
            return [];
        }
    } catch (error) {
        console.error("Error al obtener likes:", error);
        return [];
    }
};



