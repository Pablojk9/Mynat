import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import carrusel1 from '../../assets/img/carrusel-1.jpg';
import carrusel2 from '../../assets/img/carrusel-2.jpg';
import carrusel3 from '../../assets/img/carrusel-3.jpg';

const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const response = await fetch('http://localhost:5500/api/informacion/1');
        if (!response.ok) {
          throw new Error('Error al obtener la información');
        }
        const data = await response.json();
        setSlides([
          { image: carrusel1, titulo: data.titulo1 },
          { image: carrusel2, titulo: data.titulo2 },
          { image: carrusel3 },
        ]);
      } catch (error) {
        console.error('Error al obtener la información: ', error);
      }
    }
    fetchSlides();
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const carouselCaptionStyle = {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '8px',
    color: 'white',
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={slide.image}
            alt={`Slide ${idx}`}
          />
          {slide.titulo && (
            <Carousel.Caption style={carouselCaptionStyle}>
              <h2>{slide.titulo}</h2>
            </Carousel.Caption>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;