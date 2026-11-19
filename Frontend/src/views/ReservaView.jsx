import { useState } from 'react';
import { API_BASE_URL } from '../api/config.js';

function recortarHora(hora) {
    return hora ? hora.slice(0, 5) : '';
}

export default function ReservaView({ onNavigate, charla, usuario }) {
    const [reservada, setReservada] = useState(false);
    const [datosReserva, setDatosReserva] = useState(null);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleConfirmarReserva = async () => {
        setError('');
        setCargando(true);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${API_BASE_URL}/reservas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ id_charla: charla.id }),
            });

            const json = await response.json();

            if (response.ok) {
                setReservada(true);
                setDatosReserva(json.data); // Aquí viene la reserva guardada en BD con su código QR
            } else {
                setError(json.mensaje || 'No se pudo realizar la reserva');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        } finally {
            setCargando(false);
        }
    };

    return (
        <section style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            <button onClick={() => onNavigate('charlas')} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '9999px', cursor: 'pointer', fontWeight: '600', fontSize: '0.95rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '24px', transition: 'background-color 0.2s ease'
            }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
            >Volver atrás</button>

            <div style={{ border: '1px solid #eaeaea', borderRadius: '12px', padding: '30px', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                {charla ? (
                    <>
                        <h1 style={{ margin: '0 0 12px 0', fontSize: '1.75rem', color: '#0f172a' }}>{charla.nombre}</h1>
                        <p style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: '16px' }}>
                            <strong>Categoría:</strong> {charla.categoria} · <strong>Ponente:</strong> {charla.ponente}
                        </p>
                        <p style={{ margin: '0 0 16px 0', color: '#334155', lineHeight: '1.5' }}>
                            <strong>Descripción:</strong> {charla.descripcion}
                        </p>
                        <p style={{ margin: '0 0 24px 0', fontSize: '0.95rem', color: '#475569' }}>
                            <strong>Fecha:</strong> {charla.fecha} · <strong>Hora:</strong> {recortarHora(charla.hora_inicio)} - {recortarHora(charla.hora_fin)}
                            {charla.sala ? <> · <strong>Sala:</strong> {charla.sala.nombre} </> : null} 
                        </p>

                        {/* Si NO ha iniciado sesión */}
                        {!usuario ? (
                            <div style={{ background: '#fff8e1', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                                <h3 style={{ margin: '0 0 8px 0', color: '#92400e' }}>Inicia sesión para reservar</h3>
                                <p style={{ margin: '0 0 16px 0', color: '#78350f' }}>Debes estar dentro de tu cuenta para registrar tu plaza en esta charla.</p>
                                <button
                                    onClick={() => onNavigate('login')}
                                    className="btn btn--primary-solid"
                                    style={{ padding: '10px 20px', cursor: 'pointer' }}
                                >
                                    Ir a Iniciar Sesión
                                </button>
                            </div>
                        ) : reservada ? (
                            /* Cuando YA se ha guardado la reserva en la BD */
                            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #1a73e8' }}>
                                <h3 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Reserva confirmada correctamente</h3>
                                <p style={{ margin: '0 0 8px 0', color: '#475569' }}>
                                    Tu plaza ha quedado registrada con éxito en la base de datos, <strong>{usuario.nombre}</strong>.
                                </p>
                                {datosReserva?.qr && (
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                                        <strong>Código de entrada:</strong> {datosReserva.qr}
                                    </p>
                                )}
                            </div>
                        ) : (
                            /* Usuario logueado listo para confirmar */
                            <div>
                                {error && (
                                    <p style={{ color: '#d32f2f', backgroundColor: '#fdecea', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                                        {error}
                                    </p>
                                )}
                                <button
                                    onClick={handleConfirmarReserva}
                                    disabled={cargando}
                                    className="btn btn--primary-solid"
                                    style={{ padding: '12px 24px', fontSize: '1rem', cursor: cargando ? 'not-allowed' : 'pointer' }}
                                >
                                    {cargando ? 'Guardando reserva...' : 'Confirmar reserva de plaza'}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p>No se ha seleccionado ninguna charla.</p>
                )}
            </div>
        </section>
    );
}