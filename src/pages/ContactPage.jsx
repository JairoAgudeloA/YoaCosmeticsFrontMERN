import React, { useState } from 'react'
import '../assets/styles/pages/ContactUsPage.css'

export const ContactPage = () => {


  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pqrsType: '',
    description: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <section className='form-container-contact'>
      <form onSubmit={handleSubmit} className="contact-form">
        <h1>Contactanos </h1>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            placeholder='Ingrese Nombre'
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="tel"
            placeholder='Ingrese Teléfono'
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            placeholder='Ingrese Correo Electronico'
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <div className="form-group">
          <label htmlFor="pqrsType">Tipo de PQRS:</label>
          <select
            id="pqrsType"
            name="pqrsType"
            value={formData.pqrsType}
            onChange={handleInputChange}
          >
            <option placeholder="Seleccion">Seleccione...</option>
            <option value="Peticiones">Peticiones</option>
            <option value="Quejas">Quejas</option>
            <option value="Reclamaciones">Recalamaciones</option>
            <option value="Sugerencia">Sugerencia</option>
            <option value="Felicitaciones">Felicitaciones</option>

          </select>
        </div>
        </div>
        <button type="submit">Enviar</button>
      </form>
      </section>
    </>
  );
}
