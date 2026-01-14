# 📝 Guide d'utilisation - Formulaires de Facturation

## 🚀 Démarrage rapide

### Installation des dépendances

```bash
npm install react-icons
```

### Utilisation de base

```tsx
import CreateInvoice from './pages/invoices/CreateInvoice';
import CreateProforma from './pages/invoices/CreateProforma';
import CreateQuote from './pages/invoices/CreateQuote';

// Dans votre Router
<Route path="/factures/nouvelle" element={<CreateInvoice />} />
<Route path="/proformas/nouvelle" element={<CreateProforma />} />
<Route path="/devis/nouveau" element={<CreateQuote />} />
```

---

## 📁 Structure des fichiers créés

```
src/
├── components/
│   └── forms/
│       └── InvoiceForm/
│           ├── InvoiceForm.tsx      # Composant principal
│           └── InvoiceForm.css      # Styles premium
├── pages/
│   └── invoices/
│       ├── CreateInvoice.tsx        # Page Facture
│       ├── CreateProforma.tsx       # Page Proforma
│       └── CreateQuote.tsx          # Page Devis
├── types/
│   └── invoice.types.ts             # Types TypeScript
└── hooks/
    └── useInvoiceCalculations.ts    # Hook de calculs
```

---

## 🎯 Fonctionnalités implémentées

### ✅ Sections du formulaire

1. **Type de facturation et paiement**
   - Sélection du type (B2B, B2C, B2F, B2G)
   - Mode de paiement
   - Option RNE avec champ conditionnel

2. **Informations client**
   - Affichage conditionnel selon le type
   - Champs spécifiques B2B (NCC)
   - Champs spécifiques B2F (Devise, Taux de change)
   - Mentions et pied de page

3. **Articles et lignes**
   - Table dynamique avec calculs automatiques
   - Ajout/suppression de lignes
   - Total HT calculé par ligne
   - Support des remises et taxes

4. **Autres taxes**
   - Taxes supplémentaires configurables
   - Calcul automatique

5. **Remise globale**
   - Pourcentage de remise
   - Montant calculé automatiquement

6. **Taxes sur TTC**
   - Taxes finales sur le total TTC
   - Calculs en temps réel

7. **Récapitulatif**
   - Affichage de tous les totaux
   - Formatage en devise
   - Total TTC mis en évidence

### ✅ Calculs automatiques

- ✓ Total HT par ligne d'article
- ✓ Sous-total général HT
- ✓ Remise globale (montant et pourcentage)
- ✓ Taxes sur les lignes
- ✓ Autres taxes
- ✓ Taxes sur TTC
- ✓ **Total TTC final**

### ✅ UX/UI Premium

- ✓ Design moderne et professionnel
- ✓ Animations fluides (slideDown, fadeIn)
- ✓ Feedback visuel (hover, focus, error)
- ✓ Responsive (desktop, tablet, mobile)
- ✓ Icônes expressives (React Icons)
- ✓ Sections bien organisées
- ✓ Tooltips et aide contextuelle

---

## 💡 Personnalisation

### Modifier les taux de taxe disponibles

Dans `src/types/invoice.types.ts` :

```typescript
export const TAX_RATE_OPTIONS: SelectOption[] = [
  { value: 0, label: '0%' },
  { value: 5, label: '5%' },
  { value: 18, label: '18%' },
  // Ajoutez vos taux personnalisés
];
```

### Ajouter des devises

```typescript
export const CURRENCY_OPTIONS: SelectOption[] = [
  { value: 'XAF', label: 'XAF - Franc CFA' },
  { value: 'EUR', label: 'EUR - Euro' },
  // Ajoutez vos devises
];
```

### Modifier les unités de mesure

```typescript
export enum UnitOfMeasure {
  PIECE = 'PIECE',
  KG = 'KG',
  // Ajoutez vos unités
}
```

---

## 🔌 Intégration API

### Exemple d'intégration backend

Dans `CreateInvoice.tsx`, remplacez le TODO par votre appel API :

```typescript
    const result = await response.json();
    
    // Success
    toast.success('Facture créée avec succès !');
    navigate(`/factures/${result.id}`);
  } catch (error) {
    toast.error('Erreur lors de la création');
  }
};
```

---

## 🎨 Personnalisation des styles

### Modifier les couleurs

Les couleurs sont définies dans `src/index.css` via les variables CSS :

```css
:root {
  --primary: #10b981;
  --secondary: #0a6fbd;
  /* Modifiez selon votre charte graphique */
}
```

### Ajouter des animations personnalisées

Dans `InvoiceForm.css` :

```css
@keyframes myAnimation {
  from { opacity: 0; }
  to { opacity: 1; }
}

.my-element {
  animation: myAnimation 0.3s ease;
}
```

---

## 📱 Responsive Design

Le formulaire s'adapte automatiquement :

- **Desktop (>1024px)** : Grille 2-4 colonnes
- **Tablet (768-1024px)** : Grille 2 colonnes
- **Mobile (<768px)** : Une seule colonne

### Breakpoints personnalisés

Modifiez dans `InvoiceForm.css` :

```css
@media (max-width: 768px) {
  /* Vos styles mobile */
}
```

---

## 🧪 Tests et validation

### Validation automatique

Les champs obligatoires sont validés automatiquement :
- Champs marqués avec `*` (required)
- Validation email
- Validation numérique (min/max)
- Validation pourcentage (0-100%)

### Ajouter des validations personnalisées

```typescript
const validateForm = (data: InvoiceFormData): string[] => {
  const errors: string[] = [];
  
  if (data.lineItems.length === 0) {
    errors.push('Au moins un article est requis');
  }
  
  if (data.totals.totalTTC <= 0) {
    errors.push('Le total doit être supérieur à 0');
  }
  
  return errors;
};
```

---

## 🚀 Fonctionnalités avancées (à venir)

### Phase 2 - Améliorations prévues

- [ ] **Autocomplete** sur les clients
- [ ] **Templates** de documents
- [ ] **Historique** des prix
- [ ] **Multi-langues**
- [ ] **Prévisualisation PDF**
- [ ] **Sauvegarde automatique** (brouillon)
- [ ] **Export** (PDF, Excel, JSON)
- [ ] **Signature électronique**
- [ ] **Envoi email** direct
- [ ] **Duplication** de documents

---

## 🐛 Dépannage

### Erreur : Module 'react-icons' not found

```bash
npm install react-icons
```

### Erreur : crypto.randomUUID is not defined

Si vous utilisez une version de Node < 15, remplacez dans `useInvoiceCalculations.ts` :

```typescript
// Au lieu de
id: crypto.randomUUID()

// Utilisez
id: Date.now().toString() + Math.random().toString(36)
```

### Les calculs ne se mettent pas à jour

Vérifiez que le hook `useInvoiceCalculations` est bien importé et utilisé dans le composant.

---

## 📚 Documentation complète

Consultez `INVOICE_FORMS_DESIGN.md` pour la documentation détaillée de conception UI/UX.

---

## 🤝 Contribution

Pour toute amélioration ou suggestion :

1. Créez une branche : `git checkout -b feature/amelioration`
2. Commitez vos changements : `git commit -m "Ajout fonctionnalité X"`
3. Pushez la branche : `git push origin feature/amelioration`
4. Créez une Pull Request

---

## 📄 Licence

Ce code fait partie du projet FNE CONNECT.

---

## 🎉 C'est prêt !

Votre système de facturation est maintenant opérationnel. Testez-le en naviguant vers :

- `/factures/nouvelle` - Créer une facture
- `/proformas/nouvelle` - Créer une proforma
- `/devis/nouveau` - Créer un devis

**Bon développement ! 🚀**
