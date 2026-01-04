//un componente es como una pieza de Lego que puedes reutilizar mil veces
export function TarjetaPeluche({ nombre, precio, imagen }) {
  return (
    <div className="productBox"> {/* Usamos tus clases de Style1.css */}
      <img src={imagen} className="imageInBox" alt={nombre} />
      <p className="text">{nombre}</p>
      <p className="text">${precio}</p>
      <button className="buyBtn">Añadir al Carrito</button>
    </div>
  );
}