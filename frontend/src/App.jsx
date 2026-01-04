import { useState, useEffect } from 'react'
import { TarjetaPeluche } from './components/TarjetaPeluche'
import './styles/StyleModerno.css'

function App() {
  // 1. Estado para guardar los peluches que vienen de MySQL
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 2. El "Vigilante" (useEffect) que pide los datos al cargar la página
  useEffect(() => {
    // La URL de tu API en el Apache de WSL
    fetch('http://localhost/backend/obtenerProduct.php')
      .then(response => {
        if (!response.ok) throw new Error('Error en la red, checa tu Apache');
        return response.json(); // Convertimos la respuesta a JSON
      })
      .then(data => {
        setProductos(data); // Guardamos los peluches en el estado
        setCargando(false);
      })
      .catch(error => {
        console.error("¡Hubo un broncón!", error);
        setCargando(false);
      });
  }, []); // El [] vacío significa: "Solo corre esto una vez al iniciar"

  return (
    <div className="main-layout">
      <header className="header-moderno">
        <h1 className="p1">Deferluche</h1>
        <p className="p4">Catálogo de Peluches:</p>
      </header>

      <main>
  <div className="product-grid"> {/* El padre que tiene el display: grid */}
    {productos.map(peluche => (
      <TarjetaPeluche key={peluche.id} producto={peluche} />
    ))}
  </div>
  </main>
    </div>
  );
}

export default App