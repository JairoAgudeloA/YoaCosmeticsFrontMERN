import React from "react";
import "../assets/styles/pages/EditPerfil.css";

export const EditPerfil = () => {
  return (
    <>
      <section className="form-container112">
        <div className="contenedorperfil">
          <form action="" method="POST">
            <h2>Actualizar Información</h2>
            <div className="form-elementos">
              <label htmlFor="nombre">Nombre:</label>
              <input 
              type="text" 
              id="nombre" 
              name="nombre" 
              required />
            </div>
            <div className="form-elementos">
              <label htmlFor="email">Correo Electrónico:</label>
              <input 
              type="email" 
              id="email" 
              name="email" 
              required />
            </div>
            <div className="form-elementos">
              <label htmlFor="password">Contraseña:</label>
              <input 
               type="password"
               id="password" 
               name="password" 
               required />
            </div>
            <div className="form-elementos">
              <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
              <input
               type="password"
               id="confirmPassword"
               name="confirmPassword"
               required/>
            </div>
            <div className="buttonsperfil">
              <button type="submit" className="update-button">
                Actualizar
              </button>
              <button type="button" className="cancel-button">
                Salir
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
