import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import ClientTable from '../../../app/shared/features/clients/ClientTable';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDashboardPath } from '../../../hooks/useDashboardPath';

const MOCK_CLIENTS = [
    { id: 1, name: 'Jean Doe', phone: '0708091011', email: 'jean@gmail.com', location: 'Cocody, Riviéra', type: 'Particulier', invoicesCount: 3 },
    { id: 2, name: 'Entreprise ABC', phone: '0102030405', email: 'contact@abc.ci', location: 'Plateau, Immeuble X', type: 'Entreprise', invoicesCount: 12 },
    { id: 3, name: 'Marc Konan', phone: '0505050505', email: '', location: 'Yopougon, Maroc', type: 'Particulier', invoicesCount: 1 },
];

const ClientListPage = () => {
    const { basePath } = useDashboardPath();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredClients = MOCK_CLIENTS.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
    );

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>Clients</h1>
                    <p className="text-muted">Gérez votre base de données clients.</p>
                </div>
                <Link to={`${basePath}/clients/new`}>
                    <button className="btn btn-primary">
                        <Plus size={20} /> Nouveau Client
                    </button>
                </Link>
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

            <ClientTable clients={filteredClients} />
        </div>
    );
};

export default ClientListPage;
