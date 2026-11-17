export default function Home({ onNavigate }) {
	return (
		<div style={{ padding: '60px 40px', textAlign: 'center' }}>
			<h1>Jornadas Sabitech</h1>
			<p>Bienvenido a nuestras próximas jornadas Sabitech, realizadas en el centro XTART Valencia.</p>
			<button
				onClick={() => onNavigate('charlas')}
				style={{ marginTop: '20px', padding: '12px 24px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
			>
				Ver Charlas
			</button>
		</div>
	);
}