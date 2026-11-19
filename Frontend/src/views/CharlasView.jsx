import { useEffect, useState } from 'react';
import { list } from '../api/charlaApi.js';
import { API_BASE_URL } from '../api/config.js';

function recortarHora(hora) {
    return hora ? hora.slice(0, 5) : '';
}

function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

function cambioEstiloCategoria(categoria) {
    switch (categoria) {
        case 'Salud':
            return {
                backgroundColor: '#ecfdf5',
                color: '#047857',
            };
        case 'Business':
            return {
                backgroundColor: '#fef3c7',
                color: '#b45309',
            };
        case 'Tech':
            return {
                backgroundColor: '#eff6ff',
                color: '#2563eb',
            };
        default:
            return {
                backgroundColor: '#f1f5f9',
                color: '#475569',
            };
    }
}

export default function CharlasView({ onNavigate, onSelectCharla, usuario, soloMisCharlas = false }) {
    const [charlas, setCharlas] = useState([]);
    const [misReservas, setMisReservas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Estados botón cancelar reserva
    const [cancelandoId, setCancelandoId] = useState(null);
    const [errorCancelar, setErrorCancelar] = useState('');

    // Cargar todas las charlas
    useEffect(() => {
        let cancelado = false;
        async function cargarCharlas() {
            try {
                const datos = await list();
                if (!cancelado) setCharlas(datos);
            } catch (e) {
                if (!cancelado) setError(e.message || 'No se pudo conectar con el servidor');
            } finally {
                if (!cancelado) setCargando(false);
            }
        }
        cargarCharlas();
        return () => { cancelado = true; };
    }, []);

    // Cargar reservas del usuario desde Laravel ( /api/mis-reservas)
    useEffect(() => {
        if (!usuario) {
            setMisReservas([]);
            return;
        }
        const token = localStorage.getItem('token');
        fetch(`${API_BASE_URL}/mis-reservas`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        })
            .then((res) => (res.ok ? res.json() : Promise.reject()))
            .then((json) => setMisReservas(json.data || []))
            .catch(() => setMisReservas([]));
    }, [usuario, soloMisCharlas]);

    // Devuelve la reserva (con su id) de una charla, o undefined si no está reservada
    const reservaDeCharla = (idCharla) =>
        misReservas.find((r) => Number(r.id_charla ?? r.charla?.id) === Number(idCharla));

    const estaReservada = (idCharla) => Boolean(reservaDeCharla(idCharla));

    const cancelarReserva = async (idCharla) => {
        const reserva = reservaDeCharla(idCharla);
        if (!reserva) return;
        if (!window.confirm('¿Seguro que quieres cancelar tu reserva?')) return;

        setErrorCancelar('');
        setCancelandoId(idCharla);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${API_BASE_URL}/reservas/${reserva.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ estado: 'cancelada' }),
            });
            const json = await response.json();

            if (response.ok) {
                // Solo si el servidor confirma la quitamos de la pantalla
                setMisReservas((prev) => prev.filter((r) => r.id !== reserva.id));
            } else {
                setErrorCancelar(json.mensaje || 'No se pudo cancelar la reserva.');
            }
        } catch {
            setErrorCancelar('Error de conexión con el servidor.');
        } finally {
            setCancelandoId(null);
        }
    }

    if (cargando) return (
        <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 20px',
            color: '#64748b',
            fontSize: '1.1rem',
            fontWeight: '500'
        }}>
            Cargando ponencias...
        </div>
    );

    if (error) return (
        <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 20px',
            color: '#dc2626',
            fontWeight: '500'
        }}>
            Error: {error}
        </div>
    );

    // Si estamos en la pestaña "Mis charlas", filtramos solo las charlas que el usuario tiene reservadas
    const charlasAMostrar = soloMisCharlas
        ? charlas.filter((c) => estaReservada(c.id))
        : charlas;

    return (
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', textAlign: 'left' }}>
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 8px 0' }}>
                    {soloMisCharlas ? 'Mis charlas reservadas' : 'Catálogo de Charlas'}
                </h1>
                <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
                    {soloMisCharlas
                        ? 'Consulta las ponencias en las que has asegurado tu plaza o gestiona tus cancelaciones.'
                        : 'Explora todas las conferencias disponibles y asegura tu asistencia.'}
                </p>
            </div>

            {errorCancelar && (
                <div style={{ color: '#dc2626', backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontWeight: '500' }}>
                    {errorCancelar}
                </div>
            )}

            {charlasAMostrar.length === 0 ? (
                <div style={{ padding: '50px', textAlign: 'center', border: '2px dashed #e2e8f0', borderRadius: '16px', backgroundColor: '#f8fafc', marginTop: '20px' }}>
                    <p style={{ margin: '0 0 16px 0', color: '#475569', fontSize: '1.1rem' }}>
                        {soloMisCharlas
                            ? 'Todavía no has reservado ninguna charla en tu cuenta.'
                            : 'No hay charlas disponibles en este momento.'}
                    </p>
                    {soloMisCharlas && (
                        <button
                            onClick={() => onNavigate('charlas')}
                            style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
                        >
                            Ver todas las charlas
                        </button>
                    )}
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                    {charlasAMostrar.map((charla) => {
                        const reservada = estaReservada(charla.id);
                        const estaCancelando = cancelandoId === charla.id;
                        const estilosCategoria = cambioEstiloCategoria(charla.categoria);

                        return (
                            <div key={charla.id} style={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '14px',
                                padding: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
                                transition: 'transform 0.2s, box-shadow 0.2s'
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 12px 20px -5px rgba(0,0,0,0.06)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.02)';
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                        <span style={{
                                            fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', backgroundColor: estilosCategoria.backgroundColor, color: estilosCategoria.color, padding: '4px 10px', borderRadius: '6px', fontWeight: '700'
                                        }}>
                                            {charla.categoria}
                                        </span>
                                        {reservada && (
                                            <span style={{ fontSize: '0.75rem', backgroundColor: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '6px', fontWeight: '700' }}>
                                                Ya reservada
                                            </span>
                                        )}
                                    </div>

                                    <h3 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '0 0 10px 0', lineHeight: '1.4' }}>{charla.nombre}</h3>
                                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '14px' }}>
                                        <strong>Ponente:</strong> {charla.ponente}
                                    </p>
                                    <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                                        {charla.descripcion}
                                    </p>
                                </div>

                                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginTop: '10px' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <span><strong>Día:</strong> {formatearFecha(charla.fecha)} · <strong>Hora:</strong> {recortarHora(charla.hora_inicio)} - {recortarHora(charla.hora_fin)}</span>
                                        {charla.sala && <span><strong>Sala:</strong> {charla.sala.nombre}</span>}
                                    </div>

                                    <div>
                                        {reservada ? (
                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                <span style={{
                                                    flex: 1,
                                                    textAlign: 'center',
                                                    padding: '10px',
                                                    backgroundColor: '#f0fdf4',
                                                    color: '#166534',
                                                    borderRadius: '8px',
                                                    fontWeight: '600',
                                                    fontSize: '0.9rem',
                                                    border: '1px solid #bbf7d0'
                                                }}>
                                                    Plaza asegurada
                                                </span>
                                                <button
                                                    onClick={() => cancelarReserva(charla.id)}
                                                    disabled={estaCancelando}
                                                    style={{
                                                        padding: '10px 16px',
                                                        background: '#fff',
                                                        color: '#dc2626',
                                                        border: '1px solid #fecaca',
                                                        borderRadius: '8px',
                                                        cursor: estaCancelando ? 'not-allowed' : 'pointer',
                                                        fontWeight: 600,
                                                        fontSize: '0.9rem',
                                                        transition: 'background 0.2s'
                                                    }}
                                                    onMouseOver={(e) => { if (!estaCancelando) e.currentTarget.style.backgroundColor = '#fef2f2'; }}
                                                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fff'; }}
                                                >
                                                    {estaCancelando ? 'Cancelando...' : 'Cancelar reserva'}
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => onSelectCharla(charla)}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px 16px',
                                                    backgroundColor: '#2563eb',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    fontWeight: '600',
                                                    fontSize: '0.95rem',
                                                    transition: 'background 0.2s'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                                            >
                                                Reservar plaza
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}