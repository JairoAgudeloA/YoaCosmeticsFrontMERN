import React from 'react';
import { Link } from 'react-router-dom';
import logoww from '../assets/logoww.png'
import '../assets/styles/components/WhatsAppButton.css'


export const WhatsAppButton = () => {

    return (
      <div className="whatsapp" >
        <a href="https://wa.me/573016433188?text=Hola, necesito pagar mi pedido/consulta sobre mi orden" 
         target="_blank" rel="noopener noreferrer">
          <img src={logoww} alt="Logo WhatsApp"/>
        </a>
      </div>
    );
  };