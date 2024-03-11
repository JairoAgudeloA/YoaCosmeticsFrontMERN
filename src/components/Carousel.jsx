import React from 'react'
import '../assets/styles/components/Carousel.css'
import imagen from '../assets/imagen.jpg'
import labial from '../assets/labial.jpg'
import nails from '../assets/nails.jpg'


export const Carousel = () => {
    return (
        <>
            <div className="carousel-container">
                <div className="carousel">
                    <div className="slides">

                        <div className="slide">
                            <img src={imagen} alt="Slide 1" />
                        </div>
                        <div className="slide">
                            <img src={labial} alt="Slide 2" />
                        </div>
                        <div className="slide">
                            <img src={nails} alt="Slide 3" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
