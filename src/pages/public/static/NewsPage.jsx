import React from 'react';
import Navbar from '../../../app/public/components/Navbar';
import Footer from '../../../app/public/components/Footer';
import Container from '../../../components/ui/Container';

const NEWS_ITEMS = [
    { title: "Lancement officiel de FNE Connect", date: "15 Oct 2024", summary: "La plateforme est désormais ouverte à toutes les PME." },
    { title: "Nouvelle réglementation fiscale 2025", date: "01 Nov 2024", summary: "Ce qui change pour la facturation électronique dès janvier." },
    { title: "Partenariat avec la Chambre de Commerce", date: "10 Nov 2024", summary: "Un accompagnement renforcé pour les entrepreneurs." }
];

const NewsPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
            <Navbar />

            {/* Page Hero Section */}
            <div style={{
                position: 'relative',
                height: '400px',
                background: 'linear-gradient(rgba(10, 111, 189, 0.85), rgba(6, 78, 59, 0.85)), url(https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2000)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: 'white',
                marginTop: '0'
            }}>
                <Container>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem', display: 'block' }}>FNE CONNECT</span>
                        <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '4px' }}>Actualités</h1>
                    </div>
                </Container>
            </div>

            <main style={{ flex: 1, padding: '5rem 0' }}>
                <Container>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {NEWS_ITEMS.map((item, idx) => (
                            <div key={idx} className="card hover-lift" style={{ padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                                <span style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: '600' }}>{item.date}</span>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0.5rem 0 1rem', color: 'var(--text-main)' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{item.summary}</p>
                                <button className="btn-link" style={{ marginTop: '1rem', color: 'var(--primary)', fontWeight: '600' }}>Lire la suite →</button>
                            </div>
                        ))}
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
};

export default NewsPage;
