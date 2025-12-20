import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

const NEWS_ITEMS = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600',
        date: '15 Déc 2024',
        title: 'Nouvelle réforme sur la TVA',
        excerpt: 'Tout ce que vous devez savoir sur les derniers changements fiscaux annoncés pour 2025.'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
        date: '10 Déc 2024',
        title: 'Digitalisation des PME',
        excerpt: 'Comment la facturation électronique booste la productivité des petites entreprises.'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
        date: '05 Déc 2024',
        title: 'Séminaire de formation FNE',
        excerpt: 'Retour en images sur notre dernière session de formation avec les partenaires.'
    }
];

const HomeNews = () => {
    const navigate = useNavigate();

    return (
        <section style={{ padding: '5rem 0', background: '#f8f9fa' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ maxWidth: '600px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary)' }}>
                            Nos Dernières Actualités
                        </h2>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                            Restez informés des nouveautés fiscales et de la vie de notre plateforme.
                        </p>
                    </div>
                    <button
                        className="btn btn-outline"
                        onClick={() => navigate('/news')}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        Plus d'info <ArrowRight size={20} />
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {NEWS_ITEMS.map((item) => (
                        <div key={item.id} className="card hover-scale" style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }} onClick={() => navigate('/news')}>
                            <div style={{ height: '200px', overflow: 'hidden' }}>
                                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="hover-zoom" />
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '0.75rem', fontWeight: '600' }}>
                                    <Calendar size={16} />
                                    {item.date}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', lineHeight: 1.4, color: 'var(--text-primary)' }}>
                                    {item.title}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0' }}>
                                    {item.excerpt}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeNews;
