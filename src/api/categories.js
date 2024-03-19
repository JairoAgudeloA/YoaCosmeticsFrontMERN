import axios from "./axios";

export const getCategoriesRequest = async () => axios.get(`/categories`); //obtener todas las categorias

export const getCategoryRequest = async (id) => axios.get(`/category/${id}`); //obtener una categoria

export const createCategoryRequest = async (category) =>
  axios.post(`/category`, category); //crear una categoria

export const updateCategoryRequest = async (id, category) =>
  axios.put(`/category/${id}`, category);

export const deleteCategoryRequest = async (id) =>
  axios.delete(`/category/${id}`); //borrar una categoria

// export const getProductsByCategoryRequest = async (id, category) =>
//   axios.get(`/category/products/${id}`, category); //obtener productos por categoria
