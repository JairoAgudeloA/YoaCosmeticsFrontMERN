import React from "react"
import '../assets/styles/components/Main.css'
import imagen from '../assets/imagen.jpg'
import labial from '../assets/labial.jpg'
import nails from '../assets/nails.jpg'


export const Main = () => {
    return(
        <>
        <main>
        <div className="contenido-container">
            <div className="contenido">
                <img src={imagen}  alt="Imagen 1"/>
                <h2>Kit de Cuidado</h2>
                <p>$ 7.000</p>
                <button>AÑADIR</button>
            </div>
            
            <div className="contenido">
                <img src= {imagen} alt="Imagen 1"/>
                <h2>Kit de Cuidado</h2>
                <p>$ 7.000</p>
                <button>AÑADIR</button>
            </div>

            <div className="contenido">
                <img src={imagen}  alt="Imagen 1"/>
                <h2>Kit de Cuidado</h2>
                <p>$ 7.000</p>
                <button>AÑADIR</button>
            </div>

            <div className="contenido">
                <img src={imagen}  alt="Imagen 1"/>
                <h2>Kit de Cuidado</h2>
                <p>$ 7.000</p>
                <button>AÑADIR</button>
            </div>

            <div className="contenido">
                <img src={labial} alt="Imagen 1"/>
                <h2>Kit de Cuidado</h2>
                <p>$ 7.000</p>
                <button>AÑADIR</button>
            </div>

            <div className="contenido">
                <img src={labial} alt="Imagen 1"/>
                <h2>Kit de Cuidado</h2>
                <p>$ 7.000</p>
                <button>AÑADIR</button>
            </div>

            <div className="contenido">
                <img src={labial} alt="Imagen 1"/>
                <h2>Kit de Cuidado</h2>
                <p>$ 7.000</p>
                <button>AÑADIR</button>
            </div>


            <div className="contenido">
                <img src={labial} alt="Imagen 1"/>
                <h2>Kit de Cuidado</h2>
                <p>$ 7.000</p>
                <button>AÑADIR</button>
            </div>

        </div>
    </main>
        
        </>
    )
}