import React, { useState } from 'react';
import { ChevronRight, ChevronDown, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQ_ITEMS = [
    {
        question: "Quels types d’entreprises accompagnez-vous ?",
        answer: "Nous travaillons aussi bien avec les PME, startups, grandes entreprises, ONG et institutions. Nos services s’adaptent aux besoins et à la taille de chaque organisation souhaitant se conformer à la facturation électronique."
    },
    {
        question: "Proposez-vous un accompagnement personnalisé ?",
        answer: "Oui. Chaque client est unique : nous réalisons un diagnostic personnalisé afin de proposer des solutions de facturation électronique adaptées à votre secteur et à vos objectifs."
    },
    {
        question: "Pouvez-vous nous assister lors d’un contrôle fiscal ou social ?",
        answer: "Absolument. Nos experts vous accompagnent tout au long du processus de contrôle, en garantissant la conformité de vos factures normalisées et en facilitant les échanges avec les administrations."
    },
    {
        question: "Offrez-vous des services de formation ?",
        answer: "Oui. Nous proposons des formations professionnelles sur l'utilisation du portail FNE, la fiscalité numérique et la gestion commerciale."
    },
    {
        question: "Comment prendre rendez-vous avec FNE CONNECT ?",
        answer: "Vous pouvez nous contacter par téléphone, e-mail ou via le formulaire en ligne sur notre site. Nous vous proposerons un créneau adapté pour un premier diagnostic gratuit de vos besoins."
    },
    {
        question: "Qu’est-ce qui vous distingue des autres cabinets ?",
        answer: "Notre force réside dans notre spécialisation technologique, notre transparence et notre accompagnement de proximité. FNE CONNECT est plus qu'un outil, c'est un partenaire stratégique pour votre conformité."
    }
];

const HomeFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    return (
        <section style={{ padding: '4rem 0', background: 'white', position: 'relative', overflow: 'hidden' }}>
            {/* Background Watermark FAQ'S */}
            <div style={{
                position: 'absolute',
                left: '-30px',
                top: '50%',
                transform: 'translateY(-50%) rotate(-90deg)',
                fontSize: '10rem',
                fontWeight: '900',
                color: '#f8fafc',
                zIndex: 0,
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                opacity: 0.8
            }}>
                FAQ'S
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>

                    {/* Visual Section - Circular Image & Button */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                        <div style={{
                            width: '320px',
                            height: '320px',
                            borderRadius: '50%',
                            background: 'url(https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: '12px solid #f1f5f9',
                            boxShadow: 'var(--shadow-xl)',
                            marginBottom: '1.5rem'
                        }}></div>

                        <button
                            onClick={() => navigate('/contact')}
                            style={{
                                background: 'white',
                                color: 'var(--text-main)',
                                padding: '1rem 2rem',
                                borderRadius: '9999px',
                                border: 'none',
                                fontWeight: '700',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            className="hover-lift"
                        >
                            <MessageSquare size={20} color="var(--primary)" />
                            Contactez-Nous Maintenant
                        </button>
                    </div>

                    {/* FAQ Accordion Section */}
                    <div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <span style={{ color: 'var(--primary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>FAQ</span>
                            <h2 style={{ fontSize: '2.25rem', fontWeight: '800', lineHeight: 1.2, color: 'var(--secondary)' }}>
                                Réponses aux questions courantes
                            </h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {FAQ_ITEMS.map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        background: activeIndex === index ? '#f8fafc' : 'white',
                                        borderRadius: '1rem',
                                        border: '1px solid var(--border-color)',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <button
                                        onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                                        style={{
                                            width: '100%',
                                            padding: '1.125rem 1.5rem',
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
                                            fontSize: '1.05rem',
                                            fontWeight: '700',
                                            color: activeIndex === index ? 'var(--secondary)' : 'var(--text-main)'
                                        }}>
                                            {item.question}
                                        </span>
                                        <div style={{
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '50%',
                                            background: activeIndex === index ? 'var(--secondary)' : '#f1f5f9',
                                            color: activeIndex === index ? 'white' : 'var(--text-secondary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            {activeIndex === index ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                        </div>
                                    </button>

                                    {activeIndex === index && (
                                        <div style={{
                                            padding: '0 1.5rem 1.125rem 1.5rem',
                                            color: 'var(--text-secondary)',
                                            lineHeight: 1.5,
                                            fontSize: '0.95rem',
                                            animation: 'fadeIn 0.4s ease'
                                        }}>
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeFAQ;
