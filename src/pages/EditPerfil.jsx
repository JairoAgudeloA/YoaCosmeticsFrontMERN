import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate,useParams } from 'react-router-dom';

export const EditPerfil = () => {
  const { user,profile,updateProfile } = useAuth();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  

  // useEffect(() => {
  //   async function loadProfileUser() {
  //     if (user) {
  //       const user = await profile();
  //       setValue('username', user.username);
  //       setValue('email', user.email);
  //       setValue('password', user.password)
  //       setValue('phone', user.phone);
  //       setValue('birthdate', user.birthdate);
  //       setValue('biography', user.biography);
  //       setValue('photo', user.photo);
  //     }
  //   }
  //   loadProfileUser();
  // }, []);



  const onSubmit = handleSubmit(async (data) => { 
    try {
      await updateProfile(data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
    <section>
      <form onSubmit={onSubmit}>
        <h1>Editar Perfil</h1>
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
            {...register('email', { required: true })}
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
          <label htmlFor="newpassword">Nueva Contraseña</label>
          <input
            type="password"
            id="newpassword"
            name="newpassword"
            {...register('newpassword', { required: true })}
          />
          {errors.password_confirmation && <span>Este campo es requerido</span>}
        </div>

        <div>
          <label htmlFor="confirmnewpassword">Confirmar Nueva Contraseña</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            {...register('password_confirmation', { required: true })}
          />
          {errors.password_confirmation && <span>Este campo es requerido</span>}
        </div>

        <div>
          <label htmlFor="phone">Telefono</label>
          <input
            type="text"
            id="phone"
            name="phone"
            {...register('phone', { required: true })}
          />
          {errors.phone && <span>Este campo es requerido</span>}
        </div>

        <div>
          <label htmlFor='birthdate'>Fecha de Nacimiento</label>
          <input
            type='date'
            id='birthdate'
            name='birthdate'
            {...register('birthdate', { required: true })}
          />
          {errors.birthdate && <span>Este campo es requerido</span>}
        </div>

        <div>
          <label htmlFor='biography'>Biografia</label>
          <input 
            type='date'
            id='biography'
            name='biography'
            {...register('biography', { required: true })}
          />
          {errors.biography && <span>Este campo es requerido</span>}
        </div>

        <div>
          <label htmlFor='photo'>Foto</label>
          <input 
            type='file'
            id='photo'
            name='photo'
            {...register('photo', { required: true })}
          />
          {errors.photo && <span>Este campo es requerido</span>}
        </div>
        <button type="submit">Guardar</button>
      </form>

    </section>

    </>
  );
};
