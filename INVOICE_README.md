# 🧾 Formulaires de Facturation - FNE CONNECT

> Système complet et premium de formulaires **Devis**, **Proforma** et **Facture** pour applications SaaS professionnelles.

![Version](https://img.shields.io/badge/version-1.0-green)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![Design](https://img.shields.io/badge/design-premium-purple)

---

## ✨ Fonctionnalités

- ✅ **3 types de documents** : Devis, Proforma, Facture
- ✅ **4 types de facturation** : B2B, B2C, B2F (International), B2G (Gouvernement)
- ✅ **Affichage conditionnel** intelligent selon le type de client
- ✅ **Table d'articles dynamique** avec ajout/suppression de lignes
- ✅ **Calculs automatiques** en temps réel
- ✅ **Multi-devises** pour clients internationaux
- ✅ **Gestion avancée des taxes** (par ligne, globales, sur TTC)
- ✅ **Remises flexibles** (par article et globale)
- ✅ **Design premium** et moderne
- ✅ **100% Responsive** (desktop, tablet, mobile)
- ✅ **TypeScript** avec type safety complète

---

## 🚀 Démarrage rapide

### 1. Installation

```bash
npm install react-icons
```

### 2. Tester immédiatement

Ajoutez dans votre `App.tsx` :

```tsx
import InvoiceDemo from './InvoiceDemo';

<Route path="/demo" element={<InvoiceDemo />} />
```

Naviguez vers `http://localhost:5173/demo`

### 3. Intégrer dans votre app

```tsx
import CreateInvoice from './pages/invoices/CreateInvoice';

<Route path="/factures/nouvelle" element={<CreateInvoice />} />
```

**📖 Pour plus de détails, consultez [QUICK_START.md](./QUICK_START.md)**

---

## 📚 Documentation

| Document | Description | Pour qui ? |
|----------|-------------|-----------|
| **[INDEX.md](./INDEX.md)** | 📖 Navigation complète | Tous |
| **[QUICK_START.md](./QUICK_START.md)** | ⚡ Démarrage en 5 min | Développeurs |
| **[INVOICE_FORMS_DESIGN.md](./INVOICE_FORMS_DESIGN.md)** | 🎨 Conception UI/UX | Designers |
| **[INVOICE_FORMS_USAGE.md](./INVOICE_FORMS_USAGE.md)** | 💻 Guide technique | Développeurs |
| **[INVOICE_DELIVERY.md](./INVOICE_DELIVERY.md)** | ✅ Livraison complète | Project Managers |
| **[VISUAL_PRESENTATION.md](./VISUAL_PRESENTATION.md)** | 📊 Présentation visuelle | Tous |

---

## 🏗️ Architecture

```
src/
├── 📁 types/
│   └── invoice.types.ts              # Types & Interfaces TypeScript
│
├── 📁 hooks/
│   └── useInvoiceCalculations.ts     # Logique de calculs automatiques
│
├── 📁 components/forms/InvoiceForm/
│   ├── InvoiceForm.tsx               # Composant principal (~900 lignes)
│   └── InvoiceForm.css               # Styles premium (~700 lignes)
│
├── 📁 pages/invoices/
│   ├── CreateInvoice.tsx             # Page Facture
│   ├── CreateProforma.tsx            # Page Proforma
│   └── CreateQuote.tsx               # Page Devis
│
├── 📁 examples/
│   └── InvoiceIntegrationExamples.tsx # Exemples d'intégration
│
└── 📁 demo/
    ├── InvoiceDemo.tsx               # Page de démonstration
    └── InvoiceDemo.css               # Styles de la démo
```

---

## 🎨 Aperçu Design

### En-tête du formulaire
![Header](https://img.shields.io/badge/Header-Gradient%20Premium-10b981)

### Table d'articles
![Table](https://img.shields.io/badge/Table-Dynamic%20Lines-0a6fbd)

### Récapitulatif
![Summary](https://img.shields.io/badge/Summary-Auto%20Calculations-f59e0b)

---

## 💡 Exemples d'utilisation

### Créer une facture B2B

```tsx
import InvoiceForm from './components/forms/InvoiceForm/InvoiceForm';
import { DocumentType, BillingType } from './types/invoice.types';

<InvoiceForm
  initialData={{
    documentType: DocumentType.INVOICE,
    billingType: BillingType.B2B
  }}
  onSubmit={async (data) => {
    await fetch('/api/invoices', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }}
/>
```

### Afficher en lecture seule

```tsx
<InvoiceForm
  initialData={existingInvoice}
  readonly={true}
/>
```

**🔍 Plus d'exemples dans [src/examples/InvoiceIntegrationExamples.tsx](./src/examples/InvoiceIntegrationExamples.tsx)**

---

## 🎯 Sections du formulaire

1. **Type de facturation & Paiement**
   - Sélection du type (B2B/B2C/B2F/B2G)
   - Mode de paiement
   - Option RNE

2. **Informations Client** *(conditionnel)*
   - Champs adaptés selon le type
   - Support multi-devises (B2F)

3. **Articles** *(dynamique)*
   - Table avec calculs automatiques
   - Ajout/suppression de lignes

4. **Autres Taxes**
   - Taxes supplémentaires configurables

5. **Remise Globale**
   - Pourcentage avec calcul automatique

6. **Taxes sur TTC**
   - Taxes finales sur le total

7. **📊 Récapitulatif**
   - Tous les totaux calculés
   - **TOTAL TTC** mis en évidence

---

## 🔧 Personnalisation

### Couleurs

Modifiez dans `src/index.css` :

```css
:root {
  --primary: #10b981;     /* Votre couleur principale */
  --secondary: #0a6fbd;   /* Votre couleur secondaire */
}
```

### Devises

Ajoutez dans `src/types/invoice.types.ts` :

```typescript
export const CURRENCY_OPTIONS = [
  { value: 'XAF', label: 'XAF - Franc CFA' },
  { value: 'EUR', label: 'EUR - Euro' },
  // Ajoutez vos devises
];
```

### Taux de taxe

```typescript
export const TAX_RATE_OPTIONS = [
  { value: 0, label: '0%' },
  { value: 18, label: '18%' },
  // Ajoutez vos taux
];
```

---

## 📱 Responsive

| Device | Breakpoint | Layout |
|--------|-----------|--------|
| 🖥️ Desktop | > 1024px | Grille 2-4 colonnes |
| 📱 Tablet | 768-1024px | Grille 2 colonnes |
| 📱 Mobile | < 768px | 1 colonne |

---

## ✅ Checklist d'intégration

### Installation
- [x] `react-icons` installé
- [ ] Routes configurées
- [ ] Page de démo testée

### Configuration
- [ ] Couleurs personnalisées (optionnel)
- [ ] Devises ajustées
- [ ] API endpoints configurés

### Tests
- [ ] Création de facture testée
- [ ] Calculs vérifiés
- [ ] Responsive validé

---

## 🚀 Prochaines étapes

Une fois le système en place :

- [ ] Intégration avec système de clients
- [ ] Génération PDF
- [ ] Envoi email automatique
- [ ] Templates pré-remplis
- [ ] Sauvegarde automatique (brouillons)

---

## 📊 Statistiques

- **Lignes de code** : ~5,500 lignes
- **Fichiers créés** : 15
- **Documentation** : 6 fichiers
- **Composants** : 3 principaux
- **Pages** : 3 prêtes à l'emploi
- **Coverage TypeScript** : 100%

---

## 🤝 Support

### Besoin d'aide ?

1. 📖 Consultez [INDEX.md](./INDEX.md) pour la navigation
2. ⚡ Commencez par [QUICK_START.md](./QUICK_START.md)
3. 💻 Explorez les exemples dans `src/examples/`

### Problèmes courants

| Problème | Solution |
|----------|----------|
| Module 'react-icons' not found | `npm install react-icons` |
| Calculs ne se mettent pas à jour | Vérifier import du hook |
| Champs conditionnels invisibles | Vérifier `billingType` |

---

## 📄 Licence

Ce code fait partie du projet **FNE CONNECT**.

---

## 🎉 Prêt à l'emploi !

Le système est **100% opérationnel** et prêt pour la production.

**🚀 Commencez maintenant avec [QUICK_START.md](./QUICK_START.md)**

---

<div align="center">

**Made with ❤️ for FNE CONNECT**

![Ready](https://img.shields.io/badge/Ready-For%20Production-brightgreen?style=for-the-badge)

</div>
