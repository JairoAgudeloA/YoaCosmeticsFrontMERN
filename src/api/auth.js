import axios from "./axios";

export const registerRequest = async (user) => axios.post(`/register`, user);

export const loginRequest = async (user) => axios.post(`/login`, user);

//mirar si estas rutas funcionan 

export const profileRequest = async () => axios.get(`/profile`);

export const updateProfileRequest = async (user) => axios.put(`/profile`, user);

// export const verifyTokenRequest = async () => axios.get(`/auth/verify`);
