import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../../app/public/components/Navbar';
import Footer from '../../../app/public/components/Footer';
import Container from '../../../components/ui/Container';
import { Calendar, User, ArrowRight, Search, Filter } from 'lucide-react';
import guideDigitalImage from '../../../assets/guide_digital.png';

const CATEGORIES = ["Tous", "Réglementation", "Plateforme", "Événements", "Conseils"];

const NEWS_ITEMS = [
    {
        id: 1,
        category: "Plateforme",
        title: "Lancement officiel de la version 2.0 de FNE Connect",
        date: "15 Oct 2024",
        author: "Équipe Technique",
        summary: "Une interface repensée, des performances accrues et de nouveaux outils de reporting pour une gestion fiscale encore plus intuitive.",
        content: "Nous sommes fiers d'annoncer la sortie de FNE Connect 2.0. Cette mise à jour majeure apporte des fonctionnalités demandées par nos utilisateurs : exportation DGI en un clic, gestion multi-utilisateurs et un tableau de bord analytique en temps réel.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        category: "Réglementation",
        title: "Réforme Fiscale 2025 : Préparez votre Facturation",
        date: "01 Nov 2024",
        author: "Cabinet Conseil",
        summary: "Découvrez les nouvelles exigences de la DGI concernant la facturation électronique et comment FNE Connect vous assure une conformité totale.",
        content: "Dès janvier 2025, de nouvelles normes de sécurité seront appliquées aux factures numériques. FNE Connect intègre déjà ces paramètres pour vous garantir une transition sans stress.",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        category: "Événements",
        title: "Séminaire : Digitalisation et Croissance des PME",
        date: "10 Nov 2024",
        author: "Direction Marketing",
        summary: "Retour sur notre dernier webinaire qui a réuni plus de 500 entrepreneurs autour des enjeux de la transformation numérique.",
        content: "Les experts ont souligné l'importance de l'automatisation des processus comptables comme levier de compétitivité. FNE Connect se positionne comme le partenaire idéal pour cette mutation.",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        category: "Conseils",
        title: "5 astuces pour optimiser votre trésorerie",
        date: "05 Dec 2024",
        author: "Gestionnaire Finance",
        summary: "Une bonne gestion commence par une facturation rigoureuse. Apprenez à réduire vos délais de paiement grâce au suivi automatisé.",
        content: "Le suivi des paiements est souvent délaissé. Avec les relances automatiques de FNE Connect, nos clients constatent une réduction moyenne de 15 jours sur leurs délais d'encaissement.",
        image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 5,
        category: "Plateforme",
        title: "Sécurité et Conformité : Notre engagement",
        date: "12 Dec 2024",
        author: "Responsable Sécurité",
        summary: "Découvrez comment FNE Connect garantit la sécurité de vos données financières et assure une conformité totale aux exigences de la DGI.",
        content: "La sécurité des données est au cœur de notre mission. Nous utilisons des protocoles de chiffrement avancés pour garantir l'intégrité de vos factures et informations clients.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 6,
        category: "Conseils",
        title: "Guide : Passer du papier au numérique en 5 étapes",
        date: "18 Dec 2024",
        author: "Consultant Digital",
        summary: "La transition numérique peut sembler complexe. Suivez notre guide pratique pour numériser vos processus sans friction.",
        content: "Commencez par auditer vos flux actuels, choisissez le bon outil comme FNE Connect, et formez vos équipes progressivement.",
        image: guideDigitalImage
    },
    {
        id: 7,
        category: "Événements",
        title: "Partenariat avec l'Association des Experts-Comptables",
        date: "22 Dec 2024",
        author: "Relation Publique",
        summary: "FNE Connect renforce ses liens avec les professionnels du chiffre pour mieux servir l'écosystème entrepreneurial.",
        content: "Ce partenariat vise à simplifier l'échange de documents entre les entreprises et leurs comptables via notre plateforme sécurisée.",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 8,
        category: "Plateforme",
        title: "App Mobile FNE : Gérez vos factures en déplacement",
        date: "05 Jan 2025",
        author: "Équipe Produit",
        summary: "Découvrez notre nouvelle application compagnon pour iOS et Android. Facturez où que vous soyez.",
        content: "L'application mobile offre une interface simplifiée pour créer des factures, relancer les clients et consulter votre trésorerie en temps réel.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 9,
        category: "Réglementation",
        title: "Comprendre le Prélèvement à la Source en 2025",
        date: "10 Jan 2025",
        author: "Expert Fiscal",
        summary: "Les nouvelles directives sur le prélèvement à la source entrent en vigueur. Ce que cela change pour votre gestion de paie.",
        content: "Nous détaillons les nouvelles obligations déclaratives et comment FNE Connect automatise ces calculs pour vous.",
        image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=800"
    }
];

const NewsPage = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("Tous");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredNews = NEWS_ITEMS.filter(item => {
        const matchesCategory = selectedCategory === "Tous" || item.category === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.summary.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNews = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

    // Reset page when category or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchTerm]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
            <Navbar />

            {/* Page Hero Section - Streamlined & Professional */}
            <div style={{
                position: 'relative',
                height: '350px',
                background: 'linear-gradient(135deg, var(--secondary) 0%, #1e3a8a 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: 'white',
                marginTop: '0'
            }}>
                <Container>
                    <div style={{ maxWidth: '800px' }}>
                        <span style={{
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            background: 'rgba(255,255,255,0.2)',
                            padding: '0.5rem 1rem',
                            borderRadius: '50px',
                            marginBottom: '1.5rem',
                            display: 'inline-block',
                            letterSpacing: '1px'
                        }}>
                            CENTRE D'ACTUALITÉS
                        </span>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                            Toute l'actualité de <span style={{ color: 'var(--primary-light)' }}>FNE Connect</span>
                        </h1>
                        <p style={{ fontSize: '1.2rem', opacity: 0.9, lineHeight: 1.6 }}>
                            Restez informé des dernières évolutions fiscales, des mises à jour de notre plateforme et de nos conseils pour votre entreprise.
                        </p>
                    </div>
                </Container>
            </div>

            <main style={{ flex: 1, padding: '4rem 0' }}>
                <Container>
                    {/* Filters & Search Bar */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '3rem',
                        flexWrap: 'wrap',
                        gap: '1.5rem',
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    style={{
                                        padding: '0.6rem 1.2rem',
                                        borderRadius: '50px',
                                        border: '1px solid',
                                        borderColor: selectedCategory === cat ? 'var(--primary)' : '#e2e8f0',
                                        background: selectedCategory === cat ? 'var(--primary)' : 'white',
                                        color: selectedCategory === cat ? 'white' : '#64748b',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div style={{ position: 'relative', minWidth: '300px' }}>
                            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="text"
                                placeholder="Rechercher un article..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem 0.75rem 3rem',
                                    borderRadius: '50px',
                                    border: '1px solid #e2e8f0',
                                    outline: 'none',
                                    fontSize: '0.95rem'
                                }}
                            />
                        </div>
                    </div>

                    {/* News Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
                        {currentNews.length > 0 ? (
                            currentNews.map((item) => (
                                <article
                                    key={item.id}
                                    className="hover-lift"
                                    style={{
                                        background: 'white',
                                        borderRadius: '1.25rem',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #f1f5f9'
                                    }}
                                >
                                    <div style={{ position: 'relative', height: '220px' }}>
                                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <span style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            left: '1rem',
                                            background: 'var(--primary)',
                                            color: 'white',
                                            padding: '0.4rem 1rem',
                                            borderRadius: '50px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            textTransform: 'uppercase'
                                        }}>
                                            {item.category}
                                        </span>
                                    </div>
                                    <div style={{ padding: '2rem' }}>
                                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', color: '#64748b', fontSize: '0.85rem' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <Calendar size={14} /> {item.date}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <User size={14} /> {item.author}
                                            </span>
                                        </div>
                                        <h3 style={{
                                            fontSize: '1.5rem',
                                            fontWeight: '800',
                                            marginBottom: '1rem',
                                            color: '#1e293b',
                                            lineHeight: 1.3
                                        }}>
                                            {item.title}
                                        </h3>
                                        <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '2rem', fontSize: '1rem' }}>
                                            {item.summary}
                                        </p>
                                        <button
                                            onClick={() => navigate(`/news/${item.id}`)}
                                            className="btn-link" style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                color: 'var(--secondary)',
                                                fontWeight: '700',
                                                padding: 0,
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontSize: '0.95rem'
                                            }}>
                                            Lire l'article complet <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem 0' }}>
                                <p style={{ fontSize: '1.2rem', color: '#64748b' }}>Aucun article ne correspond à votre recherche.</p>
                                <button
                                    onClick={() => { setSelectedCategory("Tous"); setSearchTerm(""); }}
                                    style={{ marginTop: '1rem', color: 'var(--primary)', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1rem',
                            marginTop: '5rem',
                            paddingTop: '3rem',
                            borderTop: '1px solid #e2e8f0'
                        }}>
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    background: 'white',
                                    color: currentPage === 1 ? '#cbd5e1' : '#1e293b',
                                    fontWeight: '700',
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                Précédent
                            </button>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        style={{
                                            width: '45px',
                                            height: '45px',
                                            borderRadius: '12px',
                                            border: 'none',
                                            background: currentPage === i + 1 ? 'var(--primary)' : 'white',
                                            color: currentPage === i + 1 ? 'white' : '#1e293b',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            boxShadow: currentPage === i + 1 ? '0 10px 15px -3px rgba(30, 64, 175, 0.3)' : 'none',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    background: 'white',
                                    color: currentPage === totalPages ? '#cbd5e1' : '#1e293b',
                                    fontWeight: '700',
                                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                Suivant
                            </button>
                        </div>
                    )}
                </Container>
            </main>

            {/* Newsletter Section */}
            <section style={{ background: '#f1f5f9', padding: '5rem 0' }}>
                <Container>
                    <div style={{
                        background: 'white',
                        padding: '3rem',
                        borderRadius: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '2rem',
                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ maxWidth: '500px' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', color: '#1e293b' }}>Ne manquez rien</h2>
                            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Inscrivez-vous à notre newsletter pour recevoir les dernières actualités fiscales directement dans votre boîte mail.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '300px' }}>
                            <input
                                type="email"
                                placeholder="votre@email.com"
                                style={{
                                    flex: 1,
                                    padding: '1rem 1.5rem',
                                    borderRadius: '50px',
                                    border: '1px solid #e2e8f0',
                                    outline: 'none'
                                }}
                            />
                            <button className="btn btn-primary" style={{ padding: '0 2.5rem', borderRadius: '50px' }}>S'abonner</button>
                        </div>
                    </div>
                </Container>
            </section>

            <Footer />
        </div>
    );
};

export default NewsPage;
