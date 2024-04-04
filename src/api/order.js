import axios from "./axios";

export const createOrderRequest = async (orderData) => {
  return await axios.post("/orders", orderData);
};

export const getOrderRequest = async (orderId) => {
  return await axios.get(`/orders/${orderId}`);
};

export const getAllOrdersRequest = async () => {
  return await axios.get("/orders");
};

export const updateOrderRequest = async (orderId, orderData) => {
  return await axios.put(`/orders/${orderId}`, orderData);
};

export const deleteOrderRequest = async (orderId) => {
  return await axios.delete(`/orders/${orderId}`);
};

export const deleteOrdersRequest = async () => {
  return await axios.delete("/orders");
};

export const getPdf = async (orderData) => {
  return await axios.post("/pdf", { orderData }, { responseType: "blob" });
};
