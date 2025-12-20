import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Container from '../../components/ui/Container';
import { Target, Award, Users, Heart, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
            <Navbar />

            {/* Page Hero Section */}
            <div style={{
                position: 'relative',
                height: '400px',
                background: 'linear-gradient(rgba(10, 111, 189, 0.85), rgba(6, 78, 59, 0.85)), url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000)',
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
                        <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '4px' }}>À Propos</h1>
                    </div>
                </Container>
            </div>

            <main style={{ flex: 1, background: '#f8fafc' }}>

                {/* Mot du DG */}
                <section style={{ padding: '6rem 0' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    width: '100%',
                                    height: '500px',
                                    background: 'url(https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1000)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'top center',
                                    borderRadius: '2px',
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                                }}></div>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-2rem',
                                    right: '-2rem',
                                    background: 'var(--secondary)', // Blue
                                    padding: '2rem',
                                    color: 'white',
                                    zIndex: 10,
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                }}>
                                    <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: '700' }}>M. KOUASSI Jean-Pierre</h3>
                                    <p style={{ margin: '0.5rem 0 0', opacity: 0.8, fontSize: '0.9rem' }}>Directeur Général</p>
                                </div>
                            </div>

                            <div>
                                <span style={{ color: 'var(--primary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>Le Mot du Directeur</span>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', color: '#1e293b' }}>
                                    Bâtir l'avenir de la <span style={{ color: 'var(--secondary)' }}>conformité fiscale</span>.
                                </h2>
                                <div style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#475569' }}>
                                    <p style={{ marginBottom: '1.5rem' }}>
                                        "L'économie numérique exige une rigueur et une transparence absolues. Chez FNE Connect, nous avons fait le choix de l'exigence."
                                    </p>
                                    <p style={{ marginBottom: '1.5rem' }}>
                                        "Notre plateforme n'est pas qu'un outil technique ; c'est un gage de sérénité pour les dirigeants qui souhaitent se concentrer sur l'essentiel : leur croissance."
                                    </p>
                                    <p>
                                        "Bienvenue dans une nouvelle ère de gestion."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision & Mission */}
                <section style={{ padding: '6rem 0', background: 'white' }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 5rem' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', color: '#1e293b' }}>Notre Vision</h2>
                            <p style={{ fontSize: '1.25rem', color: '#64748b', lineHeight: 1.6 }}>
                                Devenir le catalyseur de la transformation numérique des entreprises en Afrique de l'Ouest.
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                            {[
                                { title: "Innovation", desc: "Nous anticipons les évolutions réglementaires et technologiques." },
                                { title: "Excellence", desc: "Chaque ligne de code vise la perfection opérationnelle." },
                                { title: "Proximité", desc: "La technologie n'efface pas l'humain. Notre support est là pour vous." }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    padding: '2.5rem',
                                    background: '#f8fafc',
                                    borderLeft: `4px solid ${idx % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'}` // Alternating colors
                                }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>{item.title}</h3>
                                    <p style={{ color: '#64748b', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Atouts */}
                <section style={{ padding: '6rem 0', background: 'var(--secondary)', color: 'white' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                            <div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem' }}>Pourquoi les leaders nous choisissent</h2>
                                <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.8 }}>
                                    Parce que dans un monde incertain, la fiabilité n'est pas une option. FNE Connect est construit sur des fondations solides.
                                </p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                {[
                                    { number: "100%", label: "Conforme DGI" },
                                    { number: "24/7", label: "Disponibilité" },
                                    { number: "SSL", label: "Cryptage Avancé" },
                                    { number: "< 1s", label: "Temps de latence" }
                                ].map((stat, idx) => (
                                    <div key={idx}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-light)', marginBottom: '0.5rem' }}>{stat.number}</div>
                                        <div style={{ fontSize: '1rem', fontWeight: '500', opacity: 0.9 }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Valeurs */}
                <section style={{ padding: '6rem 0' }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e293b' }}>Nos Valeurs Fondamentales</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }} className="hide-on-mobile">
                            {['Intégrité', 'Rigueur', 'Transparence', 'Agilité'].map((val, idx) => (
                                <div key={idx} style={{
                                    padding: '2rem',
                                    textAlign: 'center',
                                    border: '1px solid #e2e8f0',
                                    background: 'white',
                                    transition: 'all 0.3s'
                                }} className="card-hover">
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e3a8a' }}>{val}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section style={{ padding: '6rem 0', background: '#f1f5f9', textAlign: 'center' }}>
                    <div className="container">
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', color: '#1e293b' }}>Prêt à passer au niveau supérieur ?</h2>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/contact')}
                            style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}
                        >
                            Contactez notre direction
                        </button>
                    </div>
                </section>

            </main>
            <Footer />
        </div >
    );
};

export default AboutPage;
