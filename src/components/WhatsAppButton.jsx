import React from 'react';
import { Link } from 'react-router-dom';
import logoww from '../assets/logoww.png'
import '../assets/styles/components/WhatsAppButton.css'


export const WhatsAppButton = () => {
    const openWhatsAppChat = () => {
        // Número de teléfono y mensaje 
        const phoneNumber = "3016433188"; // Variable con el número de teléfono
        const message = "Si deseas obtener una informacion mas asertada "; // variable del mensaje que se va a enviar al abrir el chat

        // Construir la URL de WhatsApp con el número de teléfono y el mensaje
        const whatsappURL = "https://api.whatsapp.com/send?phone=" + phoneNumber + "&text=" + encodeURIComponent(message);
        //const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        // Para Abrir URL en una nueva pestaña
        window.open(whatsappURL);
    };

    return (
        //<button onClick={openWhatsAppChat}>Abrir Chat de WhatsApp</button>
        <Link to="whatsapp://send?phone=3016433188" className="whatsapp">
            <img src={logoww} alt="WhatsApp Logo" />
        </Link>
        
    );
};
