import React from 'react'
import { Link } from 'react-router-dom';

const OrdersAdminPage = () => {
    let orders = [0];
  return (
    <>
    {orders.length === 0 ? (
        <>
        <section>
          <h3>No hay ordenes</h3>
        </section>
      </>
    ) : (
      <>
        <section>
          <h1>Ordenes</h1>
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.user}</td>
                  <td>{order.products}</td>
                  <td>{order.total}</td>
                  <td>{order.status}</td>
                  <td>
                    <Link to={`/order/${order._id}`}><button>Editar</button></Link>
                    <button
                      onClick={() => {
                        deleteOrder(order._id);
                      }}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </>
    )}
    <Link to="/admin/dashboard"><button>Volver Tablero</button></Link>
      
    </>
  )
}

export default OrdersAdminPage
