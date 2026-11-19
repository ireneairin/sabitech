import { useEffect } from 'react';

export default function Modal({ titulo, onClose, children }) {
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
    }, [onClose]);

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 1000,
                backgroundColor: 'rgba(15, 23, 42, 0.55)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '20px',
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: '#fff', borderRadius: '16px', padding: '28px',
                    width: '100%', maxWidth: '420px', textAlign: 'center',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.25)',
                }}
            >
                <h2 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', color: '#0f172a' }}>{titulo}</h2>
                {children}
            </div>

        </div>
    )
}