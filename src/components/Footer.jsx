import React from 'react';
import '../assets/styles/components/Footer.css'
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <nav>
          <ul className="footer-links">
            <li><Link to ="/">Inicio</Link></li>
            {/* <li><Link to ="/contactus">Contactanos</Link></li> */}
            <li><Link to ="/login">Iniciar Sesión</Link></li>
            <li><Link to ="/register">Registrarse</Link></li>
          </ul>
        </nav>
        <p>&copy; 2024 Yoa Cosmetics</p>
      </div>
    </footer>
  );
}


