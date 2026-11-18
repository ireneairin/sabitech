import logo from '../assets/logoSabitechFINAL.png';

export default function Navbar({ currentView, onNavigate, usuario, onLogout }) {
    
    // Función inteligente para manejar el click de "Sobre nosotros"
    const handleSobreNosotrosClick = () => {
        if (currentView !== 'home') {
            onNavigate('home');
            setTimeout(() => {
                document.getElementById('sobre-nosotros-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById('sobre-nosotros-section')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {/* Logo (izquierda) */}
                <button 
                    onClick={() => onNavigate('home')} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                >
                    <img src={logo} alt='Sabitech Logo' style={{ height: '36px', objectFit: 'contain' }} />
                </button>

                {/* Enlaces de navegación (centro) */}
                <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                        onClick={() => onNavigate('home')}
                        style={{
                            backgroundColor: currentView === 'home' ? '#eff6ff' : 'transparent',
                            color: currentView === 'home' ? '#2563eb' : '#475569',
                            border: 'none', padding: '8px 16px', borderRadius: '8px',
                            fontWeight: currentView === 'home' ? '600' : '500', cursor: 'pointer', fontSize: '0.95rem'
                        }}
                    >
                        Inicio
                    </button>
                    <button
                        onClick={() => onNavigate('charlas')}
                        style={{
                            backgroundColor: currentView === 'charlas' ? '#eff6ff' : 'transparent',
                            color: currentView === 'charlas' ? '#2563eb' : '#475569',
                            border: 'none', padding: '8px 16px', borderRadius: '8px',
                            fontWeight: currentView === 'charlas' ? '600' : '500', cursor: 'pointer', fontSize: '0.95rem'
                        }}
                    >
                        Charlas
                    </button>

                    {usuario && (
                        <button
                            onClick={() => onNavigate('mis-charlas')}
                            style={{
                                backgroundColor: currentView === 'mis-charlas' ? '#eff6ff' : 'transparent',
                                color: currentView === 'mis-charlas' ? '#2563eb' : '#475569',
                                border: 'none', padding: '8px 16px', borderRadius: '8px',
                                fontWeight: currentView === 'mis-charlas' ? '600' : '500', cursor: 'pointer', fontSize: '0.95rem'
                            }}
                        >
                            Mis charlas
                        </button>
                    )}

                    <button
                        onClick={handleSobreNosotrosClick}
                        style={{
                            backgroundColor: 'transparent',
                            color: '#475569',
                            border: 'none', padding: '8px 16px', borderRadius: '8px',
                            fontWeight: '500', cursor: 'pointer', fontSize: '0.95rem'
                        }}
                    >
                        Sobre nosotros
                    </button>
                </nav>

                {/* Zona de usuario / Acciones (derecha) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {usuario ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <span style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '600' }}>
                                Hola, {usuario.nombre}
                            </span>
                            <button 
                                onClick={onLogout} 
                                style={{
                                    backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1',
                                    padding: '8px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer'
                                }}
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                onClick={() => onNavigate('login')} 
                                style={{
                                    backgroundColor: 'transparent', color: '#2563eb', border: '1px solid #2563eb',
                                    padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer'
                                }}
                            >
                                Acceder
                            </button>
                            <button 
                                onClick={() => onNavigate('registro')} 
                                style={{
                                    backgroundColor: '#2563eb', color: '#ffffff', border: 'none',
                                    padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer'
                                }}
                            >
                                Crear cuenta
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}