import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [error,  setError]  = useState('');

  // Si ya hay sesión, redirigir al catálogo
  if (localStorage.getItem('usuario')) {
    navigate('/');
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const datos = Object.fromEntries(new FormData(e.target));

    if (!datos.email.trim()) { setError('El email es obligatorio.'); return; }
    if (!datos.password)     { setError('La contraseña es obligatoria.'); return; }

    // Guardar usuario en localStorage
    localStorage.setItem('usuario', JSON.stringify({ email: datos.email }));

    // Redirigir al catálogo y recargar para que el Header se actualice
    navigate('/');
    window.location.reload();
  }

  return (
    <main>
      <section>
        <h2>Iniciar sesión</h2>
        <h3><Link to="/">Volver al catálogo</Link></h3>

        <form className = "Registro" onSubmit={handleSubmit}>
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

          {error && <p className="error">{error}</p>}

          <button type="submit">Iniciar sesión</button>
        </form>

        <p className="link-pie">
          ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;