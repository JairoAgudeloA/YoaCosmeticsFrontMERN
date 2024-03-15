import React, { useState } from 'react'
import '../assets/styles/components/Navbar.css'
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser, AiOutlineMessage, AiOutlineSearch } from "react-icons/ai";
// import { FaHeart } from "react-icons/fa";

import { Link } from 'react-router-dom'

export const Navbar = () => {
   const {userLoggin, setUserLoggin } = useState()//privisional 
   return (
      <>
         <nav className="navbar">

            <ul className="elementos">
               <li><Link to="/"><h1>Yoa Cosmetics</h1></Link></li>

               <li>
                  <div class="search-container">
                     <input type="text" placeholder="Buscar Productos..." />
                     <button type="submit"><AiOutlineSearch /></button>
                  </div>
               </li>

               <li><Link to="/"><AiOutlineHome />Inicio</Link></li>
               {/* <li><Link to="/favorites"><FaHeart/>Favoritos</Link></li> */}
               <li><Link to="/cart"><AiOutlineShoppingCart />Carrito</Link></li>
               <li><Link to="/contactus"><AiOutlineMessage />Contactenos</Link></li>
               <li><Link to="/category"><AiOutlineMessage />Categorias</Link></li>
               <li className='usermenu'><AiOutlineUser />
               {userLoggin?(
                  <ul className='menu-vertical'>
                     <li><Link to="/profile">Perfil</Link></li>
                     <li><Link to="/logout">Cerrar Sesión</Link></li>
                  </ul>
               ):(
                  <ul className='menu-vertical'>
                     <li><Link to="/login">Iniciar Sesion</Link></li>
                     <li><Link to="/register">Registrarse</Link></li>
                  </ul>
               )} {userLoggin && isAdmin &&( 
                  <ul className='menu-vertical'>
                     <li><Link to="/admin/product">Productos</Link></li>
                     <li><Link to="/admin/users">Usuarios</Link></li>
                     <li><Link to="/admin/orders">Ordenes</Link></li>
                     <li><Link to="/admin/categories">Categorias</Link></li>
                  </ul>
               )

               }
               </li>
            </ul>

         </nav>

      </>
   )
}
