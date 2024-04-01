import axios from "./axios";

export const registerRequest = async (user) => axios.post(`/register`, user);

export const loginRequest = async (user) => axios.post(`/login`, user);

//mirar si estas rutas funcionan

// export const profileRequest = async () => axios.get(`/profile`);
export const profileRequest = async () => {
  try {
    // Realiza una solicitud GET al endpoint de perfil
    const response = await axios.get("/profile"); // Ajusta la URL según la ruta correcta de tu backend
    // Retorna los datos de perfil obtenidos en la respuesta
    return response.data;
  } catch (error) {
    // Si ocurre un error durante la solicitud, lánzalo nuevamente para que sea manejado en el componente
    throw error;
  }
};

export const updateProfileRequest = async (user) => axios.put(`/profile`, user);

export const verifyTokenRequest = async () => axios.get(`/verify`);
