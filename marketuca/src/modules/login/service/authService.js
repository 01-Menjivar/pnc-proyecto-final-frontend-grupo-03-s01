import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async ({ email, password }) => {
  try {
    const res = await API.post("/user/auth/login", { email, password });

    if ((res.status === 200 || res.status === 201) && res.data?.data) {
      const token = res.data.data;
      return {
        data: token,
        message: res.data.message || "Inicio de sesión exitoso.",
      };
    } else {
      throw new Error("Credenciales incorrectas o respuesta inesperada del servidor.");
    }
  } catch (err) {
    if (err.response?.status === 401) {
      throw new Error("Usuario o contraseña incorrectos.");
    }
    throw new Error(err.response?.data?.message || "Ocurrió un error al iniciar sesión.");
  }
};
