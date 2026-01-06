import React from 'react';
import Card from '../../../components/ui/Card';
import StatCard from '../../../app/shared/components/dashboard/StatCard';
import { Users, ShieldAlert, Activity, Building, UserPlus, FileCheck, Settings } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthProvider';

const platformActivityData = [
    { name: 'Lun', vendors: 4, transactions: 240 },
    { name: 'Mar', vendors: 3, transactions: 139 },
    { name: 'Mer', vendors: 7, transactions: 980 },
    { name: 'Jeu', vendors: 2, transactions: 390 },
    { name: 'Ven', vendors: 6, transactions: 480 },
    { name: 'Sam', vendors: 1, transactions: 380 },
    { name: 'Dim', vendors: 0, transactions: 430 },
];

const AdminDashboardHome = () => {
    const { user } = useAuth();

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
                    Vue d'ensemble de la plateforme FNE Connect.
                </p>
            </div>

            {/* Admin Specific KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <StatCard
                    title="Vendeurs Actifs"
                    value="124"
                    trend="up"
                    trendValue="+12"
                    icon={Building}
                    color="primary"
                />
                <StatCard
                    title="Volume Global"
                    value="45.2M CFA"
                    trend="up"
                    trendValue="+8.4%"
                    icon={Activity}
                    color="success"
                />
                <StatCard
                    title="Alertes Conformité"
                    value="5"
                    trend="down"
                    trendValue="-2"
                    icon={ShieldAlert}
                    color="danger"
                />
                <StatCard
                    title="Utilisateurs Total"
                    value="450"
                    trend="up"
                    trendValue="+24"
                    icon={Users}
                    color="secondary"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {/* Platform Activity Chart */}
                <Card style={{ padding: '1.5rem', gridColumn: 'span 2' }}>
                    <div className="flex-between" style={{ marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                                Activité de la Plateforme
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Transactions et Nouveaux Vendeurs</p>
                        </div>
                    </div>

                    <div style={{ height: '350px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={platformActivityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" opacity={0.3} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748B', fontSize: 13, fontWeight: 500 }}
                                    dy={10}
                                />
                                <YAxis
                                    yAxisId="left"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748B', fontSize: 13, fontWeight: 500 }}
                                    dx={-10}
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748B', fontSize: 13, fontWeight: 500 }}
                                    dx={10}
                                />
                                <Tooltip
                                    cursor={{ stroke: 'var(--primary)', strokeWidth: 2 }}
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        padding: '12px'
                                    }}
                                />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="transactions"
                                    stroke="var(--primary)"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 2, stroke: '#fff' }}
                                    name="Transactions"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="vendors"
                                    stroke="var(--secondary)"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: 'var(--secondary)', strokeWidth: 2, stroke: '#fff' }}
                                    name="Nouveaux Vendeurs"
                                />
                            </LineChart>
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
                                <span style={{ marginLeft: 'auto', background: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem' }}>3</span>
                            </button>
                        </Link>
                        <Link to="/admin/dashboard/compliance/aml">
                            <button className="btn btn-light" style={{ width: '100%', justifyContent: 'flex-start', padding: '1rem' }}>
                                <ShieldAlert size={20} style={{ marginRight: '1rem', color: 'var(--danger)' }} />
                                Alertes AML Critiques
                                <span style={{ marginLeft: 'auto', background: 'var(--danger)', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem' }}>5</span>
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
