import React from 'react';
import Card from '../../components/ui/Card';
import StatCard from '../../components/dashboard/StatCard';
import ActivityTimeline from '../../components/dashboard/ActivityTimeline';
import { TrendingUp, Users, FileText, Wallet, ArrowRight, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';

const data = [
    { name: 'Lun', ca: 4000 },
    { name: 'Mar', ca: 3000 },
    { name: 'Mer', ca: 5000 },
    { name: 'Jeu', ca: 2780 },
    { name: 'Ven', ca: 6890 },
    { name: 'Sam', ca: 8390 },
    { name: 'Dim', ca: 3490 },
];

const DashboardHome = () => {
    return (
        <div className="fade-in">
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>Vue d'ensemble</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Bienvenue, Jean. Voici ce qui se passe aujourd'hui.</p>
            </div>

            {/* KPI Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <StatCard
                    title="Solde Actuel"
                    value="1,250,000 FCFA"
                    trend="up"
                    trendValue="+12%"
                    icon={Wallet}
                    color="secondary"
                />
                <StatCard
                    title="Factures Payées"
                    value="24"
                    trend="up"
                    trendValue="+5%"
                    icon={FileText}
                    color="primary"
                />
                <StatCard
                    title="Clients Actifs"
                    value="156"
                    trend="down"
                    trendValue="-2%"
                    icon={Users}
                    color="secondary"
                />
                <StatCard
                    title="CA Mensuel"
                    value="3,450,000 FCFA"
                    trend="up"
                    trendValue="+8%"
                    icon={TrendingUp}
                    color="success"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {/* Main Chart */}
                <div className="card hover-lift" style={{ gridColumn: 'span 2', padding: '1.75rem', transition: 'all var(--transition-normal)' }}>
                    <div className="flex-between" style={{ marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.25rem' }}>Performance Financière</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Recettes des 7 derniers jours</p>
                        </div>
                        <button className="btn" style={{
                            padding: '0.5rem 1.25rem',
                            fontSize: '0.875rem',
                            border: '1px solid var(--border-color)',
                            background: 'var(--gradient-secondary)',
                            color: 'white',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all var(--transition-normal)'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            Voir tout
                        </button>
                    </div>

                    <div style={{ height: '350px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorCa" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00BA71" stopOpacity={0.3} />
                                        <stop offset="50%" stopColor="#3B82F6" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#00BA71" />
                                        <stop offset="100%" stopColor="#3B82F6" />
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
                                    contentStyle={{
                                        borderRadius: 'var(--radius-lg)',
                                        border: 'none',
                                        boxShadow: 'var(--shadow-lg)',
                                        padding: '0.75rem 1rem',
                                        background: 'white'
                                    }}
                                    cursor={{ stroke: '#3B82F6', strokeWidth: 2, opacity: 0.3 }}
                                    labelStyle={{ fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.25rem' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="ca"
                                    stroke="url(#strokeGradient)"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorCa)"
                                    animationDuration={1500}
                                    animationEasing="ease-out"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Activity Timeline */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <ActivityTimeline />
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
