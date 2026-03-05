import React, { useState, useEffect } from 'react';
import Card from '../../../components/ui/Card';
import StatCard from '../../../app/shared/components/dashboard/StatCard';
import ActivityTimeline from '../../../app/shared/components/dashboard/ActivityTimeline';
import { TrendingUp, Users, FileText, Wallet, Plus, ArrowRight, DollarSign, CreditCard, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthProvider';
import { vendorService } from '../../../services/vendorService';
import toast from 'react-hot-toast';

const VendorDashboardHome = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await vendorService.getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error("Erreur lors du chargement des stats", error);
                toast.error("Impossible de charger les statistiques du tableau de bord");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const formatFCFA = (value: number) => {
        return new Intl.NumberFormat('fr-FR').format(value) + ' FCFA';
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Loader2 className="animate-spin" size={48} color="var(--primary)" />
            </div>
        );
    }

    const { kpis, chart_data } = stats || {
        kpis: { balance: 0, total_sales: 0, commissions: 0, clients: 0, unpaid_invoices: 0 },
        chart_data: []
    };

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
                    value={formatFCFA(kpis.balance)}
                    trend="neutral"
                    trendValue="Disp."
                    icon={Wallet}
                    color="primary"
                />
                <StatCard
                    title="Mes Ventes"
                    value={formatFCFA(kpis.total_sales)}
                    trend="up"
                    trendValue="Total"
                    icon={DollarSign}
                    color="success"
                />
                <StatCard
                    title="Commissions"
                    value={formatFCFA(kpis.commissions)}
                    trend="up"
                    trendValue="Total"
                    icon={CreditCard}
                    color="warning"
                />
                <StatCard
                    title="Clients"
                    value={kpis.clients.toString()}
                    trend="up"
                    trendValue="Actifs"
                    icon={Users}
                    color="primary"
                />
                <StatCard
                    title="Factures Impayées"
                    value={kpis.unpaid_invoices.toString()}
                    trend="down"
                    trendValue="Attente"
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
                            <BarChart data={chart_data}>
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
                                    formatter={(value: any) => [formatFCFA(value), 'Ventes']}
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
