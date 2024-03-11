import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aquí enviarías la solicitud POST a tu API para registrar al usuario
      // Utiliza fetch, Axios u otra librería para realizar la solicitud
      const response = await fetch("URL_DE_TU_API/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // Si la solicitud es exitosa, puedes redirigir al usuario a la página de inicio de sesión
        navigate("/login");
        console.log("Usuario registrado exitosamente");
      } else {
        // Si hay un error en la solicitud, muestra un mensaje de error
        console.error("Error al registrar usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <section>
        <div>
          <h1>Registrarse</h1>

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
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login">
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

