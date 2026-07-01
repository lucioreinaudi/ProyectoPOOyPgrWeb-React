import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Registro() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setExito('');

    // Capturamos los datos del formulario de manera limpia
    const formData = new FormData(e.target);
    const datos = Object.fromEntries(formData);

    // Validación básica inicial (puedes cambiarla o mejorarla después)
    if (!datos.Nombre || !datos.Apellido || !datos.email || !datos.password) {
      setError('Todos los campos marcados con * son obligatorios.');
      return;
    }

    // Simulamos que el registro fue exitoso
    console.log('Datos listos para enviar al backend:', {
      nombre: datos.Nombre,
      apellido: datos.Apellido,
      email: datos.email,
      password: datos.password
    });

    setExito('¡Registro completado con éxito!');
    e.target.reset();

    // Después de 2 segundos, lo mandamos al login automáticamente
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }

  return (
    <main>
      <section style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <h2>Registrarse</h2>

        <h3>
          <Link to="/">Volver al inicio</Link>
        </h3>

        <form className="Registro" onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="Nombre">Nombre *</label>
            <input
              type="text"
              id="Nombre"
              name="Nombre"
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="Apellido">Apellido *</label>
            <input
              type="text"
              id="Apellido"
              name="Apellido"
              placeholder="Tu apellido"
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="password">Contraseña *</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu contraseña"
              required
            />
          </div>

          {/* Mensajes de feedback */}
          {error && <p className="error" style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
          {exito && <p className="exito" style={{ color: 'green', fontWeight: 'bold' }}>{exito}</p>}

          <button type="submit" style={{ marginTop: '10px', cursor: 'pointer' }}>
            Registrarse
          </button>
        </form>

        <p className="link-pie" style={{ marginTop: '15px' }}>
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión acá</Link>
        </p>
      </section>
    </main>
  );
}

export default Registro;