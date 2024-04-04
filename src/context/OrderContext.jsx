import { createContext, useContext, useState } from 'react';
import { createOrderRequest, getOrderRequest, updateOrderRequest, deleteOrderRequest,getAllOrdersRequest } from '../api/order';
import { useNavigate } from 'react-router';
const OrderContext = createContext();
import { useCart,useCartDispatchs } from './CartContext';

export const useOrder = () => {
    return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState([]);
    const [error, setError] = useState([]);
    const cart = useCart();
    const dispatch = useCartDispatchs();
    const navigate = useNavigate();

    const getAllOrders = async () => {
        try {
            const response = await getAllOrdersRequest();
            setOrder(response.data);
            console.log(response.data)
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error al obtener todas las órdenes');
            throw error;
        }
    };

    const createOrderCart = async (orderData) => {
        try {
            const response = await createOrderRequest(orderData);
            alert('Orden creada con éxito')
            dispatch({ type: 'removeallproducts' });
            navigate('/')
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

    // En tu contexto OrderContext

// Modifica la función updateOrder para que actualice solo la orden con el ID proporcionado
const updateOrder = async (orderId, orderData) => {
    try {
        const response = await updateOrderRequest(orderId, orderData);
        
        // Actualiza solo la orden específica en el estado local
        setOrder(prevOrders => {
            const updatedOrders = prevOrders.map(order => {
                if (order._id === orderId) {
                    return { ...order, ...orderData };
                }
                return order;
            });
            return updatedOrders;
        });

        return response.data;
    } catch (error) {
        setError(error.response ? error.response.data.message : 'Error al actualizar la orden');
        throw error;
    }
};


// const deleteOrder = async (orderId) => {
//     try {
//         const response = await deleteOrderRequest(orderId);
//         // Elimina la orden específica de la lista en lugar de establecer todo el estado order como null
//         setOrder(prevOrders => prevOrders.filter(order => order._id !== orderId));
//         return response.data;
//     } catch (error) {
//         setError(error.response ? error.response.data.message : 'Error al eliminar la orden');
//         throw error;
//     }
// };


    return (
        <OrderContext.Provider value={{ order, getAllOrders,createOrderCart, getOrder, updateOrder, error }}>
            {children}
        </OrderContext.Provider>
    );
};
