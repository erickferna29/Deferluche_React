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
      <header className="header-moderno">
        <h1 className="p1">Deferluche</h1>

        <div className="search-container">
          <input 
            type="text" 
            placeholder="Buscar peluche" 
            className="search-input"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
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