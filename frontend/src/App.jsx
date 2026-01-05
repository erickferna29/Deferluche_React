import { useState, useEffect } from 'react'
import { TarjetaPeluche } from './components/TarjetaPeluche'
import { Slider } from './components/Slider'
import './styles/StyleModerno.css'

function App() {
  // 1. Estado para guardar los peluches que vienen de MySQL
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState(""); // Estado para el texto del buscador
  const [cargando, setCargando] = useState(true);

  // 2. El "Vigilante" (useEffect) que pide los datos al cargar la página
  useEffect(() => {
    // La URL de tu API en el Apache de WSL
    fetch('/backend/obtenerProduct.php')
      .then(response => {
        if (!response.ok) throw new Error('Error en la red, checa tu Apache');
        return response.json(); // Convertimos la respuesta a JSON
      })
      .then(data => {
        setProductos(data); // Guardamos los peluches en el estado
        setCargando(false);
      })
      .catch(error => {
        console.error("Error...", error);
        setCargando(false);
      });
  }, []); // El [] vacío significa: "Solo corre esto una vez al iniciar"

  const productosFiltrados = productos.filter(p => 
    p.Nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
    <div className="main-layout">
    {/* LA NUEVA BARRA DE NAVEGACIÓN ESTILO PRO */}
    <header className="navbar-pro">
      
      {/* SECCIÓN IZQUIERDA: LOGO */}
      <div className="navbar-left">
        <h1 className="logo-text">DEFERLUCHE</h1>
      </div>

      {/* SECCIÓN CENTRAL: BUSCADOR */}
      <div className="navbar-center">
        <div className="search-bar-container">
          <input 
            type="text" 
            placeholder="Buscar peluche" 
            className="search-input-pro"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {/* Icono de lupa (se ve más chido) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* SECCIÓN DERECHA: ENLACES Y CARRITO */}
      <div className="navbar-right">
        <a href="#" className="nav-link">NOVEDADES</a>
        <a href="#" className="nav-link">CATEGORIAS</a>
        <a href="#" className="cart-icon-container">
          <svg xmlns="http://www.w3.org/2000/svg"className="cart-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {/* Aquí podrías poner un contador en el futuro */}
        </a>
      </div>
    </header>

        <main>
        <Slider />
        <div className="product-grid">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map(p => (
              <TarjetaPeluche key={p.id} producto={p} />
            ))
          ) : (
            <p className="no-results">Peluche No Encontrado...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App