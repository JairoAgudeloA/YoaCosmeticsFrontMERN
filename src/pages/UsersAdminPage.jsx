import React, { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
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
                        <Link to="/user"><button>Crear Usuario</button></Link>
                    </section>
                </>
            ) : (
                <>
                    <section>
                        <h1>Usuarios</h1>
                        <input value={search} onChange={searchUser} type="text" placeholder="Buscar Usuario" className='searchs' />
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Acciones</th>
                                    <th><Link to="/user"><button>Crear Usuario</button></Link></th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <Link to={`/user/${user._id}`}><button>Editar</button></Link>
                                            <button
                                                onClick={() => {
                                                    deleteUser(user._id)
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

export default UsersAdminPage
