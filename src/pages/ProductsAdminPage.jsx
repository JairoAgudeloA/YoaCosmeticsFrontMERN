import React, { useEffect, useState } from 'react'
import { useProduct } from '../context/ProductContext'
import { Link } from 'react-router-dom'
import { url_image } from '../api/axios.js'

const ProductsAdminPage = () => {
  const { products, getProducts, deleteProduct } = useProduct();
  const [search, setSearch] = useState('');


  const searchProduct = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  }

    const results = !search ? products : products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));



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
            <input value={search} onChange={searchProduct} type="text" placeholder="Buscar Producto" className='searchs' />
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Imagen</th>
                  <th>Categoria</th>
                  <th>Acciones</th>
                  <th><Link to="/product"><button>Crear Producto</button></Link></th>
                </tr>
              </thead>
              <tbody>
                {results.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.stock}</td>
                    <td>
                      <img src={`${url_image}${product.productImage}`} alt={product.productImage} width="100px" />
                    </td>
                    <td>
                      {product.category ? product.category.name : <p>Sin Categoria</p>}
                    </td>
                    <td>
                      <Link to={`/product/${product._id}`}><button>Editar</button></Link>
                      <button
                        onClick={() => {
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
