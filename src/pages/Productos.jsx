import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'http://localhost:8080/';

function Productos() {
  const [listaProductos, setListaProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function obtenerProductos() {
      try {
        const respuesta = await fetch(`${API_URL}productos`);
        if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
        const datos = await respuesta.json();
        setListaProductos(datos);
      } catch (err) {
        console.error('Error al cargar productos:', err.message);
        setError('No se pudieron cargar los productos.');
      } finally {
        setCargando(false);
      }
    }
    obtenerProductos();
  }, []);

  if (cargando) return <main><p style={{ padding: '20px' }}>Cargando catálogo...</p></main>;
  if (error) return <main><p className="error" style={{ padding: '20px' }}>{error}</p></main>;

  return (
    <main>
      <div>
        <h2 style={{ margin: '10px' }}>Catálogo de productos</h2>
      </div>

      <section id="productos">
        {listaProductos.length === 0 ? (
          <p style={{ color: '#888', padding: '16px' }}>No se encontraron productos.</p>
        ) : (
          listaProductos.map((prod) => (
            <article className="tarjeta" key={prod.id}>
              <img src={prod.imagen} alt={prod.nombre} loading="lazy" />
              <div className="tarjeta-info">
                <h3>{prod.nombre}</h3>
                <p className="precio">${prod.precio.toLocaleString('es-AR')}</p>
                <p className="ficha">{prod.nombre} — {prod.marca}</p>
                
                <button disabled={prod.stock <= 0}>
                  {prod.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                </button>
                
                <button 
                  className="btn-detalle" 
                  onClick={() => navigate(`/producto/${prod.id}`)}
                  style={{ marginLeft: '10px' }}
                >
                  Ver detalle
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      <section id="ofertas">
        <h2>Ofertas y Novedades</h2>
        <ol>
          <li>Rebajas de temporada</li>
          <li>Productos usados</li>
          <li>Nuevos productos</li>
        </ol>
      </section>
    </main>
  );
}

export default Productos;