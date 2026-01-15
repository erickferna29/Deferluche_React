import { useState, useEffect } from 'react'
import { TarjetaPeluche } from './components/TarjetaPeluche'
import { Slider } from './components/Slider'
import { MenuLateral } from './components/MenuLateral'
import { AvisoCarrito } from './components/AvisoCarrito'
import './styles/StyleModerno.css'

function App() {
  // 1. Estado para guardar los peluches que vienen de MySQL
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState(""); // Estado para el texto del buscador
  const [cargando, setCargando] = useState(true);
  const [orden, setOrden] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [subCatAbierta, setSubCatAbierta] = useState(false);
  const [categoriaSel, setCategoriaSel] = useState("Todos"); // Estado para filtrar categorías
  const [subCategoriaSel, setSubCategoriaSel] = useState("Todos");
  const [carrito, setCarrito] = useState([]); // Para que el icono ya tenga vida
  //estados para mostrar productos agregados
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [ultimoAgregado, setUltimoAgregado] = useState(null);
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

  //buscar productos
  const productosFiltrados = productos.filter(p => 
    p.Nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  //mejora Filtra por búsqueda Y por categoría seleccionada
// Filtra por búsqueda, por categoría y subcategoria seleccionada
const productosFinales = productos
  .filter(p => {
    const cumpleNombre = p.Nombre.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleCat = categoriaSel === "Todos" || p.Categoria === categoriaSel;
    const cumpleSubCat = subCategoriaSel === "Todos" || p.Sub_Categoria === subCategoriaSel;

    return cumpleNombre && cumpleCat && cumpleSubCat;
  })
  // AQUÍ ESTABA EL FALTANTE: El bloque .sort()
  .sort((a, b) => {
    if (orden === "precio-menor") return Number(a.Precio) - Number(b.Precio);
    if (orden === "precio-mayor") return Number(b.Precio) - Number(a.Precio);
    if (orden === "nombre-az") return a.Nombre.localeCompare(b.Nombre);
    if (orden === "nombre-za") return b.Nombre.localeCompare(a.Nombre);
    return 0; // Sin orden si no hay selección
  });

//Funcion del carrito
const agregarAlCarrito = (producto) => {
  setCarrito((prev) => {
    const existe = prev.find((item) => item.id === producto.id);
    if (existe) {
      return prev.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
    }
    return [...prev, { ...producto, cantidad: 1 }];
  });

  // CONFIGURAMOS EL AVISO PRO
  setUltimoAgregado(producto);
  setMostrarAviso(true);

  // Se quita solo después de 3 segundos
  setTimeout(() => {
    setMostrarAviso(false);
  }, 5000);
};
    
  return (
    <div className="main-layout">
      {/* 1. EL MENÚ LATERAL (DRAWER) */}
<MenuLateral 
  abierto={menuAbierto} 
  cerrar={() => setMenuAbierto(false)}
  setCat={setCategoriaSel}
  setSubCat={setSubCategoriaSel} 
/>
      <header className="navbar-pro">
      {/* SECCIÓN IZQUIERDA: MENÚ + LOGO */}
        <div className="navbar-left">
          {/* AQUÍ ESTÁ EL TRUCO: El onClick para abrirlo */}
          <button onClick={() => setMenuAbierto(true)} className="icon-btn menu-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <h1 className="logo-text" onClick={() => setCategoriaSel("Todos")}>DEFERLUCHE</h1>
        </div>

        {/* SECCIÓN CENTRAL: BUSCADOR (Sigue siendo el corazón) */}
        <div className="navbar-center">
          <div className="search-bar-container">
            <input 
              type="text" 
              placeholder="Buscar" 
              className="search-input-pro"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          {busqueda === "" && (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`search-icon ${busqueda !== "" ? 'icono-oculto' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          )}
          </div>
        </div>

        {/* SECCIÓN DERECHA: USUARIO Y CARRITO */}
        <div className="navbar-right">
          {/* EL MONITO (USUARIO) */}
          <button className="icon-btn user-btn" title="Iniciar Sesión">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </button>

          {/* EL CARRITO */}
          <a href="#" className="cart-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" className="cart-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {carrito.length > 0 && (
              <span className="cart-badge">{carrito.reduce((acc, p) => acc + p.cantidad, 0)}</span>
            )}
          </a>
        </div>
    </header>
    
        <main>
        <Slider></Slider>
        
        <div className="toolbar">
          <h2 className="section-title">Productos</h2>
          
          <div className="sort-container">
            <label>Ordenar Por:</label>
            <select 
              className="sort-select" 
              value={orden} 
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="">Seleccionar:</option>
              <option value="precio-menor">Precio: Menor a mayor</option>
              <option value="precio-mayor">Precio: Mayor a menor</option>
              <option value="nombre-az">Nombre: A-Z</option>
              <option value="nombre-za">Nombre: Z-A</option>
            </select>
          </div>
        </div>

        <div className="product-grid">
          {productosFinales.map(peluche => (
            <TarjetaPeluche 
              key={peluche.id}
              producto={peluche} 
              //con esto pasamos la tarjeta al carrito
              agregar={agregarAlCarrito} 
              />
          ))}
        </div>
      </main>
      <AvisoCarrito 
      visible={mostrarAviso} 
      producto={ultimoAgregado} 
    />
    </div>
  );
}

export default App