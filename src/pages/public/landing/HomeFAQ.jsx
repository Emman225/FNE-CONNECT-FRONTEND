import React, { useState } from 'react';
import { ChevronRight, ChevronDown, MessageSquare, Plus, Minus } from 'lucide-react';
import faqImage from '../../../assets/faq.jpg';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/ui/Container';

const FAQ_ITEMS = [
    {
        question: "Quels types d’entreprises accompagnez-vous ?",
        answer: "Nous travaillons aussi bien avec les PME, startups, grandes entreprises, ONG et institutions. Nos services s’adaptent aux besoins et à la taille de chaque organisation souhaitant se conformer à la facturation électronique."
    },
    {
        question: "Proposez-vous un accompagnement personnalisé ?",
        answer: "Oui. Chaque client est unique : nous réalisons un diagnostic personnel afin de proposer des solutions de facturation électronique adaptées à votre secteur et à vos objectifs spécifiques."
    },
    {
        question: "Pouvez-vous nous assister lors d’un contrôle fiscal ?",
        answer: "Absolument. Nos experts vous accompagnent tout au long du processus de contrôle, en garantissant la parfaite conformité de vos factures normalisées et en facilitant les échanges avec l'administration."
    },
    {
        question: "Comment prendre rendez-vous avec FNE CONNECT ?",
        answer: "Vous pouvez nous contacter directement via notre formulaire de contact ou par téléphone. Nous vous proposerons un premier diagnostic gratuit pour évaluer vos besoins."
    }
];

const HomeFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    return (
        <section style={{ padding: '10rem 0', background: 'white', position: 'relative', overflow: 'hidden' }}>
            <Container>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'center' }}>

                    {/* Visual Section - Large Rounded Image with Badge */}
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            position: 'absolute',
                            top: '-30px',
                            right: '-30px',
                            width: '200px',
                            height: '200px',
                            background: 'var(--primary-lighter)',
                            borderRadius: '3rem',
                            zIndex: 0
                        }}></div>

                        <div style={{
                            position: 'relative',
                            height: '550px',
                            background: `url(${faqImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '3.5rem',
                            boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.2)',
                            zIndex: 1
                        }}>
                            <div style={{
                                position: 'absolute',
                                bottom: '2.5rem',
                                left: '2.5rem',
                                right: '2.5rem',
                                padding: '2rem',
                                background: 'rgba(255,255,255,1)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '2rem',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                textAlign: 'center'
                            }}>
                                <h4 style={{ fontWeight: '900', color: '#1e293b', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Encore des questions ?</h4>
                                <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Notre équipe d'experts est disponible pour vous répondre.</p>
                                <button
                                    onClick={() => navigate('/contact')}
                                    style={{
                                        background: 'var(--primary)',
                                        color: 'white',
                                        padding: '0.8rem 1.75rem',
                                        borderRadius: '1rem',
                                        border: 'none',
                                        fontWeight: '800',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        cursor: 'pointer'
                                    }}
                                    className="hover-lift"
                                >
                                    <MessageSquare size={18} /> Contactez-nous
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Accordion Section */}
                    <div>
                        <div style={{ marginBottom: '3.5rem' }}>
                            <span style={{ color: 'var(--primary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'block' }}>Questions fréquentes</span>
                            <h2 style={{ fontSize: '3.5rem', fontWeight: '900', lineHeight: 1.1, color: '#1e293b' }}>
                                Vous avez des questions, <br /><span style={{ color: 'var(--primary)' }}>Nous avons les réponses</span>.
                            </h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {FAQ_ITEMS.map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        background: activeIndex === index ? '#f8fafc' : 'white',
                                        borderRadius: '2rem',
                                        border: '1px solid #f1f5f9',
                                        overflow: 'hidden',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        boxShadow: activeIndex === index ? '0 20px 40px -15px rgba(0,0,0,0.05)' : 'none'
                                    }}
                                >
                                    <button
                                        onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                                        style={{
                                            width: '100%',
                                            padding: '2rem 2.5rem',
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
                                            fontSize: '1.2rem',
                                            fontWeight: '800',
                                            color: activeIndex === index ? 'var(--primary)' : '#1e293b',
                                            paddingRight: '2rem'
                                        }}>
                                            {item.question}
                                        </span>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: activeIndex === index ? 'var(--primary)' : '#f1f5f9',
                                            color: activeIndex === index ? 'white' : '#64748b',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            transition: 'all 0.3s ease'
                                        }}>
                                            {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                        </div>
                                    </button>

                                    <div style={{
                                        maxHeight: activeIndex === index ? '200px' : '0',
                                        overflow: 'hidden',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}>
                                        <div style={{
                                            padding: '0 2.5rem 2rem 2.5rem',
                                            color: '#64748b',
                                            lineHeight: 1.8,
                                            fontSize: '1.1rem'
                                        }}>
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '3rem' }}>
                            <button
                                onClick={() => navigate('/faq')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--primary)',
                                    fontWeight: '800',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}
                            >
                                Voir toute la FAQ <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                </div>
            </Container>

            <style>{`
                .hover-lift:hover {
                    transform: translateY(-5px);
                }
            `}</style>
        </section>
    );
};

export default HomeFAQ;
