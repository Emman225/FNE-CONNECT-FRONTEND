import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SLIDES = [
    {
        id: 1,
        image: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070)',
        title: "Bienvenue sur le portail FNE",
        subtitle: "(Facture Normalisée Electronique)",
        description: "L'objectif de ce portail est de diffuser des informations sur le système de Facturation Normalisée Electronique (FNE) et de faciliter vos démarches.",
        primaryBtn: "Voir plus",
        secondaryBtn: "Contact"
    },
    {
        id: 2,
        image: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2070)',
        title: "Simplifiez votre gestion",
        subtitle: "Une plateforme sécurisée",
        description: "Accédez à tous vos services de facturation en un seul endroit. Sécurité, rapidité et fiabilité pour votre entreprise.",
        primaryBtn: "S'inscrire",
        secondaryBtn: "En savoir plus"
    },
    {
        id: 3,
        image: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070)',
        title: "Support dédié",
        subtitle: "Nous sommes là pour vous",
        description: "Une équipe d'experts à votre écoute pour vous accompagner dans la transition vers la facturation électronique.",
        primaryBtn: "FAQ",
        secondaryBtn: "Nous écrire"
    }
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const SLIDES = [
        {
            id: 1,
            // Gradient combining Corporate Blue and FNE Green for the overlay
            image: 'linear-gradient(135deg, rgba(30, 63, 166, 0.85), rgba(25, 134, 83, 0.75)), url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070)',
            title: "L'Excellence Fiscale Numérique",
            subtitle: "Facturation Normalisée & Sécurisée - Agréé DGI",
            description: "Propulsez votre entreprise vers de nouveaux standards de performance. Une solution technologique de pointe pour une conformité totale.",
            primaryBtn: "Démarrer maintenant",
            secondaryBtn: "Nous contacter"
        },
        {
            id: 2,
            image: 'linear-gradient(135deg, rgba(25, 134, 83, 0.85), rgba(30, 63, 166, 0.75)), url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80)',
            title: "Pilotage & Intelligence",
            subtitle: "Tableaux de Bord Décisionnels",
            description: "Transformez vos données en levier de croissance. Visualisez en temps réel votre santé financière et anticipez l'avenir.",
            primaryBtn: "Découvrir la solution",
            secondaryBtn: "Voir la démo"
        },
        {
            id: 3,
            image: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 63, 166, 0.8)), url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015)',
            title: "Infrastructure Robuste",
            subtitle: "Sécurité Bancaire & Haute Disponibilité",
            description: "Vos données méritent le plus haut niveau de protection. Hébergement sécurisé et archivage probant garanti sur 10 ans.",
            primaryBtn: "En savoir plus",
            secondaryBtn: "Contacter le support"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [SLIDES.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

    return (
        <div style={{ position: 'relative', height: '500px', overflow: 'hidden', width: '100%' }}>
            {SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: index === currentSlide ? 1 : 0,
                        transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        background: slide.image,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div className="container" style={{ position: 'relative', zIndex: 10, color: 'white' }}>
                        <div style={{ maxWidth: '900px', margin: '0 0 0 auto', textAlign: 'right' }}> {/* Aligned right for premium feel */}
                            <div style={{
                                display: 'inline-block',
                                background: 'transparent',
                                padding: '1rem',
                                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                            }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                    {slide.subtitle}
                                </h2>
                                <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
                                    {slide.title}
                                </h1>
                                <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.95, lineHeight: 1.6, maxWidth: '650px', marginLeft: 'auto', fontWeight: '300' }}>
                                    {slide.description}
                                </p>
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                    <button
                                        className="btn"
                                        style={{
                                            background: '#10b981',
                                            color: 'white',
                                            padding: '0.75rem 2rem',
                                            fontSize: '1rem',
                                            border: 'none',
                                            fontWeight: '600',
                                            borderRadius: '9999px', // Fully rounded
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                                        }}
                                        onClick={() => navigate('/auth/register')}
                                    >
                                        {slide.primaryBtn}
                                    </button>
                                    <button
                                        className="btn"
                                        style={{
                                            background: 'white', // No longer transparent
                                            color: 'var(--primary)',
                                            padding: '0.75rem 2rem',
                                            fontSize: '1rem',
                                            border: 'none',
                                            fontWeight: '600',
                                            borderRadius: '9999px', // Fully rounded
                                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                        }}
                                        onClick={() => navigate('/contact')}
                                    >
                                        {slide.secondaryBtn}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                style={{
                    position: 'absolute',
                    left: '2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    zIndex: 20,
                    transition: 'all 0.3s'
                }}
                className="hover-scale"
            >
                <ArrowLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                style={{
                    position: 'absolute',
                    right: '2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    zIndex: 20,
                    transition: 'all 0.3s'
                }}
                className="hover-scale"
            >
                <ArrowRight size={24} />
            </button>


            {/* Dots */}
            <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '2rem', // Aligned left instead of center
                display: 'flex',
                gap: '0.75rem',
                zIndex: 20
            }}>
                {SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        style={{
                            width: index === currentSlide ? '30px' : '10px', // Elongated active dot
                            height: '4px', // Bar style instead of dots
                            borderRadius: '2px',
                            background: index === currentSlide ? 'var(--accent)' : 'rgba(255,255,255,0.3)',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
