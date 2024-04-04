import { createContext, useContext, useState } from 'react';
import { createOrderRequest, getOrderRequest, updateOrderRequest, deleteOrderRequest,getAllOrdersRequest } from '../api/order';

const OrderContext = createContext();

export const useOrder = () => {
    return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    const getAllOrders = async () => {
        try {
            const response = await getAllOrdersRequest();
            return response.data;
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error al obtener todas las órdenes');
            throw error;
        }
    };

    const createOrderCart = async (orderData) => {
        try {
            const response = await createOrderRequest(orderData);
            setOrder(response.data);
            return response.data;
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error al crear la orden');
            throw error;
        }
    };

    const getOrder = async (orderId) => {
        try {
            const response = await getOrderRequest(orderId);
            setOrder(response.data);
            return response.data;
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error al obtener la orden');
            throw error;
        }
    };

    const updateOrder = async (orderId, orderData) => {
        try {
            const response = await updateOrderRequest(orderId, orderData);
            setOrder(response.data);
            return response.data;
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error al actualizar la orden');
            throw error;
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            const response = await deleteOrderRequest(orderId);
            setOrder(null);
            return response.data;
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error al eliminar la orden');
            throw error;
        }
    };

    return (
        <OrderContext.Provider value={{ order, createOrderCart, getOrder, updateOrder, deleteOrder, error }}>
            {children}
        </OrderContext.Provider>
    );
};
