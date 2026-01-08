export function MenuLateral({ abierto, cerrar, subCat, toggleSubCat, setCat }) {
  return (
    <>
      {/* Fondo oscuro cuando el menú está abierto */}
      <div className={`overlay ${abierto ? 'visible' : ''}`} onClick={cerrar}></div>
      
      <nav className={`drawer ${abierto ? 'open' : ''}`}>
        <button className="close-btn" onClick={cerrar}>×</button>
        
        <ul className="menu-list">
          {/* Opción 1: Novedades (te manda a otra página) */}
          <li><a href="/novedades" className="menu-item">NOVEDADES</a></li>
          
          {/* Opción 2: Categorías (despliega la lista) */}
          <li className="menu-item-wrapper">
            <div className="menu-item" onClick={toggleSubCat}>
              CATEGORÍAS <span>{subCat ? '−' : '+'}</span>
            </div>
            
            {/* Sub-lista de categorías (sin imágenes como pediste) */}
            <ul className={`sub-menu ${subCat ? 'show' : ''}`}>
              {['Todos', 'Anime', 'Caricaturas', 'Películas', 'VideoJuegos'].map(c => (
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