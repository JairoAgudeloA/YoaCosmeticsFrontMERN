import React, { useEffect, useState } from 'react'
import { useProduct } from '../../context/ProductContext.jsx'
import { Link } from 'react-router-dom'
import { url_image } from '../../api/axios.js'
import '../../assets/styles/pages/ProductsAdminPage.css'

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
            <Link to="/admin/product"><button>Crear Producto</button></Link>
          </section>
        </>
      ) : (
        <>
          <section className="fondito2">
            <h1>Productos</h1>
            <div class="busqueda-container">
            <input value={search} onChange={searchProduct} type="text" placeholder="Buscar Productos..." className='searchs' />
            </div>
            <table >
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Imagen</th>
                  <th>Categoria</th>
                  <th>Acciones</th>
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
                      <Link to={`/admin/product/${product._id}`}><button>Editar</button></Link>
                      
                      <button
                        onClick={() => {
                          // Mostrar el cuadro de diálogo de confirmación
                          const confirmation = window.confirm("¿Estás seguro de que deseas borrar este producto?");

                          // Si el usuario hace clic en "Aceptar", proceder con la eliminación
                          if (confirmation) {
                            deleteProduct(product._id);
                          }
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
          <div className="table-container">
          <Link to="/admin/product"><button>Crear Producto</button></Link>
          <Link to="/admin/dashboard"><button>Volver Tablero</button></Link>
          </div>
        </>

      )}
      
    </>
  )
}

export default ProductsAdminPage
