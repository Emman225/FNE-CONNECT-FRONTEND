import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Pages
import LandingPage from '../pages/public/landing/LandingPage';
import AboutPage from '../pages/public/static/AboutPage';
import NewsPage from '../pages/public/static/NewsPage';
import FaqPage from '../pages/public/static/FaqPage';
import ServicesPage from '../pages/public/static/ServicesPage';
import ContactPage from '../pages/public/static/ContactPage';
import PublicToolPage from '../pages/public/tools/PublicToolPage';

// Auth
import PublicLogin from '../auth/PublicLogin';
import RegisterPage from '../pages/public/auth/RegisterPage';
import VendorForgotPassword from '../auth/VendorForgotPassword';
import AdminLogin from '../auth/AdminLogin';
import AdminForgotPassword from '../auth/AdminForgotPassword';

// Vendor Dashboard
import PublicLayout from '../layouts/PublicLayout';
import VendorDashboardHome from '../pages/public/dashboard/VendorDashboardHome';
import InvoiceListPage from '../pages/shared/invoices/InvoiceListPage';
import InvoiceCreatePage from '../pages/shared/invoices/InvoiceCreatePage';
import InvoiceDetailPage from '../pages/shared/invoices/InvoiceDetailPage';
import QuoteListPage from '../pages/shared/quotes/QuoteListPage';
import QuoteCreatePage from '../pages/shared/quotes/QuoteCreatePage';
import ProformaListPage from '../pages/shared/proforma/ProformaListPage';
import ProformaCreatePage from '../pages/shared/proforma/ProformaCreatePage';
import ClientListPage from '../pages/shared/clients/ClientListPage';
import ClientCreatePage from '../pages/shared/clients/ClientCreatePage';
import PaymentListPage from '../pages/shared/payments/PaymentListPage';
import CommissionListPage from '../pages/shared/commissions/CommissionListPage';
import PayoutListPage from '../pages/shared/payouts/PayoutListPage';
import SettingsPage from '../pages/shared/settings/SettingsPage';

// Guards & Roles
import RequireRole from '../auth/RequireRole';
import { userRoles } from '../types/roles';

export const PublicRoutes = (
    <>
        {/* Public Static Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/tools/:type" element={<PublicToolPage />} />

        {/* Auth Routes */}
        <Route path="/auth/login" element={<PublicLogin />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<VendorForgotPassword />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
        <Route path="/auth" element={<Navigate to="/auth/login" replace />} />

        <Route element={<RequireRole allowedRoles={[userRoles.VENDOR]} />}>
            <Route path="/dashboard" element={<PublicLayout />}>
                <Route index element={<VendorDashboardHome />} />
                <Route path="invoices" element={<InvoiceListPage />} />
                <Route path="invoices/new" element={<InvoiceCreatePage />} />
                <Route path="invoices/:id" element={<InvoiceDetailPage />} />
                <Route path="quotes" element={<QuoteListPage />} />
                <Route path="quotes/new" element={<QuoteCreatePage />} />
                <Route path="proformas" element={<ProformaListPage />} />
                <Route path="proformas/new" element={<ProformaCreatePage />} />
                <Route path="clients" element={<ClientListPage />} />
                <Route path="clients/new" element={<ClientCreatePage />} />
                <Route path="payments" element={<PaymentListPage />} />
                <Route path="commissions" element={<CommissionListPage />} />
                <Route path="payouts" element={<PayoutListPage />} />
                {/* */}
                <Route path="settings" element={<SettingsPage />} />
                {/* */}
            </Route>
        </Route>
    </>
);
