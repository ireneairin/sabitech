import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './views/Home.jsx';
import Charlas from './views/Charlas.jsx';
import Login from './views/Login.jsx';

export default function App() {
	// Estado para saber qué vista está abierta ('home', 'charlas', 'sobre-nosotros', 'login', 'registro')
	const [currentView, setCurrentView] = useState('home');

	// Función para renderizar la vista correspondiente
	const renderView = () => {
		switch (currentView) {
			case 'home':
				return <Home onNavigate={setCurrentView} />;
			case 'charlas':
				return <Charlas />;
			case 'sobre-nosotros':
				return <div style={{ padding: '40px' }}><h2>Sobre nosotros</h2><p>Información corporativa de Sabitech.</p></div>;
			case 'login':
				return <Login />;
			case 'registro':
				return <div style={{ padding: '40px' }}><h2>Crear cuenta</h2><p>Formulario de registro.</p></div>;
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