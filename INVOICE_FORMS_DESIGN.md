# 📋 Documentation Complète - Formulaires de Facturation

## 🎯 Vue d'ensemble

Conception de formulaires **Devis**, **Proforma** et **Facture** pour une application SaaS de facturation professionnelle avec une expérience utilisateur premium et moderne.

---

## 📐 Architecture UI/UX

### 🏗️ Structure du formulaire

Le formulaire est organisé en **6 sections principales** avec une navigation fluide :

#### **Section 1 : Type de document et facturation**
- Type de document (Devis / Proforma / Facture) - Badge visuel
- Type de facturation (B2B / B2C / B2F / B2G) - Select avec icônes
- Mode de paiement - Select avec icônes
- RNE - Checkbox avec champ conditionnel

#### **Section 2 : Informations client**
**Affichage conditionnel selon le type de facturation**

**🏢 B2B (Business to Business)**
- NCC du client * (obligatoire)
- Nom de la société / du client *
- Téléphone *
- Email *
- Autres mentions (textarea)
- Pied de page (textarea)

**👤 B2C (Business to Consumer)**
- Nom du client *
- Téléphone
- Email
- Autres mentions
- Pied de page

**🌍 B2F (Business to Foreign)**
- Nom du client *
- Téléphone
- Email
- Devise * (select)
- Taux de change * (input numérique)
- Autres mentions
- Pied de page

**🏛️ B2G (Business to Government)**
- Nom de la société / du client *
- Téléphone
- Email
- Autres mentions
- Pied de page

#### **Section 3 : Articles et lignes de facturation**
Table dynamique avec colonnes :
- Quantité (input numérique)
- Référence (input texte)
- Désignation (input texte étendu)
- Unité de mesure (select : pièce, kg, m, etc.)
- Prix Unitaire HT (input numérique)
- Remise % (input numérique 0-100)
- Taux d'imposition (select : 0%, 5%, 10%, etc.)
- **Total HT** (calculé automatiquement et affiché)

Fonctionnalités :
- ➕ Ajouter une ligne (bouton flottant)
- 🗑️ Supprimer une ligne (icône sur chaque ligne)
- Calcul automatique en temps réel
- Validation des données numériques

#### **Section 4 : Autres taxes**
Table dynamique simple :
- Nom de la taxe (input texte)
- Taxe % (input numérique)
- ➕ Ajouter / 🗑️ Supprimer

#### **Section 5 : Remise globale**
- Remise % (input numérique avec slider)
- Montant de la remise (calculé et affiché)
- Affichage visuel de l'impact sur le total

#### **Section 6 : Taxes sur le total TTC**
- Nom de la taxe (input texte)
- Taxe % (input numérique)
- Montant de la taxe (calculé)

---

## 🎨 Design System & UI/UX

### 🌟 Principes de design

#### 1. **Progressive Disclosure**
- Affichage progressif des sections
- Accordéons pour sections avancées
- Champs conditionnels apparaissent avec animation

#### 2. **Visual Hierarchy**
- Headers de section avec icônes
- Séparation claire entre sections
- Utilisation de cards avec élévation

#### 3. **Feedback Visuel**
```
✅ États supportés :
- Default (neutre)
- Focus (bordure primary + shadow)
- Error (bordure rouge + message)
- Success (bordure verte + checkmark)
- Disabled (grisé avec opacité)
- Loading (skeleton loader)
```

#### 4. **Micro-interactions**
- Hover effects sur tous les éléments interactifs
- Transitions fluides (300ms ease-out)
- Animation d'apparition des champs conditionnels
- Feedback tactile sur mobile

### 🎨 Palette de couleurs

```css
Primary (Actions principales) : #10b981 (Emerald Green)
Secondary (Informations) : #0a6fbd (Sky Blue)
Success : #10B981
Warning : #F59E0B
Danger : #EF4444
Info : #0EA5E9

Backgrounds :
- Main : #f8fafc
- Card : #FFFFFF
- Glass : rgba(255, 255, 255, 0.8)

Text :
- Primary : #1e293b
- Secondary : #64748b
- Light : #94a3b8
```

### 📝 Typographie

```css
Font Family : 'Inter', sans-serif
Headings : 'Playfair Display' (optionnel pour titres premium)

Sizes :
- Heading 1 : 2rem (32px) - fw: 700
- Heading 2 : 1.5rem (24px) - fw: 600
- Heading 3 : 1.25rem (20px) - fw: 600
- Body : 1rem (16px) - fw: 400
- Small : 0.875rem (14px) - fw: 400
- Tiny : 0.75rem (12px) - fw: 500
```

### 📏 Spacing & Layout

```css
Container max-width : 1200px
Section padding : 2rem (32px)
Card padding : 1.5rem (24px)
Input padding : 0.75rem 1rem (12px 16px)

Gap between sections : 2rem
Gap between fields : 1rem
Gap in grid : 1.5rem
```

### 🔲 Components

#### **Input Field**
```
- Border radius : 0.5rem (8px)
- Border : 1px solid #E2E8F0
- Focus : 4px shadow primary-light
- Height : 44px (touch-friendly)
- Icon support : left/right icons
```

#### **Select**
```
- Custom styled dropdown
- Search capability pour longues listes
- Icônes pour options visuelles
- Grouped options (ex: devises par région)
```

#### **Textarea**
```
- Auto-resize activé
- Min-height : 100px
- Max-height : 300px
- Character counter optionnel
```

#### **Buttons**
```
Primary : Filled, elevated shadow
Secondary : Outline avec hover effect
Ghost : Transparent, hover background
Icon : Rond, avec ripple effect
```

---

## 🔄 Logic & Comportements

### Affichage conditionnel

```javascript
Type de facturation → Affiche champs spécifiques client
RNE coché → Affiche input RNE
Type = B2F → Affiche Devise + Taux de change
```

### Calculs automatiques

```javascript
// Ligne article
Total HT ligne = Quantité × Prix Unitaire × (1 - Remise%)

// Sous-total
Sous-total HT = Σ(Total HT lignes)

// Remise globale
Montant remise = Sous-total HT × Remise%
Total après remise = Sous-total HT - Montant remise

// Taxes (sur chaque ligne)
Montant taxe ligne = Total HT ligne × Taux imposition

// Total TTC
Total TTC = Total après remise + Σ(Montant taxes) + Autres taxes + Taxes sur TTC
```

### Validation

#### Règles de validation :
```javascript
- Champs obligatoires (*) : vérification en temps réel
- Email : format valide (regex)
- Téléphone : format international suggéré
- Numérique : min/max, décimales autorisées
- Pourcentage : 0-100%
- NCC : format spécifique selon pays
```

#### Messages d'erreur :
```
- Inline (sous le champ)
- Icône d'alerte
- Couleur danger
- Message clair et actionnable
```

---

## 📱 Responsive Design

### Desktop (> 1024px)
```
- Layout en 2 colonnes pour infos client
- Table articles en largeur complète
- Sidebar pour récapitulatif (optionnel)
```

### Tablet (768px - 1024px)
```
- Layout en 1 colonne
- Table articles scrollable horizontalement
- Sections empilées verticalement
```

### Mobile (< 768px)
```
- Layout pleine largeur
- Table articles en cards empilées
- Boutons full-width
- Bottom sheet pour actions
- Sticky header pour total
```

---

## ✅ Checklist de validation UX

### Avant soumission :
- [ ] Tous les champs obligatoires remplis
- [ ] Aucune erreur de validation
- [ ] Au moins 1 article ajouté
- [ ] Calculs corrects affichés
- [ ] Confirmation visuelle demandée

### États du formulaire :
- [ ] Pristine (vierge)
- [ ] Dirty (modifié)
- [ ] Valid (validé)
- [ ] Invalid (erreurs)
- [ ] Submitting (en cours)
- [ ] Submitted (envoyé)

---

## 🚀 Fonctionnalités avancées (Phase 2)

### Suggestions recommandées :
1. **Autocomplete** sur clients existants
2. **Templates** de documents pré-remplis
3. **Historique** des prix par article
4. **Multi-langues** pour documents internationaux
5. **Prévisualisation PDF** en temps réel
6. **Sauvegarde auto** (brouillon)
7. **Export** en multiples formats (PDF, Excel, JSON)
8. **Signature électronique**
9. **Envoi email** direct depuis l'interface
10. **Duplication** de documents existants

---

## 📦 Structure des fichiers

```
src/
├── components/
│   ├── forms/
│   │   ├── InvoiceForm/
│   │   │   ├── InvoiceForm.tsx           # Composant principal
│   │   │   ├── InvoiceForm.css           # Styles spécifiques
│   │   │   ├── sections/
│   │   │   │   ├── DocumentTypeSection.tsx
│   │   │   │   ├── ClientInfoSection.tsx
│   │   │   │   ├── LineItemsSection.tsx
│   │   │   │   ├── TaxesSection.tsx
│   │   │   │   ├── DiscountSection.tsx
│   │   │   │   └── SummarySection.tsx
│   │   │   ├── components/
│   │   │   │   ├── LineItemRow.tsx
│   │   │   │   ├── TaxRow.tsx
│   │   │   │   ├── FormInput.tsx
│   │   │   │   ├── FormSelect.tsx
│   │   │   │   └── FormTextarea.tsx
│   │   │   └── hooks/
│   │   │       ├── useInvoiceCalculations.ts
│   │   │       ├── useInvoiceValidation.ts
│   │   │       └── useConditionalFields.ts
│   └── ui/                               # Composants UI réutilisables
├── pages/
│   ├── invoices/
│   │   ├── CreateInvoice.tsx
│   │   ├── CreateProforma.tsx
│   │   └── CreateQuote.tsx
└── types/
    └── invoice.types.ts                  # Types TypeScript
```

---

## 🎯 Objectifs atteints

✅ Formulaires clairs, structurés et évolutifs  
✅ Expérience utilisateur fluide et moderne  
✅ Affichages conditionnels selon type de facturation  
✅ Réduction de la charge cognitive  
✅ Calculs automatiques en temps réel  
✅ Design premium et professionnel  
✅ Responsive (desktop, tablet, mobile)  
✅ Prêt pour implémentation

---

## 📞 Notes d'implémentation

### Technologies recommandées :
- **React** avec TypeScript
- **React Hook Form** pour gestion des formulaires
- **Zod** pour validation des schémas
- **Framer Motion** pour animations
- **React Icons** pour icônes
- **Tailwind CSS** ou **CSS Modules** pour styling

### Performance :
- Lazy loading des sections
- Debounce sur calculs automatiques (300ms)
- Virtualization pour longues listes d'articles
- Optimistic UI updates

### Accessibilité :
- ARIA labels sur tous les champs
- Navigation clavier complète
- Screen reader friendly
- Focus management
- High contrast mode support

---

**Version** : 1.0  
**Date** : Janvier 2026  
**Statut** : Prêt pour implémentation
