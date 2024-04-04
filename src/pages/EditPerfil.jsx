import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { Link, useNavigate,useParams } from 'react-router-dom';
import { url_image } from "../api/axios";
import '../assets/styles/pages/EditPerfil.css';

export const EditPerfil = () => {
  const { user,profile,updateProfile , errors:profileErrors} = useAuth();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if(user){
      setValue('username', user.username);
      setValue('email', user.email);
      setValue('phone', user.phone);
      setValue('birthdate', user.birthdate);
      setValue('biography', user.biography);
      setValue('profileImage', user.profileImage);
    }
  }, [user]);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    // Iterar sobre cada campo en los datos del formulario
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        // Si el campo es 'profileImage', añadir el archivo al formData
        if (key === 'profileImage') {
          formData.append(key, data[key][0]);
        } else {
          // Para todos los demás campos, añadir el valor al formData
          formData.append(key, data[key]);
        }
      }
    }

    try {
      await updateProfile(data); // Enviar los datos al backend
      // Puedes realizar alguna acción adicional después de enviar los datos, como redirigir a otra página
       // Redirigir a la página de home después de guardar los cambios
    } catch (error) {
      console.error(error);
      // Manejar el error, si es necesario
    }
  });
  

  return (
    <>
    <section className= "form-container2">
      {profileErrors.map((error, i) => (
        <p key={i} className="error-message">{error}</p>
      ))}
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
          <label htmlFor="newPassword">Nueva Contraseña</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            {...register('newPassword', { required: true })}
          />
          {errors.newPassword && <span>Este campo es requerido</span>}
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

        {/* <div>
          <label htmlFor='profileImage'>Foto</label>
          <input 
            type='file'
            id='profileImage'
            name='profileImage'
            {...register('profileImage')}
          />
        </div>         */}
       
          <button type="submit">Guardar</button>
                       
      </form>
      

      {/* <div>
          <img src={`${url_image}${user.profileImage}`} alt={user.username} />
        </div> */}
    </section>

    </>
  );
};
