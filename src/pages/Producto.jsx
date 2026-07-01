import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8080';

function Producto() {
  const { id }      = useParams();   // lee el :id de la URL /producto/3
  const navigate    = useNavigate();
  const [producto,  setProducto]  = useState(null);
  const [cargando,  setCargando]  = useState(true);
  const [error,     setError]     = useState(null);

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch(`${API_URL}/productos/${id}`);

        if (res.status === 404) { setError('Producto no encontrado.'); return; }
       
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setProducto(data);

        document.title = `TechStore — ${data.nombre}`;


      } catch (e) {
        setError('⚠️ No se pudo cargar el producto.');
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, [id]);

  if (cargando) return <main><p>Cargando...</p></main>;
  if (error)    return <main><p className="error">{error}</p></main>;

  return (
    <main>
      <section>
        <button className="btn-volver" onClick={() => navigate(-1)}>
          ← Volver al catálogo
        </button>

        <div id="detalle">
          <img
            className="detalle-imagen"
            src={producto.imagen}
            alt={producto.nombre}
          />
          <div className="detalle-info">
            <span className="detalle-categoria">{producto.categoria}</span>
            <h2>{producto.nombre}</h2>
            <p className="detalle-marca">{producto.marca}</p>
            <p className="detalle-ficha">{producto.nombre} — {producto.marca}</p>
            <p className="detalle-precio">
              ${producto.precio.toLocaleString('es-AR')}
            </p>
            <p className="detalle-stock">
              {producto.stock > 0
                ? `✓ ${producto.stock} unidades disponibles`
                : '✗ Sin stock'}
            </p>
            <button
              className="btn-agregar-detalle"
              disabled={!producto.stock}
            >
              {producto.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Producto;