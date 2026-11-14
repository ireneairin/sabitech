import { useEffect, useState } from 'react';
import { list } from '../api/charlaApi.js';

function recortarHora(hora) {
    return hora ? hora.slice(0, 5) : '';
}

export function CharlasView() {
    // Tres estados: los datos, si estamos cargando y si hubo error
    const [charlas, setCharlas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // useEffect con [] = se ejecuta UNA vez, cuando el componente aparece en pantalla
    useEffect(() => {
        let cancelado = false; // evita actualizar estado si el componente no se creó

        async function cargarCharlas() {
            try {
                const datos = await list(); // llama a la API
                if (!cancelado) setCharlas(datos);
                // si cancelado es true no se llama a setCharlas, los datos llegan y se descartan
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

    if (cargando) return <p>Cargando charlas...</p>;
    if (error) return <p>Error: {error}</p>;
    if (charlas.length === 0) return <p>No hay charlas todavía.</p>;

    return (
        <section>
            <h1>Charlas</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {charlas.map((charla) => (
                    <li key={charla.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, margin: '12px 0', textAlign: 'left' }}>
                        <h2 style={{ margin: 0 }}>{charla.nombre}</h2>
                        <p><strong>{charla.categoria}</strong> · {charla.ponente}</p>
                        <p>{charla.descripcion}</p>
                        <p>
                            📅 {charla.fecha} · 🕒 {recortarHora(charla.hora_inicio)} - {recortarHora(charla.hora_fin)}
                            {charla.sala ? <> · 📍 {charla.sala.nombre} </> : null}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
