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
   const estaReservada = (idCharla) => {
        return misReservas.some((reserva) => {
            const idReservado = reserva.id_charla ?? reserva.charla?.id;
            return Number(idReservado) === Number(idCharla);
        });
    };

    if (cargando) return <p style={{ padding: '40px' }}>Cargando charlas...</p>;
    if (error) return <p style={{ padding: '40px' }}>Error: {error}</p>;

    // Si estamos en la pestaña "Mis charlas", filtramos solo las charlas que el usuario tiene reservadas
    const charlasAMostrar = soloMisCharlas
        ? charlas.filter((c) => estaReservada(c.id))
        : charlas;

    return (
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <h1>{soloMisCharlas ? 'Mis charlas reservadas' : 'Charlas'}</h1>

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
                                    {reservada ? (
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