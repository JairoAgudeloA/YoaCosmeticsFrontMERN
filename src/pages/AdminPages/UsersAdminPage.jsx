import React, { useState, useEffect } from 'react'
import { useUser } from '../../context/UserContext'
import { Link } from 'react-router-dom'

const UsersAdminPage = () => {
    const { users, getUsers, deleteUser } = useUser();
    const [search, setSearch] = useState('');

    const searchUser = (e) => {
        setSearch(e.target.value);
    }

    const results = !search ? users : users.filter((user) => user.username.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            {users.length === 0 ? (
                <>
                    <section>
                        <h3>No hay usuarios</h3>
                        <Link to="/admin/user"><button>Crear Usuario</button></Link>
                    </section>
                </>
            ) : (
                <>
                    <section className="fondito2">
                        <h1>Usuarios</h1>
                        <div class="busqueda-container">
                            <input value={search} onChange={searchUser} type="text" placeholder="Buscar Usuario." className='searchs' />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Acciones</th>

                                </tr>
                            </thead>
                            <tbody>
                                {results.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <Link to={`/admin/user/${user._id}`}><button>Editar</button></Link>
                                            <button
                                                onClick={() => {
                                                    // Mostrar el cuadro de diálogo de confirmación
                                                    const confirmation = window.confirm("¿Estás seguro de que deseas borrar este usuario?");

                                                    // Si el usuario hace clic en "Aceptar", proceder con la eliminación
                                                    if (confirmation) {
                                                        deleteUser(user._id);
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
                        <Link to="/admin/user"><button>Crear Usuario</button></Link>
                        <Link to="/admin/dashboard"><button>Volver Tablero</button></Link>
                    </div>
                </>
            )}

        </>
    )
}

export default UsersAdminPage
