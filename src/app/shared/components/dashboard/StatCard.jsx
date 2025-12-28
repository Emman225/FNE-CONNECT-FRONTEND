import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, trend, trendValue, icon: Icon, color = 'primary' }) => {
    const isPositive = trend === 'up';

    return (
        <div
            className="card hover-lift fade-in"
            style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                position: 'relative',
                overflow: 'hidden',
                borderTop: '3px solid transparent',
                borderImage: 'var(--gradient-card-accent) 1',
                borderImageSlice: '1 0 0 0',
                boxShadow: 'var(--shadow-card)',
                transition: 'all var(--transition-normal)',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
        >
            {/* Top Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                    <h3 style={{
                        fontSize: '0.8125rem',
                        fontWeight: '600',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.625rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        {title}
                    </h3>
                    <div style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: 'var(--text-main)',
                        letterSpacing: '-0.025em',
                        lineHeight: 1
                    }}>
                        {value}
                    </div>
                </div>

                {/* Icon Circle */}
                <div style={{
                    minWidth: '54px',
                    minHeight: '54px',
                    borderRadius: '14px',
                    background: `linear-gradient(135deg, var(--${color}, var(--primary)) 0%, var(--${color}-light, rgba(0, 186, 113, 0.8)) 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: `0 4px 14px rgba(0, 186, 113, 0.25)`,
                    transition: 'transform var(--transition-normal)'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05) rotate(5deg)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    }}
                >
                    <Icon size={26} strokeWidth={2.5} />
                </div>
            </div>

            {/* Trend Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.875rem' }}>
                <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0.625rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: isPositive ? 'var(--success)' : 'var(--danger)',
                    fontWeight: '700',
                    fontSize: '0.8125rem'
                }}>
                    {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {trendValue}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                    vs mois dernier
                </span>
            </div>

            {/* Decorative gradient overlay */}
            <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'var(--gradient-primary)',
                opacity: 0.05,
                pointerEvents: 'none'
            }} />
        </div>
    );
};

export default StatCard;
