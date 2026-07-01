import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {


    return (
        <header>
            <h1>TechStore</h1>
            <nav>
                <ul id="Menu">
                    <li><Link to="../">Catálogo</Link></li>
                    <li><Link to="../login">Iniciar sesión</Link></li>
                    <li><Link to="../registro">Registrarse</Link></li>
                    <li><Link to="../crear-producto">Crear Producto</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Login;