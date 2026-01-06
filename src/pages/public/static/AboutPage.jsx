import React from 'react';
import Navbar from '../../../app/public/components/Navbar';
import Footer from '../../../app/public/components/Footer';
import Container from '../../../components/ui/Container';
import { Target, Award, Users, Heart, ArrowRight, ShieldCheck, Scale, Search, Zap, Linkedin, Mail, Twitter, Quote, CheckCircle2, Globe, Rocket, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import dgImage from '../../../assets/dg.jpg';

const AboutPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
            <Navbar />

            {/* Premium Hero Section */}
            <div style={{
                position: 'relative',
                height: '450px',
                background: 'linear-gradient(rgba(1, 33, 67, 0.8), rgba(1, 33, 67, 0.95)), url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                    zIndex: 0
                }}></div>
                <Container style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <span style={{
                            background: 'rgba(255,255,255,0.1)',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '50px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            marginBottom: '1.5rem',
                            display: 'inline-block',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            letterSpacing: '1px'
                        }}>
                            NOTRE HISTOIRE
                        </span>
                        <h1 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                            Au service de votre <br />
                            <span style={{ color: 'var(--primary-light)' }}>transparence fiscale.</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, lineHeight: 1.6 }}>
                            FNE Connect est le leader ivoirien du portage fiscal numérique, alliant expertise technique et rigueur administrative.
                        </p>
                    </div>
                </Container>
            </div>

            <main style={{ flex: 1, background: '#f8fafc' }}>

                {/* Mot du DG - Refined */}
                <section style={{ padding: '8rem 0' }}>
                    <Container>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6rem', alignItems: 'center' }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-40px',
                                    left: '-40px',
                                    width: '200px',
                                    height: '200px',
                                    border: '15px solid rgba(16, 185, 129, 0.1)',
                                    borderRadius: '3rem',
                                    zIndex: 0
                                }}></div>
                                <div style={{
                                    width: '100%',
                                    height: '550px',
                                    background: `url(${dgImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'top center',
                                    borderRadius: '3rem',
                                    boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.2)',
                                    position: 'relative',
                                    zIndex: 1
                                }}></div>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '3rem',
                                    right: '-3rem',
                                    background: 'white',
                                    padding: '2.5rem',
                                    borderRadius: '2rem',
                                    zIndex: 10,
                                    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
                                    border: '1px solid #f1f5f9'
                                }}>
                                    <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: '900', color: '#1e293b' }}>M. KOUASSI Jean-Pierre</h3>
                                    <p style={{ margin: '0.5rem 0 0', color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Directeur Général</p>
                                </div>
                            </div>

                            <div>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '15px',
                                    background: 'var(--bg-main)',
                                    color: 'var(--primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '2rem'
                                }}>
                                    <Quote size={30} fill="currentColor" />
                                </div>
                                <span style={{ color: 'var(--primary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>Vision de Leader</span>
                                <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '2.5rem', color: '#1e293b', lineHeight: 1.1 }}>
                                    Bâtir l'avenir de la <span style={{ color: 'var(--secondary)' }}>conformité fiscale</span>.
                                </h2>
                                <div style={{ fontSize: '1.15rem', lineHeight: 1.9, color: '#64748b' }}>
                                    <p style={{ marginBottom: '2rem', fontStyle: 'italic', fontSize: '1.25rem', color: '#334155' }}>
                                        "L'économie numérique exige une rigueur et une transparence absolues. Chez FNE Connect, nous avons fait le choix de l'exigence pour libérer le potentiel des entreprises ivoiriennes."
                                    </p>
                                    <p style={{ marginBottom: '2rem' }}>
                                        "Notre plateforme n'est pas qu'un outil technique ; c'est un gage de sérénité pour les dirigeants qui souhaitent se concentrer sur l'essentiel : leur cœur de métier et leur croissance durable."
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '40px', height: '1px', background: '#e2e8f0' }}></div>
                                        <p style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>Bienvenue dans une nouvelle ère de gestion.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Vision & Values - Combined Premium Section */}
                <section style={{ padding: '10rem 0', background: 'white' }}>
                    <Container>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center', marginBottom: '10rem' }}>
                            <div>
                                <span style={{ color: 'var(--primary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1rem', display: 'block' }}>Notre Mission</span>
                                <h2 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '2rem', lineHeight: 1.1 }}>Accélérer la <span style={{ color: 'var(--primary)' }}>digitalisation</span> de l'Afrique.</h2>
                                <p style={{ fontSize: '1.25rem', color: '#64748b', lineHeight: 1.8, marginBottom: '3rem' }}>
                                    Nous croyons qu'une fiscalité simplifiée et transparente est le socle d'une économie forte. Notre mission est de fournir les outils technologiques pour rendre cette vision réelle pour chaque entreprise.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '1.5rem', border: '1px solid #f1f5f9' }}>
                                        <Globe size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                                        <h4 style={{ fontWeight: '800', marginBottom: '0.5rem' }}>Impact Local</h4>
                                        <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>Soutenir la croissance des PME locales.</p>
                                    </div>
                                    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '1.5rem', border: '1px solid #f1f5f9' }}>
                                        <Rocket size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                                        <h4 style={{ fontWeight: '800', marginBottom: '0.5rem' }}>Vision 2030</h4>
                                        <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>Être le leader technologique régional.</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
                                    alt="Workspace"
                                    style={{ width: '100%', borderRadius: '3rem', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.15)' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '-30px',
                                    right: '-30px',
                                    width: '120px',
                                    height: '120px',
                                    background: 'var(--primary)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: '900',
                                    fontSize: '1.5rem',
                                    boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)',
                                    border: '10px solid white'
                                }}>
                                    #1
                                </div>
                            </div>
                        </div>

                        {/* Valeurs Fondamentales */}
                        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 5rem' }}>
                            <span style={{ color: 'var(--primary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1rem', display: 'block' }}>Notre ADN</span>
                            <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem' }}>Nos Valeurs Fondamentales</h2>
                            <p style={{ color: '#64748b', fontSize: '1.15rem', lineHeight: 1.7 }}>Des principes qui guident chaque décision et chaque ligne de code que nous produisons pour garantir votre sérénité.</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                            {[
                                {
                                    title: 'Intégrité',
                                    desc: 'L\'honnêteté et l\'éthique sont au cœur de toutes nos actions envers nos partenaires et clients.',
                                    icon: <ShieldCheck size={32} />,
                                    color: '#0ea5e9'
                                },
                                {
                                    title: 'Rigueur',
                                    desc: 'Une précision chirurgicale dans le traitement des données et la conformité réglementaire DGI.',
                                    icon: <Scale size={32} />,
                                    color: '#10b981'
                                },
                                {
                                    title: 'Transparence',
                                    desc: 'Une visibilité totale pour une confiance durable entre l\'administration et les contribuables.',
                                    icon: <Search size={32} />,
                                    color: '#f59e0b'
                                },
                                {
                                    title: 'Innovation',
                                    desc: 'Nous repoussons les limites technologiques pour simplifier votre quotidien fiscal complexe.',
                                    icon: <Zap size={32} />,
                                    color: '#8b5cf6'
                                }
                            ].map((val, idx) => (
                                <div key={idx} className="hover-lift" style={{
                                    padding: '4rem 2.5rem',
                                    background: 'white',
                                    borderRadius: '2.5rem',
                                    border: '1px solid #f1f5f9',
                                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)',
                                    textAlign: 'center',
                                    transition: 'all 0.3s'
                                }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '24px',
                                        background: `${val.color}10`,
                                        color: val.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 2.5rem',
                                    }}>
                                        {val.icon}
                                    </div>
                                    <h4 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.25rem' }}>{val.title}</h4>
                                    <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '1.05rem', margin: 0 }}>{val.desc}</p>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Stat Section - Improved */}
                <section style={{ padding: '8rem 0', background: 'var(--secondary)', color: 'white', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.1 }}>
                        <BarChart size={400} />
                    </div>
                    <Container>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6rem', alignItems: 'center' }}>
                            <div>
                                <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '2rem', lineHeight: 1.1 }}>Pourquoi les leaders <br />nous choisissent</h2>
                                <p style={{ fontSize: '1.2rem', opacity: 0.85, lineHeight: 1.8 }}>
                                    Dans un environnement fiscal en constante évolution, la fiabilité n'est pas une option, c'est une exigence. FNE Connect est construit sur des piliers de sécurité inébranlables.
                                </p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                                {[
                                    { number: "100%", label: "Conforme DGI" },
                                    { number: "99.9%", label: "Disponibilité" },
                                    { number: "AES-256", label: "Cryptage" },
                                    { number: "10 Ans", label: "Archivage Légal" }
                                ].map((stat, idx) => (
                                    <div key={idx}>
                                        <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--primary-light)', marginBottom: '0.5rem' }}>{stat.number}</div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.9 }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Notre Équipe */}
                <section style={{ padding: '10rem 0', background: 'white' }}>
                    <Container>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6rem', gap: '2rem', flexWrap: 'wrap' }}>
                            <div style={{ maxWidth: '650px' }}>
                                <span style={{ color: 'var(--secondary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1rem', display: 'block' }}>L'excellence humaine</span>
                                <h2 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#1e293b', lineHeight: 1.1 }}>Derrière la technologie,<br />une <span style={{ color: 'var(--primary)' }}>équipe d'experts</span>.</h2>
                            </div>
                            <p style={{ color: '#64748b', fontSize: '1.15rem', maxWidth: '450px', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                                Nos talents combinent expertise fiscale pointue, ingénierie logicielle de haut niveau et vision stratégique panafricaine.
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
                            {[
                                {
                                    name: "M. KOUASSI Jean-Pierre",
                                    role: "Directeur Général",
                                    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
                                    bio: "Visionnaire du portage fiscal en Afrique de l'Ouest avec 20 ans d'expérience au sommet."
                                },
                                {
                                    name: "Marc-Emanuel N'GUESSAN",
                                    role: "Directeur Technique",
                                    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
                                    bio: "Architecte Cloud & Sécurité, garant de la robustesse et de la scalabilité de FNE Connect."
                                },
                                {
                                    name: "Awa TOURE",
                                    role: "Directrice des Opérations",
                                    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
                                    bio: "Experte en optimisation de processus assurant une expérience client fluide et impeccable."
                                },
                                {
                                    name: "Dr. Koffi KAN",
                                    role: "Resp. Conformité DGI",
                                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
                                    bio: "Ancien auditeur fiscal garantissant la parfaite conformité légale de chaque flux sur la plateforme."
                                }
                            ].map((member, idx) => (
                                <div key={idx} className="team-card" style={{ position: 'relative' }}>
                                    <div style={{
                                        height: '450px',
                                        borderRadius: '3rem',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        marginBottom: '2rem',
                                        boxShadow: '0 30px 60px -20px rgba(0,0,0,0.15)',
                                        border: '8px solid white'
                                    }}>
                                        <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} className="member-image" />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            padding: '2.5rem',
                                            background: 'linear-gradient(transparent, rgba(1, 33, 67, 0.95))',
                                            color: 'white',
                                            opacity: 0,
                                            transform: 'translateY(20px)',
                                            transition: 'all 0.4s ease'
                                        }} className="member-overlay">
                                            <p style={{ fontSize: '1rem', margin: '0 0 1.5rem', lineHeight: 1.6, opacity: 0.9 }}>{member.bio}</p>
                                            <div style={{ display: 'flex', gap: '1.25rem' }}>
                                                {[Linkedin, Twitter, Mail].map((Icon, i) => (
                                                    <div key={i} style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                        <Icon size={18} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <h5 style={{ fontSize: '1.4rem', fontWeight: '900', margin: '0 0 0.5rem', color: '#1e293b' }}>{member.name}</h5>
                                    <p style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Premium CTA Section */}
                <section style={{ padding: '4rem 0 8rem' }}>
                    <Container>
                        <div style={{
                            padding: '6rem 4rem',
                            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                            borderRadius: '3.5rem',
                            color: 'white',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 40px 60px -15px rgba(0,0,0,0.3)'
                        }}>
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '2rem', lineHeight: 1.1 }}>Prêt à transformer <br />votre gestion ?</h2>
                                <p style={{ fontSize: '1.3rem', opacity: 0.8, marginBottom: '3.5rem', maxWidth: '750px', margin: '0 auto 3.5rem', lineHeight: 1.7 }}>
                                    Entamez votre transition numérique dès aujourd'hui avec l'accompagnement d'une direction experte et visionnaire.
                                </p>
                                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <button
                                        onClick={() => navigate('/contact')}
                                        style={{
                                            background: 'var(--primary)',
                                            color: 'white',
                                            padding: '1.25rem 4rem',
                                            fontWeight: '800',
                                            borderRadius: '1.25rem',
                                            border: 'none',
                                            fontSize: '1.2rem',
                                            cursor: 'pointer',
                                            boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            transition: 'all 0.3s'
                                        }}
                                        className="hover-lift"
                                    >
                                        Prendre Rendez-vous <ArrowRight size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

            </main>
            <Footer />
            <style>{`
                .team-card:hover .member-image {
                    transform: scale(1.1);
                }
                .team-card:hover .member-overlay {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .hover-lift:hover {
                    transform: translateY(-10px);
                }
            `}</style>
        </div >
    );
};

export default AboutPage;
