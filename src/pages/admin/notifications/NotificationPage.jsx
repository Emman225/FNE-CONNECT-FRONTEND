import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import { Bell, Check, Trash2, Clock, Filter, Search, Info, AlertTriangle, AlertCircle } from 'lucide-react';
import showAlert from '../../../utils/sweetAlert';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: 'Nouvelle Vérification FNE',
            message: 'Le vendeur "Electro SARL" a soumis une nouvelle facture pour vérification.',
            time: 'Il y a 5 min',
            type: 'info',
            isRead: false
        },
        {
            id: 2,
            title: 'Alerte Conformité AML',
            message: 'Une transaction suspecte a été détectée sur le compte de "Impex CI".',
            time: 'Il y a 12 min',
            type: 'warning',
            isRead: false
        },
        {
            id: 3,
            title: 'Nouveau Vendeur Inscrit',
            message: 'Un nouveau vendeur "Global Tech" attend votre validation.',
            time: 'Il y a 1 heure',
            type: 'success',
            isRead: true
        },
        {
            id: 4,
            title: 'Système Mis à Jour',
            message: 'La plateforme a été mise à jour avec succès vers la version 2.4.0.',
            time: 'Il y a 3 heures',
            type: 'system',
            isRead: true
        }
    ]);

    const getTypeStyles = (type) => {
        switch (type) {
            case 'warning': return { icon: <AlertTriangle size={20} />, color: 'var(--warning)', bg: '#FFFBEB' };
            case 'error': return { icon: <AlertCircle size={20} />, color: 'var(--danger)', bg: '#FEF2F2' };
            case 'success': return { icon: <Check size={20} />, color: 'var(--primary)', bg: '#F0FDF4' };
            case 'system': return { icon: <Bell size={20} />, color: '#6366F1', bg: '#EEF2FF' };
            default: return { icon: <Info size={20} />, color: 'var(--primary)', bg: '#F0FDF4' };
        }
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const deleteNotification = async (id) => {
        const result = await showAlert.confirm(
            'Supprimer la notification',
            'Voulez-vous vraiment supprimer cette notification ? Cette action est irréversible.',
            'Supprimer',
            'Annuler',
            true
        );

        if (result.isConfirmed) {
            setNotifications(notifications.filter(n => n.id !== id));
            showAlert.success('Supprimé', 'La notification a été supprimée.');
        }
    };

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }} className="fade-in">
            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: '800',
                        color: 'var(--text-main)',
                        letterSpacing: '-0.025em',
                        marginBottom: '0.5rem'
                    }}>Centre de Notifications</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                        Restez informé des activités de la plateforme.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={markAllRead}
                        className="btn btn-light"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--border-color)' }}
                    >
                        <Check size={18} /> Tout marquer comme lu
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem',
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                alignItems: 'center'
            }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Rechercher une notification..."
                        className="input-field"
                        style={{ paddingLeft: '2.75rem', height: '42px' }}
                    />
                </div>
                <button className="btn btn-icon" style={{ border: '1px solid var(--border-color)', height: '42px', width: '42px' }}>
                    <Filter size={18} />
                </button>
            </div>

            {/* Notifications List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {notifications.length > 0 ? (
                    notifications.map((notif) => {
                        const styles = getTypeStyles(notif.type);
                        return (
                            <div
                                key={notif.id}
                                style={{
                                    display: 'flex',
                                    gap: '1.5rem',
                                    padding: '1.5rem',
                                    backgroundColor: notif.isRead ? 'white' : 'rgba(16, 185, 129, 0.03)',
                                    borderRadius: 'var(--radius-xl)',
                                    border: `1px solid ${notif.isRead ? 'var(--border-color)' : 'rgba(16, 185, 129, 0.2)'}`,
                                    transition: 'all 0.3s ease',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateX(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {/* Unread indicator */}
                                {!notif.isRead && (
                                    <div style={{
                                        position: 'absolute',
                                        left: '-4px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '8px',
                                        height: '40px',
                                        backgroundColor: 'var(--primary)',
                                        borderRadius: 'var(--radius-full)'
                                    }} />
                                )}

                                {/* Icon */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '14px',
                                    backgroundColor: styles.bg,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: styles.color,
                                    flexShrink: 0
                                }}>
                                    {styles.icon}
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                                        <h4 style={{
                                            fontSize: '1.0625rem',
                                            fontWeight: notif.isRead ? '600' : '700',
                                            color: 'var(--text-main)',
                                            margin: 0
                                        }}>
                                            {notif.title}
                                        </h4>
                                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <Clock size={14} /> {notif.time}
                                        </span>
                                    </div>
                                    <p style={{
                                        fontSize: '0.9375rem',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.5',
                                        margin: 0
                                    }}>
                                        {notif.message}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {!notif.isRead && (
                                        <button
                                            onClick={() => markAsRead(notif.id)}
                                            className="btn btn-icon"
                                            style={{ border: '1px solid var(--border-color)', background: 'white', color: 'var(--primary)' }}
                                            title="Marquer comme lu"
                                        >
                                            <Check size={16} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteNotification(notif.id)}
                                        className="btn btn-icon"
                                        style={{ border: '1px solid var(--border-color)', background: 'white', color: 'var(--danger)' }}
                                        title="Supprimer"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '5rem 0',
                        color: 'var(--text-muted)'
                    }}>
                        <Bell size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                        <p>Aucune nouvelle notification.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationPage;
