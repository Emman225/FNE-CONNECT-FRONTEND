import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const navigate = useNavigate();

    const SLIDES = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070',
            gradient: 'linear-gradient(to right, rgba(1, 33, 67, 0.95), rgba(1, 33, 67, 0.4))',
            title: "L'Excellence <br /><span style='color: var(--primary-light)'>Fiscale Numérique</span>",
            subtitle: "Facturation Normalisée - Agréé DGI",
            description: "Propulsez votre entreprise vers de nouveaux standards de performance avec une conformité totale et sécurisée.",
            primaryBtn: "Démarrer maintenant",
            secondaryBtn: "Nous contacter",
            tag: "INNOVATION"
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80',
            gradient: 'linear-gradient(to right, rgba(6, 78, 59, 0.95), rgba(6, 78, 59, 0.4))',
            title: "Pilotage & <br /><span style='color: #10b981'>Intelligence</span>",
            subtitle: "Tableaux de Bord Décisionnels",
            description: "Transformez vos données en levier de croissance. Visualisez en temps réel votre santé financière.",
            primaryBtn: "Découvrir la solution",
            secondaryBtn: "Voir la démo",
            tag: "ANALYTICS"
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015',
            gradient: 'linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.4))',
            title: "Infrastructure <br /><span style='color: var(--primary-light)'>Robuste</span>",
            subtitle: "Sécurité Bancaire & Haute Disponibilité",
            description: "Hébergement hautement sécurisé et archivage légal garanti sur 10 ans pour votre sérénité totale.",
            primaryBtn: "En savoir plus",
            secondaryBtn: "Support technique",
            tag: "SÉCURITÉ"
        }
    ];

    useEffect(() => {
        if (!isHovering) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
            }, 7000);
            return () => clearInterval(timer);
        }
    }, [isHovering]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

    return (
        <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ position: 'relative', height: '100vh', maxHeight: '800px', overflow: 'hidden', width: '100%', background: '#012143' }}
        >
            {SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: index === currentSlide ? 1 : 0,
                        visibility: index === currentSlide ? 'visible' : 'hidden',
                        transition: 'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 1.5s',
                        zIndex: index === currentSlide ? 1 : 0
                    }}
                >
                    {/* Ken Burns Effect Image */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 10s linear',
                        zIndex: 0
                    }} />

                    {/* Gradient Overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: slide.gradient,
                        zIndex: 1
                    }} />

                    {/* Decorative Elements */}
                    <div style={{
                        position: 'absolute',
                        top: '10%',
                        right: '5%',
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                        borderRadius: '50%',
                        zIndex: 2,
                        filter: 'blur(30px)'
                    }} />

                    <div className="container" style={{ position: 'relative', height: '100%', zIndex: 10, display: 'flex', alignItems: 'center' }}>
                        <div style={{ maxWidth: '800px', textAlign: 'left' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '2rem',
                                transform: index === currentSlide ? 'translateX(0)' : 'translateX(-50px)',
                                opacity: index === currentSlide ? 1 : 0,
                                transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s'
                            }}>
                                <span style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    padding: '0.6rem 1.25rem',
                                    borderRadius: '50px',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    letterSpacing: '2px',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <Sparkles size={14} color="#10b981" /> {slide.tag}
                                </span>
                                <div style={{ width: '60px', height: '1px', background: 'rgba(255,255,255,0.3)' }}></div>
                            </div>

                            <h1
                                style={{
                                    fontSize: '5rem',
                                    fontWeight: '900',
                                    lineHeight: 1.1,
                                    marginBottom: '1.5rem',
                                    color: 'white',
                                    transform: index === currentSlide ? 'translateY(0)' : 'translateY(30px)',
                                    opacity: index === currentSlide ? 1 : 0,
                                    transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s'
                                }}
                                dangerouslySetInnerHTML={{ __html: slide.title }}
                            />

                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: '500',
                                color: 'rgba(255,255,255,0.8)',
                                marginBottom: '2rem',
                                transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
                                opacity: index === currentSlide ? 1 : 0,
                                transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s',
                                letterSpacing: '0.5px'
                            }}>
                                {slide.subtitle}
                            </h2>

                            <p style={{
                                fontSize: '1.25rem',
                                marginBottom: '3.5rem',
                                color: 'rgba(255,255,255,0.7)',
                                lineHeight: 1.8,
                                maxWidth: '600px',
                                transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
                                opacity: index === currentSlide ? 1 : 0,
                                transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s'
                            }}>
                                {slide.description}
                            </p>

                            <div style={{
                                display: 'flex',
                                gap: '1.5rem',
                                transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
                                opacity: index === currentSlide ? 1 : 0,
                                transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.7s'
                            }}>
                                <button
                                    className="hover-lift"
                                    style={{
                                        background: 'var(--primary)',
                                        color: 'white',
                                        padding: '1.25rem 3rem',
                                        fontSize: '1.1rem',
                                        border: 'none',
                                        fontWeight: '800',
                                        borderRadius: '1.25rem',
                                        boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}
                                    onClick={() => navigate('/auth/register')}
                                >
                                    {slide.primaryBtn} <ArrowUpRight size={20} />
                                </button>
                                <button
                                    className="hover-lift"
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(10px)',
                                        color: 'white',
                                        padding: '1.25rem 3rem',
                                        fontSize: '1.1rem',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        fontWeight: '700',
                                        borderRadius: '1.25rem',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => navigate('/contact')}
                                >
                                    {slide.secondaryBtn}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Overlay */}
            <div style={{
                position: 'absolute',
                bottom: '3rem',
                right: '5%',
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                zIndex: 30
            }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={prevSlide}
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                        className="hover-lift"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                        className="hover-lift"
                    >
                        <ArrowRight size={24} />
                    </button>
                </div>

                {/* Progress Indicators */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {SLIDES.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            style={{
                                width: index === currentSlide ? '40px' : '10px',
                                height: '4px',
                                borderRadius: '2px',
                                background: index === currentSlide ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                                cursor: 'pointer',
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .hover-lift:hover {
                    transform: translateY(-8px);
                }
            `}</style>
        </div>
    );
};

export default HeroSlider;
