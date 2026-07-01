import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'http://localhost:8080/productos';

function CrearProducto() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setExito('');

    const formData = new FormData(e.target);
    const datos = Object.fromEntries(formData);

    // Validaciones básicas antes de enviar
    if (!datos.nombre || !datos.marca || !datos.precio || !datos.stock || !datos.imagen) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const productoNuevo = {
      nombre: datos.nombre,
      marca: datos.marca,
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      imagen: datos.imagen,
      categoria: datos.categoria || 'notebook' // por defecto si no elige
    };

    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoNuevo),
      });

      if (!respuesta.ok) throw new Error('No se pudo guardar el producto en el servidor.');

      setExito('¡Producto creado con éxito!');
      e.target.reset();
      
      // Espera 1.5 segundos para mostrar el mensaje de éxito y vuelve al catálogo
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err) {
      setError(err.message || 'Hubo un problema al conectar con la API.');
    }
  }

  return (
    <main>
      <section style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
        <h2>Agregar Nuevo Producto</h2>
        <h3><Link to="/">Volver al catálogo</Link></h3>

        <form className = "Registro" onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="nombre">Nombre del Producto *</label>
            <input type="text" id="nombre" name="nombre" placeholder="Ej. MacBook Air M3" required />
          </div>

          <div className="campo">
            <label htmlFor="marca">Marca *</label>
            <input type="text" id="marca" name="marca" placeholder="Ej. Apple" required />
          </div>

          <div className="campo">
            <label htmlFor="categoria">Categoría *</label>
            <select id="categoria" name="categoria" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <option value="notebook">Notebook</option>
              <option value="pc_escritorio">PC de Escritorio</option>
              <option value="componente">Componente</option>
              <option value="celular">Celular</option>
              <option value="consola">Consola</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="precio">Precio ($) *</label>
            <input type="number" id="precio" name="precio" placeholder="Ej. 1500000" min="1" required />
          </div>

          <div className="campo">
            <label htmlFor="stock">Stock Inicial *</label>
            <input type="number" id="stock" name="stock" placeholder="Ej. 5" min="0" required />
          </div>

          <div className="campo">
            <label htmlFor="imagen">URL de la Imagen *</label>
            <input type="url" id="imagen" name="imagen" placeholder="https://images.unsplash.com/..." required />
          </div>

          {error && <p className="error" style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
          {exito && <p className="exito" style={{ color: 'green', fontWeight: 'bold' }}>{exito}</p>}

          <button type="submit" style={{ marginTop: '10px', cursor: 'pointer' }}>
            Guardar Producto
          </button>
        </form>
      </section>
    </main>
  );
}

export default CrearProducto;