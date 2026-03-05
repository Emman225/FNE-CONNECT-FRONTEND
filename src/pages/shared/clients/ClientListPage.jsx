import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../../components/ui/Button';
import ClientTable from '../../../app/shared/features/clients/ClientTable';
import { Plus, Search, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDashboardPath } from '../../../hooks/useDashboardPath';
import { useNotifications } from '../../../context/NotificationContext';
import ClientModal from '../../../app/shared/features/clients/ClientModal';
import { clientService } from '../../../services/clientService';
import toast from 'react-hot-toast';
import showAlert from '../../../utils/sweetAlert';

const ClientListPage = () => {
    const { basePath } = useDashboardPath();
    const navigate = useNavigate();
    const { showSuccess } = useNotifications();
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [isViewOnly, setIsViewOnly] = useState(false);

    const fetchClients = useCallback(async () => {
        setLoading(true);
        try {
            const data = await clientService.getAll();
            setClients(data.data || []); // Laravel Paginator
        } catch (error) {
            console.error("Failed to fetch clients", error);
            toast.error("Erreur lors du chargement des clients");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    const filteredClients = clients.filter(client =>
        (client.name?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
        (client.phone?.includes(searchTerm) || '')
    );

    const handleView = (client) => {
        setSelectedClientId(client.id);
        setIsViewOnly(true);
        setIsModalOpen(true);
    };

    const handleEdit = (client) => {
        setSelectedClientId(client.id);
        setIsViewOnly(false);
        setIsModalOpen(true);
    };

    const handleNewClient = () => {
        setSelectedClientId(null);
        setIsViewOnly(false);
        setIsModalOpen(true);
    };

    const handleClientSuccess = () => {
        setIsModalOpen(false);
        fetchClients();
        showSuccess('Opération effectuée avec succès');
    };

    const handleDelete = async (client) => {
        const result = await showAlert.confirm(
            'Suppression',
            'Êtes-vous sûr de vouloir supprimer ce client ?',
            'Supprimer'
        );

        if (result.isConfirmed) {
            try {
                await clientService.delete(client.id);
                setClients(clients.filter(c => c.id !== client.id));
                showSuccess('Client supprimé avec succès');
            } catch (error) {
                toast.error("Erreur lors de la suppression");
            }
        }
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>Clients</h1>
                    <p className="text-muted">Gérez votre base de données clients.</p>
                </div>
                <button className="btn btn-primary" onClick={handleNewClient}>
                    <Plus size={20} /> Nouveau Client
                </button>
            </div>

            {/* Search Bar */}
            <div style={{ marginBottom: '2rem', position: 'relative', maxWidth: '400px' }}>
                <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                    type="text"
                    placeholder="Rechercher par nom ou téléphone..."
                    className="input-field"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        paddingLeft: '3rem',
                        backgroundColor: 'white',
                        boxShadow: 'var(--shadow-sm)'
                    }}
                />
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
                    <Loader2 className="animate-spin" size={48} color="var(--primary)" />
                </div>
            ) : (
                <ClientTable
                    clients={filteredClients}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <ClientModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                clientId={selectedClientId}
                isViewOnly={isViewOnly}
                onSuccess={handleClientSuccess}
            />
        </div>
    );
};

export default ClientListPage;
