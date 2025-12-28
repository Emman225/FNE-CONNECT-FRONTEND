import React from 'react';
import { Clock, CheckCircle, AlertCircle, FileText, Users, DollarSign } from 'lucide-react';

const ActivityTimeline = ({ activities = [] }) => {
    const defaultActivities = [
        {
            id: 1,
            type: 'invoice',
            title: 'Nouvelle facture créée',
            description: 'Facture #FNE-2024-001 pour Client ABC',
            time: 'Il y a 2 heures',
            color: 'primary',
            icon: FileText
        },
        {
            id: 2,
            type: 'payment',
            title: 'Paiement reçu',
            description: '50 000 FCFA de Client XYZ',
            time: 'Il y a 5 heures',
            color: 'secondary',
            icon: DollarSign
        },
        {
            id: 3,
            type: 'client',
            title: 'Nouveau client ajouté',
            description: 'Entreprise DEF enregistrée',
            time: 'Il y a 1 jour',
            color: 'primary',
            icon: Users
        },
        {
            id: 4,
            type: 'success',
            title: 'Facture validée',
            description: 'Facture #FNE-2024-002 approuvée par DGI',
            time: 'Il y a 2 jours',
            color: 'secondary',
            icon: CheckCircle
        }
    ];

    const items = activities.length > 0 ? activities : defaultActivities;

    const getColorClass = (color) => {
        return color === 'secondary' ? 'var(--secondary)' : 'var(--primary)';
    };

    const getBackgroundColor = (color) => {
        return color === 'secondary' ? 'var(--secondary-lighter)' : 'var(--primary-lighter)';
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>
                    Activité Récente
                </h2>
                <a href="#" style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
                    Voir tout →
                </a>
            </div>

            <div style={{ position: 'relative' }}>
                {/* Timeline line - Removed for Grid Layout */}
                {/* <div style={{
                    position: 'absolute',
                    left: '21px',
                    top: '50px',
                    bottom: '50px',
                    width: '2px',
                    background: 'linear-gradient(180deg, var(--primary) 0%, var(--secondary) 100%)',
                    opacity: 0.2
                }} /> */}

                {/* Activity items */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {items.map((activity, index) => {
                        const Icon = activity.icon;
                        const color = getColorClass(activity.color);
                        const bgColor = getBackgroundColor(activity.color);

                        return (
                            <div
                                key={activity.id}
                                className="hover-lift fade-in"
                                style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    padding: '1.25rem',
                                    backgroundColor: 'white',
                                    borderRadius: 'var(--radius-lg)',
                                    boxShadow: 'var(--shadow-card)',
                                    transition: 'all var(--transition-normal)',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    animationDelay: `${index * 0.1}s`
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateX(8px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateX(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                                }}
                            >
                                {/* Icon */}
                                <div style={{
                                    minWidth: '42px',
                                    height: '42px',
                                    borderRadius: 'var(--radius-lg)',
                                    backgroundColor: bgColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: color,
                                    transition: 'transform var(--transition-normal)'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                                    }}
                                >
                                    <Icon size={20} strokeWidth={2.5} />
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h3 style={{
                                        fontSize: '0.9375rem',
                                        fontWeight: '600',
                                        color: 'var(--text-main)',
                                        marginBottom: '0.25rem'
                                    }}>
                                        {activity.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '0.5rem',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {activity.description}
                                    </p>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.375rem',
                                        fontSize: '0.8125rem',
                                        color: 'var(--text-muted)'
                                    }}>
                                        <Clock size={14} />
                                        <span>{activity.time}</span>
                                    </div>
                                </div>

                                {/* Color indicator dot */}
                                <div style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '1rem',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: color
                                }} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ActivityTimeline;
