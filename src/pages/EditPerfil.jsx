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
 
  // Variable de referencia para almacenar el ID de usuario
  const userIdRef = useRef(null);

  useEffect(() => {
    async function loadProfileUser() {
      // Verificar si el usuario está definido y el ID de usuario no ha cambiado
      if (user && user.id !== userIdRef.current) {
        userIdRef.current = user.id; // Actualizar el ID de usuario almacenado en la referencia
        try {
          const userData = await profile();
          if (userData) {
            setValue('username', userData.username);
            setValue('email', userData.email);

            // Establecer otros campos solo si están presentes en los datos del perfil del usuario
            if (userData.phone) setValue('phone', userData.phone);
            if (userData.birthdate) setValue('birthdate', userData.birthdate);
            if (userData.biography) setValue('biography', userData.biography);
            if (userData.profileImage) setValue('profileImage', url_image + userData.profileImage);
          } else {
            console.error('No se encontraron datos de perfil para el usuario:', user);
          }
        } catch (error) {
          console.error('Error al cargar el perfil del usuario:', error);
        }
      }
    }
    loadProfileUser();
  }, [user]);

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
