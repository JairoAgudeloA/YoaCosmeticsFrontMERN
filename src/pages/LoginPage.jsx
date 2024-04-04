import React, { useState,useEffect } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import '../assets/styles/components/Loginpage.css'
import { useForm } from 'react-hook-form';
import { useAuth } from './../context/AuthContext';

export const LoginPage = () => {

  
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();
  


  const onSubmit = handleSubmit(async (data) => {
    await signin(data);
    console.log(data);
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);


  return (
    <>
    <section className="form-container">
        {signinErrors.map((error, i) => (
          <p key={i} className="error-message">{error}</p>
        ))}
        <form onSubmit={onSubmit}>
          <h1>Iniciar Sesión</h1>

          <div>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ingrese Correo Electrónico"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="error-message">Correo Electrónico es requerido</p>}
          </div>

          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingrese Contraseña"
              {...register("password", { required: true })}
            />
            {errors.password && <p className="error-message">Contraseña es requerida</p>}
          </div>
          <button type="submit">Iniciar Sesion</button>
          <h2>
            ¿Aun no tienes una cuenta?
            <Link to="/register">
              Registrarse</Link></h2>
        </form>
      </section>
    </>
  );
};
