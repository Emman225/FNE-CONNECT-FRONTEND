import { Eye, Phone, Mail, MapPin, Edit2, Trash2 } from 'lucide-react';
import DataTable from '../../../../components/ui/DataTable/DataTable';

const ClientTable = ({ clients, onView, onEdit, onDelete }) => {
    const columns = [
        {
            key: 'name',
            label: 'Nom / Entreprise',
            sortable: true,
            render: (row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--primary-lighter)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '1rem'
                    }}>
                        {row.name.charAt(0)}
                    </div>
                    <div>
                        <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.95rem' }}>{row.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.invoicesCount} factures</div>
                    </div>
                </div>
            )
        },
        {
            key: 'contact',
            label: 'Contacts',
            render: (row) => (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                        <Phone size={14} color="var(--primary)" /> {row.phone}
                    </div>
                    {row.email && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            <Mail size={14} /> {row.email}
                        </div>
                    )}
                </div>
            )
        },
        {
            key: 'location',
            label: 'Localisation',
            sortable: true,
            render: (row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <MapPin size={14} color="var(--text-muted)" /> {row.location}
                </div>
            )
        },
        {
            key: 'type',
            label: 'Type',
            sortable: true,
            render: (row) => (
                <span style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: row.type === 'Entreprise' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                    color: row.type === 'Entreprise' ? 'var(--secondary)' : 'var(--success)'
                }}>
                    {row.type}
                </span>
            )
        }
    ];

    const actions = [
        {
            label: 'Voir',
            icon: <Eye size={16} />,
            onClick: (row) => onView && onView(row)
        },
        {
            label: 'Modifier',
            icon: <Edit2 size={16} />,
            onClick: (row) => onEdit && onEdit(row)
        },
        {
            label: 'Supprimer',
            icon: <Trash2 size={16} />,
            variant: 'danger',
            onClick: (row) => onDelete && onDelete(row)
        }
    ];

    return (
        <DataTable
            columns={columns}
            data={clients}
            actions={actions}
            searchPlaceholder="Rechercher un client..."
            selectable
        />
    );
};

export default ClientTable;
