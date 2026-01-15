import { useState } from 'react';
import '../styles/StyleModerno.css';

export function MenuLateral({ abierto, cerrar, setCat, setSubCat }) {
  // Estado para saber qué categoría principal está expandida
  const [catAbierta, setCatAbierta] = useState(null);

  const menuEstructura = [
    {
      nombre: 'Muñecas',
      subcategorias: ['Monster High', 'Barbie', 'Bratz']
    },
    {
      nombre: 'Peluches',
      subcategorias: ['Anime', 'Videojuegos', 'Disney']
    },
    {
      nombre: 'Figuras',
      subcategorias: ['Funko Pop', 'Action Figures']
    }
  ];

  const handleToggle = (nombre) => {
    // Si picas la misma, se cierra; si no, se abre la nueva
    setCatAbierta(catAbierta === nombre ? null : nombre);
  };

  return (
    <>
      <div className={`overlay ${abierto ? 'visible' : ''}`} onClick={cerrar}></div>
      
      <nav className={`drawer ${abierto ? 'open' : ''}`}>        
        <ul className="menu-list">
          {/* Opción para resetear todo */}
          <li>
            <div className="menu-item" onClick={() => { setCat("Todos"); setSubCat("Todos"); cerrar(); }}>
              VER TODO EL CATÁLOGO
            </div>
          </li>

          {/* Mapeo de la nueva estructura tipo Acordeón */}
          {menuEstructura.map((cat) => (
            <li key={cat.nombre} className="menu-item-wrapper">
              <div className="menu-item" onClick={() => handleToggle(cat.nombre)}>
                {cat.nombre.toUpperCase()} <span>{catAbierta === cat.nombre ? ' −' : ' +'}</span>
              </div>
              
              <ul className={`sub-menu ${catAbierta === cat.nombre ? 'show' : ''}`}>
                <li onClick={() => { setCat(cat.nombre); setSubCat('Todos'); cerrar(); }}>
                  Ver todos
                </li>
                {cat.subcategorias.map((sub) => (
                  <li key={sub} onClick={() => { setCat(cat.nombre); setSubCat(sub); cerrar(); }}>
                    {sub}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}