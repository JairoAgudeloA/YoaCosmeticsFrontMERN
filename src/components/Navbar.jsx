import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/components/Navbar.css';
import { AiOutlineHome, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { FaTags } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Navbar = ({ setSearch }) => {
  const navigate = useNavigate();
  const cart = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [menudropdown, setMenudropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const menuRef = useRef(null);

  useEffect(() => {
    // Agregar event listener al montar el componente
    document.addEventListener('mousedown', handleClickOutside);
    // Retirar el event listener al desmontar el componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      // Cerrar el menú si el clic se realiza fuera de él
      setMenudropdown(false);
    }
  };

  const clickMenu = () => {
    setMenudropdown(!menudropdown);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Realizar la navegación a la página de inicio con el término de búsqueda
    navigate(`/search/${searchTerm}`);
  };

  const searchProduct = (e) => {
    setSearchTerm(e.target.value); // Actualiza el estado local con el término de búsqueda
    setSearch(e.target.value); // Llama a la función setSearch pasada como prop para actualizar el estado de búsqueda en el componente padre
    console.log(e.target.value);
  };

  return (
    <nav className="navbar">
      <ul className="elementos">
        <li>
          <Link to="/">
            <h1>Yoa Cosmetics</h1>
          </Link>
        </li>
        <li>
          <div className="search-container">
            <form onSubmit={handleSearchSubmit}>
              <input onChange={searchProduct} type="text" placeholder="Buscar Producto" className='searchs' />
              <button type="submit"><AiOutlineSearch /></button>
            </form>
          </div>
        </li>
        <li>
          <Link to="/">
            <AiOutlineHome /> Inicio
          </Link>
        </li>
        <li>
          <div>
            <Link to="/cart">
              <AiOutlineShoppingCart />
            </Link>
            <span>{cart.length}</span>
          </div>
        </li>
        <li>
          <Link to="/categorieslist">
            <FaTags /> Categorías
          </Link>
        </li>
        <li className='menud' onClick={clickMenu} ref={menuRef}>
          <AiOutlineUser />
          {isAuthenticated ? (
            <ul className={`menu-vertical ${menudropdown  ? 'active' : "" }`}>
              {user.role === 'user' ? (
                <>
                  <li>
                    <Link to="/profile">Perfil</Link>
                  </li>
                  <li>
                    <Link to="/orders">Mis Ordenes</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={() => logout()}>
                      Cerrar Sesión
                    </Link>
                  </li>
                </>
              ) : (
                user.role === 'admin' && (
                  <>
                    <li>
                      <Link to="/profile">Perfil</Link>
                    </li>
                    <li>
                      <Link to="/admin/dashboard">Tablero</Link>
                    </li>
                    <li>
                      <Link to="/" onClick={() => logout()}>
                        Cerrar Sesión
                      </Link>
                    </li>
                  </>
                )
              )}
            </ul>
          ) : (
            <ul className={`menu-vertical ${menudropdown  ? 'active' : "" }`}>
              <li>
                <Link to="/login">Iniciar Sesion</Link>
              </li>
              <li>
                <Link to="/register">Registrarse</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};


// import React, { useState } from 'react';
// import '../assets/styles/components/Navbar.css';
// import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
// import { FaTags } from "react-icons/fa";
// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom';
// import { useCart } from '../context/CartContext';

// export const Navbar = ({ setSearch }) => {
//    const cart = useCart();

//    const { user, isAuthenticated, logout } = useAuth();
//    // const [search, setSearch] = useState('');
//    const [search] = useState('');
//    // console.log(isAuthenticated, user);
//    const searchProduct = (e) => {
//          setSearch(e.target.value);
//          console.log(e.target.value);
//    };

//    return ( 
//       <nav className="navbar">
//          <ul className="elementos">
//             <li><Link to="/"><h1>Yoa Cosmetics</h1></Link></li>
//             <li>
//                <div className="search-container">
//                   <input value={search} onChange={searchProduct} type="text" placeholder="Buscar Producto" className='searchs' />
//                   {/* <button type="submit"><AiOutlineSearch /></button> */}
//                </div>
//             </li>
//             <li><Link to="/"><AiOutlineHome />Inicio</Link></li>
//             <li>
//                <div>
//                   <Link to="/cart"><AiOutlineShoppingCart /></Link>
//                   <span>{cart.length}</span>
//                </div>
//             </li>
//             <li><Link to="/categorieslist"><FaTags />Categorias</Link></li>
//             <li className='usermenu'><AiOutlineUser />
//                {isAuthenticated ? (
//                   <ul className='menu-vertical'>
//                      {user.role === 'user' ? (
//                         <>
//                            <li><Link to="/profile">Perfil</Link></li>
//                            <li><Link to="/orders">Mis Ordenes</Link></li>
//                            <li><Link to="/" onClick={() => logout()}>Cerrar Sesión</Link></li>
//                         </>
//                      ) : user.role === 'admin' && (
//                            <>
//                               <li><Link to="/profile">Perfil</Link></li>
//                               <li><Link to="/admin/dashboard">Tablero</Link></li>
//                               <li><Link to="/" onClick={() => logout()}>Cerrar Sesión</Link></li>
//                            </>
//                         )}
//                   </ul>
//                ) : (
//                      <ul className='menu-vertical'>
//                         <li><Link to="/login">Iniciar Sesion</Link></li>
//                         <li><Link to="/register">Registrarse</Link></li>
//                      </ul>
//                   )}
//             </li>
//          </ul>
//       </nav>
//    )
// }

// import React, { useState } from 'react';
// import '../assets/styles/components/Navbar.css';
// import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
// import { FaTags } from "react-icons/fa";
// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { useProduct } from '../context/ProductContext'

// export const Navbar = () => {
//    const cart = useCart();
//    const { user, isAuthenticated, logout } = useAuth();
//   const { products, getProducts } = useProduct();
//   const [searchTerm, setSearchTerm] = useState('');
//    console.log(isAuthenticated, user);


//    const handleSearch = (e) => {
//       const term = e.target.value;
//       setSearchTerm(term);
//       getProducts(term);
//   };

//    return (
//       <nav className="navbar">
//          <ul className="elementos">
//             <li><Link to="/"><h1>Yoa Cosmetics</h1></Link></li>
//             <li>
//                <div className="search-container">
//                   <input
//                             type="text"
//                             placeholder="Buscar Productos..."
//                             value={searchTerm}
//                             onChange={handleSearch}
//                         />
//                   <button type="submit"><AiOutlineSearch /></button>
//                </div>
//             </li>
//             <li><Link to="/"><AiOutlineHome />Inicio</Link></li>
//             <li>
//                <div>
//                   <Link to="/cart"><AiOutlineShoppingCart /></Link>
//                   <span>{cart.length}</span>
//                </div>
//             </li>
//             <li><Link to="/categorieslist"><FaTags />Categorias</Link></li>
//             <li className='usermenu'><AiOutlineUser />
//                {isAuthenticated ? (
//                   <ul className='menu-vertical'>
//                      {user.role === 'user' ? (
//                         <>
//                            <li><Link to="/profile">Perfil</Link></li>
//                            <li><Link to="/orders">Mis Ordenes</Link></li>
//                            <li><Link to="/" onClick={() => logout()}>Cerrar Sesión</Link></li>
//                         </>
//                      ) : user.role === 'admin' && (
//                         <>
//                            <li><Link to="/profile">Perfil</Link></li>
//                            <li><Link to="/admin/dashboard">Tablero</Link></li>
//                            <li><Link to="/" onClick={() => logout()}>Cerrar Sesión</Link></li>
//                         </>
//                      )}
//                   </ul>
//                ) : (
//                   <ul className='menu-vertical'>
//                      <li><Link to="/login">Iniciar Sesion</Link></li>
//                      <li><Link to="/register">Registrarse</Link></li>
//                   </ul>
//                )}
//             </li>
//          </ul>
//       </nav>
//    )
// }










// import React, { useState } from 'react'
// import '../assets/styles/components/Navbar.css'
// import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser,AiOutlineSearch } from "react-icons/ai";
// import { FaTags } from "react-icons/fa";
// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom'
// import { useCart } from '../context/CartContext';

// export const Navbar = () => {
//    const cart = useCart();

//    const { user, isAuthenticated, logout} = useAuth();
//    console.log(isAuthenticated, user);

//    return (
//       <>
//          <nav className="navbar">
//             <ul className="elementos">
//                <li><Link to="/"><h1>Yoa Cosmetics</h1></Link></li>
//                <li>
//                   <div className="search-container">
//                      <input type="text" placeholder="Buscar Productos..." />
//                      <button type="submit"><AiOutlineSearch /></button>
//                   </div>
//                </li>
//                <li><Link to="/"><AiOutlineHome />Inicio</Link></li>
//                <li>
//                   <div>                     
//                      <Link to="/cart"><AiOutlineShoppingCart /></Link>
//                      <span>{cart.length}</span>
//                   </div>
//                </li>
//                <li><Link to="/categorieslist"><FaTags/>Categorias</Link></li> 
//                <li className='usermenu'><AiOutlineUser />
//                   {isAuthenticated ? (
//                      <ul className='menu-vertical'>
//                         <li><Link to="/profile">Perfil</Link></li>
//                         <li><Link to="/orders">Mis Ordenes</Link></li>
//                         <li><Link to="/" onClick={() => logout()}>Cerrar Sesión</Link></li>
//                      </ul>
//                   ) : (
//                      <ul className='menu-vertical'>
//                         <li><Link to="/login">Iniciar Sesion</Link></li>
//                         <li><Link to="/register">Registrarse</Link></li>
//                      </ul>
//                   )}
//                   {isAuthenticated && user.role === 'admin' &&( 
//                   <ul className='menu-vertical'>
//                      <li><Link to="/admin/product">Productos</Link></li>
//                      <li><Link to="/admin/users">Usuarios</Link></li>
//                      <li><Link to="/admin/orders">Ordenes</Link></li>
//                      <li><Link to="/admin/categories">Categorias</Link></li>
//                   </ul>
//                )

//                }
//                </li>
//             </ul>

//          </nav>

//       </>
//    )
// }
