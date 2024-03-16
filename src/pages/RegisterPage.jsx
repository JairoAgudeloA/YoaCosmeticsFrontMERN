import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../assets/styles/components/Register.css'
import { useForm } from 'react-hook-form';
import { useAuth } from "./../context/AuthContext";

export const RegisterPage = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm();//Estas son las funciones que nos provee useForm
  const { signup, errors: registerErrors, user } = useAuth();

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     navigate('/');
  //   }
  // }, [user, navigate]);

  const onSubmit = handleSubmit(async (value) => {
    await signup(value);
  });

  return (
    <>
      <section className="form-container">
        {registerErrors.map((error, i) => (
          <p key={i} className="error-message">{error}</p>
        ))}
        <form onSubmit={onSubmit}>
          <h1>Registrarse</h1>

          <div>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              placeholder="Ingrese Nombre"
              {...register("username", { required: true })}
            />
            {errors.username && <p className="error-message">Nombre es requerido</p>}
          </div>

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


          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                placeholder="Ingrese Nombre"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="Ingrese Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Ingrese Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirme Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrar"}
            </button>
          </form>

          <div>
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirme Contraseña"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && <p className="error-message">Confirmar Contraseña es requerida</p>}
          </div>

          <button type="submit">Registrarse</button>
          <p>
            ¿Ya tienes una cuenta?
            <Link to="/login">
              Iniciar Sesión</Link></p>
        </form>
      </section>
    </>
  );

};

