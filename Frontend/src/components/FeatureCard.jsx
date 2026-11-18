import React from 'react';

export default function FeatureCard({ title, description, actionText, onClick }) {
    return (
        <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.02)';
        }}
        >
            <div>
                <h3 style={{ fontSize: '1.2rem', color: '#1e293b', margin: '0 0 10px 0' }}>{title}</h3>
                <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                    {description}
                </p>
            </div>
            <button
                onClick={onClick}
                style={{
                    backgroundColor: '#f1f5f9',
                    color: '#0f172a',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                }}
            >
                {actionText} →
            </button>
        </div>
    );
}