import React from "react";
import "../assets/styles/pages/EditPerfil.css";

export const EditPerfil = () => {
  return (
    <>
      <section class="form-container">
          <div class="contenedor">
            <h2>Actualizar Información</h2>
            <form action="" method="POST">
              <div class="form-elementos">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required />
              </div>
              <div class="form-elementos">
                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div class="form-elementos">
                <label for="password">Contraseña:</label>
                <input type="password" id="password" name="password" required />
              </div>
              <div class="form-elementos">
                <label for="confirmPassword">Confirmar Contraseña:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                />
              </div>
              <div class="buttons">
                <button type="submit" class="update-button">
                  Actualizar
                </button>
                <button type="button" class="cancel-button">
                  Salir
                </button>
              </div>
            </form>
          </div>
      </section>
    </>
  );
};
