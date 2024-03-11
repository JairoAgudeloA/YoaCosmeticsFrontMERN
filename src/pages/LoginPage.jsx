import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Loginpage.css'

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('URL_DE_TU_API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        // La solicitud fue exitosa, puedes redirigir al usuario a otra página o realizar alguna otra acción
      } else {
        // Hubo un error en la solicitud
        console.error('Error en la solicitud');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }

    setIsLoading(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <section class="form-container">
      
      <form onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>
        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="Ingresa Correo Electrónico"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Ingresa Contraseña"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
        </button>
        <p>
        ¿Eres Usuario Nuevo?
      <Link to="/register">Registrate</Link> 
    </p>
      </form>
    </section>
  );
};
