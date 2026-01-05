// src/components/Slider.jsx
import { useState, useEffect, useCallback } from 'react';
import '../styles/Slider.css';

export function Slider() {
  const imagenes = [
    "/images/onePiece.jpeg",
    "/images/sonics.jpeg",
    "/images/marvel.jpeg",
    "/images/fivefreddys.jpeg"
  ];

  const [indiceActual, setIndiceActual] = useState(0);

  // Función optimizada para ir al siguiente (se usa en el click y en el automático)
  const siguienteSlide = useCallback(() => {
    setIndiceActual(prev => (prev === imagenes.length - 1 ? 0 : prev + 1));
  }, [imagenes.length]);

  // Función para regresar (si estás en el 0, te manda al último)
  const anteriorSlide = () => {
    setIndiceActual(prev => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  useEffect(() => {
    const intervalo = setInterval(siguienteSlide, 5000);
    // Limpiamos el intervalo si el componente se desmonta o si cambia la función
    return () => clearInterval(intervalo);
  }, [siguienteSlide]);

  return (
    <div className="slider-container">
      {/* El spinner que se ve al fondo mientras cargan las imágenes */}
      <div className="slider-loader"></div>

      {imagenes.map((img, index) => (
        <div 
          key={index}
          className={`slide ${index === indiceActual ? 'active' : ''}`}
        >
          {/* Solo cargamos la imagen si es la actual o la siguiente (Lazy Load ligero) */}
          <img src={img} alt={`Slide ${index}`} className="slide-img" />
        </div>
      ))}
      
      {/* --- LAS FLECHAS NEÓN --- */}
      <button className="flecha izquierda" onClick={anteriorSlide}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button className="flecha derecha" onClick={siguienteSlide}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Los puntitos (opcional, si los quieres dejar) */}
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