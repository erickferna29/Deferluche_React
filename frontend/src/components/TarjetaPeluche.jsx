//un componente es como una pieza de Lego que se puede reutilizar miles de veces
export function TarjetaPeluche({ producto }) {
  return (
    <div className="productBox"> 
      {/* Usamos la URL de la imagen que viene de tu MySQL */}
      <img 
        src={producto.Imagen} 
        className="imageInBox" 
        alt={producto.Nombre} 
      />
      <p className="text">{producto.Nombre}</p>
      <p className="text">${Number(producto.Precio).toFixed(2)}</p>
      <button className="buyBtn">Comprar</button>
    </div>
  );
}