import React, { useEffect } from 'react'
import { useCategory } from '../context/CategoryContext'
import { Link } from 'react-router-dom';

const CategoriesAdminPage = () => {
  const {categories,getCategories,deleteCategory} = useCategory();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
    {categories.length === 0 ? (
      <>
      <section>
      <h3>No hay categorias</h3>
      <Link to="/category"><button>Crear Categoría</button></Link>
      </section>
      </>
    ) : (
      <>
      <section>
        <h1>Categorias</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
              <th><Link to="/category"><button>Crear Categoría</button></Link></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <Link to={`/category/${category._id}`}><button>Editar</button></Link>

                  <button
                  onClick={() =>{
                    deleteCategory(category._id)
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

export default CategoriesAdminPage
