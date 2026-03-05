# 📋 Implémentation du Workflow de Validation des Retraits

## ✅ Ce qui a été fait

### 1. Types TypeScript (`src/types/payout.types.ts`)

**Enums créés :**
- `PayoutStatus` : 7 statuts (pending_finance, pending_admin, approved, completed, rejected_finance, rejected_admin, cancelled)
- `WithdrawalMethod` : 5 méthodes (wave, orange_money, mtn_momo, moov_money, bank_transfer)

**Interfaces créées :**
- `ValidationAction` : Action de validation (Finance ou Admin)
- `Payout` : Retrait complet avec workflow
- `WithdrawalRequest` : Demande de retrait
- `ValidationRequest` : Validation par Finance/Admin
- `PayoutStats` : Statistiques

**Fonctions utilitaires :**
- `canFinanceValidate()` : Vérifie si Finance peut valider
- `canAdminValidate()` : Vérifie si Admin peut valider
- `getNextStatusAfterFinance()` : Prochain statut après Finance
- `getNextStatusAfterAdmin()` : Prochain statut après Admin

---

### 2. Données Mock (`src/data/mockData.js`)

**6 retraits créés avec différents statuts :**

| ID | Vendeur | Montant | Statut | Description |
|----|---------|---------|--------|-------------|
| PAY-001 | Jean Kouassi | 485 000 | completed | Validé Finance + Admin, traité |
| PAY-002 | Aminata Traore | 1 455 000 | pending_finance | En attente Finance |
| PAY-003 | Ibrahim Diallo | 727 500 | pending_admin | Validé Finance, attente Admin |
| PAY-004 | Fatoumata Sow | 242 500 | rejected_finance | Rejeté par Finance |
| PAY-005 | Mohamed Kone | 3 104 000 | pending_finance | En attente Finance |
| PAY-006 | Aissatou Bah | 950 600 | approved | Validé Admin, en cours |

---

### 3. Modal de Validation (`src/components/modals/PayoutValidationModal.jsx`)

**Fonctionnalités :**
- ✅ Affichage des détails du retrait
- ✅ Informations du vendeur
- ✅ Calcul des montants (brut, commission, net)
- ✅ Historique de validation (Finance visible pour Admin)
- ✅ Choix d'action : Valider ou Rejeter
- ✅ Motifs de rejet prédéfinis :
  - Justificatifs manquants
  - Bon de commande non signé
  - Informations bancaires incorrectes
  - Montant non conforme
  - Documents expirés
  - Vérification complémentaire nécessaire
- ✅ Champ commentaires optionnel
- ✅ Validation contextuelle (Finance ou Admin)

---

## 🚧 Ce qui reste à faire

### 4. Badge de Statut avec Workflow Visuel

**Fichier à créer :** `src/components/ui/PayoutStatusBadge.jsx`

```jsx
import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { PAYOUT_STATUS_LABELS, PAYOUT_STATUS_COLORS } from '../../types/payout.types';

const PayoutStatusBadge = ({ status, showWorkflow = false }) => {
    const getIcon = () => {
        switch (status) {
            case 'pending_finance':
            case 'pending_admin':
                return <Clock size={14} />;
            case 'completed':
                return <CheckCircle size={14} />;
            case 'approved':
                return <TrendingUp size={14} />;
            case 'rejected_finance':
            case 'rejected_admin':
                return <XCircle size={14} />;
            default:
                return <AlertCircle size={14} />;
        }
    };

    const workflowSteps = [
        { key: 'finance', label: 'Finance', active: status !== 'pending_finance' },
        { key: 'admin', label: 'Admin', active: ['approved', 'completed'].includes(status) },
        { key: 'completed', label: 'Traité', active: status === 'completed' }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {/* Badge principal */}
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.375rem 0.875rem',
                borderRadius: '9999px',
                backgroundColor: `${PAYOUT_STATUS_COLORS[status]}15`,
                border: `1.5px solid ${PAYOUT_STATUS_COLORS[status]}`,
                fontSize: '0.8125rem',
                fontWeight: '600',
                color: PAYOUT_STATUS_COLORS[status],
                whiteSpace: 'nowrap'
            }}>
                {getIcon()}
                {PAYOUT_STATUS_LABELS[status]}
            </div>

            {/* Workflow visuel (optionnel) */}
            {showWorkflow && !status.includes('rejected') && status !== 'cancelled' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {workflowSteps.map((step, idx) => (
                        <React.Fragment key={step.key}>
                            <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: step.active ? 'var(--success)' : 'var(--border-color)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.625rem',
                                fontWeight: '700'
                            }}>
                                {step.active ? '✓' : idx + 1}
                            </div>
                            {idx < workflowSteps.length - 1 && (
                                <div style={{
                                    flex: 1,
                                    height: '2px',
                                    backgroundColor: step.active ? 'var(--success)' : 'var(--border-color)',
                                    minWidth: '20px'
                                }} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PayoutStatusBadge;
```

---

### 5. Mise à Jour de PayoutListPage

**Fichier à modifier :** `src/pages/shared/payouts/PayoutListPage.jsx`

**Modifications nécessaires :**

#### A. Imports
```jsx
import { useAuth } from '../../../auth/AuthProvider';
import PayoutValidationModal from '../../../components/modals/PayoutValidationModal';
import PayoutStatusBadge from '../../../components/ui/PayoutStatusBadge';
import { PAYOUT_STATUS_LABELS } from '../../../types/payout.types';
```

#### B. État et filtres
```jsx
const { user } = useAuth();
const [payouts, setPayouts] = useState(MOCK_PAYOUTS);
const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending_finance', 'pending_admin', 'approved', 'completed', 'rejected'
const [selectedPayout, setSelectedPayout] = useState(null);
const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);

// Filtrer les payouts
const filteredPayouts = useMemo(() => {
    if (statusFilter === 'all') return payouts;
    return payouts.filter(p => p.status === statusFilter);
}, [payouts, statusFilter]);

// Statistiques par rôle
const pendingFinance = payouts.filter(p => p.status === 'pending_finance');
const pendingAdmin = payouts.filter(p => p.status === 'pending_admin');
const approved = payouts.filter(p => p.status === 'approved');
const completed = payouts.filter(p => p.status === 'completed');
const rejected = payouts.filter(p => p.status.includes('rejected'));
```

#### C. Boutons de filtre (remplacer les stats cards)
```jsx
<div style={{
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    overflowX: 'auto',
    paddingBottom: '0.5rem'
}}>
    {[
        { key: 'all', label: 'Tous', count: payouts.length, color: 'var(--primary)' },
        { key: 'pending_finance', label: 'En attente Finance', count: pendingFinance.length, color: '#F59E0B' },
        { key: 'pending_admin', label: 'En attente Admin', count: pendingAdmin.length, color: '#3B82F6' },
        { key: 'approved', label: 'Approuvés', count: approved.length, color: '#8B5CF6' },
        { key: 'completed', label: 'Effectués', count: completed.length, color: '#10B981' },
        { key: 'rejected', label: 'Rejetés', count: rejected.length, color: '#EF4444' }
    ].map(filter => (
        <button
            key={filter.key}
            onClick={() => setStatusFilter(filter.key === statusFilter ? 'all' : filter.key)}
            style={{
                padding: '0.875rem 1.5rem',
                borderRadius: 'var(--radius-lg)',
                border: statusFilter === filter.key ? `2px solid ${filter.color}` : '2px solid var(--border-color)',
                backgroundColor: statusFilter === filter.key ? `${filter.color}15` : 'white',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                minWidth: '140px',
                transition: 'all 0.2s'
            }}
        >
            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: filter.color }}>
                {filter.count}
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                {filter.label}
            </span>
        </button>
    ))}
</div>
```

#### D. Colonne de statut (modifier)
```jsx
{
    key: 'status',
    label: 'Statut',
    align: 'center',
    sortable: true,
    width: '200px',
    render: (row) => <PayoutStatusBadge status={row.status} showWorkflow={true} />
}
```

#### E. Actions de ligne (modifier renderRowActions)
```jsx
const renderRowActions = (payout) => {
    const canValidateFinance = user?.role === 'FINANCE' && payout.status === 'pending_finance';
    const canValidateAdmin = user?.role === 'ADMIN' && payout.status === 'pending_admin';

    if (canValidateFinance || canValidateAdmin) {
        return (
            <Button
                size="sm"
                onClick={() => handleOpenValidation(payout)}
                style={{ backgroundColor: '#3B82F6' }}
            >
                Valider
            </Button>
        );
    }

    if (payout.status === 'completed') {
        return (
            <button
                onClick={() => handleViewReceipt(payout)}
                style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid var(--primary)',
                    borderRadius: 'var(--radius-md)',
                    background: 'white',
                    color: 'var(--primary)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                }}
            >
                <Eye size={16} />
                Reçu
            </button>
        );
    }

    if (payout.status.includes('rejected')) {
        return (
            <div style={{ color: 'var(--danger)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                {payout.financeValidation?.reason || payout.adminValidation?.reason}
            </div>
        );
    }

    return null;
};
```

#### F. Handlers de validation
```jsx
const handleOpenValidation = (payout) => {
    setSelectedPayout(payout);
    setIsValidationModalOpen(true);
};

const handleValidate = (payoutId, comments) => {
    setPayouts(prev => prev.map(p => {
        if (p.id === payoutId) {
            const role = user.role;
            const validation = {
                role,
                userId: user.id,
                userName: user.name,
                action: 'approved',
                timestamp: new Date().toISOString(),
                comments
            };

            if (role === 'FINANCE') {
                return {
                    ...p,
                    status: 'pending_admin',
                    financeValidation: validation,
                    updatedAt: new Date().toISOString()
                };
            } else {
                return {
                    ...p,
                    status: 'approved',
                    adminValidation: validation,
                    processedAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
            }
        }
        return p;
    }));

    setIsValidationModalOpen(false);
    setSelectedPayout(null);
    // Afficher toast de succès
};

const handleReject = (payoutId, reason, comments) => {
    setPayouts(prev => prev.map(p => {
        if (p.id === payoutId) {
            const role = user.role;
            const validation = {
                role,
                userId: user.id,
                userName: user.name,
                action: 'rejected',
                reason,
                timestamp: new Date().toISOString(),
                comments
            };

            const newStatus = role === 'FINANCE' ? 'rejected_finance' : 'rejected_admin';

            return {
                ...p,
                status: newStatus,
                [role === 'FINANCE' ? 'financeValidation' : 'adminValidation']: validation,
                updatedAt: new Date().toISOString()
            };
        }
        return p;
    }));

    setIsValidationModalOpen(false);
    setSelectedPayout(null);
    // Afficher toast de rejet
};
```

#### G. Modal de validation (à ajouter en fin de render)
```jsx
<PayoutValidationModal
    isOpen={isValidationModalOpen}
    onClose={() => {
        setIsValidationModalOpen(false);
        setSelectedPayout(null);
    }}
    payout={selectedPayout}
    userRole={user?.role}
    onValidate={handleValidate}
    onReject={handleReject}
/>
```

---

## 🔄 Workflow Complet

### Cas 1 : Validation complète

```
1. Vendeur initie retrait (1 455 000 FCFA)
   Status: pending_finance
   ↓
2. Finance clique "Valider"
   → Modal s'ouvre
   → Finance vérifie et valide
   Status: pending_admin
   ↓
3. Admin clique "Valider"
   → Modal s'ouvre
   → Admin confirme
   Status: approved
   ↓
4. Système traite le paiement
   Status: completed
```

### Cas 2 : Rejet par Finance

```
1. Vendeur initie retrait (242 500 FCFA)
   Status: pending_finance
   ↓
2. Finance clique "Valider"
   → Modal s'ouvre
   → Finance choisit "Rejeter"
   → Sélectionne motif: "Justificatifs manquants"
   → Ajoute commentaire
   Status: rejected_finance
   ↓
3. Vendeur est notifié
   → Reçoit le motif du rejet
   → Peut relancer une nouvelle demande
```

### Cas 3 : Rejet par Admin

```
1. Vendeur initie retrait
   Status: pending_finance
   ↓
2. Finance valide
   Status: pending_admin
   ↓
3. Admin clique "Valider"
   → Modal s'ouvre
   → Admin choisit "Rejeter"
   → Sélectionne motif: "Vérification complémentaire nécessaire"
   Status: rejected_admin
   ↓
4. Vendeur et Finance sont notifiés
```

---

## 🎨 Interface Utilisateur

### Filtres Rapides (Cliquables)

```
┌─────────┬──────────────────┬──────────────────┬────────────┬──────────┬──────────┐
│  Tous   │ En attente       │ En attente       │ Approuvés  │ Effectués│ Rejetés  │
│   6     │ Finance          │ Admin            │     1      │    2     │    1     │
│         │     2            │     1            │            │          │          │
└─────────┴──────────────────┴──────────────────┴────────────┴──────────┴──────────┘
```

### Badge avec Workflow Visuel

```
┌─────────────────────────────────┐
│ 🕐 En attente Admin              │
│ ─────────────────────────────── │
│ ✓──────✓──────○                 │
│ Finance Admin Traité            │
└─────────────────────────────────┘
```

### Actions Contextuelles

| Statut | Rôle Finance | Rôle Admin | Rôle Vendeur |
|--------|--------------|------------|--------------|
| pending_finance | [Valider] | - | - |
| pending_admin | ✓ Validé | [Valider] | - |
| approved | ✓ Validé | ✓ Validé | En cours... |
| completed | ✓ Validé | ✓ Validé | [Reçu] |
| rejected_finance | ✗ Rejeté | - | Motif affiché |
| rejected_admin | ✓ Validé | ✗ Rejeté | Motif affiché |

---

## 🚀 Prochaines Étapes Recommandées

1. **Créer PayoutStatusBadge.jsx** (badge de statut avec workflow visuel)
2. **Mettre à jour PayoutListPage.jsx** (filtres + modal de validation)
3. **Notifications en temps réel**
   - Email/SMS au vendeur après chaque validation
   - Notification Finance quand nouveau retrait
   - Notification Admin quand Finance valide
4. **Historique détaillé**
   - Timeline de validation dans une page dédiée
   - Export PDF du workflow complet
5. **Tests d'intégration**
   - Tester le workflow complet
   - Vérifier les permissions par rôle

---

## 📝 Notes Importantes

### Permissions
- **FINANCE** : Peut valider uniquement les retraits en `pending_finance`
- **ADMIN** : Peut valider uniquement les retraits en `pending_admin`
- **VENDEUR** : Peut voir ses propres retraits et leurs statuts

### Notifications
À chaque changement de statut :
- Vendeur reçoit un email/SMS
- Finance reçoit une notification (nouveau retrait)
- Admin reçoit une notification (validé par Finance)

### Motifs de Rejet
Les motifs sont obligatoires en cas de rejet pour assurer la transparence et permettre au vendeur de corriger.

---

Voulez-vous que je continue avec l'implémentation des composants restants ?
