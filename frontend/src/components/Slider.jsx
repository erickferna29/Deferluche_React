import { useState, useEffect } from 'react';
import '../styles/Slider.css';

export function Slider() {
  // 1. Las imágenes que ya tenías en tu index.php
  const imagenes = [
    "images/onePiece.jpeg",
    "images/sonics.jpeg",
    "images/marvel.jpeg",
    "images/fivefreddys.jpeg"
  ];

  const [indiceActual, setIndiceActual] = useState(0);

  // 2. El "Reloj" del Slider (Optimización pura)
  useEffect(() => {
    const intervalo = setInterval(() => {
      // Avanzamos al siguiente, si llegamos al final regresamos al 0
      setIndiceActual((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 segundos como tenías antes

    // LIMPIEZA: Esto es lo que te hace un crack. 
    // Si cierras la página, el reloj se detiene y no gasta memoria.
    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  return (
    <div className="slider-container">
      {imagenes.map((img, index) => (
        <div 
          key={index}
          className={`slide ${index === indiceActual ? 'active' : ''}`}
        >
          {index === indiceActual && (
            <img src={img} alt={`Slide ${index}`} className="slide-img" />
          )}
        </div>
      ))}
      
      {/* 3. Los puntitos de navegación (opcional) */}
      <div className="puntos">
        {imagenes.map((_, index) => (
          <span 
            key={index} 
            className={`punto ${index === indiceActual ? 'activo' : ''}`}
            onClick={() => setIndiceActual(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}