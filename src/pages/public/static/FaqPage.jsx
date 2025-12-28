import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Send, User, Mail, MessageSquare, HelpCircle, Home } from 'lucide-react';
import Navbar from '../../../app/public/components/Navbar';
import Footer from '../../../app/public/components/Footer';
import Container from '../../../components/ui/Container';
import { Link } from 'react-router-dom';

const FAQ_CATEGORIES = [
    {
        title: "Gestion & Support",
        items: [
            {
                q: "Quels types d’entreprises accompagnez-vous ?",
                a: "Nous travaillons aussi bien avec les PME, startups, grandes entreprises, ONG et institutions. Nos services s’adaptent aux besoins et à la taille de chaque organisation souhaitant se conformer à la facturation électronique."
            },
            {
                q: "Proposez-vous un accompagnement personnalisé ?",
                a: "Oui. Chaque client est unique : nous réalisons un diagnostic personnalisé afin de proposer des solutions de facturation électronique adaptées à votre secteur et à vos objectifs."
            }
        ]
    },
    {
        title: "Conformité & Fiscalité",
        items: [
            {
                q: "Pouvez-vous nous assister lors d’un contrôle fiscal ou social ?",
                a: "Absolument. Nos experts vous accompagnent tout au long du processus de contrôle, en garantissant la conformité de vos factures normalisées et en facilitant les échanges avec les administrations."
            },
            {
                q: "Offrez-vous des services de formation ?",
                a: "Oui. Nous proposons des formations professionnelles sur l'utilisation du portail FNE, la fiscalité numérique et la gestion commerciale."
            }
        ]
    },
    {
        title: "Contact & Services",
        items: [
            {
                q: "Comment prendre rendez-vous avec FNE CONNECT ?",
                a: "Vous pouvez nous contacter par téléphone, e-mail ou via le formulaire en ligne sur notre site. Nous vous proposerons un créneau adapté pour un premier diagnostic gratuit de vos besoins."
            },
            {
                q: "Qu’est-ce qui vous distingue des autres cabinets ?",
                a: "Notre force réside dans notre spécialisation technologique, notre transparence et notre accompagnement de proximité. FNE CONNECT est plus qu'un outil, c'est un partenaire stratégique pour votre conformité."
            }
        ]
    }
];

const FaqPage = () => {
    const [activeIndex, setActiveIndex] = useState("0-0"); // Format: "catIndex-itemIndex"

    const toggleAccordion = (id) => {
        setActiveIndex(activeIndex === id ? null : id);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
            <Navbar />

            {/* Page Hero Section */}
            <div style={{
                position: 'relative',
                height: '400px',
                background: 'linear-gradient(rgba(10, 111, 189, 0.85), rgba(6, 78, 59, 0.85)), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000)',
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
                        <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '4px' }}>Faq's</h1>

                        {/* Breadcrumbs */}

                    </div>
                </Container>
            </div>

            <main style={{ flex: 1, padding: '5rem 0' }}>
                <Container>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start' }}>

                        {/* Sidebar - Contact Form */}
                        <aside style={{
                            background: 'white',
                            padding: '2.5rem',
                            borderRadius: '1.25rem',
                            boxShadow: 'var(--shadow-lg)',
                            position: 'sticky',
                            top: '100px'
                        }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.5rem' }}>Posez votre Question</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Un expert vous répondra dans les plus brefs délais.</p>
                            </div>

                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={(e) => e.preventDefault()}>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                                    <input type="text" placeholder="Votre Nom" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#f8fafc' }} />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                                    <input type="email" placeholder="Votre Email" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#f8fafc' }} />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <MessageSquare size={18} style={{ position: 'absolute', left: '1rem', top: '1.25rem', color: 'var(--primary)' }} />
                                    <textarea placeholder="Votre Message" rows="4" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#f8fafc', resize: 'none' }}></textarea>
                                </div>
                                <button style={{
                                    background: 'var(--primary)',
                                    color: 'white',
                                    padding: '1rem',
                                    borderRadius: '0.75rem',
                                    border: 'none',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)'
                                }} className="hover-lift">
                                    Envoyer la Requête <Send size={18} />
                                </button>
                            </form>
                        </aside>

                        {/* Main Content - Accordion */}
                        <div style={{ position: 'relative' }}>
                            {/* Watermark FAQ */}
                            <div style={{
                                position: 'absolute',
                                right: '0',
                                top: '0',
                                fontSize: '10rem',
                                fontWeight: '900',
                                color: '#e2e8f0',
                                opacity: 0.3,
                                zIndex: 0,
                                userSelect: 'none',
                                pointerEvents: 'none'
                            }}>
                                FAQ
                            </div>

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                {FAQ_CATEGORIES.map((cat, catIdx) => (
                                    <div key={catIdx} style={{ marginBottom: '3rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                            <div style={{ width: '4px', height: '24px', background: 'var(--primary)', borderRadius: '2px' }}></div>
                                            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase' }}>{cat.title}</h2>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {cat.items.map((item, itemIdx) => {
                                                const id = `${catIdx}-${itemIdx}`;
                                                const isOpen = activeIndex === id;
                                                return (
                                                    <div key={id} style={{
                                                        background: 'white',
                                                        borderRadius: '1.25rem',
                                                        boxShadow: isOpen ? 'var(--shadow-md)' : '0 2px 4px rgba(0,0,0,0.02)',
                                                        overflow: 'hidden',
                                                        border: '1px solid #f1f5f9',
                                                        transition: 'all 0.3s ease'
                                                    }}>
                                                        <button
                                                            onClick={() => toggleAccordion(id)}
                                                            style={{
                                                                width: '100%',
                                                                padding: '1.5rem 2rem',
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
                                                                fontSize: '1.1rem',
                                                                fontWeight: '700',
                                                                color: isOpen ? 'var(--primary)' : 'var(--text-main)',
                                                                transition: 'color 0.3s'
                                                            }}>
                                                                {item.q}
                                                            </span>
                                                            <div style={{
                                                                width: '24px',
                                                                height: '24px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                color: isOpen ? 'var(--primary)' : '#94a3b8',
                                                                transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                                                transition: 'all 0.3s ease'
                                                            }}>
                                                                <ChevronRight size={20} />
                                                            </div>
                                                        </button>

                                                        <div style={{
                                                            maxHeight: isOpen ? '500px' : '0',
                                                            overflow: 'hidden',
                                                            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                                                        }}>
                                                            <div style={{
                                                                padding: '0 2rem 2rem 2rem',
                                                                color: 'var(--text-secondary)',
                                                                lineHeight: 1.6,
                                                                fontSize: '1rem',
                                                                borderTop: '1px solid #f1f5f9'
                                                            }}>
                                                                <div style={{ marginTop: '1.5rem' }}>
                                                                    {item.a}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
};

export default FaqPage;

