import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshResponse = await axios.post(`${API_URL}/refresh-token`, {
          refreshToken: localStorage.getItem('refreshToken'),
        });
        const newToken = refreshResponse.data.token;
        localStorage.setItem('auth_token', newToken);
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(error.config);
      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const getUsers = async (token) => {
  if (!token) throw new Error('No se proporcionó un token para getUsers');
  const response = await axiosInstance.get('/user/all', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getCategories = async (token) => {
  if (!token) throw new Error('No se proporcionó un token para getCategories');
  const response = await axiosInstance.get('/category/all', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createFaculty = async (token, facultyName) => {
  if (!token) throw new Error("No se proporcionó token");

  const body = { facultyName };

  const resp = await axiosInstance.post("/admin/faculty/create", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return resp.data;
};

export const patchFaculty = async (token, facultyName, newFacultyName) => {
  if (!token) throw new Error("No se proporcionó token");

  const body = { facultyName, newFacultyName };

  const resp = await axiosInstance.patch("/admin/faculty/update", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return resp?.data || { message: "Respuesta sin contenido" };
};

export const getUsersByName = async (token, name) => {
  if (!token) throw new Error("No se proporcionó token");

  const response = await axiosInstance.get(`/user/name`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { name },
  });

  return response.data;
};

export const patchUserRole = async (token, email, role) => {
  if (!token) throw new Error("No se proporcionó token");

  const response = await axiosInstance.patch(
    "/admin/user/reassign",
    null,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { email, role },
    }
  );
  return response.data;
};

export const createCategory = async (token, categoryData) => {
  if (!token) throw new Error("No se proporcionó token");

  const response = await axiosInstance.post("/admin/category/create", categoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const patchCategory = async (token, originalName, newName, newDescription) => {
  if (!token) throw new Error("No se proporcionó token");

  const body = {
    name: originalName,
    newName: newName,
    newDescription: newDescription,
  };

  const response = await axiosInstance.patch("/admin/category/update", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getFaculties = async (token) => {
  if (!token) throw new Error('No se proporcionó un token para getFaculties');

  const response = await axiosInstance.get('/admin/faculty/all', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
