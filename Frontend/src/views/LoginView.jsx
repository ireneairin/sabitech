import { useState } from 'react';
import { API_BASE_URL } from '../api/config.js';

// pantalla inicio sesión
export default function Login({ onLoginSuccess }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [cargando, setCargando] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setCargando(true);

		try {
			const response = await fetch(`${API_BASE_URL}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			const json = await response.json();

			if (response.ok) {
				// Llamamos a la función de App.jsx pasándole el usuario y el token
				onLoginSuccess(json.data, json.token);
			} else {
				// Mostramos el mensaje de error que devuelve Laravel ("Email o contraseña incorrectos")
				setError(json.mensaje || 'Error al iniciar sesión');
			}
		} catch (err) {
			setError('No se pudo conectar con el servidor');
		} finally {
			setCargando(false);
		}
	};

	return (
		<div className='login-card'>
			<h2>Iniciar Sesión</h2>

			{error && (
				<p style={{ color: '#d32f2f', backgroundColor: '#fdecea', padding: '10px', borderRadius: '6px', marginTop: '15px', fontSize: '14px' }}>
					{error}
				</p>
			)}

			<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
				<input
					type="email"
					placeholder="Correo electrónico"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
				/>
				<input
					type="password"
					placeholder="Contraseña"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
				/>
				<button
					type="submit"
					disabled={cargando}
					className="btn btn--primary-solid"
					style={{ padding: '10px', cursor: cargando ? 'not-allowed' : 'pointer' }}
				>
					{cargando ? 'Entrando...' : 'Entrar'}
				</button>
			</form>
		</div>
	);
}