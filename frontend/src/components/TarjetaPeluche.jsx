import '../styles/StyleModerno.css'; 

export function TarjetaPeluche({ producto, agregar }) {
  return (
    <article className="peluche-card"> {/* Clase del nuevo CSS */}
      <img 
        src={producto.Imagen} 
        alt={producto.Nombre} 
        /* El CSS ya le da estilo a la etiqueta img directamente */
      />
      <h3>{producto.Nombre}</h3> {/* El CSS ya le da estilo al h3 */}
      
      <p className="price-tag"> {/* Clase del nuevo CSS */}
        ${Number(producto.Precio).toFixed(2)}
      </p>
      
      <button
        className="btn-add" 
        //al presionar se ejecuta la funcion
        onClick={() => agregar(producto)} 
      > {/* Clase del nuevo CSS */}
        AÑADIR AL CARRITO
      </button>
    </article>
  );
}