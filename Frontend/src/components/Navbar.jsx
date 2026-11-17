import logo from '../assets/logoSabitechFINAL.png';

export default function Navbar({ currentView, onNavigate }) {
	return (
		<header className='navbar-sbt'>
			<div className='navbar-sbt__container'>
				{/* Logo y Marca */}
				<button 
					onClick={() => onNavigate('home')} 
					className='navbar-sbt__brand'
					style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
				>
					<img src={logo} alt='Sabitech Logo' className='navbar-sbt__logo-img' />
				</button>

				{/* Enlaces de navegación centrales */}
				<nav className='navbar-sbt__nav'>
					<button
						onClick={() => onNavigate('home')}
						className={`navbar-sbt__link ${currentView === 'home' ? 'is-active' : ''}`}
					>
						Inicio
					</button>
					<button
						onClick={() => onNavigate('charlas')}
						className={`navbar-sbt__link ${currentView === 'charlas' ? 'is-active' : ''}`}
					>
						Charlas
					</button>
					<button
						onClick={() => onNavigate('sobre-nosotros')}
						className={`navbar-sbt__link ${currentView === 'sobre-nosotros' ? 'is-active' : ''}`}
					>
						Sobre nosotros
					</button>
				</nav>

				{/* Botones de Acceso / Registro de la derecha */}
				<div className='navbar-sbt__actions'>
					<button 
						onClick={() => onNavigate('login')} 
						className='btn btn--outline-light'
					>
						Acceder
					</button>
					<button 
						onClick={() => onNavigate('registro')} 
						className='btn btn--primary-solid'
					>
						Crear cuenta
					</button>
				</div>
			</div>
		</header>
	);
}