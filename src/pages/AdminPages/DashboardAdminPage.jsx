import React from 'react'
import { Link } from 'react-router-dom'

const DashboardAdminPage = () => {
  return (
    <>
        <section>
            <h1>Tablero</h1>
            <article>
                <Link to="/admin/categories">Categorías</Link>
            </article>
            <article>
                <Link to="/admin/products">Productos</Link>
            </article>
            <article>
                <Link to="/admin/users">Usuarios</Link>
            </article>
            <article>
                <Link to="/admin/orders">Órdenes</Link>
            </article>
        </section>
      
    </>
  )
}

export default DashboardAdminPage
