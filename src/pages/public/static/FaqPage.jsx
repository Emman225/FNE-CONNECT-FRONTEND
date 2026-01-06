import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Send, User, Mail, MessageSquare, HelpCircle, Home, Phone, Search, Globe, ShieldCheck, Zap, Scale, Headphones } from 'lucide-react';
import Navbar from '../../../app/public/components/Navbar';
import Footer from '../../../app/public/components/Footer';
import Container from '../../../components/ui/Container';
import { Link } from 'react-router-dom';
import faqHeroImage from '../../../assets/faq.jpg';

const FAQ_CATEGORIES = [
    {
        title: "Général & Découverte",
        icon: <Globe size={20} />,
        items: [
            {
                q: "Qu'est-ce que FNE Connect exactement ?",
                a: "FNE Connect est une plateforme de portage fiscal et de facturation certifiée. Nous servons d'intermédiaire technologique entre votre entreprise et la DGI, simplifiant la mise en conformité et la gestion de vos flux financiers."
            },
            {
                q: "Quels types d’entreprises accompagnez-vous ?",
                a: "Nous accompagnons toutes les structures : auto-entrepreneurs, PME, startups, et grandes entreprises, ainsi que les ONG. Notre solution est modulable pour s'adapter à chaque volume d'activité."
            }
        ]
    },
    {
        title: "Facturation & Conformité DGI",
        icon: <Scale size={20} />,
        items: [
            {
                q: "Comment fonctionne la facturation normalisée sur la plateforme ?",
                a: "Chaque facture créée sur FNE Connect reçoit automatiquement un code de certification DGI. Tout le processus est automatisé : du calcul des taxes (TVA, AIRSI) jusqu'à la génération du document final conforme."
            },
            {
                q: "Offrez-vous une assistance en cas de contrôle fiscal ?",
                a: "Absolument. En tant que partenaire de portage, nous archivons légalement tous vos documents pendant 10 ans et nos experts sont à vos côtés pour justifier la validité de chaque transaction en cas d'audit."
            },
            {
                q: "Qu’en est-il de la réforme fiscale 2025 ?",
                a: "FNE Connect est déjà compatible avec les dernières directives de la loi de finances 2025. Nos systèmes sont pré-configurés pour appliquer les nouveaux taux et protocoles de sécurité dès leur entrée en vigueur."
            }
        ]
    },
    {
        title: "Sécurité & Technologie",
        icon: <ShieldCheck size={20} />,
        items: [
            {
                q: "Mes données financières sont-elles en sécurité ?",
                a: "Vos données sont cryptées selon le standard bancaire AES-256. Nous effectuons des sauvegardes quotidiennes sur des serveurs hautement sécurisés et redondants pour garantir une disponibilité de 99.9%."
            },
            {
                q: "Puis-je utiliser FNE Connect sur mon smartphone ?",
                a: "Oui, FNE Connect est 'Mobile-First'. Vous pouvez gérer, signer et envoyer vos factures directement depuis votre navigateur mobile ou via notre application dédiée (iOS/Android)."
            }
        ]
    },
    {
        title: "Support & Services Additionnels",
        icon: <Headphones size={20} />,
        items: [
            {
                q: "Proposez-vous des services de formation ?",
                a: "Oui. Nous organisons régulièrement des sessions de formation (présentielles et webinaires) pour vos équipes comptables afin de maîtriser la fiscalité numérique et l'outil FNE."
            },
            {
                q: "Comment prendre rendez-vous avec un conseiller ?",
                a: "Le plus simple est d'utiliser le formulaire de contact ci-contre ou de nous appeler directement au numéro vert affiché sur le site. Un premier diagnostic est toujours offert."
            }
        ]
    }
];

const FaqPage = () => {
    const [activeIndex, setActiveIndex] = useState("0-0");
    const [searchQuery, setSearchQuery] = useState("");

    const toggleAccordion = (id) => {
        setActiveIndex(activeIndex === id ? null : id);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
            <Navbar />

            {/* Premium Hero Section */}
            <div style={{
                position: 'relative',
                height: '450px',
                background: `linear-gradient(rgba(1, 33, 67, 0.85), rgba(0, 102, 204, 0.4)), url(${faqHeroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    filter: 'blur(100px)',
                    opacity: 0.2
                }}></div>

                <Container>
                    <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <span style={{
                            background: 'rgba(255,255,255,0.15)',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '50px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            marginBottom: '1.5rem',
                            display: 'inline-block',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            CENTRE D'ASSISTANCE
                        </span>
                        <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                            Comment pouvons-nous <br />
                            <span style={{ color: 'var(--primary-light)' }}>vous aider ?</span>
                        </h1>

                        <div style={{ position: 'relative', maxWidth: '600px', margin: '2rem auto 0' }}>
                            <Search size={22} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                            <input
                                type="text"
                                placeholder="Rechercher une réponse..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1.25rem 1.5rem 1.25rem 4rem',
                                    borderRadius: '100px',
                                    border: 'none',
                                    fontSize: '1.1rem',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                    outline: 'none',
                                    color: '#1e293b'
                                }}
                            />
                        </div>
                    </div>
                </Container>
            </div>

            <main style={{ flex: 1, padding: '6rem 0' }}>
                <Container>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '5rem', alignItems: 'start' }}>

                        {/* Sidebar - Modern Contact Card */}
                        <aside style={{ position: 'sticky', top: '100px' }}>
                            <div style={{
                                background: 'white',
                                padding: '3rem 2rem',
                                borderRadius: '2rem',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)',
                                border: '1px solid #f1f5f9',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '20px',
                                    background: 'var(--bg-main)',
                                    color: 'var(--primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 2rem'
                                }}>
                                    <HelpCircle size={35} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '1rem' }}>Toujours des doutes ?</h3>
                                <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: 1.6 }}>Nos experts sont disponibles du lundi au vendredi de 8h à 18h.</p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <a href="tel:+2250102030405" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        borderRadius: '1rem',
                                        background: '#f8fafc',
                                        textDecoration: 'none',
                                        color: '#1e293b',
                                        fontWeight: '700',
                                        transition: 'all 0.3s'
                                    }} className="hover-lift">
                                        <div style={{ background: 'white', padding: '0.5rem', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                            <Phone size={20} color="var(--primary)" />
                                        </div>
                                        +225 07 07 07 07 07
                                    </a>

                                    <Link to="/contact" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        borderRadius: '1rem',
                                        background: 'var(--primary)',
                                        textDecoration: 'none',
                                        color: 'white',
                                        fontWeight: '700',
                                        boxShadow: '0 10px 15px -3px rgba(30, 64, 175, 0.25)',
                                        transition: 'all 0.3s'
                                    }} className="hover-lift">
                                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '10px' }}>
                                            <Mail size={20} />
                                        </div>
                                        Envoyer un Message
                                    </Link>
                                </div>
                            </div>

                            <div style={{
                                marginTop: '2rem',
                                padding: '2rem',
                                borderRadius: '2rem',
                                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                color: 'white',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <Zap size={60} style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.1, transform: 'rotate(15deg)' }} />
                                <h4 style={{ fontWeight: '800', marginBottom: '0.5rem' }}>Espace Démonstration</h4>
                                <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '1.5rem' }}>Découvrez FNE Connect en action avec nos experts.</p>
                                <button style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: 'var(--primary-light)',
                                    color: 'var(--secondary)',
                                    fontWeight: '700',
                                    cursor: 'pointer'
                                }}>Réserver une Démo</button>
                            </div>
                        </aside>

                        {/* Main Content - Improved Accordion */}
                        <div style={{ position: 'relative' }}>
                            {FAQ_CATEGORIES.map((cat, catIdx) => {
                                // Filter items based on search query
                                const filteredItems = cat.items.filter(item =>
                                    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    item.a.toLowerCase().includes(searchQuery.toLowerCase())
                                );

                                if (searchQuery && filteredItems.length === 0) return null;

                                return (
                                    <div key={catIdx} style={{ marginBottom: '4rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                            <div style={{
                                                width: '45px',
                                                height: '45px',
                                                borderRadius: '12px',
                                                background: 'white',
                                                color: 'var(--primary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                                border: '1px solid #f1f5f9'
                                            }}>
                                                {cat.icon}
                                            </div>
                                            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', margin: 0 }}>{cat.title}</h2>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                            {filteredItems.map((item, itemIdx) => {
                                                const id = `${catIdx}-${itemIdx}`;
                                                const isOpen = activeIndex === id;
                                                return (
                                                    <div key={id} style={{
                                                        background: 'white',
                                                        borderRadius: '1.5rem',
                                                        boxShadow: isOpen ? '0 20px 25px -5px rgba(0,0,0,0.05)' : 'none',
                                                        border: isOpen ? '1px solid var(--primary-light)' : '1px solid #f1f5f9',
                                                        overflow: 'hidden',
                                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                                    }}>
                                                        <button
                                                            onClick={() => toggleAccordion(id)}
                                                            style={{
                                                                width: '100%',
                                                                padding: '1.75rem 2rem',
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                background: 'none',
                                                                border: 'none',
                                                                textAlign: 'left',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <span style={{
                                                                fontSize: '1.15rem',
                                                                fontWeight: '700',
                                                                color: isOpen ? '#1e293b' : '#334155',
                                                                lineHeight: 1.4,
                                                                flex: 1,
                                                                paddingRight: '2rem'
                                                            }}>
                                                                {item.q}
                                                            </span>
                                                            <div style={{
                                                                width: '32px',
                                                                height: '32px',
                                                                borderRadius: '50%',
                                                                background: isOpen ? 'var(--primary)' : '#f8fafc',
                                                                color: isOpen ? 'white' : '#94a3b8',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                transition: 'all 0.3s ease',
                                                                flexShrink: 0
                                                            }}>
                                                                {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                                            </div>
                                                        </button>

                                                        <div style={{
                                                            maxHeight: isOpen ? '1000px' : '0',
                                                            opacity: isOpen ? 1 : 0,
                                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            overflow: 'hidden'
                                                        }}>
                                                            <div style={{
                                                                padding: '0 2rem 2rem 2rem',
                                                                color: '#64748b',
                                                                lineHeight: 1.8,
                                                                fontSize: '1.05rem',
                                                                borderTop: '1px solid #f1f5f9'
                                                            }}>
                                                                <div style={{ marginTop: '1.5rem' }}>
                                                                    {item.a}
                                                                </div>
                                                                <div style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '1.5rem',
                                                                    marginTop: '2rem',
                                                                    paddingTop: '1.5rem',
                                                                    borderTop: '1px dotted #e2e8f0',
                                                                    fontSize: '0.9rem'
                                                                }}>
                                                                    <span>Est-ce utile ?</span>
                                                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                                                        <button style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: '700', cursor: 'pointer' }}>Oui</button>
                                                                        <button style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: '700', cursor: 'pointer' }}>Non</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}

                            {searchQuery && FAQ_CATEGORIES.every(cat =>
                                !cat.items.some(item =>
                                    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    item.a.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                            ) && (
                                    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                                        <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Aucun résultat trouvé</h3>
                                        <p style={{ color: '#64748b' }}>Essayez avec d'autres mots-clés ou contactez notre support.</p>
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            style={{ marginTop: '2rem', color: 'var(--primary)', fontWeight: '700', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                                        >Voir toutes les questions</button>
                                    </div>
                                )}
                        </div>

                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
};

export default FaqPage;

