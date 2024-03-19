import axios from "./axios";

export const getUsersRequest = async () => axios.get(`/users`);//obtener todos los usuarios

export const getUserRequest = async (id) => axios.get(`/user/${id}`);//obtener un usuario

export const createUserRequest = async (user) => axios.post(`/user`, user);//crear un usuario

export const updateUserRequest = async (id,user) => axios.put(`/user/${id}`, user);//actualizar un usuario

export const deleteUserRequest = async (id) => axios.delete(`/user/${id}`);//borrar un usuario
