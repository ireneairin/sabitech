import { useEffect } from 'react';

export default function Modal({ titulo, onClose, children }) {
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
        <div
            onClick={onClose}
            className='modal-overlay'
        >
            <div
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
                className='modal-dialog'
            >
                <h2 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', color: '#0f172a' }}>{titulo}</h2>
                {children}
            </div>

        </div>
    )
}