import React from 'react'
import { Link } from 'react-router-dom'

const DashboardAdminPage = () => {
  return (
    <>
        <section>
            <h1>Dashboard</h1>

            <article>
                <h2>Usuarios</h2>
                <Link to="/admin/users"><button>Ver Usuarios</button></Link>
            </article>
            <article>
                <h2>Productos</h2>
                <Link to="/admin/products"><button>Ver Productos</button></Link>
            </article>
            <article>
                <h2>Categorias</h2>
                <Link to="/admin/categories"><button>Ver Categorias</button></Link>
            </article>
            <article>
                <h2>Ordenes</h2>
                <Link to="/admin/orders"><button>Ver Ordenes</button></Link>
            </article>


        </section>
      
    </>
  )
}

export default DashboardAdminPage
