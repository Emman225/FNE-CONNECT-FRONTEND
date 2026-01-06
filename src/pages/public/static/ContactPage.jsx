import React, { useState } from 'react';
import Navbar from '../../../app/public/components/Navbar';
import Footer from '../../../app/public/components/Footer';
import Container from '../../../components/ui/Container';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, Globe, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const ContactPage = () => {
    const [focused, setFocused] = useState(null);

    const contactMethods = [
        {
            icon: <Phone size={24} />,
            title: "Téléphone",
            value: "+225 07 07 07 07 07",
            sub: "Lun - Ven, 8h - 18h",
            color: "#10b981"
        },
        {
            icon: <Mail size={24} />,
            title: "Email",
            value: "contact@fneconnect.ci",
            sub: "Réponse sous 24h",
            color: "#3b82f6"
        },
        {
            icon: <MapPin size={24} />,
            title: "Siège Social",
            value: "Abidjan, Cocody",
            sub: "Cité des Arts, Villa 12",
            color: "#f59e0b"
        }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
            <Navbar />

            {/* Premium Hero Section */}
            <div style={{
                position: 'relative',
                height: '450px',
                background: 'linear-gradient(rgba(1, 33, 67, 0.8), rgba(1, 33, 67, 0.9)), url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center'
            }}>
                <Container>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <span style={{
                            background: 'rgba(255,255,255,0.1)',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '50px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            marginBottom: '1.5rem',
                            display: 'inline-block',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            CONTACTEZ-NOUS
                        </span>
                        <h1 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
                            Donnons vie à votre <br />
                            <span style={{ color: 'var(--primary-light)' }}>digitalisation.</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
                            Notre équipe d'experts est prête à répondre à toutes vos questions et à vous accompagner dans votre conformité fiscale.
                        </p>
                    </div>
                </Container>
            </div>

            <main style={{ flex: 1, padding: '6rem 0' }}>
                <Container>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '5rem', alignItems: 'start' }}>

                        {/* Left Column: Info & Socials */}
                        <div>
                            <div style={{ marginBottom: '4rem' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.5rem' }}>Parlons de votre projet</h2>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: 1.6, marginBottom: '3rem' }}>
                                    Que vous soyez une petite entreprise ou une grande institution, nous avons les outils nécessaires pour simplifier vos processus de facturation.
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    {contactMethods.map((method, idx) => (
                                        <div key={idx} className="hover-lift" style={{
                                            display: 'flex',
                                            gap: '1.5rem',
                                            padding: '1.5rem',
                                            background: 'white',
                                            borderRadius: '1.5rem',
                                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                            border: '1px solid #f1f5f9'
                                        }}>
                                            <div style={{
                                                width: '56px',
                                                height: '56px',
                                                borderRadius: '16px',
                                                background: `${method.color}15`,
                                                color: method.color,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {method.icon}
                                            </div>
                                            <div>
                                                <h4 style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600', marginBottom: '0.25rem' }}>{method.title}</h4>
                                                <p style={{ fontSize: '1.15rem', color: '#1e293b', fontWeight: '700', marginBottom: '0.1rem' }}>{method.value}</p>
                                                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{method.sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{
                                padding: '2.5rem',
                                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                borderRadius: '2rem',
                                color: 'white'
                            }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem' }}>Suivez-nous sur les réseaux</h4>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                                        <button key={i} style={{
                                            width: '45px',
                                            height: '45px',
                                            borderRadius: '12px',
                                            border: 'none',
                                            background: 'rgba(255,255,255,0.1)',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }} className="hover-lift">
                                            <Icon size={20} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Modern Form */}
                        <div style={{
                            background: 'white',
                            padding: '4rem',
                            borderRadius: '2.5rem',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)',
                            border: '1px solid #f1f5f9'
                        }}>
                            <div style={{ marginBottom: '3rem' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>Envoyez-nous un message</h3>
                                <p style={{ color: '#64748b' }}>Remplissez le formulaire et nous vous contacterons sous peu.</p>
                            </div>

                            <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} onSubmit={(e) => e.preventDefault()}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div style={{ position: 'relative' }}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: focused === 'name' ? 'var(--primary)' : '#64748b', position: 'absolute', top: '-10px', left: '1.5rem', background: 'white', padding: '0 0.5rem', transition: 'all 0.3s' }}>Nom Complet</label>
                                        <input
                                            onFocus={() => setFocused('name')}
                                            onBlur={() => setFocused(null)}
                                            type="text"
                                            placeholder="Ex: Jean Kouadio"
                                            style={{ width: '100%', padding: '1.25rem 1.5rem', borderRadius: '1rem', border: '1px solid', borderColor: focused === 'name' ? 'var(--primary)' : '#e2e8f0', outline: 'none', background: '#f8fafc', fontSize: '1rem' }}
                                        />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: focused === 'email' ? 'var(--primary)' : '#64748b', position: 'absolute', top: '-10px', left: '1.5rem', background: 'white', padding: '0 0.5rem', transition: 'all 0.3s' }}>Email Professionnel</label>
                                        <input
                                            onFocus={() => setFocused('email')}
                                            onBlur={() => setFocused(null)}
                                            type="email"
                                            placeholder="votre@email.ci"
                                            style={{ width: '100%', padding: '1.25rem 1.5rem', borderRadius: '1rem', border: '1px solid', borderColor: focused === 'email' ? 'var(--primary)' : '#e2e8f0', outline: 'none', background: '#f8fafc', fontSize: '1rem' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: focused === 'subject' ? 'var(--primary)' : '#64748b', position: 'absolute', top: '-10px', left: '1.5rem', background: 'white', padding: '0 0.5rem', transition: 'all 0.3s' }}>Sujet</label>
                                    <input
                                        onFocus={() => setFocused('subject')}
                                        onBlur={() => setFocused(null)}
                                        type="text"
                                        placeholder="Comment pouvons-nous vous aider ?"
                                        style={{ width: '100%', padding: '1.25rem 1.5rem', borderRadius: '1rem', border: '1px solid', borderColor: focused === 'subject' ? 'var(--primary)' : '#e2e8f0', outline: 'none', background: '#f8fafc', fontSize: '1rem' }}
                                    />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: focused === 'message' ? 'var(--primary)' : '#64748b', position: 'absolute', top: '-10px', left: '1.5rem', background: 'white', padding: '0 0.5rem', transition: 'all 0.3s' }}>Message détaillé</label>
                                    <textarea
                                        onFocus={() => setFocused('message')}
                                        onBlur={() => setFocused(null)}
                                        rows="6"
                                        placeholder="Décrivez votre projet ou votre demande..."
                                        style={{ width: '100%', padding: '1.25rem 1.5rem', borderRadius: '1rem', border: '1px solid', borderColor: focused === 'message' ? 'var(--primary)' : '#e2e8f0', outline: 'none', background: '#f8fafc', fontSize: '1rem', resize: 'none' }}
                                    ></textarea>
                                </div>

                                <button style={{
                                    background: 'var(--primary)',
                                    color: 'white',
                                    padding: '1.25rem',
                                    borderRadius: '1rem',
                                    border: 'none',
                                    fontWeight: '700',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '1rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 15px 30px rgba(30, 64, 175, 0.25)',
                                    transition: 'all 0.3s'
                                }} className="hover-lift">
                                    Envoyer le Message <Send size={20} />
                                </button>
                                <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8' }}>
                                    En envoyant ce formulaire, vous acceptez notre politique de confidentialité.
                                </p>
                            </form>
                        </div>
                    </div>
                </Container>

                {/* Google Map Section with rounded corners */}
                <Container style={{ marginTop: '8rem' }}>
                    <div style={{
                        height: '500px',
                        width: '100%',
                        borderRadius: '3rem',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
                        border: '8px solid white'
                    }}>
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.502909419655!2d-3.974332!3d5.358231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjEnMjkuNiJOIDPCsDU4JzI3LjYiVw!5e0!3m2!1sen!2sci!4v1635789000000!5m2!1sen!2sci"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
