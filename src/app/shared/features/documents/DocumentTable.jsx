import React from 'react';
import { Eye, Edit, Trash2, Banknote, FileText, FileCheck, Upload } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { Link } from 'react-router-dom';
import DataTable from '../../../../components/ui/DataTable/DataTable';
import { useDashboardPath } from '../../../../hooks/useDashboardPath';

const DocumentTable = ({ documents, type = 'invoice', onPay, onGenerateFne, onUploadFne, onConvert, onEdit, onDelete }) => {
    const { basePath, isAdminArea } = useDashboardPath();
    const getNumberLabel = () => {
        switch (type) {
            case 'invoice': return 'N° Facture';
            case 'quote': return 'N° Devis';
            case 'proforma': return 'N° Proforma';
            default: return 'Numéro';
        }
    };

    const columns = [
        {
            key: 'number',
            label: getNumberLabel(),
            sortable: true,
            render: (row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'var(--primary-lighter)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                        boxShadow: '0 2px 4px rgba(0, 186, 113, 0.1)'
                    }}>
                        <FileText size={18} />
                    </div>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 'bold' }}>{row.number}</span>
                </div>
            )
        },
        {
            key: 'accountNumber',
            label: 'N° Compte',
            sortable: true,
            render: (row) => (
                <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                    {row.accountNumber || '-'}
                </span>
            )
        },
        {
            key: 'client',
            label: 'Client',
            render: (row) => (
                <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9rem' }}>{row.clientName}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.clientPhone}</div>
                </div>
            )
        },
        {
            key: 'date',
            label: 'Date',
            sortable: true,
            render: (row) => <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{row.date}</span>
        },
        {
            key: 'amount',
            label: 'Montant TTC',
            sortable: true,
            render: (row) => <span style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '0.95rem' }}>{row.amount.toLocaleString('fr-FR')} FCFA</span>
        },
        {
            key: 'status',
            label: 'Statut',
            sortable: true,
            render: (row) => <StatusBadge
                status={row.status}
                label={isAdminArea && row.status === 'fne_generated' ? 'Facture FNE Envoyée' : undefined}
            />
        },
        {
            key: 'actions',
            label: 'Actions',
            align: 'right',
            render: (row) => (
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <Link to={`${basePath}/${type}s/${row.id}`} style={{ textDecoration: 'none' }}>
                        <button className="btn-icon" style={{
                            color: 'var(--text-secondary)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer'
                        }} title="Voir">
                            <Eye size={16} />
                        </button>
                    </Link>

                    {/* Generate FNE button for paid invoices */}
                    {row.status === 'paid' && onGenerateFne && type === 'invoice' && (
                        <button onClick={() => onGenerateFne(row)} className="btn-icon" style={{
                            color: 'var(--primary)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer'
                        }} title="Générer FNE">
                            <FileCheck size={16} />
                        </button>
                    )}

                    {/* Upload FNE button for generated invoices (Admin only) */}
                    {row.status === 'fne_generated' && isAdminArea && onUploadFne && (
                        <button onClick={() => onUploadFne(row)} className="btn-icon" style={{
                            color: 'var(--primary)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer'
                        }} title="Televerser Facture FNE">
                            <Upload size={16} />
                        </button>
                    )}

                    {['draft', 'pending'].includes(row.status) && (
                        <>
                            {((row.status === 'pending') || (row.status === 'draft' && row.isComplete)) && onPay && (
                                <button onClick={() => onPay(row)} className="btn-icon" style={{
                                    color: 'var(--success)',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer'
                                }} title="Payer">
                                    <Banknote size={16} />
                                </button>
                            )}

                            {/* Conversion Actions */}
                            {onConvert && (
                                <>
                                    {type === 'quote' && (
                                        <div style={{ display: 'flex', gap: '2px' }}>
                                            <button onClick={() => onConvert(row, 'proforma')} className="btn-icon" style={{ color: 'var(--secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }} title="Convertir en Proforma">
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => onConvert(row, 'invoice')} className="btn-icon" style={{ color: 'var(--primary)', background: 'transparent', border: 'none', cursor: 'pointer' }} title="Convertir en Facture">
                                                <FileCheck size={16} />
                                            </button>
                                        </div>
                                    )}
                                    {type === 'proforma' && (
                                        <button onClick={() => onConvert(row, 'invoice')} className="btn-icon" style={{ color: 'var(--primary)', background: 'transparent', border: 'none', cursor: 'pointer' }} title="Convertir en Facture">
                                            <FileCheck size={16} />
                                        </button>
                                    )}
                                </>
                            )}
                            {onEdit && (
                                <button onClick={() => onEdit(row)} className="btn-icon" style={{
                                    color: 'var(--secondary)',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer'
                                }} title="Modifier">
                                    <Edit size={16} />
                                </button>
                            )}
                            {onDelete && (
                                <button onClick={() => onDelete(row)} className="btn-icon" style={{
                                    color: 'var(--danger)',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer'
                                }} title="Supprimer">
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </>
                    )}
                </div>
            )
        }
    ];

    return (
        <DataTable
            columns={columns}
            data={documents}
            searchPlaceholder="Rechercher un document..."
            selectable
        />
    );
};

export default DocumentTable;
