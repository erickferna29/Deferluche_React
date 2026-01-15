export function AvisoCarrito({ visible, producto }) {
  if (!visible || !producto) return null;

  return (
    <div className="aviso-carrito-toast">
      <div className="aviso-header">
        <span className="check-icon">✓</span>
        <p>Agregaste a tu carrito</p>
      </div>
      <div className="aviso-body">
        <img src={producto.Imagen} alt={producto.Nombre} />
        <div className="aviso-info">
          <strong>{producto.Nombre}</strong>
          <p>1 unidad</p>
        </div>
      </div>
      <div className="aviso-footer">
          <button className="btn-ir-carrito">Ir al carrito</button>
      </div>
    </div>
  );
}