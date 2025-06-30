import axios from 'axios';

const API_URL = 'https://pnc-proyecto-final-grupo-03-s01-production.up.railway.app';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Interceptor para manejar errores 401
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Respuesta del servidor:', response.data); // Depuración
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      console.error('Token inválido o expirado:', error.response);
      try {
        const refreshResponse = await axios.post(`${API_URL}/refresh-token`, {
          refreshToken: localStorage.getItem('refreshToken'),
        });
        const newToken = refreshResponse.data.token;
        localStorage.setItem('auth_token', newToken);
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(error.config);
      } catch (refreshError) {
        console.error('No se pudo refrescar el token:', refreshError);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    console.error('Error en la solicitud:', error.response || error);
    return Promise.reject(error);
  }
);

export const getUsers = async (token) => {
  if (!token) {
    throw new Error('No se proporcionó un token para getUsers');
  }
  console.log('Enviando token en getUsers:', token);
  try {
    const response = await axiosInstance.get('/user/all', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Datos de usuarios:', response.data); // Depuración
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getCategories = async (token) => {
  if (!token) {
    throw new Error('No se proporcionó un token para getCategories');
  }
  console.log('Enviando token en getCategories:', token);
  try {
    const response = await axiosInstance.get('/category/all', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Datos de categorías:', response.data); // Depuración
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const createFaculty = async (token, facultyName) => {
  if (!token) throw new Error("No se proporcionó token")

  const body = { facultyName }      // { "facultyName": "Ingeniería" }

  const resp = await axiosInstance.post("/admin/faculty/create", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  // Esperado: { data: null, message: "Faculty created successfully" }
  return resp.data
}
/* ------------------------------------------------------------------
   PATCH /admin/faculty/update
-------------------------------------------------------------------*/
export const patchFaculty = async (token, facultyName, newFacultyName) => {
  if (!token) throw new Error("No se proporcionó token")

  const body = { facultyName, newFacultyName }
  console.log("🔵 Enviando PATCH /admin/faculty/update →", body)

  const resp = await axiosInstance.patch("/admin/faculty/update", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  return resp?.data || { message: "Respuesta sin contenido" }
}


export const getUsersByName = async (token, name) => {
  if (!token) throw new Error("No se proporcionó token");

  const response = await axiosInstance.get(`/user/name`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { name },
  });

  return response.data;
};
// ⬇️ Nuevo helper consistente con el resto:
export const patchUserRole = async (token, email, role) => {
  if (!token) throw new Error("No se proporcionó token")

  const response = await axiosInstance.patch(
    "/admin/user/reassign",
    null,                                    // body vacío
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { email, role },
    },
  )
  return response.data           // → { data: "", message: "User reassigned successfully" }
}
export const createCategory = async (token, categoryData) => {
  if (!token) throw new Error("No se proporcionó token")

  const response = await axiosInstance.post("/admin/category/create", categoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  return response.data  // { data: {name, description}, message: "Category Created" }
}
// PATCH /admin/category/update
export const patchCategory = async (token, originalName, newName, newDescription) => {
  if (!token) throw new Error("No se proporcionó token")

  const body = {
    name: originalName,
    newName: newName,
    newDescription: newDescription,
  }

  console.log("🟡 PATCH body:", body)

  try {
    const response = await axiosInstance.patch("/admin/category/update", body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (err) {
    console.error("🔴 PATCH categoría falló:", err.response)
    throw err
  }
}



export const getFaculties = async (token) => {
  if (!token) {
    throw new Error('No se proporcionó un token para getFaculties');
  }
  console.log('Enviando token en getFaculties:', token);
  try {
    const response = await axiosInstance.get('/admin/faculty/all', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Datos de facultades:', response.data); // Depuración
    return response.data;
  } catch (error) {
    console.error('Error fetching faculties:', error);
    throw error;
  }
};