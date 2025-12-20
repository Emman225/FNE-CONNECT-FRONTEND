import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Container from '../../components/ui/Container';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
            <Navbar />

            {/* Page Hero Section */}
            <div style={{
                position: 'relative',
                height: '400px',
                background: 'linear-gradient(rgba(10, 111, 189, 0.85), rgba(6, 78, 59, 0.85)), url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000)',
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
                        <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '4px' }}>Contact</h1>
                    </div>
                </Container>
            </div>

            <main style={{ flex: 1, padding: '5rem 0' }}>
                <Container>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '1.5rem' }}>Restons en contact</h2>
                            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                                Une question ? Besoin d'assistance ? Notre équipe est là pour vous aider.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ padding: '1rem', background: 'var(--bg-sidebar)', borderRadius: '50%', color: 'var(--primary)' }}><Mail /></div>
                                    <div>
                                        <h3 style={{ fontWeight: '700' }}>Email</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>support@fneconnect.ci</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ padding: '1rem', background: 'var(--bg-sidebar)', borderRadius: '50%', color: 'var(--primary)' }}><Phone /></div>
                                    <div>
                                        <h3 style={{ fontWeight: '700' }}>Téléphone</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>+225 27 22 23 24 25</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ padding: '1rem', background: 'var(--bg-sidebar)', borderRadius: '50%', color: 'var(--primary)' }}><MapPin /></div>
                                    <div>
                                        <h3 style={{ fontWeight: '700' }}>Adresse</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>Cocody, Abidjan, Côte d'Ivoire</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ padding: '2rem', background: 'white', borderRadius: '1rem', boxShadow: 'var(--shadow-lg)' }}>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Nom complet</label>
                                    <input type="text" className="input-field" placeholder="Votre nom" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                                    <input type="email" className="input-field" placeholder="votre@email.com" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
                                    <textarea className="input-field" rows="5" placeholder="Comment pouvons-nous vous aider ?"></textarea>
                                </div>
                                <button className="btn btn-primary" style={{ justifyContent: 'center' }}>Envoyer le message</button>
                            </form>
                        </div>
                    </div>
                </Container>

                {/* Google Map Section */}
                <div style={{ marginTop: '4rem', height: '400px', width: '100%' }}>
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
            </main>
            <Footer />
        </div >
    );
};

export default ContactPage;
