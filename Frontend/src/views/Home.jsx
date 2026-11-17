export default function Home({ onNavigate }) {
	return (
		<div style={{ padding: '60px 40px', textAlign: 'center' }}>
			<h1>Innovación y Tecnología con Sabitech</h1>
			<p>Bienvenido a nuestro prototipo profesional.</p>
			<button 
				onClick={() => onNavigate('charlas')}
				style={{ marginTop: '20px', padding: '12px 24px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
			>
				Ver Charlas
			</button>
		</div>
	);
}