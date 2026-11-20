import { useState } from 'react';
import logo from '../assets/logoSabitechFINAL.png';

export default function Navbar({ currentView, onNavigate, usuario, onLogout, cerrandoSesion }) {
    // Solo se usa en pantallas estrechas (menú hamburguesa)
    const [menuAbierto, setMenuAbierto] = useState(false);

    // Navegar y cerrar el menú desplegable
    const ir = (vista) => {
        setMenuAbierto(false);
        onNavigate(vista);
    };

    // Función inteligente para manejar el click de "Sobre nosotros"
    const handleSobreNosotrosClick = () => {
        setMenuAbierto(false);
        if (currentView !== 'home') {
            onNavigate('home');
            setTimeout(() => {
                document.getElementById('sobre-nosotros-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById('sobre-nosotros-section')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const claseLink = (vista) => `sbt-nav-link${currentView === vista ? ' is-active' : ''}`;

    return (
        <header className='sbt-header'>
            <div className='sbt-header__inner'>
                {/* Logo (izquierda) */}
                <button onClick={() => ir('home')} className='sbt-logo-btn' aria-label='Ir al inicio'>
                    <img src={logo} alt='Sabitech Logo' className='sbt-logo' />
                </button>

                {/* Botón hamburguesa (solo visible en pantallas estrechas) */}
                <button
                    className='sbt-menu-toggle'
                    onClick={() => setMenuAbierto((abierto) => !abierto)}
                    aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={menuAbierto}
                    aria-controls='sbt-panel'
                >
                    <span className='sbt-menu-toggle__bar' />
                    <span className='sbt-menu-toggle__bar' />
                    <span className='sbt-menu-toggle__bar' />
                </button>

                {/* Panel: en escritorio es la barra normal, en móvil es el menú desplegable */}
                <div id='sbt-panel' className={`sbt-panel${menuAbierto ? ' is-open' : ''}`}>
                    {/* Enlaces de navegación (centro) */}
                    <nav className='sbt-nav'>
                        <button onClick={() => ir('home')} className={claseLink('home')}>
                            Inicio
                        </button>
                        <button onClick={() => ir('charlas')} className={claseLink('charlas')}>
                            Charlas
                        </button>

                        {usuario && (
                            <button onClick={() => ir('mis-charlas')} className={claseLink('mis-charlas')}>
                                Mis charlas
                            </button>
                        )}

                        <button onClick={handleSobreNosotrosClick} className='sbt-nav-link'>
                            Sobre nosotros
                        </button>
                    </nav>

                    {/* Zona de usuario / Acciones (derecha) */}
                    <div className='sbt-actions'>
                        {usuario ? (
                            <div className='sbt-user'>
                                <span className='sbt-user__name'>
                                    Hola, {usuario.nombre}
                                </span>
                                <button
                                    onClick={() => { setMenuAbierto(false); onLogout(); }}
                                    disabled={cerrandoSesion}
                                    className='btn btn--outline-light'
                                    style={{ cursor: cerrandoSesion ? 'not-allowed' : 'pointer', opacity: cerrandoSesion ? 0.7 : 1 }}
                                >
                                    {cerrandoSesion ? 'Cerrando sesión...' : 'Cerrar sesión'}
                                </button>
                            </div>
                        ) : (
                            <div className='sbt-auth'>
                                <button onClick={() => ir('login')} className='sbt-btn-outline'>
                                    Acceder
                                </button>
                                <button onClick={() => ir('registro')} className='sbt-btn-solid'>
                                    Crear cuenta
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
