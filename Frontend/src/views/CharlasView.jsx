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

export default function CharlasView({ onNavigate, onSelectCharla, usuario, soloMisCharlas = false }) {
    const [charlas, setCharlas] = useState([]);
    const [misReservas, setMisReservas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    // Estados botón cancelar reserva
    const [cancelandoId, setCancelandoId] = useState(null);
    const [errorCancelar, setErrorCancelar] = useState('');

    // 1. Cargar todas las charlas
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
        return () => {
            cancelado = true;
        };
    }, []);

    // 2. Cargar reservas del usuario desde Laravel (/api/mis-reservas)
    useEffect(() => {
        if (!usuario) {
            setMisReservas([]);
            return;
        }
        // Recuperas el token que guardaste al hacer login (ej: en localStorage)
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

    // Comprobar si una charla concreta ya está reservada por el usuario
    /*const estaReservada = (idCharla) => {
        return misReservas.some((reserva) => {
            const idReservado = reserva.id_charla ?? reserva.charla?.id;
            return Number(idReservado) === Number(idCharla);
        });
    };*/

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


    if (cargando) return <p style={{ padding: '40px' }}>Cargando charlas...</p>;
    if (error) return <p style={{ padding: '40px' }}>Error: {error}</p>;

    // Si estamos en la pestaña "Mis charlas", filtramos solo las charlas que el usuario tiene reservadas
    const charlasAMostrar = soloMisCharlas
        ? charlas.filter((c) => estaReservada(c.id))
        : charlas;

    return (
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <h1>{soloMisCharlas ? 'Mis charlas reservadas' : 'Charlas'}</h1>
            
            {errorCancelar && (
                <p style={{ color: '#d32f2f', backgroundColor: '#fdecea', padding: '10px', borderRadius: '6px' }}>
                    {errorCancelar}
                </p>
            )}

            {charlasAMostrar.length === 0 ? (
                <div style={{ padding: '30px', border: '1px solid #eaeaea', borderRadius: '10px', marginTop: '20px' }}>
                    <p style={{ margin: '0 0 16px 0', color: '#475569' }}>
                        {soloMisCharlas
                            ? 'Todavía no has reservado ninguna charla.'
                            : 'No hay charlas todavía.'}
                    </p>
                    {soloMisCharlas && (
                        <button
                            onClick={() => onNavigate('charlas')}
                            className="btn btn--primary-solid"
                            style={{ padding: '10px 20px', cursor: 'pointer' }}
                        >
                            Ver todas las charlas
                        </button>
                    )}
                </div>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {charlasAMostrar.map((charla) => {
                        const reservada = estaReservada(charla.id);

                        return (
                            <li key={charla.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, margin: '12px 0', textAlign: 'left' }}>
                                <h2 style={{ margin: 0 }}>{charla.nombre}</h2>
                                <p>Categoría: {charla.categoria} · Ponente: {charla.ponente}</p>
                                <p>Descripción: {charla.descripcion}</p>
                                <p>
                                    Fecha: {formatearFecha(charla.fecha)} · Hora: {recortarHora(charla.hora_inicio)} - {recortarHora(charla.hora_fin)}
                                    {charla.sala ? <> · 📍 {charla.sala.nombre} </> : null}
                                </p>
                                <p>
                                    {/* {reservada ? (
                                        <span style={{ display: 'inline-block', padding: '8px 16px', background: '#dcfce7', color: '#166534', borderRadius: '6px', fontWeight: 600 }}>
                                            ✅ Ya reservada
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => onSelectCharla(charla)}
                                            style={{ padding: '8px 16px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                                        >
                                            Reserva
                                        </button>
                                    )} */}
                                    {reservada ? (
                                        <>
                                            <span style={{ display: 'inline-block', padding: '8px 16px', background: '#dcfce7', color: '#166534', borderRadius: '6px', fontWeight: 600 }}>
                                                Ya reservada
                                            </span>
                                            <button
                                                onClick={() => cancelarReserva(charla.id)}
                                                disabled={cancelandoId === charla.id}
                                                style={{ marginLeft: 12, padding: '8px 16px', background: '#fff', color: '#b91c1c', border: '1px solid #b91c1c', borderRadius: '6px', cursor: cancelandoId === charla.id ? 'not-allowed' : 'pointer', fontWeight: 600 }}
                                            >
                                                {cancelandoId === charla.id ? 'Cancelando...' : 'Cancelar reserva'}
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => onSelectCharla(charla)}
                                            style={{ padding: '8px 16px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                                        >
                                            Reserva
                                        </button>
                                    )}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}