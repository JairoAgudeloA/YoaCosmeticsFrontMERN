import React, { useEffect } from 'react'
import { useCategory } from '../context/CategoryContext'
import { Link } from 'react-router-dom';

const CategoriesAdminPage = () => {
  const {categories,getCategories} = useCategory();

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
            </tr>
          </thead>
          <tbody>
            {categories.map((categories) => (
              <tr key={categories._id}>
                <td>{categories.name}</td>
                <td>{categories.description}</td>
                <td>
                  <button>Editar</button>
                  <button>Borrar</button>
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
