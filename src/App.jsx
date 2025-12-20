import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './presentation/pages/landing/LandingPage';
import AuthLayout from './presentation/components/auth/AuthLayout';
import LoginPage from './presentation/pages/auth/LoginPage';
import RegisterPage from './presentation/pages/auth/RegisterPage';
import DashboardLayout from './presentation/components/dashboard/DashboardLayout';
import DashboardHome from './presentation/pages/dashboard/DashboardHome';
import InvoiceListPage from './presentation/pages/dashboard/invoices/InvoiceListPage';
import InvoiceCreatePage from './presentation/pages/dashboard/invoices/InvoiceCreatePage';
import InvoiceDetailPage from './presentation/pages/dashboard/invoices/InvoiceDetailPage';
import QuoteListPage from './presentation/pages/dashboard/quotes/QuoteListPage';
import QuoteCreatePage from './presentation/pages/dashboard/quotes/QuoteCreatePage';
import ProformaListPage from './presentation/pages/dashboard/proforma/ProformaListPage';
import ProformaCreatePage from './presentation/pages/dashboard/proforma/ProformaCreatePage';
import ClientListPage from './presentation/pages/dashboard/clients/ClientListPage';
import ClientCreatePage from './presentation/pages/dashboard/clients/ClientCreatePage';
import PaymentListPage from './presentation/pages/dashboard/payments/PaymentListPage';
import CommissionListPage from './presentation/pages/dashboard/commissions/CommissionListPage';
import PayoutListPage from './presentation/pages/dashboard/payouts/PayoutListPage';
import AmlDashboard from './presentation/pages/dashboard/compliance/AmlDashboard';
import VendorManagementPage from './presentation/pages/dashboard/admin/VendorManagementPage';
import PlatformConfigPage from './presentation/pages/dashboard/admin/PlatformConfigPage';
import GlobalReportingPage from './presentation/pages/dashboard/admin/GlobalReportingPage';
import SettingsPage from './presentation/pages/dashboard/settings/SettingsPage';
import AboutPage from './presentation/pages/public/AboutPage';
import NewsPage from './presentation/pages/public/NewsPage';
import FaqPage from './presentation/pages/public/FaqPage';
import ServicesPage from './presentation/pages/public/ServicesPage';
import ContactPage from './presentation/pages/public/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route index element={<Navigate to="/auth/login" replace />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
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
          <Route path="compliance/aml" element={<AmlDashboard />} />
          <Route path="admin/vendors" element={<VendorManagementPage />} />
          <Route path="admin/config" element={<PlatformConfigPage />} />
          <Route path="admin/reporting" element={<GlobalReportingPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
