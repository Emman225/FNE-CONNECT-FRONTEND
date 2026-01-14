import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaFileInvoice, FaFileAlt, FaClipboardList } from 'react-icons/fa';
import CreateInvoice from './pages/invoices/CreateInvoice';
import CreateProforma from './pages/invoices/CreateProforma';
import CreateQuote from './pages/invoices/CreateQuote';
import './InvoiceDemo.css';

/**
 * Page de démonstration pour les formulaires de facturation
 * Vous pouvez utiliser cette page pour tester les formulaires
 */
const InvoiceDemo: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Page d'accueil de la démo */}
                <Route path="/" element={<DemoHome />} />

                {/* Pages de formulaires */}
                <Route path="/facture" element={<CreateInvoice />} />
                <Route path="/proforma" element={<CreateProforma />} />
                <Route path="/devis" element={<CreateQuote />} />
            </Routes>
        </Router>
    );
};

const DemoHome: React.FC = () => {
    return (
        <div className="demo-container">
            <div className="demo-header">
                <h1>📋 Démonstration - Formulaires de Facturation</h1>
                <p>Testez les formulaires de Devis, Proforma et Facture</p>
            </div>

            <div className="demo-cards">
                <Link to="/devis" className="demo-card">
                    <div className="demo-card-icon devis">
                        <FaClipboardList />
                    </div>
                    <h2>Devis</h2>
                    <p>Créer un nouveau devis pour un client</p>
                    <span className="demo-badge">Quote</span>
                </Link>

                <Link to="/proforma" className="demo-card">
                    <div className="demo-card-icon proforma">
                        <FaFileAlt />
                    </div>
                    <h2>Proforma</h2>
                    <p>Créer une facture proforma</p>
                    <span className="demo-badge">Proforma</span>
                </Link>

                <Link to="/facture" className="demo-card">
                    <div className="demo-card-icon facture">
                        <FaFileInvoice />
                    </div>
                    <h2>Facture</h2>
                    <p>Créer une nouvelle facture</p>
                    <span className="demo-badge">Invoice</span>
                </Link>
            </div>

            <div className="demo-features">
                <h3>✨ Fonctionnalités disponibles</h3>
                <ul>
                    <li>✅ 4 types de facturation (B2B, B2C, B2F, B2G)</li>
                    <li>✅ Affichage conditionnel des champs selon le type</li>
                    <li>✅ Gestion dynamique des articles (ajout/suppression)</li>
                    <li>✅ Calculs automatiques en temps réel</li>
                    <li>✅ Support des remises (par ligne et globale)</li>
                    <li>✅ Gestion des taxes multiples</li>
                    <li>✅ Multi-devises pour clients internationaux</li>
                    <li>✅ Design premium et responsive</li>
                    <li>✅ Animations fluides et micro-interactions</li>
                    <li>✅ Validation de formulaire</li>
                </ul>
            </div>

            <div className="demo-info">
                <h3>📚 Documentation</h3>
                <p>
                    Consultez les fichiers suivants pour plus d'informations :
                </p>
                <ul>
                    <li><code>INVOICE_FORMS_DESIGN.md</code> - Documentation de conception</li>
                    <li><code>INVOICE_FORMS_USAGE.md</code> - Guide d'utilisation</li>
                    <li><code>src/types/invoice.types.ts</code> - Types TypeScript</li>
                    <li><code>src/hooks/useInvoiceCalculations.ts</code> - Hook de calculs</li>
                </ul>
            </div>
        </div>
    );
};

export default InvoiceDemo;
