import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../../../app/public/components/Navbar';
import Footer from '../../../app/public/components/Footer';
import Container from '../../../components/ui/Container';
import { Calendar, User, ArrowLeft, Share2, Tag } from 'lucide-react';
import guideDigitalImage from '../../../assets/guide_digital.png';

const NEWS_ITEMS = [
    {
        id: 1,
        category: "Plateforme",
        title: "Lancement officiel de la version 2.0 de FNE Connect",
        date: "15 Oct 2024",
        author: "Équipe Technique",
        summary: "Une interface repensée, des performances accrues et de nouveaux outils de reporting pour une gestion fiscale encore plus intuitive.",
        content: `
            <p>Nous sommes fiers d'annoncer la sortie de FNE Connect 2.0. Cette mise à jour majeure apporte des fonctionnalités demandées par nos utilisateurs : exportation DGI en un clic, gestion multi-utilisateurs et un tableau de bord analytique en temps réel.</p>
            <h3>Pourquoi une version 2.0 ?</h3>
            <p>L'économie numérique exige une agilité constante. Notre équipe a travaillé pendant six mois pour reconstruire le moteur de calcul et l'interface utilisateur. L'objectif était simple : réduire le temps passé sur les tâches administratives de 40%.</p>
            <blockquote>"FNE Connect 2.0 n'est pas qu'une mise à jour visuelle, c'est une refonte profonde de l'expérience utilisateur pour plus de sérénité fiscale."</blockquote>
            <h3>Les nouveautés clés :</h3>
            <ul>
                <li><strong>Interface Intuitive :</strong> Un design épuré pour une navigation sans friction.</li>
                <li><strong>Moteur de Reporting :</strong> Des rapports conformes aux normes DGI générés instantanément.</li>
                <li><strong>Sécurité renforcée :</strong> Chiffrement de bout en bout et authentification à deux facteurs.</li>
            </ul>
        `,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 2,
        category: "Réglementation",
        title: "Réforme Fiscale 2025 : Préparez votre Facturation",
        date: "01 Nov 2024",
        author: "Cabinet Conseil",
        summary: "Découvrez les nouvelles exigences de la DGI concernant la facturation électronique et comment FNE Connect vous assure une conformité totale.",
        content: `
            <p>Dès janvier 2025, de nouvelles normes de sécurité seront appliquées aux factures numériques en Côte d'Ivoire. FNE Connect intègre déjà ces paramètres pour vous garantir une transition sans stress.</p>
            <h3>Ce qui change concrètement</h3>
            <p>La Direction Générale des Impôts (DGI) renforce les contrôles sur l'authenticité des factures électroniques. Chaque document devra désormais porter une signature numérique certifiée et être conservé dans un format inaltérable.</p>
            <p>Les entreprises qui ne se conformeront pas à ces nouvelles directives s'exposent à des sanctions importantes. Heureusement, FNE Connect automatise l'ensemble de ces processus pour vous.</p>
            <h3>Comment se préparer ?</h3>
            <p>Assurez-vous que vos outils actuels sont compatibles. Avec FNE Connect, la migration est transparente et ne nécessite aucune intervention de votre part.</p>
        `,
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 3,
        category: "Événements",
        title: "Séminaire : Digitalisation et Croissance des PME",
        date: "10 Nov 2024",
        author: "Direction Marketing",
        summary: "Retour sur notre dernier webinaire qui a réuni plus de 500 entrepreneurs autour des enjeux de la transformation numérique.",
        content: `
            <p>Le 10 novembre dernier, FNE Connect a organisé un séminaire exclusif au Sofitel Abidjan. Les experts ont souligné l'importance de l'automatisation des processus comptables comme levier de compétitivité.</p>
            <p>Les échanges ont porté sur la réduction des coûts opérationnels grâce aux outils cloud et sur l'amélioration de la relation client par la transparence tarifaire.</p>
            <h3>Témoignages</h3>
            <p>"La digitalisation n'est plus un luxe, c'est une nécessité de survie," a déclaré l'un des intervenants principaux lors de la table ronde.</p>
        `,
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 4,
        category: "Conseils",
        title: "5 astuces pour optimiser votre trésorerie",
        date: "05 Dec 2024",
        author: "Gestionnaire Finance",
        summary: "Une bonne gestion commence par une facturation rigoureuse. Apprenez à réduire vos délais de paiement grâce au suivi automatisé.",
        content: `
            <p>Le suivi des paiements est souvent délaissé par manque de temps. Avec les relances automatiques de FNE Connect, nos clients constatent une réduction moyenne de 15 jours sur leurs délais d'encaissement.</p>
            <h3>1. Facturer dès la fin de prestation</h3>
            <p>Plus vous attendez pour facturer, plus le client mettra du temps à payer. L'automatisation permet d'envoyer la facture dès que le service est rendu.</p>
            <h3>2. Utiliser des moyens de paiement digitaux</h3>
            <p>Offrir des options de paiement variées réduit les frictions et accélère les encaissements.</p>
        `,
        image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 5,
        category: "Plateforme",
        title: "Sécurité et Conformité : Notre engagement",
        date: "12 Dec 2024",
        author: "Responsable Sécurité",
        summary: "Découvrez comment FNE Connect garantit la sécurité de vos données financières et assure une conformité totale aux exigences de la DGI.",
        content: `
            <p>La sécurité des données est au cœur de notre mission. Avec la généralisation de la facturation électronique, la protection des informations financières sensibles devient un enjeu crucial pour chaque entreprise.</p>
            <h3>Des standards de sécurité bancaire</h3>
            <p>FNE Connect utilise des protocoles de chiffrement avancés (AES-256) identiques à ceux utilisés par les institutions bancaires internationales. Toutes les communications entre votre navigateur et nos serveurs sont cryptées.</p>
            <blockquote>"Notre objectif est de fournir une plateforme où la conformité fiscale rime avec sécurité absolue des données."</blockquote>
            <h3>Conformité DGI Garantie</h3>
            <p>En plus de la sécurité technique, nous veillons à ce que chaque facture générée respecte scrupuleusement les mentions obligatoires et les formats exigés par la Direction Générale des Impôts (DGI) de Côte d'Ivoire.</p>
            <ul>
                <li>Signature électronique certifiée pour chaque document.</li>
                <li>Archivage légal sécurisé pendant 10 ans.</li>
                <li>Traçabilité complète de toutes les opérations.</li>
            </ul>
        `,
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 6,
        category: "Conseils",
        title: "Guide : Passer du papier au numérique en 5 étapes",
        date: "18 Dec 2024",
        author: "Consultant Digital",
        summary: "La transition numérique peut sembler complexe. Suivez notre guide pratique pour numériser vos processus sans friction.",
        content: `
            <p>Le passage à la facture électronique n'est pas seulement une obligation légale, c'est une opportunité de croissance. Voici comment réussir votre transition.</p>
            <h3>1. Auditer vos processus actuels</h3>
            <p>Identifiez comment vos factures sont actuellement créées et envoyées pour comprendre les points de blocage.</p>
            <h3>2. Choisir la bonne plateforme</h3>
            <p>FNE Connect vous offre une solution clé en main qui s'adapte à la taille de votre entreprise.</p>
        `,
        image: guideDigitalImage
    },
    {
        id: 7,
        category: "Événements",
        title: "Partenariat avec l'Association des Experts-Comptables",
        date: "22 Dec 2024",
        author: "Relation Publique",
        summary: "FNE Connect renforce ses liens avec les professionnels du chiffre pour mieux servir l'écosystème entrepreneurial.",
        content: `
            <p>Nous sommes fiers d'annoncer la signature d'un partenariat stratégique avec l'Association Nationale des Experts-Comptables.</p>
            <h3>Une collaboration pour le succès des PME</h3>
            <p>Ce partenariat permettra d'intégrer nativement les flux FNE Connect avec les principaux logiciels comptables du marché ivoirien.</p>
        `,
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 8,
        category: "Plateforme",
        title: "App Mobile FNE : Gérez vos factures en déplacement",
        date: "05 Jan 2025",
        author: "Équipe Produit",
        summary: "Découvrez notre nouvelle application compagnon pour iOS et Android. Facturez où que vous soyez.",
        content: `
            <p>Vos affaires ne s'arrêtent pas quand vous quittez votre bureau. FNE Connect Mobile vous suit partout.</p>
            <h3>Toute votre gestion dans votre poche</h3>
            <p>Créez, envoyez et suivez vos factures directement depuis votre smartphone. Recevez des notifications en temps réel lors des paiements de vos clients.</p>
        `,
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 9,
        category: "Réglementation",
        title: "Comprendre le Prélèvement à la Source en 2025",
        date: "10 Jan 2025",
        author: "Expert Fiscal",
        summary: "Les nouvelles directives sur le prélèvement à la source entrent en vigueur. Ce que cela change pour votre gestion de paie.",
        content: `
            <p>L'année 2025 marque un tournant dans la gestion fiscale des salaires. Le prélèvement à la source devient la norme pour la majorité des secteurs d'activité.</p>
            <h3>Simplification administrative</h3>
            <p>Grâce à FNE Connect, les employeurs peuvent désormais automatiser la retenue et le versement, réduisant ainsi les risques d'erreurs déclaratives.</p>
        `,
        image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=1200"
    }
];

const NewsDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const article = NEWS_ITEMS.find(item => item.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!article) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <h2>Article introuvable</h2>
                <button onClick={() => navigate('/news')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Retour aux actualités</button>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'white' }}>
            <Navbar />

            <main style={{ flex: 1 }}>
                {/* Hero Section */}
                <div style={{ position: 'relative', height: '500px', width: '100%', overflow: 'hidden' }}>
                    <img
                        src={article.image}
                        alt={article.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '4rem 0',
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                        color: 'white'
                    }}>
                        <Container>
                            <div style={{ maxWidth: '900px' }}>
                                <button
                                    onClick={() => navigate('/news')}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: 'rgba(255,255,255,0.2)',
                                        border: 'none',
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '50px',
                                        cursor: 'pointer',
                                        marginBottom: '2rem',
                                        fontSize: '0.9rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    <ArrowLeft size={16} /> Retour aux actualités
                                </button>
                                <span style={{
                                    background: 'var(--primary)',
                                    padding: '0.4rem 1.25rem',
                                    borderRadius: '50px',
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    marginBottom: '1.5rem',
                                    display: 'inline-block'
                                }}>
                                    {article.category}
                                </span>
                                <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                                    {article.title}
                                </h1>
                                <div style={{ display: 'flex', gap: '2rem', fontSize: '1rem', opacity: 0.9 }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Calendar size={18} /> {article.date}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <User size={18} /> Par {article.author}
                                    </span>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>

                {/* Content Section */}
                <div style={{ padding: '4rem 0' }}>
                    <Container>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 800px) 300px', gap: '5rem' }}>
                            {/* Main Content */}
                            <article style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#334155' }}>
                                <div
                                    className="article-body"
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                />

                                <div style={{
                                    marginTop: '4rem',
                                    paddingTop: '2rem',
                                    borderTop: '1px solid #e2e8f0',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#64748b' }}>
                                        <Tag size={18} />
                                        <span style={{ fontSize: '0.9rem' }}>Tags: {article.category}, Fiscalité, Tech</span>
                                    </div>
                                    <button style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: '#f1f5f9',
                                        border: 'none',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '10px',
                                        color: '#334155',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}>
                                        <Share2 size={18} /> Partager l'article
                                    </button>
                                </div>
                            </article>

                            {/* Sidebar / More News */}
                            <aside>
                                <div style={{ sticky: 'top', top: '2rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem', color: '#1e293b' }}>
                                        Articles récents
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                        {NEWS_ITEMS.filter(item => item.id !== article.id).slice(0, 3).map(other => (
                                            <Link
                                                key={other.id}
                                                to={`/news/${other.id}`}
                                                style={{ textDecoration: 'none', display: 'flex', gap: '1rem', alignItems: 'center' }}
                                            >
                                                <img
                                                    src={other.image}
                                                    alt={other.title}
                                                    style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }}
                                                />
                                                <div>
                                                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.25rem', lineHeight: 1.2 }}>
                                                        {other.title}
                                                    </h4>
                                                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{other.date}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    <div style={{
                                        marginTop: '3rem',
                                        padding: '2rem',
                                        background: 'var(--bg-main)',
                                        borderRadius: '20px',
                                        textAlign: 'center'
                                    }}>
                                        <h4 style={{ fontWeight: '800', marginBottom: '1rem' }}>Besoin d'aide ?</h4>
                                        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>Nos experts sont là pour vous accompagner dans votre transition fiscale.</p>
                                        <Link to="/contact">
                                            <button className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>Nous contacter</button>
                                        </Link>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </Container>
                </div>
            </main>

            <Footer />

            <style>{`
                .article-body h3 {
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: #1e293b;
                    margin: 2.5rem 0 1.25rem;
                }
                .article-body p {
                    margin-bottom: 1.5rem;
                }
                .article-body blockquote {
                    font-style: italic;
                    font-size: 1.5rem;
                    color: var(--primary);
                    padding: 2rem;
                    border-left: 5px solid var(--primary);
                    background: #f8fafc;
                    margin: 2.5rem 0;
                    line-height: 1.5;
                }
                .article-body ul {
                    margin-bottom: 2rem;
                    padding-left: 1.5rem;
                }
                .article-body li {
                    margin-bottom: 0.75rem;
                }
            `}</style>
        </div>
    );
};

export default NewsDetailPage;
