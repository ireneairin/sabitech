function recortarHora(hora) {
    return hora ? hora.slice(0, 5) : '';
}
export default function ReservaView({ onNavigate, charla }) {

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
                            📅 <strong>Fecha:</strong> {charla.fecha} · 🕒 <strong>Hora:</strong> {recortarHora(charla.hora_inicio)} - {recortarHora(charla.hora_fin)}
                            {charla.sala ? <> · 📍 <strong>Sala:</strong> {charla.sala.nombre} </> : null}
                        </p>

                        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #1a73e8' }}>
                            <h3 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Reserva confirmada</h3>
                            <p style={{ margin: 0, color: '#475569' }}>Tu plaza ha quedado registrada con éxito para este evento.</p>
                        </div>
                    </>
                ) : (
                    <p>No se ha seleccionado ninguna charla.</p>
                )}
            </div>
        </section>
    );
}
