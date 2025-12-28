import React from 'react';
import { Route } from 'react-router-dom';

// Layouts
import AdminLayout from '../layouts/AdminLayout';

// Admin Pages
import AdminDashboardHome from '../pages/admin/dashboard/AdminDashboardHome';
import AmlDashboard from '../pages/admin/compliance/AmlDashboard';
import VendorManagementPage from '../pages/admin/platform/VendorManagementPage';
import PlatformConfigPage from '../pages/admin/platform/PlatformConfigPage';
import GlobalReportingPage from '../pages/admin/platform/GlobalReportingPage';
import UserListPage from '../pages/admin/platform/users/UserListPage';
import UserCreatePage from '../pages/admin/platform/users/UserCreatePage';
import FneVerificationPage from '../pages/admin/platform/FneVerificationPage';
import SettingsPage from '../pages/shared/settings/SettingsPage';

// Shared Pages (Used in Admin)
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

// Guards & Roles
import RequireRole from '../auth/RequireRole';
import { userRoles } from '../types/roles';

export const AdminRoutes = (
    <>
        <Route element={<RequireRole allowedRoles={[userRoles.ADMIN, userRoles.COMPLIANCE, userRoles.FINANCE, userRoles.SUPPORT, userRoles.AUDITOR]} />}>
            <Route path="/admin/dashboard" element={<AdminLayout />}>
                <Route index element={<AdminDashboardHome />} />
                <Route path="profile" element={<SettingsPage />} />

                {/* Gestion */}
                <Route path="clients" element={<ClientListPage />} />
                <Route path="clients/new" element={<ClientCreatePage />} />
                <Route path="invoices" element={<InvoiceListPage />} />
                <Route path="invoices/new" element={<InvoiceCreatePage />} />
                <Route path="invoices/:id" element={<InvoiceDetailPage />} />
                <Route path="quotes" element={<QuoteListPage />} />
                <Route path="quotes/new" element={<QuoteCreatePage />} />
                <Route path="proformas" element={<ProformaListPage />} />
                <Route path="proformas/new" element={<ProformaCreatePage />} />

                <Route path="compliance/aml" element={<AmlDashboard />} />
                <Route path="reports" element={<GlobalReportingPage />} />

                <Route path="users" element={<UserListPage />} />
                <Route path="users/new" element={<UserCreatePage />} />
                <Route path="users/:id" element={<UserCreatePage />} />
                <Route path="vendors" element={<VendorManagementPage />} />
                <Route path="fne-verification" element={<FneVerificationPage />} />
                <Route path="config" element={<PlatformConfigPage />} />
                <Route path="reporting" element={<GlobalReportingPage />} />

                <Route path="payments" element={<PaymentListPage />} />
                <Route path="commissions" element={<CommissionListPage />} />
                <Route path="payouts" element={<PayoutListPage />} />
                {/* */}
            </Route>
        </Route>
    </>
);
