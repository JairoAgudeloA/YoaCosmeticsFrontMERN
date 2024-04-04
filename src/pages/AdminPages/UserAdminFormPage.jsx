import React, { useEffect } from 'react'
import { useUser } from '../../context/UserContext'
import {  useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import '../../assets/styles/pages/UserAdminFormPage.css'

const UserAdminFormPage = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { createUser, getUser, updateUser } = useUser();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadUser() {
            if (params.id) {
                const user = await getUser(params.id);
                setValue('username', user.username);
                setValue('email', user.email);
                setValue('password', user.password)
                setValue('role', user.role);
            }
        }
        loadUser();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (params.id) {
                await updateUser(params.id, data);
            } else {
                await createUser(data);
            }
            // navigate('/users');
        } catch (error) {
            console.error(error);
        }
    });

return (
    <>
    <section className="form-container">
        <form onSubmit={onSubmit}>
            {params.id ? <h1>Editar Usuario</h1> : <h1>Crear Usuario</h1>}
            <div>
                <label htmlFor="username">Nombre</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    {...register('username', { required: true })}
                />
                {errors.name && <span>Este campo es requerido</span>}
            </div>
            
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='email'
                    {...register('email', { required: true })}
                    disabled={params.id ? true : false}
                    
                />
                {errors.email && <span>Este campo es requerido</span>}
            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    {...register('password', { required: true })}
                />
                {errors.password && <span>Este campo es requerido</span>}
            </div>
            <div>
                <label htmlFor="role">Rol</label>
                <select
                    id="role"
                    name="role"
                    {...register('role', { required: true })}
                >
                    
                    <option  value='' disabled>Seleccione un rol</option>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                    
                </select>
                {errors.role && <span>Este campo es requerido</span>}
            </div>
            <div className="parbotones">
                {params.id ? <button type="submit">Editar</button> : <button type="submit">Crear</button>}
                <button onClick={() => navigate('/admin/users')}>Cancelar</button>
            </div>
        </form>
    </section>
        
    </>
)
}

export default UserAdminFormPage
