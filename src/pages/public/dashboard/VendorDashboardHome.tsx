import React from 'react';
import Card from '../../../components/ui/Card';
import StatCard from '../../../app/shared/components/dashboard/StatCard';
import ActivityTimeline from '../../../app/shared/components/dashboard/ActivityTimeline';
import { TrendingUp, Users, FileText, Wallet, Plus, ArrowRight, DollarSign, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthProvider';

const vendorData = [
    { name: 'Lun', sales: 120000 },
    { name: 'Mar', sales: 150000 },
    { name: 'Mer', sales: 80000 },
    { name: 'Jeu', sales: 200000 },
    { name: 'Ven', sales: 180000 },
    { name: 'Sam', sales: 250000 },
    { name: 'Dim', sales: 100000 },
];

const VendorDashboardHome = () => {
    const { user } = useAuth();

    return (
        <div className="fade-in">
            {/* Header Section */}
            <div style={{
                marginBottom: '2.5rem',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                padding: '2rem',
                borderRadius: 'var(--radius-xl)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)'
            }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.025em', marginBottom: '0.5rem', color: 'white' }}>
                        Bonjour, {user?.name || 'Vendeur'} 👋
                    </h1>
                    <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>
                        Voici vos performances de vente cette semaine.
                    </p>
                </div>
                <Link to="/dashboard/invoices/new">
                    <button className="btn" style={{
                        backgroundColor: 'white',
                        color: 'var(--primary)',
                        fontWeight: '700',
                        padding: '0.75rem 1.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <Plus size={20} />
                        Nouvelle Facture
                    </button>
                </Link>
            </div>

            {/* Vendor Specific KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <StatCard
                    title="Solde Actuel"
                    value="450,000 FCFA"
                    trend="neutral"
                    trendValue="Disp."
                    icon={Wallet}
                    color="primary"
                />
                <StatCard
                    title="Mes Ventes"
                    value="1,080,000 FCFA"
                    trend="up"
                    trendValue="+15%"
                    icon={DollarSign}
                    color="success"
                />
                <StatCard
                    title="Commissions"
                    value="108,000 FCFA"
                    trend="up"
                    trendValue="+15%"
                    icon={CreditCard}
                    color="warning"
                />
                <StatCard
                    title="Clients"
                    value="42"
                    trend="up"
                    trendValue="+3"
                    icon={Users}
                    color="primary"
                />
                <StatCard
                    title="Factures Impayées"
                    value="3"
                    trend="down"
                    trendValue="-1"
                    icon={FileText}
                    color="danger"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {/* Sales Chart */}
                <Card style={{ padding: '1.5rem', gridColumn: 'span 2' }}>
                    <div className="flex-between" style={{ marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                                Évolution des Ventes
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Vos performances sur les 7 derniers jours</p>
                        </div>
                    </div>

                    <div style={{ height: '350px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={vendorData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" opacity={0.3} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748B', fontSize: 13, fontWeight: 500 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748B', fontSize: 13, fontWeight: 500 }}
                                    dx={-10}
                                />
                                <Tooltip
                                    cursor={{ fill: 'var(--bg-secondary)', opacity: 0.4 }}
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        padding: '12px'
                                    }}
                                />
                                <Bar
                                    dataKey="sales"
                                    fill="var(--primary)"
                                    radius={[6, 6, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Quick Actions Card */}
                <Card style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                        Actions Rapides
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Link to="/dashboard/quotes/new">
                            <button className="btn btn-light" style={{ width: '100%', justifyContent: 'flex-start', padding: '1rem' }}>
                                <FileText size={20} style={{ marginRight: '1rem', color: 'var(--primary)' }} />
                                Créer un Devis
                            </button>
                        </Link>
                        <Link to="/dashboard/clients/new">
                            <button className="btn btn-light" style={{ width: '100%', justifyContent: 'flex-start', padding: '1rem' }}>
                                <Users size={20} style={{ marginRight: '1rem', color: 'var(--success)' }} />
                                Ajouter un Client
                            </button>
                        </Link>
                        <Link to="/dashboard/payments">
                            <button className="btn btn-light" style={{ width: '100%', justifyContent: 'flex-start', padding: '1rem' }}>
                                <CreditCard size={20} style={{ marginRight: '1rem', color: 'var(--warning)' }} />
                                Voir mes Paiements
                            </button>
                        </Link>
                    </div>
                </Card>

                {/* Recent Activity */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <ActivityTimeline />
                </div>
            </div>
        </div>
    );
};

export default VendorDashboardHome;
