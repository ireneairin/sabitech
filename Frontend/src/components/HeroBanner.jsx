import React from 'react';

export default function HeroBanner({ usuario, onNavigate }) {
    return (
        <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            color: '#ffffff',
            padding: '40px 30px',
            borderRadius: '16px',
            marginBottom: '40px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#38bdf8', fontWeight: '700' }}>
                Plataforma Oficial Sabitech 2026
            </span>
            <h1 style={{ fontSize: '2.25rem', margin: 0, fontWeight: '800' }}>
                {usuario ? `¡Hola de nuevo, ${usuario.nombre}!` : 'Bienvenido a Sabitech'}
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', maxWidth: '600px', margin: 0, lineHeight: '1.6' }}>
                {usuario 
                    ? 'Tu panel de control está listo. Explora las charlas disponibles o revisa las plazas que tienes reservadas.'
                    : 'La plataforma líder para la gestión de conferencias, ponencias y control de aforos. Inicia sesión para empezar a reservar.'}
            </p>
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button
                    onClick={() => onNavigate('charlas')}
                    style={{
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                >
                    Explorar Charlas
                </button>

                {/* Si hay usuario, mostramos "Ver mis charlas". Si no, "Iniciar Sesión" */}
                {usuario ? (
                    <button
                        onClick={() => onNavigate('mis-charlas')}
                        style={{
                            backgroundColor: 'transparent',
                            color: '#ffffff',
                            border: '1px solid #38bdf8',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}
                    >
                        Ver mis charlas →
                    </button>
                ) : (
                    <button
                        onClick={() => onNavigate('login')}
                        style={{
                            backgroundColor: 'transparent',
                            color: '#ffffff',
                            border: '1px solid #475569',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}
                    >
                        Iniciar Sesión
                    </button>
                )}
            </div>
        </div>
    );
}