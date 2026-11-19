import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Main from './views/HomeView.jsx';
import Charlas from './views/CharlasView.jsx';
import Login from './views/LoginView.jsx';
import Reserva from './views/ReservaView.jsx';
import { API_BASE_URL } from './api/config.js';

export default function App() {
	const [currentView, setCurrentView] = useState('home');
	const [charlaSeleccionada, setCharlaSeleccionada] = useState(null);
	const [cerrandoSesion, setCerrandoSesion] = useState(false);

	// Estado del usuario logueado (lee de localStorage al arrancar)
	const [usuario, setUsuario] = useState(() => {
		try {
			const guardado = localStorage.getItem('usuario');
			return guardado && guardado !== 'undefined' ? JSON.parse(guardado) : null;
		} catch {
			return null;
		}
	});

	// Se ejecuta cuando LoginView recibe un 200 OK de Laravel
	const handleLoginSuccess = (usuarioData, token) => {
		localStorage.setItem('token', token);
		localStorage.setItem('usuario', JSON.stringify(usuarioData));
		setUsuario(usuarioData);
		setCurrentView('charlas');
	};

	// Cerrar sesión
	const handleLogout = async () => {
		if (cerrandoSesion) return;

		setCerrandoSesion(true);

		const token = localStorage.getItem('token');
		if (token) {
			await fetch(`${API_BASE_URL}/logout`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Accept': 'application/json'
				}
			}).catch(() => { });
		}

		localStorage.removeItem('token');
		localStorage.removeItem('usuario');
		setUsuario(null);
		setCurrentView('home');
		setCerrandoSesion(false);
	};

	const renderView = () => {
		switch (currentView) {
			case 'home':
				return <Main onNavigate={setCurrentView} usuario={usuario} />;
			case 'charlas':
				return (
					<Charlas
						onNavigate={setCurrentView}
						usuario={usuario}
						soloMisCharlas={false}
						onSelectCharla={(charlaRecibida) => {
							setCharlaSeleccionada(charlaRecibida);
							setCurrentView('reserva');
						}}
					/>
				);
			case 'mis-charlas':
				return (
					<Charlas
						onNavigate={setCurrentView}
						usuario={usuario}
						soloMisCharlas={true}
						onSelectCharla={(charlaRecibida) => {
							setCharlaSeleccionada(charlaRecibida);
							setCurrentView('reserva');
						}}
					/>
				);
			case 'sobre-nosotros':
				return <Home onNavigate={setCurrentView} usuario={usuario} />;
			case 'login':
				return <Login onLoginSuccess={handleLoginSuccess} onNavigate={setCurrentView} />;
			case 'registro':
				return <div style={{ padding: '40px' }}><h2>Crear cuenta</h2><p>Formulario de registro.</p></div>;
			case 'reserva':
				return (
					<Reserva
						onNavigate={setCurrentView}
						charla={charlaSeleccionada}
						usuario={usuario}
					/>
				);
			default:
				return <Main onNavigate={setCurrentView} />;
		}
	};

	return (
		<div className='app-layout' style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Navbar
				currentView={currentView}
				onNavigate={setCurrentView}
				usuario={usuario}
				onLogout={handleLogout}
				cerrandoSesion={cerrandoSesion}
			/>

			<main className='app-main' style={{ flex: 1 }}>
				{renderView()}
			</main>

			<Footer />
		</div>
	);
}