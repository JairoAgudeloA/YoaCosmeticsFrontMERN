import React from 'react'
import { useCart,useCartDispatchs } from '../context/CartContext'
import { url_image } from '../api/axios';
import { FaPlus, FaMinus,FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const cart = useCart();
  const dispatch = useCartDispatchs();

  return (
    <>
    <section>
      {cart.length > 0 ? (
        <>
        <h1>Carrito de Compras</h1>
        <table>
          <thead>
            <tr>
              <th></th>  {/* imagen */}
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th></th> {/* botones */}
              <th>Subtotal</th>
              <th><button onClick={() => dispatch({type:'removeallproducts'})}><FaTrashAlt/></button></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => (
              <tr key={product.id}>
                <td><img src={`${url_image}${product.productImage}`} alt={product.name} width={100} /></td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.count}</td>
                <td>
                  <div>
                    <button
                    onClick={() => {
                      dispatch({type:'addproduct',id:product.id})
                    }}><FaPlus/></button>
                    <button
                    onClick={() => {
                      dispatch({type:'deleteproduct',id:product.id})
                    }}><FaMinus/></button>                    
                  </div>                  
                </td>
                <td>{product.price * product.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
