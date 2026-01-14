import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { TrendingUp, DollarSign, Users, FileText, Download, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../../utils/financialUtils';
import DataTable from '../../../components/ui/DataTable/DataTable';

const GlobalReportingPage = () => {
    const [period, setPeriod] = useState('month');

    // Mock data for charts
    const revenueData = [
        { month: 'Jan', revenue: 12500000, commissions: 375000, tax: 2250000 },
        { month: 'Fév', revenue: 15200000, commissions: 456000, tax: 2736000 },
        { month: 'Mar', revenue: 18750000, commissions: 562500, tax: 3375000 },
        { month: 'Avr', revenue: 14300000, commissions: 429000, tax: 2574000 },
        { month: 'Mai', revenue: 21000000, commissions: 630000, tax: 3780000 },
        { month: 'Juin', revenue: 19500000, commissions: 585000, tax: 3510000 }
    ];

    const vendorDistribution = [
        { name: 'Actifs', value: 45, color: 'var(--success)' },
        { name: 'En attente KYC', value: 12, color: '#F59E0B' },
        { name: 'Suspendus', value: 3, color: '#EF4444' }
    ];

    const documentStats = [
        { type: 'Devis', count: 245, amount: 45000000 },
        { type: 'Proformas', count: 180, amount: 38000000 },
        { type: 'Factures', count: 156, amount: 32000000 }
    ];

    const topVendors = [
        { rank: 1, accountNumber: 'FNE-25897101', name: 'Mamadou Diallo', revenue: 15750000, commissions: 472500, documents: 45 },
        { rank: 2, accountNumber: 'FNE-25897104', name: 'Aissatou Ndiaye', revenue: 12300000, commissions: 369000, documents: 38 },
        { rank: 3, accountNumber: 'FNE-25897102', name: 'Fatou Sow', revenue: 8500000, commissions: 255000, documents: 28 },
        { rank: 4, accountNumber: 'FNE-25897107', name: 'Ousmane Ba', revenue: 7200000, commissions: 216000, documents: 24 },
        { rank: 5, accountNumber: 'FNE-25897109', name: 'Aminata Sy', revenue: 6800000, commissions: 204000, documents: 22 }
    ];

    const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
    const totalCommissions = revenueData.reduce((sum, item) => sum + item.commissions, 0);
    const totalTax = revenueData.reduce((sum, item) => sum + item.tax, 0);
    const totalVendors = vendorDistribution.reduce((sum, item) => sum + item.value, 0);

    const columns = [
        {
            key: 'rank',
            label: 'Rang',
            render: (row) => (
                <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: row.rank === 1 ? '#FFD700' : row.rank === 2 ? '#C0C0C0' : row.rank === 3 ? '#CD7F32' : 'var(--bg-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    color: row.rank <= 3 ? 'white' : 'var(--text-secondary)'
                }}>
                    {row.rank}
                </div>
            )
        },
        {
            key: 'accountNumber',
            label: 'N° Compte',
            render: (row) => <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--primary)' }}>{row.accountNumber}</span>
        },
        {
            key: 'name',
            label: 'Vendeur',
            sortable: true,
            render: (row) => <span style={{ fontWeight: '600' }}>{row.name}</span>
        },
        {
            key: 'revenue',
            label: 'CA Généré',
            sortable: true,
            align: 'right',
            render: (row) => <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{formatCurrency(row.revenue)}</span>
        },
        {
            key: 'commissions',
            label: 'Commissions',
            sortable: true,
            align: 'right',
            render: (row) => <span style={{ fontWeight: '600', color: 'var(--secondary)' }}>{formatCurrency(row.commissions)}</span>
        },
        {
            key: 'documents',
            label: 'Documents',
            align: 'center',
            sortable: true,
            render: (row) => (
                <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--bg-main)',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                }}>
                    {row.documents}
                </span>
            )
        }
    ];

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
                        Reporting Global
                    </h1>
                    <p className="text-muted">Vue d'ensemble des performances de la plateforme.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        style={{
                            padding: '0.75rem 1rem',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.9375rem'
                        }}
                        className="input-field"
                    >
                        <option value="week">Cette semaine</option>
                        <option value="month">Ce mois</option>
                        <option value="quarter">Ce trimestre</option>
                        <option value="year">Cette année</option>
                    </select>
                    <Button>
                        <Download size={18} /> Exporter PDF
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
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
                            backgroundColor: 'var(--primary-lighter)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <TrendingUp size={24} color="var(--primary)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                CA Total
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                {formatCurrency(totalRevenue)}
                            </h3>
                            <p style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.25rem' }}>
                                +12.5% vs période précédente
                            </p>
                        </div>
                    </div>
                </Card>

                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: 'var(--secondary-lighter)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <DollarSign size={24} color="var(--secondary)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Commissions
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                {formatCurrency(totalCommissions)}
                            </h3>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                                {((totalCommissions / totalRevenue) * 100).toFixed(1)}% du CA
                            </p>
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
                            <FileText size={24} color="#D97706" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                TVA Collectée
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                {formatCurrency(totalTax)}
                            </h3>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                                18% du CA HT
                            </p>
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
                            <Users size={24} color="var(--success)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Vendeurs Actifs
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                {totalVendors}
                            </h3>
                            <p style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.25rem' }}>
                                +8 ce mois
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
                {/* Revenue Chart */}
                <Card style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                        Évolution du CA et Commissions
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="month" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)'
                                }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2} name="CA" />
                            <Line type="monotone" dataKey="commissions" stroke="var(--secondary)" strokeWidth={2} name="Commissions" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                {/* Vendor Distribution */}
                <Card style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                        Répartition des Vendeurs
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={vendorDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {vendorDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Document Stats */}
            <Card style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                    Statistiques Documents
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={documentStats}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="type" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)'
                            }}
                        />
                        <Legend />
                        <Bar dataKey="count" fill="var(--primary)" name="Nombre" />
                        <Bar dataKey="amount" fill="var(--secondary)" name="Montant (FCFA)" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            {/* Top Vendors */}
            <Card style={{ padding: '0', overflow: 'hidden' }}> {/* padding 0 for DataTable full width */}
                <div style={{ padding: '1.5rem 1.5rem 0' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-main)' }}>
                        Top 5 Vendeurs
                    </h3>
                </div>

                <DataTable
                    columns={columns}
                    data={topVendors}
                    searchPlaceholder="Rechercher un vendeur..."
                />
            </Card>
        </div>
    );
};

export default GlobalReportingPage;
