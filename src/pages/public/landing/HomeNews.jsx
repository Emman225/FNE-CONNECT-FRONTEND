import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import guideDigitalImage from '../../../assets/guide_digital.png';

const NEWS_ITEMS = [
    {
        id: 1,
        category: "Plateforme",
        title: "Lancement officiel de la version 2.0 de FNE Connect",
        date: "15 Oct 2024",
        excerpt: "Une interface repensée, des performances accrues et de nouveaux outils de reporting pour une gestion fiscale encore plus intuitive.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        category: "Réglementation",
        title: "Réforme Fiscale 2025 : Préparez votre Facturation",
        date: "01 Nov 2024",
        excerpt: "Découvrez les nouvelles exigences de la DGI concernant la facturation électronique et comment FNE Connect vous assure une conformité totale.",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        category: "Événements",
        title: "Séminaire : Digitalisation et Croissance des PME",
        date: "10 Nov 2024",
        excerpt: "Retour sur notre dernier webinaire qui a réuni plus de 500 entrepreneurs autour des enjeux de la transformation numérique.",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        category: "Conseils",
        title: "5 astuces pour optimiser votre trésorerie",
        date: "05 Dec 2024",
        excerpt: "Une bonne gestion commence par une facturation rigoureuse. Apprenez à réduire vos délais de paiement grâce au suivi automatisé.",
        image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 5,
        category: "Plateforme",
        title: "Sécurité et Conformité : Notre engagement",
        date: "12 Dec 2024",
        excerpt: "Découvrez comment FNE Connect garantit la sécurité de vos données financières et assure une conformité totale aux exigences de la DGI.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 6,
        category: "Conseils",
        title: "Guide : Passer du papier au numérique en 5 étapes",
        date: "18 Dec 2024",
        excerpt: "La transition numérique peut sembler complexe. Suivez notre guide pratique pour numériser vos processus sans friction.",
        image: guideDigitalImage
    },
    {
        id: 7,
        category: "Événements",
        title: "Partenariat avec l'Association des Experts-Comptables",
        date: "22 Dec 2024",
        excerpt: "FNE Connect renforce ses liens avec les professionnels du chiffre pour mieux servir l'écosystème entrepreneurial.",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 8,
        category: "Plateforme",
        title: "App Mobile FNE : Gérez vos factures en déplacement",
        date: "05 Jan 2025",
        excerpt: "Découvrez notre nouvelle application compagnon pour iOS et Android. Facturez où que vous soyez.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 9,
        category: "Réglementation",
        title: "Comprendre le Prélèvement à la Source en 2025",
        date: "10 Jan 2025",
        excerpt: "Les nouvelles directives sur le prélèvement à la source entrent en vigueur. Ce que cela change pour votre gestion de paie.",
        image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=800"
    }
];

const HomeNews = () => {
    const navigate = useNavigate();

    return (
        <section style={{ padding: '5rem 0', background: '#f8f9fa' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ maxWidth: '600px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary)' }}>
                            Nos Dernières Actualités
                        </h2>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                            Restez informés des nouveautés fiscales et de la vie de notre plateforme.
                        </p>
                    </div>
                    <button
                        className="btn btn-outline"
                        onClick={() => navigate('/news')}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        Plus d'info <ArrowRight size={20} />
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {NEWS_ITEMS.slice(0, 3).map((item) => (
                        <div key={item.id} className="card hover-scale" style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }} onClick={() => navigate(`/news/${item.id}`)}>
                            <div style={{ height: '200px', overflow: 'hidden' }}>
                                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="hover-zoom" />
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '0.75rem', fontWeight: '600' }}>
                                    <Calendar size={16} />
                                    {item.date}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', lineHeight: 1.4, color: 'var(--text-primary)' }}>
                                    {item.title}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0' }}>
                                    {item.excerpt}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeNews;
