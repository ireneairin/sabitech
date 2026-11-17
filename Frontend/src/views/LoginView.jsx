//pantalla inicio sesión

export default function Login() {
	return (
		<div style={{ maxWidth: '400px', margin: '60px auto', padding: '30px', border: '1px solid #eaeaea', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
			<h2>Iniciar Sesión</h2>
			<form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
				<input type="email" placeholder="Correo electrónico" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
				<input type="password" placeholder="Contraseña" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
				<button type="submit" className="btn btn--primary-solid" style={{ padding: '10px', cursor: 'pointer' }}>Entrar</button>
			</form>
		</div>
	);
}