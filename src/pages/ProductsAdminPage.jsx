import React, { useEffect } from 'react'
import { useProduct } from '../context/ProductContext'
import { Link } from 'react-router-dom'

const ProductsAdminPage = () => {
  const {products,getProducts,deleteProduct} = useProduct();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
    {products.length === 0 ? (
      <>
      <section>
      <h3>No hay productos</h3>
      <Link to="/product"><button>Crear Producto</button></Link>
      </section>
      </>
    ) : (
      <>
      <section>
        <h1>Productos</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Categoria</th>
              <th>Acciones</th>
              <th><Link to="/product"><button>Crear Producto</button></Link></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.productImage}</td>
                <td>{product.category}</td>
                <td>
                  <Link to={`/product/${product._id}`}><button>Editar</button></Link>

                  <button
                  onClick={() =>{
                    deleteProduct(product._id)
                  }}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      
      </>
      
    )}
      
    </>
  )
}

export default ProductsAdminPage
