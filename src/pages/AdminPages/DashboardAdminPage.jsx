import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/styles/pages/Dasboard.css'

const DashboardAdminPage = () => {
  return (
    <>
        <section className="dashboard">
            <h1>Dashboard</h1>
        <div className="tarjetas">
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
            </div>
        </section>
      
    </>
  )
}

export default DashboardAdminPage
