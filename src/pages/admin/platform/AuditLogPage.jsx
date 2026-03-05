import React, { useState, useEffect } from 'react';
import Card from '../../../components/ui/Card';
import DataTable from '../../../components/ui/DataTable/DataTable';
import { Shield, Eye, User, Globe, Activity } from 'lucide-react';
import { auditService } from '../../../services/auditService';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';

const AuditLogPage = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, per_page: 25, current_page: 1 });
    const [selectedLog, setSelectedLog] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Filters
    const [filters, setFilters] = useState({
        search: '',
        event: '',
        start_date: '',
        end_date: ''
    });

    const fetchLogs = async (page = 1, currentFilters = filters) => {
        setLoading(true);
        try {
            const data = await auditService.getAll({
                page,
                per_page: 25,
                ...currentFilters
            });
            setLogs(data.data);
            setPagination({
                total: data.total,
                per_page: data.per_page,
                current_page: data.current_page
            });
        } catch (error) {
            console.error("Failed to fetch audit logs", error);
            toast.error("Erreur lors du chargement des journaux d'audit.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs(1);
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        fetchLogs(1);
    };

    const resetFilters = () => {
        const reseted = { search: '', event: '', start_date: '', end_date: '' };
        setFilters(reseted);
        fetchLogs(1, reseted);
    };

    const viewDetails = (log) => {
        setSelectedLog(log);
        setShowModal(true);
    };

    const columns = [
        {
            key: 'created_at',
            label: 'Date & Heure',
            sortable: true,
            render: (row) => (
                <div style={{ fontSize: '0.85rem' }}>
                    {format(new Date(row.created_at), 'dd/MM/yyyy HH:mm:ss', { locale: fr })}
                </div>
            )
        },
        {
            key: 'user',
            label: 'Utilisateur',
            render: (row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--primary-lighter)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                        {row.user?.name?.substring(0, 1) || 'U'}
                    </div>
                    <div>
                        <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{row.user?.name || 'Inconnu'}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{row.user?.role || 'Système'}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'event',
            label: 'Événement',
            render: (row) => {
                const isThreat = row.event.includes('unauthorized') || row.event.includes('violation');
                return (
                    <div style={{
                        display: 'inline-flex',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        backgroundColor: isThreat ? '#FEE2E2' : '#E0F2FE',
                        color: isThreat ? '#B91C1C' : '#0369A1',
                        border: `1px solid ${isThreat ? '#FCA5A5' : '#BAE6FD'}`
                    }}>
                        {row.event.replace(/_/g, ' ')}
                    </div>
                );
            }
        },
        {
            key: 'details',
            label: 'Cible / IP',
            render: (row) => (
                <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '500', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-primary)' }}>
                        {row.url}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '2px' }}>
                        <Globe size={12} /> {row.ip_address}
                    </div>
                </div>
            )
        },
        {
            key: 'actions',
            label: '',
            render: (row) => (
                <button
                    className="btn-icon"
                    title="Voir les détails"
                    onClick={() => viewDetails(row)}
                    style={{ backgroundColor: 'var(--bg-light)' }}
                >
                    <Eye size={16} />
                </button>
            )
        }
    ];

    return (
        <div className="fade-in" style={{ paddingBottom: '2rem' }}>
            {/* Header & Stats */}
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Shield size={32} /> Journaux d'Audit
                    </h1>
                    <p className="text-muted" style={{ fontSize: '0.95rem' }}>Surveillance en temps réel des activités et de la conformité du système.</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Card style={{ padding: '0.75rem 1.5rem', backgroundColor: 'white', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '180px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Activity size={20} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Activités (Total)</div>
                            <div style={{ fontWeight: '800', fontSize: '1.25rem' }}>{pagination.total}</div>
                        </div>
                    </Card>

                    <Card style={{ padding: '0.75rem 1.5rem', backgroundColor: 'white', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '180px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#FEF2F2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Shield size={20} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Alertes (Sécurité)</div>
                            <div style={{ fontWeight: '800', fontSize: '1.25rem' }}>{logs.filter(l => l.event.includes('unauthorized')).length}</div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Filters Bar */}
            <Card style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.4rem' }}>Recherche</label>
                        <input
                            type="text"
                            name="search"
                            className="form-control"
                            placeholder="Utilisateur, IP, URL..."
                            value={filters.search}
                            onChange={handleFilterChange}
                            onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.4rem' }}>Événement</label>
                        <select
                            name="event"
                            className="form-control"
                            value={filters.event}
                            onChange={handleFilterChange}
                        >
                            <option value="">Tous les événements</option>
                            <option value="unauthorized_access">Accès non autorisé</option>
                            <option value="policy_violation">Violation de politique</option>
                            <option value="login">Connexion</option>
                            <option value="logout">Déconnexion</option>
                            <option value="resource_created">Création</option>
                            <option value="resource_updated">Modification</option>
                            <option value="resource_deleted">Suppression</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.4rem' }}>Date Début</label>
                        <input
                            type="date"
                            name="start_date"
                            className="form-control"
                            value={filters.start_date}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.4rem' }}>Date Fin</label>
                        <input
                            type="date"
                            name="end_date"
                            className="form-control"
                            value={filters.end_date}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-primary" onClick={applyFilters} style={{ flex: 1 }}>
                            Filtrer
                        </button>
                        <button className="btn btn-outline" onClick={resetFilters} title="Réinitialiser">
                            Effacer
                        </button>
                    </div>
                </div>
            </Card>

            {/* Data Table */}
            <Card style={{ padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                <DataTable
                    columns={columns}
                    data={logs}
                    loading={loading}
                    pagination={{
                        ...pagination,
                        onPageChange: (page) => fetchLogs(page)
                    }}
                />
            </Card>

            {/* Log Detail Modal */}
            {showModal && selectedLog && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000, padding: '1rem'
                }} onClick={() => setShowModal(false)}>
                    <Card style={{
                        width: '100%', maxWidth: '700px', padding: '2rem',
                        maxHeight: '90vh', overflowY: 'auto'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>Détails de l'événement</h2>
                            <button className="btn-icon" onClick={() => setShowModal(false)}>&times;</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>UTILISATEUR</label>
                                <div style={{ fontWeight: '600' }}>{selectedLog.user?.name || 'Système'}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{selectedLog.user?.email}</div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>DATE ET HEURE</label>
                                <div style={{ fontWeight: '600' }}>{format(new Date(selectedLog.created_at), 'dd MMMM yyyy HH:mm:ss', { locale: fr })}</div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>ADRESSE IP</label>
                                <div style={{ fontWeight: '600' }}>{selectedLog.ip_address}</div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>ÉVÉNEMENT</label>
                                <div style={{
                                    fontWeight: '700',
                                    color: selectedLog.event.includes('unauthorized') ? 'var(--danger)' : 'var(--primary)'
                                }}>
                                    {selectedLog.event.replace(/_/g, ' ').toUpperCase()}
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>URL CIBLE</label>
                            <code style={{ display: 'block', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '6px', fontSize: '0.85rem', wordBreak: 'break-all', border: '1px solid #E2E8F0' }}>
                                {selectedLog.url}
                            </code>
                        </div>

                        {selectedLog.new_values && (
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>DONNÉES SUPPLÉMENTAIRES</label>
                                <pre style={{
                                    padding: '1rem',
                                    backgroundColor: '#1E293B',
                                    color: '#F8FAFC',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    overflowX: 'auto',
                                    marginTop: 0
                                }}>
                                    {JSON.stringify(selectedLog.new_values, null, 2)}
                                </pre>
                            </div>
                        )}

                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Fermer</button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AuditLogPage;
