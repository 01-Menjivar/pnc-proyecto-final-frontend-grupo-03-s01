import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async ({ username, password }) => {
  try {
    const res = await API.post("/auth/login", { username, password });

    if (res.status === 202 && res.data?.data) {
      const token = res.data.data;
      localStorage.setItem("auth_token", token); // puedes reemplazar con cookie si deseas más seguridad
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
