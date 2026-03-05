import React, { useState, useEffect } from 'react';
import Card from '../../../components/ui/Card';
import StatCard from '../../../app/shared/components/dashboard/StatCard';
import { Users, ShieldAlert, Activity, Building, UserPlus, FileCheck, Settings, Wallet, FileText, TrendingUp, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, AreaChart, Area } from 'recharts';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthProvider';
import { adminService } from '../../../services/adminService';

const AdminDashboardHome = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const data = await adminService.getDashboardStats();
            setStats(data);
        } catch (error) {
            console.error("Failed to fetch admin stats:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(value);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: '1rem' }}>
                <div className="spinner"></div>
                <p style={{ color: 'var(--text-secondary)' }}>Chargement des données du dashboard...</p>
            </div>
        );
    }

    return (
        <div className="fade-in">
            {/* Header Section */}
            <div style={{
                marginBottom: '2.5rem',
                background: 'linear-gradient(135deg, var(--secondary) 0%, var(--secondary-dark) 100%)',
                padding: '2rem',
                borderRadius: 'var(--radius-xl)',
                color: 'white',
                boxShadow: '0 10px 25px -5px rgba(100, 116, 139, 0.5)'
            }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.025em', marginBottom: '0.5rem', color: 'white' }}>
                    Administration Globale
                </h1>
                <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>
                    Vue d'ensemble de la plateforme FNE Connect. Bienvenue, {user?.name}.
                </p>
            </div>

            {/* Admin Specific KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <StatCard
                    title="Volume Transigé"
                    value={formatCurrency(stats?.total_revenue_collected || 0)}
                    trend="up"
                    trendValue="+12%"
                    icon={Activity}
                    color="success"
                />
                <StatCard
                    title="Vendeurs Actifs"
                    value={stats?.total_vendors || 0}
                    trend="up"
                    trendValue="+5"
                    icon={Building}
                    color="primary"
                />
                <StatCard
                    title="KYC en attente"
                    value={stats?.pending_kyc || 0}
                    trend={stats?.pending_kyc > 0 ? "down" : "up"}
                    trendValue={stats?.pending_kyc > 0 ? "Actions requises" : "À jour"}
                    icon={ShieldAlert}
                    color="danger"
                />
                <StatCard
                    title="Total Commissions"
                    value={formatCurrency(stats?.total_commissions || 0)}
                    trend="up"
                    trendValue="+8%"
                    icon={TrendingUp}
                    color="secondary"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {/* Platform Activity Chart */}
                <Card style={{ padding: '1.5rem', gridColumn: 'span 2' }}>
                    <div className="flex-between" style={{ marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                                Recettes de la Plateforme
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Volume des transactions (7 derniers jours)</p>
                        </div>
                    </div>

                    <div style={{ height: '350px', width: '100%', minHeight: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats?.chart_data || []}>
                                <defs>
                                    <linearGradient id="colorCa" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                        <stop offset="50%" stopColor="var(--primary)" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
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
                                    cursor={{ stroke: 'var(--primary)', strokeWidth: 2, opacity: 0.3 }}
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: 'var(--shadow-lg)',
                                        padding: '12px'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="ca"
                                    stroke="var(--primary)"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorCa)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Administration Quick Actions */}
                <Card style={{ padding: '1.5rem', gridColumn: 'span 2' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                        Gestion Rapide
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        <Link to="/admin/dashboard/vendors">
                            <button className="btn btn-light" style={{ width: '100%', justifyContent: 'flex-start', padding: '1rem' }}>
                                <UserPlus size={20} style={{ marginRight: '1rem', color: 'var(--primary)' }} />
                                Valider Nouveaux Vendeurs
                                {stats?.pending_kyc > 0 && (
                                    <span style={{ marginLeft: 'auto', background: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem' }}>
                                        {stats.pending_kyc}
                                    </span>
                                )}
                            </button>
                        </Link>
                        <Link to="/admin/dashboard/compliance/aml">
                            <button className="btn btn-light" style={{ width: '100%', justifyContent: 'flex-start', padding: '1rem' }}>
                                <ShieldAlert size={20} style={{ marginRight: '1rem', color: 'var(--danger)' }} />
                                Alertes AML Critiques
                                {stats?.active_aml_alerts > 0 && (
                                    <span style={{ marginLeft: 'auto', background: 'var(--danger)', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem' }}>
                                        {stats.active_aml_alerts}
                                    </span>
                                )}
                            </button>
                        </Link>
                        <Link to="/admin/dashboard/reports">
                            <button className="btn btn-light" style={{ width: '100%', justifyContent: 'flex-start', padding: '1rem' }}>
                                <FileCheck size={20} style={{ marginRight: '1rem', color: 'var(--success)' }} />
                                Exporter Rapport DGI
                            </button>
                        </Link>
                        <Link to="/admin/dashboard/config">
                            <button className="btn btn-light" style={{ width: '100%', justifyContent: 'flex-start', padding: '1rem' }}>
                                <Settings size={20} style={{ marginRight: '1rem', color: 'var(--text-secondary)' }} />
                                Configuration Système
                            </button>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
