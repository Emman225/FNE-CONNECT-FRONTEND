# 📁 Carte des Composants - Clean Architecture

## ✅ Structure Validée

### 🎨 Composants UI (`src/components/ui/`)
- ✅ Button.jsx
- ✅ Card.jsx  
- ✅ Container.jsx
- ✅ Input.tsx

### 🔐 Auth (`src/auth/`)
**Pages Auth:**
- ✅ PublicLogin.tsx
- ✅ AdminLogin.tsx
- ✅ VendorForgotPassword.tsx
- ✅ AdminForgotPassword.tsx
- ✅ RegisterPage.tsx (dans src/auth/)
- ✅ RequireRole.tsx
- ✅ AuthProvider.tsx

**Composants Auth (`src/auth/components/`):**
- ✅ InputPassword.jsx  
- ✅ RegistrationStepper.jsx
- ✅ OtpInput.jsx
- ✅ FileUpload.jsx
- ✅ Stepper.jsx
- ✅ AuthLayout.jsx
- ✅ SplitAuthLayout.jsx

### 📊 Features Partagés (`src/app/shared/features/`)

**Clients:**
- ✅ ClientForm.jsx
- ✅ ClientTable.jsx

**Documents:**
- ✅ DocumentForm.jsx
- ✅ DocumentTable.jsx
- ✅ DocumentHistoryTimeline.jsx
- ✅ StatusBadge.jsx
- ✅ DocumentTransformModal.jsx
- ✅ InvoiceForm.jsx

**Payments:**
- ✅ PaymentModal.jsx
- ✅ TransactionTable.jsx
- ✅ TransactionStatusBadge.jsx
- ✅ PaymentMethodSelector.jsx
- ✅ CommissionPaymentModal.jsx

**Invoices:**
- ✅ FneInvoiceModal.jsx

**Payouts:**
- ✅ PayoutReceipt.jsx

**Profile:**
- ✅ GeneralSettings.jsx
- ✅ CompanySettings.jsx
- ✅ SecuritySettings.jsx

**Compliance:**
- ✅ (2 fichiers présents)

### 🎛️ Composants Dashboard (`src/app/shared/components/dashboard/`)
- ✅ Sidebar.jsx
- ✅ Topbar.jsx
- ✅ StatCard.jsx
- ✅ ActivityTimeline.jsx
- ✅ DashboardLayout.jsx

### 🌐 Composants Public (`src/app/public/components/`)
- ✅ Navbar.jsx
- ✅ Footer.jsx
- (Autres composants landing)

### 📄 Pages

**Public (`src/pages/public/`):**
- ✅ landing/ - LandingPage + composants  
- ✅ static/ - AboutPage, NewsPage, FaqPage, ServicesPage, ContactPage
- ✅ auth/ - RegisterPage.jsx (multi-étapes)
- ✅ dashboard/ - VendorDashboardHome.tsx

**Admin (`src/pages/admin/`):**
- ✅ dashboard/ - AdminDashboardHome.tsx
- ✅ platform/ - VendorManagementPage, PlatformConfigPage, GlobalReportingPage
- ✅ platform/users/ - UserListPage, UserCreatePage
- ✅ compliance/ - AmlDashboard

**Shared (`src/pages/shared/`):**
- ✅ clients/ - ClientListPage, ClientCreatePage
- ✅ invoices/ - InvoiceListPage, InvoiceCreatePage, InvoiceDetailPage
- ✅ quotes/ - QuoteListPage, QuoteCreatePage
- ✅ proforma/ - ProformaListPage, ProformaCreatePage
- ✅ payments/ - PaymentListPage
- ✅ commissions/ - CommissionListPage
- ✅ payouts/ - PayoutListPage
- ✅ settings/ - SettingsPage

### 🔧 Utilitaires & Hooks

**Utils (`src/utils/`):**
- ✅ financialUtils.js

**Hooks (`src/hooks/`):**
- ✅ useDashboardPath.js

**Data (`src/data/`):**
- ✅ mockUsers.ts
- ✅ mockData.js

**Types (`src/types/`):**
- ✅ roles.ts

**Context (`src/context/`):**
- ✅ NotificationContext.jsx

**Routes (`src/routes/`):**
- ✅ public.routes.tsx
- ✅ admin.routes.tsx

**Layouts (`src/layouts/`):**
- ✅ PublicLayout.tsx
- ✅ AdminLayout.tsx
- ✅ SplitAuthLayout.tsx

## 🎯 Imports à Utiliser

### Depuis `src/pages/public/`
```javascript
// Composants UI
import Container from '../../../components/ui/Container';
import Card from '../../../components/ui/Card';

// Navbar/Footer
import Navbar from '../../../app/public/components/Navbar';
import Footer from '../../../app/public/components/Footer';
```

### Depuis `src/pages/shared/`
```javascript
// Features
import ClientForm from '../../../../app/shared/features/clients/ClientForm';
import DocumentTable from '../../../../app/shared/features/documents/DocumentTable';
import PaymentModal from '../../../../app/shared/features/payments/PaymentModal';
```

### Depuis `src/pages/admin/`
```javascript
// Dashboard components
import StatCard from '../../../app/shared/components/dashboard/StatCard';

// Features
import StatusBadge from '../../../../app/shared/features/documents/StatusBadge';

// Utils & Data
import { formatCurrency } from '../../../../utils/financialUtils';
import { MOCK_AML_ALERTS } from '../../../../data/mockData';
```

## ✨ Statut Final

**Tous les composants sont en place !** 

La prochaine compilation devrait réussir ou afficher uniquement des erreurs de syntaxe/logique, pas d'imports manquants.

---
*Carte générée le: 2025-12-22 16:15 UTC*
