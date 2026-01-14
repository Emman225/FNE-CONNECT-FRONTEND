import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { AlertTriangle, Shield, TrendingUp, Users, Filter, Download, Eye, Lock, CheckCircle, FileText } from 'lucide-react';
import { MOCK_AML_ALERTS } from '../../../data/mockData';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNotifications } from '../../../context/NotificationContext';
import DataTable from '../../../components/ui/DataTable/DataTable';
// TODO: Créer ces composants
// import AccountBlockModal from '../../../components/compliance/AccountBlockModal';
// import CentifReportGenerator from '../../../components/compliance/CentifReportGenerator';

const AmlDashboard = () => {
    const [alerts] = useState(MOCK_AML_ALERTS);
    const { showSuccess, showWarning } = useNotifications();
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
    const [isCentifModalOpen, setIsCentifModalOpen] = useState(false);

    const pendingAlerts = alerts.filter(a => a.status === 'pending');
    const reviewedAlerts = alerts.filter(a => a.status === 'reviewed');
    const highSeverityAlerts = alerts.filter(a => a.severity === 'high');
    const mediumSeverityAlerts = alerts.filter(a => a.severity === 'medium');

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return { bg: '#FEE2E2', color: '#DC2626', border: '#EF4444' };
            case 'medium': return { bg: '#FEF3C7', color: '#D97706', border: '#F59E0B' };
            case 'low': return { bg: '#DBEAFE', color: '#1E40AF', border: '#3B82F6' };
            default: return { bg: '#F3F4F6', color: '#6B7280', border: '#9CA3AF' };
        }
    };

    const handleReviewAlert = (alert) => {
        setSelectedAlert(alert);
        showWarning(`Examen de l'alerte ${alert.id} en cours...`);
    };

    const handleBlockAccount = (alert) => {
        setSelectedAlert(alert);
        setIsBlockModalOpen(true);
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{
                        fontSize: '1.875rem',
                        fontWeight: '800',
                        color: 'var(--primary)',
                        letterSpacing: '-0.025em',
                        marginBottom: '0.5rem'
                    }}>
                        Conformité AML
                    </h1>
                    <p className="text-muted">Surveillance anti-blanchiment et conformité réglementaire.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-light" style={{ border: '1px solid var(--border-color)' }}>
                        <Filter size={18} /> Filtrer
                    </button>
                    <button onClick={() => setIsCentifModalOpen(true)} className="btn btn-primary">
                        <FileText size={18} /> Rapport CENTIF
                    </button>
                </div>
            </div>

            {/* Alert Banner for High Priority */}
            {highSeverityAlerts.length > 0 && (
                <div style={{
                    backgroundColor: '#FEE2E2',
                    border: '2px solid #EF4444',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <AlertTriangle size={32} color="#DC2626" />
                    <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '700', color: '#991B1B', marginBottom: '0.25rem', fontSize: '1.125rem' }}>
                            {highSeverityAlerts.length} alerte(s) de haute priorité
                        </p>
                        <p style={{ fontSize: '0.875rem', color: '#7F1D1D' }}>
                            Action immédiate requise - Risque de blanchiment détecté
                        </p>
                    </div>
                    <Button style={{ backgroundColor: '#DC2626', borderColor: '#DC2626' }}>
                        Examiner maintenant
                    </Button>
                </div>
            )}

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2.5rem'
            }}>
                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: '#FEE2E2',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <AlertTriangle size={24} color="#DC2626" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Alertes en Attente
                            </p>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#DC2626' }}>
                                {pendingAlerts.length}
                            </h3>
                        </div>
                    </div>
                </Card>

                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: 'var(--success-light)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <CheckCircle size={24} color="var(--success)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Alertes Traitées
                            </p>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--success)' }}>
                                {reviewedAlerts.length}
                            </h3>
                        </div>
                    </div>
                </Card>

                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: '#FEF3C7',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <Shield size={24} color="#D97706" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Haute Priorité
                            </p>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#D97706' }}>
                                {highSeverityAlerts.length}
                            </h3>
                        </div>
                    </div>
                </Card>

                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: 'var(--primary-lighter)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <Users size={24} color="var(--primary)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Vendeurs Surveillés
                            </p>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--primary)' }}>
                                {new Set(alerts.map(a => a.vendorId)).size}
                            </h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Alerts Table */}
            <Card style={{ padding: '0px', overflow: 'hidden' }}>
                <DataTable
                    title="Alertes AML Récentes"
                    columns={[
                        {
                            key: 'id',
                            label: 'Référence',
                            sortable: true,
                            render: (row) => <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{row.id}</span>
                        },
                        {
                            key: 'vendorName',
                            label: 'Vendeur',
                            sortable: true,
                            render: (row) => (
                                <div>
                                    <div style={{ fontWeight: '500' }}>{row.vendorName}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ID: {row.vendorId}</div>
                                </div>
                            )
                        },
                        {
                            key: 'type',
                            label: 'Type d\'Alerte',
                            sortable: true,
                            render: (row) => <span style={{ textTransform: 'capitalize' }}>{row.type.replace('_', ' ')}</span>
                        },
                        {
                            key: 'description',
                            label: 'Description',
                            render: (row) => <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '250px' }}>{row.description}</div>
                        },
                        {
                            key: 'createdAt',
                            label: 'Date',
                            sortable: true,
                            render: (row) => format(new Date(row.createdAt), 'dd MMM yyyy', { locale: fr })
                        },
                        {
                            key: 'severity',
                            label: 'Sévérité',
                            sortable: true,
                            align: 'center',
                            render: (row) => {
                                const style = getSeverityColor(row.severity);
                                return (
                                    <span style={{
                                        display: 'inline-flex',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        backgroundColor: style.bg,
                                        color: style.color,
                                        border: `1px solid ${style.border}`,
                                        textTransform: 'uppercase'
                                    }}>
                                        {row.severity}
                                    </span>
                                );
                            }
                        },
                        {
                            key: 'status',
                            label: 'Statut',
                            sortable: true,
                            align: 'center',
                            render: (row) => (
                                <span style={{
                                    display: 'inline-flex',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    backgroundColor: row.status === 'pending' ? '#FEF3C7' : 'var(--success-light)',
                                    color: row.status === 'pending' ? '#D97706' : 'var(--success)',
                                    textTransform: 'uppercase'
                                }}>
                                    {row.status === 'pending' ? 'En attente' : 'Traité'}
                                </span>
                            )
                        }
                    ]}
                    data={alerts}
                    renderRowActions={(row) => (
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            {row.status === 'pending' ? (
                                <>
                                    <button onClick={() => handleReviewAlert(row)} className="btn-icon" title="Examiner"><Eye size={16} /></button>
                                    <button onClick={() => handleBlockAccount(row)} className="btn-icon" style={{ color: 'var(--danger)' }} title="Bloquer"><Lock size={16} /></button>
                                </>
                            ) : (
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'right' }}>
                                    Par {row.reviewedBy}<br />{format(new Date(row.reviewedAt), 'dd/MM/yyyy')}
                                </div>
                            )}
                        </div>
                    )}
                />
            </Card>

            {/* TODO: Créer le composant AccountBlockModal
            {isBlockModalOpen && selectedAlert && (
                <AccountBlockModal
                    isOpen={isBlockModalOpen}
                    onClose={() => setIsBlockModalOpen(false)}
                    vendor={{
                        id: selectedAlert.vendorId,
                        name: selectedAlert.vendorName,
                        email: `${selectedAlert.vendorName.toLowerCase().replace(' ', '.')}@example.com`,
                        phone: '+221 77 123 45 67'
                    }}
                    alert={selectedAlert}
                />
            )}
            */}

            {isCentifModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius-lg)',
                        padding: '2rem',
                        maxWidth: '600px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflow: 'auto'
                    }}>
                        {/* TODO: Créer le composant CentifReportGenerator */}
                        {/* <CentifReportGenerator /> */}
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Composant CENTIF à créer</p>
                        <button
                            onClick={() => setIsCentifModalOpen(false)}
                            style={{
                                marginTop: '1rem',
                                padding: '0.75rem 1.5rem',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                background: 'white',
                                cursor: 'pointer',
                                width: '100%'
                            }}
                            className="btn btn-light"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AmlDashboard;
