import logo from '../assets/logoSabitechFINAL.png';

export default function Footer() {
    return (
        <footer style={{
            backgroundColor: '#0f172a',
            color: '#94a3b8',
            padding: '40px 20px 20px 20px',
            marginTop: '60px',
            borderTop: '1px solid #1e293b'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                gap: '30px',
                marginBottom: '30px',
                textAlign: 'left'
            }}>
                <div>
                    <img src={logo} alt='Sabitech' style={{ height: '32px', marginBottom: '12px', filter: 'brightness(0) invert(1)' }} />
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
                        Plataforma líder para la gestión de conferencias, ponencias tecnológicas y control de aforos.
                    </p>
                </div>
                <div>
                    <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '12px' }}>Enlaces Rápidos</h4>
                    <p style={{ margin: '6px 0', fontSize: '0.9rem' }}>Gestión de Ponencias</p>
                    <p style={{ margin: '6px 0', fontSize: '0.9rem' }}>Control de Accesos</p>
                    <p style={{ margin: '6px 0', fontSize: '0.9rem' }}>Soporte Técnico</p>
                </div>
                <div>
                    <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '12px' }}>Contacto</h4>
                    <p style={{ margin: '6px 0', fontSize: '0.9rem' }}>Valencia, España</p>
                    <p style={{ margin: '6px 0', fontSize: '0.9rem' }}>soporte@sabitech.example</p>
                </div>
            </div>
            
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                borderTop: '1px solid #1e293b',
                paddingTop: '20px',
                textAlign: 'center',
                fontSize: '0.85rem'
            }}>
                <p style={{ margin: 0 }}>&copy; 2026 Sabitech. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}