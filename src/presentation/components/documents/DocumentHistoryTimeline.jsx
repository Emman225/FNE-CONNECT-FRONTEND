import React from 'react';
import { Clock, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const DocumentHistoryTimeline = ({ document }) => {
    if (!document) return null;

    // Build timeline from document history
    const timelineEvents = [];

    // Creation event
    timelineEvents.push({
        id: 1,
        type: 'created',
        title: `${document.type === 'quote' ? 'Devis' : document.type === 'proforma' ? 'Proforma' : 'Facture'} créé(e)`,
        description: `Document ${document.id} créé`,
        date: document.createdAt,
        icon: FileText,
        color: 'var(--primary)'
    });

    // Transformation events
    if (document.createdFrom) {
        timelineEvents.push({
            id: 2,
            type: 'transformed',
            title: 'Document transformé',
            description: `Créé depuis ${document.createdFrom}`,
            date: document.createdAt,
            icon: ArrowRight,
            color: 'var(--secondary)'
        });
    }

    // Status change events
    if (document.status === 'sent') {
        timelineEvents.push({
            id: 3,
            type: 'sent',
            title: 'Document envoyé',
            description: `Envoyé au client ${document.client.name}`,
            date: document.sentAt || document.createdAt,
            icon: CheckCircle,
            color: 'var(--info)'
        });
    }

    if (document.status === 'converted') {
        timelineEvents.push({
            id: 4,
            type: 'converted',
            title: 'Document converti',
            description: 'Transformé en document suivant',
            date: document.convertedAt || document.createdAt,
            icon: ArrowRight,
            color: 'var(--success)'
        });
    }

    // Commission events (for invoices)
    if (document.type === 'invoice' && document.commissionStatus) {
        if (document.commissionStatus === 'paid') {
            timelineEvents.push({
                id: 5,
                type: 'commission_paid',
                title: 'Commission payée',
                description: `Commission de ${document.commissionAmount?.toLocaleString('fr-FR')} FCFA payée`,
                date: document.commissionPaidAt,
                icon: CheckCircle,
                color: 'var(--success)'
            });
        }
    }

    // FNE generation (for invoices)
    if (document.fneNumber) {
        timelineEvents.push({
            id: 6,
            type: 'fne_generated',
            title: 'Facture FNE générée',
            description: `Numéro FNE: ${document.fneNumber}`,
            date: document.fneGeneratedAt,
            icon: CheckCircle,
            color: 'var(--success)'
        });
    }

    // Payment events
    if (document.paymentStatus === 'paid') {
        timelineEvents.push({
            id: 7,
            type: 'paid',
            title: 'Facture payée',
            description: `Paiement reçu de ${document.client.name}`,
            date: document.paidAt,
            icon: CheckCircle,
            color: 'var(--success)'
        });
    }

    // Sort by date (most recent first)
    timelineEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            border: '1px solid var(--border-color)'
        }}>
            <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: 'var(--text-main)'
            }}>
                Historique du Document
            </h3>

            <div style={{ position: 'relative' }}>
                {/* Timeline line */}
                <div style={{
                    position: 'absolute',
                    left: '20px',
                    top: '10px',
                    bottom: '10px',
                    width: '2px',
                    backgroundColor: 'var(--border-color)'
                }}></div>

                {/* Timeline events */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {timelineEvents.map((event, index) => {
                        const Icon = event.icon;
                        return (
                            <div
                                key={event.id}
                                style={{
                                    position: 'relative',
                                    paddingLeft: '3.5rem',
                                    animation: 'fadeIn 0.3s ease-out',
                                    animationDelay: `${index * 0.1}s`,
                                    animationFillMode: 'backwards'
                                }}
                            >
                                {/* Icon */}
                                <div style={{
                                    position: 'absolute',
                                    left: '0',
                                    top: '0',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: event.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 0 0 4px white, 0 0 0 6px var(--border-color)',
                                    zIndex: 1
                                }}>
                                    <Icon size={20} color="white" />
                                </div>

                                {/* Content */}
                                <div style={{
                                    backgroundColor: 'var(--bg-main)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: '1rem',
                                    border: '1px solid var(--border-color)'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'start',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <h4 style={{
                                            fontSize: '0.9375rem',
                                            fontWeight: '600',
                                            color: 'var(--text-main)'
                                        }}>
                                            {event.title}
                                        </h4>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            color: 'var(--text-secondary)',
                                            whiteSpace: 'nowrap',
                                            marginLeft: '1rem'
                                        }}>
                                            {format(new Date(event.date), 'dd MMM yyyy, HH:mm', { locale: fr })}
                                        </span>
                                    </div>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-secondary)',
                                        margin: 0
                                    }}>
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {timelineEvents.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    color: 'var(--text-secondary)'
                }}>
                    <Clock size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                    <p>Aucun événement dans l'historique</p>
                </div>
            )}
        </div>
    );
};

export default DocumentHistoryTimeline;
