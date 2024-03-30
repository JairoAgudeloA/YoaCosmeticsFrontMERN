import React from 'react'
import { useCart, useCartDispatchs } from '../context/CartContext'
import { url_image } from '../api/axios';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useOrder } from '../context/OrderContext';
import { useState } from 'react';


const CartPage = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago('YOUR_PUBLIC_KEY',
    {
      locale: 'es-CO',
      style: {
        type: 'default',
        size: 'responsive',
        theme: 'default'
      }
    });
  const cart = useCart();
  const dispatch = useCartDispatchs();
  const order  = useOrder();

  const createOrder = async () => {
    const orderData = {
      products: cart.map(product => ({ product: product._id, quantity: product.count })),
      total: cart.reduce((acc, product) => acc + product.price * product.count, 0)
    }
    const response = await order.createOrder(orderData);
    setPreferenceId(response.preferenceId);
  }

  return (
    <>
      <section>
        {cart.length > 0 ? (
          <>
            <h1>Carrito de Compras</h1>
            <table>
              <thead>
                <tr>
                  <th>{/* imagen */}</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>{/* botones */}</th>
                  <th>Subtotal</th>
                  <th><button onClick={() => dispatch({ type: 'removeallproducts' })}><FaTrashAlt /></button></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <tr key={product._id}>
                    <td><img src={`${url_image}${product.productImage}`} alt={product.name} width={100} /></td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <input
                        type="number"
                        value={product.count}
                        onChange={(e) => {
                          const newCount = parseInt(e.target.value);
                          {/* si el valor es NaN, entonces se asigna 0 */ }
                          dispatch({ type: 'editquantityproduct', product: product, count: isNaN(newCount) ? 0 : newCount });
                        }}
                      />
                    </td>
                    <td>
                      <div>
                        <button
                          onClick={() => {
                            dispatch({ type: 'addproductincart', product: product })
                          }}><FaPlus /></button>
                        <button
                          onClick={() => {
                            dispatch({ type: 'subtractquantityproduct', product: product })

                            if (product.count === 1) {
                              dispatch({ type: 'deleteproduct', product: product })
                            }
                          }}><FaMinus /></button>
                      </div>
                    </td>
                    <td>{product.price * product.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2>Total: {cart.reduce((acc, product) => acc + product.price * product.count, 0)}</h2>

            <Link to='/checkout'><button>Comprar</button></Link>

            <button onClick={createOrder}>Pagar</button>
            {preferenceId && 
            <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />            
            }

            
          </>
        ) : (
          <>
            <h1>Carrito de Compras aun vacio</h1>
            <Link to='/'><button>Volver a la tienda</button> </Link>
          </>
        )}
      </section>

    </>
  )
}

export default CartPage
