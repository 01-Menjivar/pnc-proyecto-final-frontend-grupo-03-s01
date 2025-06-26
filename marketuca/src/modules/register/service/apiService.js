import axios from 'axios';
import DOMPurify from 'dompurify';

// Configuración base de Axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*', // Evita preflight innecesario
  },
});

export const postData = async (endpoint, data) => {
  // Sanitizar datos para prevenir XSS
  const sanitizedData = Object.keys(data).reduce((acc, key) => {
    acc[key] = typeof data[key] === 'string' ? DOMPurify.sanitize(data[key]) : data[key];
    return acc;
  }, {});

  try {
    const response = await apiClient.post(endpoint, sanitizedData);
    return response.data;
  } catch (error) {
    // Manejo de errores
    if (error.response) {
      // Error con respuesta del servidor (por ejemplo, 400, 404, 500)
      const { status, data } = error.response;

      if (status === 400) {
        throw new Error(data.message || 'Solicitud inválida. Verifica los datos enviados.');
      } else if (status === 404) {
        throw new Error('El endpoint no fue encontrado. Verifica la URL o la configuración del servidor.');
      } else if (status === 401) {
        throw new Error('No autorizado. Verifica las credenciales.');
      } else if (status >= 500) {
        throw new Error(data.message || 'Error en el servidor. Intenta de nuevo más tarde.');
      }

      // Manejo genérico para otros errores
      const message = data.message || data.error || data.msg || `Error ${status}: ${error.response.statusText || 'Error desconocido'}`;
      throw new Error(message);
    } else if (error.request) {
      // No se recibió respuesta del servidor
      throw new Error('No se pudo conectar con el servidor. Verifica tu conexión o el estado del servidor.');
    } else {
      // Error en la configuración de la solicitud
      throw new Error(error.message || 'Ocurrió un error inesperado al configurar la solicitud.');
    }
  }
};