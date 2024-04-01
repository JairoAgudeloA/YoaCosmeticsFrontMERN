import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate,useParams } from 'react-router-dom';
import { url_image } from "../api/axios";

export const EditPerfil = () => {
  const { user,profile,updateProfile } = useAuth();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();
 
  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     await updateProfile(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await profile();
        // Establecer los valores de los campos del formulario con los datos del perfil del usuario
        setValue('username', res.data.username);
        setValue('email', res.data.email);
        // Establecer otros valores si es necesario
      } catch (error) {
        console.error('Error loading user profile:', error);
        // Manejar el error
      }
    };
  
    fetchProfileData();
  }, []);
  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateProfile(data); // Enviar los datos al backend
      // Puedes realizar alguna acción adicional después de enviar los datos, como redirigir a otra página
      navigate('/perfil'); // Redirigir a la página de perfil después de guardar los cambios
    } catch (error) {
      console.error(error);
      // Manejar el error, si es necesario
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
            disabled
            {...register('email')}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Contraseña actual</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            {...register('confirmPassword', { required: true })}
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
          {errors.newpassword && <span>Este campo es requerido</span>}
        </div>

        <div>
          <label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            {...register('confirmNewPassword', { required: true })}
          />
          {errors.confirmNewPassword && <span>Este campo es requerido</span>}
        </div>

        <div>
          <label htmlFor="phone">Telefono</label>
          <input
            type="number"
            id="phone"
            name="phone"
            {...register('phone', { required: true})}
          />
          {errors.phone && <span>Este campo es requerido</span>}
        </div>

        <div>
          <label htmlFor='birthdate'>Fecha de Nacimiento</label>
          <input
            type='date'
            id='birthdate'
            name='birthdate'
            {...register('birthdate')}
          />
        </div>

        <div>
          <label htmlFor='biography'>Biografia</label>
          <input 
            type='text'
            id='biography'
            name='biography'
            {...register('biography')}
          />
        </div>

        <div>
          <label htmlFor='profileImage'>Foto</label>
          <input 
            type='file'
            id='profileImage'
            name='profileImage'
            {...register('profileImage')}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>

    </section>

    </>
  );
};
