import React from 'react';

export default function HeroBanner({ usuario, onNavigate }) {
    return (
        <div className='hero'>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#38bdf8', fontWeight: '700' }}>
                Plataforma Oficial Sabitech 2026
            </span>
            <h1 className='hero__title'>
                {usuario ? `¡Hola de nuevo, ${usuario.nombre}!` : 'Bienvenido a Sabitech'}
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', maxWidth: '600px', margin: 0, lineHeight: '1.6' }}>
                {usuario
                    ? 'Tu panel de control está listo. Explora las charlas disponibles o revisa las plazas que tienes reservadas.'
                    : 'La plataforma líder para la gestión de conferencias, ponencias y control de aforos. Inicia sesión para empezar a reservar.'}
            </p>

            <div className='hero__actions'>
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
                            backgroundColor: '#b3cbee',
                            color: '#000000',
                            border: '1px solid #475569',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d2e5f9'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#b3cbee'}
                    >
                        Ver mis charlas →
                    </button>
                ) : (
                    <button
                        onClick={() => onNavigate('login')}
                        style={{
                            backgroundColor: '#b3cbee', //#475569
                            color: '#000000',
                            border: '1px solid #475569',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d2e5f9'} //#3f4c5e
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#b3cbee'} //#475569
                    >
                        Iniciar Sesión
                    </button>
                )}
            </div>
        </div>
    );
}