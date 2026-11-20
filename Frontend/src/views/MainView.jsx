import React from 'react';
import HeroBanner from '../components/HeroBanner';
import FeatureCard from '../components/FeatureCard';

export default function HomeView({ usuario, onNavigate }) {
    return (
        <div className='home-page'>
            
            {/* Banner de bienvenida principal */}
            <HeroBanner usuario={usuario} onNavigate={onNavigate} />

            {/* Sección de características o accesos rápidos */}
            <h2 className='section-title'>
                ¿Qué te ofrece Sabitech?
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px', marginBottom: '60px' }}>
                <FeatureCard 
                    title="Charlas y Conferencias" 
                    description="Explora el listado completo de ponencias programadas, descubre a los ponentes y conoce los detalles de cada sala."
                    actionText="Ver charlas"
                    onClick={() => onNavigate('charlas')}
                />
                
                <FeatureCard 
                    title="Tus Reservas Activas" 
                    description="Gestiona tus plazas reservadas, consulta tus códigos de entrada y cancela cualquier asistencia si lo necesitas."
                    actionText="Ver mis charlas"
                    onClick={() => onNavigate('mis-charlas')}
                />

                <FeatureCard 
                    title="Espacio de Consultas" 
                    description="¿Tienes dudas sobre los eventos o las salas? Consulta toda la información de soporte disponible en la plataforma."
                    actionText="Saber más"
                    onClick={() => document.getElementById('sobre-nosotros-section')?.scrollIntoView({ behavior: 'smooth' })}
                />
            </div>

            {/* ================= SECCIÓN SOBRE NOSOTROS ================= */}
            <div id="sobre-nosotros-section" className='about-box'>
                <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#2563eb', fontWeight: '700' }}>
                    Sobre el evento
                </span>
                <h2 className='about-box__title'>
                    ¿Qué es Sabitech?
                </h2>
                
                <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: '1.7', marginBottom: '20px' }}>
                    <strong>Sabitech</strong> son unas jornadas exclusivas de ponencias y conferencias que giran en torno a tres grandes pilares del futuro digital: <strong>Salud</strong>, <strong>Business</strong> y <strong>Tech</strong>. Un punto de encuentro único para profesionales, estudiantes y apasionados de la innovación.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '20px', margin: '30px 0' }}>
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ color: '#2563eb', margin: '0 0 8px 0', fontSize: '1.1rem' }}><strong>Ubicación:</strong> XTART Valencia</h3>
                        <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>
                            Celebrado presencialmente en las modernas instalaciones del centro XTART en Valencia.
                        </p>
                    </div>

                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ color: '#2563eb', margin: '0 0 8px 0', fontSize: '1.1rem' }}><strong>Duración:</strong> 4 días | 13-16 Junio</h3>
                        <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>
                            Tres jornadas intensivas repletas de ponencias magistrales, debates y talleres prácticos.
                        </p>
                    </div>

                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ color: '#2563eb', margin: '0 0 8px 0', fontSize: '1.1rem' }}>Múltiples aulas</h3>
                        <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>
                            Charlas simultáneas distribuidas en las distintas aulas del centro adaptadas a cada temática.
                        </p>
                    </div>
                </div>

                <p style={{ fontSize: '0.95rem', color: '#64748b', margin: 0, fontStyle: 'italic' }}>
                    ¡Reserva ya tu plaza en las ponencias que más te interesen desde el catálogo y asegura tu asistencia en Sabitech 2026!
                </p>
            </div>

        </div>
    );
}