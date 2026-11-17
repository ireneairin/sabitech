import logo from '../assets/logoSabitechFINAL.png';

export default function Navbar({ currentView, onNavigate, usuario, onLogout }) {
	return (
		<header className='navbar-sbt'>
			<div className='navbar-sbt__container'>
				{/* Logo (izquierda) */}
				<button 
					onClick={() => onNavigate('home')} 
					className='navbar-sbt__brand'
					style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
				>
					<img src={logo} alt='Sabitech Logo' className='navbar-sbt__logo-img' />
				</button>

				{/* Enlaces de navegación (centro) */}
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

					{/* Botón visible SOLO cuando has iniciado sesión */}
					{usuario && (
						<button
							onClick={() => onNavigate('mis-charlas')}
							className={`navbar-sbt__link ${currentView === 'mis-charlas' ? 'is-active' : ''}`}
						>
							Mis charlas
						</button>
					)}

					<button
						onClick={() => onNavigate('sobre-nosotros')}
						className={`navbar-sbt__link ${currentView === 'sobre-nosotros' ? 'is-active' : ''}`}
					>
						Sobre nosotros
					</button>
				</nav>

				{/* Botones de acceso/registro o sesión iniciada (derecha) */}
				<div className='navbar-sbt__actions'>
					{usuario ? (
						<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
							<span style={{ fontWeight: '500' }}>
								Hola, {usuario.nombre}
							</span>
							<button 
								onClick={onLogout} 
								className='btn btn--outline-light'
							>
								Cerrar sesión
							</button>
						</div>
					) : (
						<>
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
						</>
					)}
				</div>
			</div>
		</header>
	);
}