import axios from "./axios";

export const getProductsRequest = async () => axios.get(`/products`);//obtener todos los productos

export const getProductRequest = async (id) => axios.get(`/product/${id}`);//obtener un producto

export const createProductRequest = async (product) => {
    return axios.post(`/product`, product, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

export const updateProductRequest = async (id,product) => axios.put(`/product/${id}`, product);//actualizar un producto

export const deleteProductRequest = async (id) => axios.delete(`/product/${id}`);//borrar un producto
