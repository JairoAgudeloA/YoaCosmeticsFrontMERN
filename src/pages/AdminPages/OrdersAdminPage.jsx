import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import '../../assets/styles/pages/OrderAdmin.css';

const OrdersAdminPage = () => {
  const { order, getAllOrders, updateOrder } = useOrder();
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrder(orderId, { status: newStatus });
      // Aquí podrías mostrar una notificación de éxito o recargar las órdenes
      console.log('Estado de la orden actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el estado de la orden:', error);
      // Aquí podrías mostrar una notificación de error
    }
  };

  return (
    <>
      {order.length === 0 ? (
        <>
          <section>
            <h3>No hay ordenes</h3>
          </section>
        </>
      ) : (
        <>
          <section className="fondito2">
            <h1>Ordenes</h1>
            <table>
              <thead>
                <tr>
                  <th>Id Orden</th>
                  <th>Nombre Productos</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Total Pedido</th>
                  <th>Estado Orden</th>
                  {/* <th>Acciones</th> */}
                </tr>
              </thead>
              <tbody>
                {order.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                      {order.products.map((product) => (
                        <p key={product._id}> - {product.name} </p>
                      ))}
                    </td>
                    <td>
                      {order.products.map((product) => (
                        <p key={product._id}>{product.quantity}</p>
                      ))}
                    </td>
                    <td>
                      {order.products.map((product) => (
                        <p key={product._id}>{product.subtotal}</p>
                      ))}
                    </td>
                    <td>{order.total}</td>

                    <td>
  <select
    value={order.status} // Cambia esto para que refleje el estado actual de la orden
    onChange={(e) => handleStatusChange(order._id, e.target.value)}
  >
    <option value="pending">Pendiente</option>
    <option value="complete">Completado</option>
    <option value="cancelled">Cancelado</option>
  </select>
</td>

                    {/* <td>
                      <button onClick={() =>{
                        const confirmar = window.confirm('¿Estás seguro de eliminar la orden?');
                        if(confirmar){
                          deleteOrder(order._id);
                        }
                      }}>Eliminar</button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
      <div className="table-container">
        <Link to="/admin/dashboard">
          <button>Volver Tablero</button>
        </Link>
      </div>
    </>
  );
};

export default OrdersAdminPage;
