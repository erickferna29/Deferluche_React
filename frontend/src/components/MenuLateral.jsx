// src/components/MenuLateral.jsx
import '../styles/StyleModerno.css';

export function MenuLateral({ abierto, cerrar, subCat, toggleSubCat, setCat }) {
  const categorias = ['Todos', 'Anime', 'Caricaturas', 'Películas', 'VideoJuegos'];

  return (
    <>
      {/* El fondo oscuro que bloquea el resto de la página */}
      <div className={`overlay ${abierto ? 'visible' : ''}`} onClick={cerrar}></div>
      
      {/* El Drawer que sale desde la derecha */}
      <nav className={`drawer ${abierto ? 'open' : ''}`}>
        <button className="close-btn" onClick={cerrar}>×</button>
        
        <ul className="menu-list">
          {/* Opción 1: Novedades */}
          <li><a href="#" className="menu-item">NOVEDADES</a></li>
          
          {/* Opción 2: Categorías con lista desplegable */}
          <li className="menu-item-wrapper">
            <div className="menu-item" onClick={toggleSubCat}>
              CATEGORÍAS <span>{subCat ? '−' : '+'}</span>
            </div>
            
            {/* La lista que se despliega (sin imágenes para que sea giga limpia) */}
            <ul className={`sub-menu ${subCat ? 'show' : ''}`}>
              {categorias.map(c => (
                <li key={c} onClick={() => { setCat(c); cerrar(); }}>
                  {c}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}