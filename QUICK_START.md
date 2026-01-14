# 🚀 Démarrage Rapide - Formulaires de Facturation

## ⚡ En 5 minutes

### 1️⃣ Tester immédiatement

Ajoutez cette route temporaire dans votre `App.tsx` :

```tsx
import InvoiceDemo from './InvoiceDemo';

// Dans votre Router
<Route path="/test-factures" element={<InvoiceDemo />} />
```

Puis naviguez vers : **http://localhost:5173/test-factures**

### 2️⃣ Créer votre première facture

#### Option A : Utiliser les pages prêtes à l'emploi

```tsx
import CreateInvoice from './pages/invoices/CreateInvoice';

<Route path="/factures/nouvelle" element={<CreateInvoice />} />
```

#### Option B : Utiliser le composant directement

```tsx
import InvoiceForm from './components/forms/InvoiceForm/InvoiceForm';
import { DocumentType } from './types/invoice.types';

function MaPage() {
  const handleSubmit = async (data) => {
    console.log('Données:', data);
    // Votre logique ici
  };

  return (
    <InvoiceForm
      initialData={{ documentType: DocumentType.INVOICE }}
      onSubmit={handleSubmit}
    />
  );
}
```

### 3️⃣ Personnaliser les couleurs

Dans `src/index.css` :

```css
:root {
  --primary: #10b981;      /* Votre couleur principale */
  --secondary: #0a6fbd;    /* Votre couleur secondaire */
}
```

### 4️⃣ Connecter à votre API

Dans vos pages (CreateInvoice.tsx, etc.) :

```tsx
const handleSubmit = async (data: InvoiceFormData) => {
  // Remplacez l'URL par votre endpoint
  const response = await fetch('https://votre-api.com/invoices', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  
  const result = await response.json();
  console.log('Facture créée:', result);
};
```

---

## 📋 Checklist de démarrage

- [ ] Installation de `react-icons` ✓ (déjà fait)
- [ ] Fichiers copiés dans le projet ✓ (déjà fait)
- [ ] Testé la page de démo
- [ ] Ajouté les routes dans votre application
- [ ] Personnalisé les couleurs (si besoin)
- [ ] Connecté à votre API backend
- [ ] Testé la création d'une facture

---

## 🎯 Cas d'usage courants

### Créer une facture B2B

```tsx
<InvoiceForm
  initialData={{
    documentType: DocumentType.INVOICE,
    billingType: BillingType.B2B
  }}
  onSubmit={handleSubmit}
/>
```

### Créer un devis pour client international

```tsx
<InvoiceForm
  initialData={{
    documentType: DocumentType.QUOTE,
    billingType: BillingType.B2F,
    clientInfo: {
      currency: 'EUR',
      exchangeRate: 655.957
    }
  }}
  onSubmit={handleSubmit}
/>
```

### Afficher une facture en lecture seule

```tsx
<InvoiceForm
  initialData={invoiceData}
  readonly={true}
  onSubmit={() => {}}
/>
```

---

## 🐛 Problèmes fréquents

### Erreur : "Cannot find module 'react-icons'"

**Solution** :
```bash
npm install react-icons
```

### Les calculs ne s'affichent pas

**Solution** : Vérifiez que le hook `useInvoiceCalculations` est bien importé dans `InvoiceForm.tsx`

### Les champs conditionnels ne s'affichent pas

**Solution** : Vérifiez que vous avez bien modifié le `billingType` dans l'état du formulaire

---

## 📞 Besoin d'aide ?

1. **Documentation complète** : `INVOICE_FORMS_DESIGN.md`
2. **Guide d'utilisation** : `INVOICE_FORMS_USAGE.md`
3. **Livraison** : `INVOICE_DELIVERY.md`
4. **Exemples** : `src/examples/InvoiceIntegrationExamples.tsx`

---

## ✨ Prochaines étapes

Une fois les bases fonctionnelles :

1. Intégrer avec votre système de gestion de clients
2. Ajouter la génération de PDF
3. Implémenter l'envoi par email
4. Créer un système de templates
5. Ajouter l'historique et les brouillons

---

## 🎉 C'est parti !

Vous êtes prêt à utiliser vos formulaires de facturation premium.

**Bon développement ! 🚀**
