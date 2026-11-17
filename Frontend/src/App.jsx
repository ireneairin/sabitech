import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './views/Home.jsx';
import Charlas from './views/CharlasView.jsx';
import Login from './views/LoginView.jsx';
import Reserva from './views/ReservaView.jsx'; // Pantalla temporal confirmación reserva charla

export default function App() {
	// Estado para saber qué vista está abierta ('home', 'charlas', 'sobre-nosotros', 'login', 'registro')
	const [currentView, setCurrentView] = useState('home');

	// Estado para pasar la charla seleccionada en caso de reserva, más información, etc.
	const [charlaSeleccionada, setCharlaSeleccionada] = useState(null);

	// Función para renderizar la vista correspondiente
	const renderView = () => {
		switch (currentView) {
			case 'home':
				return <Home onNavigate={setCurrentView} />; //prop
			case 'charlas':
				return (<Charlas onNavigate={setCurrentView} 
				onSelectCharla={(charlaRecibida) => {console.log("charla seleccionada", charlaRecibida); setCharlaSeleccionada(charlaRecibida); setCurrentView('reserva')}} />);
			case 'sobre-nosotros': // Futura redirección a una sección dentro de MainView
				return <div style={{ padding: '40px' }}><h2>Sobre nosotros</h2><p>Información corporativa de Sabitech.</p></div>;
			case 'login':
				return <Login />;
			case 'registro':
				return <div style={{ padding: '40px' }}><h2>Crear cuenta</h2><p>Formulario de registro.</p></div>;
			case 'reserva':  // Pantalla temporal reservas
				return (<Reserva onNavigate={setCurrentView} charla={charlaSeleccionada} />);
			default:
				return <Home onNavigate={setCurrentView} />;
		}
	};

	return (
		<div className='app-layout' style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
			{/* Barra de navegación superior */}
			<Navbar currentView={currentView} onNavigate={setCurrentView} />

			{/* Contenido principal (siempre fondo blanco) */}
			<main className='app-main'>
				{renderView()}
			</main>
		</div>
	);
}