# 📱 Modifications Frontend Web → Mobile Flutter (Vendeurs Uniquement)
## Période : 3 derniers jours (11-14 janvier 2026)

---

## 🎯 Vue d'ensemble
Ce document récapitule toutes les modifications apportées au frontend web (React) concernant la gestion des **Clients**, **Devis**, **Proforma** et **Factures**, pour l'application mobile Flutter destinée exclusivement aux **Vendeurs**.

---

## 📋 I. GESTION DES FACTURES (Invoices)

### 1. Système de Filtrage Amélioré

#### 1.1 Filtres disponibles (Vue Vendeur)
**Localisation :** `InvoiceListPage.jsx`

**Filtres :**
- **Toutes** : Affiche toutes les factures (`filterStatus = 'all'`)
- **Brouillon** : Factures en brouillon (`status = 'draft'`)
- **En attente** : Factures en attente de paiement (`status = 'pending'`)
- **FNE Envoyées** : Factures payées en vérification (`status = 'verifying'`)
- **FNE Reçu** : Factures avec FNE certifiée reçue (`status = 'fne_generated'`)

**Implémentation Flutter :**
```dart
enum InvoiceFilter {
  all,
  draft,
  pending,
  verifying, // FNE Envoyées
  fneGenerated, // FNE Reçu
}

List<Invoice> filterInvoices(List<Invoice> invoices, InvoiceFilter filter) {
  if (filter == InvoiceFilter.all) return invoices;
  return invoices.where((inv) => inv.status == filter.name).toList();
}
```

#### 1.2 Statuts de Facture

**Mapping des statuts avec libellés :**

| Status Code | Libellé (Vendeur) | Couleur | Description |
|------------|-------------------|---------|-------------|
| `draft` | Brouillon | Gris (#94A3B8) | Facture non finalisée |
| `pending` | En attente | Orange (#F59E0B) | En attente de paiement |
| `paid` | Payée | Bleu (#3B82F6) | Paiement effectué |
| `verifying` | Payé - En vérification | Bleu clair (#0369A1) | FNE en cours de vérification |
| `fne_generated` | FNE Reçu | Vert (#16A34A) | FNE certifiée reçue |
| `rejected` | Rejetée | Rouge (#DC2626) | Facture rejetée |
| `cancelled` | Annulée | Gris foncé (#6B7280) | Facture annulée |

**Implémentation Flutter :**
```dart
class InvoiceStatus {
  static const String draft = 'draft';
  static const String pending = 'pending';
  static const String paid = 'paid';
  static const String verifying = 'verifying';
  static const String fneGenerated = 'fne_generated';
  static const String rejected = 'rejected';
  static const String cancelled = 'cancelled';
}

class StatusBadge extends StatelessWidget {
  final String status;
  
  Color _getColor() {
    switch (status) {
      case InvoiceStatus.draft:
        return Color(0xFF94A3B8);
      case InvoiceStatus.pending:
        return Color(0xFFF59E0B);
      case InvoiceStatus.paid:
        return Color(0xFF3B82F6);
      case InvoiceStatus.verifying:
        return Color(0xFF0369A1);
      case InvoiceStatus.fneGenerated:
        return Color(0xFF16A34A);
      case InvoiceStatus.rejected:
        return Color(0xFFDC2626);
      case InvoiceStatus.cancelled:
        return Color(0xFF6B7280);
      default:
        return Color(0xFF94A3B8);
    }
  }
  
  String _getLabel() {
    switch (status) {
      case InvoiceStatus.draft:
        return 'Brouillon';
      case InvoiceStatus.pending:
        return 'En attente';
      case InvoiceStatus.paid:
        return 'Payée';
      case InvoiceStatus.verifying:
        return 'Payé - En vérification';
      case InvoiceStatus.fneGenerated:
        return 'FNE Reçu';
      case InvoiceStatus.rejected:
        return 'Rejetée';
      case InvoiceStatus.cancelled:
        return 'Annulée';
      default:
        return 'Inconnu';
    }
  }
}
```

### 2. Actions sur les Factures

#### 2.1 Actions par statut (Pour Vendeur)

**Status: `draft` ou `pending`**
- ✅ **Voir** : Navigation vers détail
- ✅ **Payer** : Si `isComplete = true` (via modal de paiement)
- ✅ **Modifier** : Navigation vers édition
- ✅ **Supprimer** : Avec confirmation

**Status: `paid`**
- ✅ **Voir** : Navigation vers détail
- ✅ **Générer FNE** : Ouvre modal de génération FNE

**Status: `verifying`**
- ✅ **Voir** : Navigation vers détail
- ⏸️ (Aucune autre action possible, en attente de validation admin)

**Status: `fne_generated`**
- ✅ **Voir** : Navigation vers détail avec FNE
- ✅ **Télécharger FNE** : PDF de la facture certifiée

**Implémentation Flutter :**
```dart
List<Action> getInvoiceActions(Invoice invoice) {
  List<Action> actions = [
    Action(icon: Icons.visibility, label: 'Voir', onTap: () => viewInvoice(invoice)),
  ];
  
  if (invoice.status == InvoiceStatus.draft || invoice.status == InvoiceStatus.pending) {
    if (invoice.isComplete) {
      actions.add(Action(icon: Icons.payment, label: 'Payer', onTap: () => payInvoice(invoice)));
    }
    actions.add(Action(icon: Icons.edit, label: 'Modifier', onTap: () => editInvoice(invoice)));
    actions.add(Action(icon: Icons.delete, label: 'Supprimer', onTap: () => deleteInvoice(invoice)));
  }
  
  if (invoice.status == InvoiceStatus.paid) {
    actions.add(Action(icon: Icons.file_present, label: 'Générer FNE', onTap: () => generateFNE(invoice)));
  }
  
  if (invoice.status == InvoiceStatus.fneGenerated) {
    actions.add(Action(icon: Icons.download, label: 'Télécharger FNE', onTap: () => downloadFNE(invoice)));
  }
  
  return actions;
}
```

### 3. Affichage de Détail de Facture

#### 3.1 Watermark selon le statut

**Localisation :** `InvoiceDetailPage.jsx` (lignes 240-260)

**Logique :**
```javascript
// Si ID facture = 1, 4, ou 104 → status = fne_generated
const isFneGenerated = invoice.status === 'fne_generated';

// Si ID facture = 2, 3, 5, 101, 102, 103 → status = verifying
const isVerifying = invoice.status === 'verifying';
```

**Watermarks :**
- **Status `verifying`** : Texte = `"Payé - En vérification"` (bleu)
- **Status `fne_generated`** : Texte = `"FNE Reçu"` (vert)

**Implémentation Flutter :**
```dart
Widget buildWatermark(Invoice invoice) {
  if (invoice.status == InvoiceStatus.verifying) {
    return Watermark(
      text: 'Payé - En vérification',
      color: Color(0xFF0369A1).withOpacity(0.1),
    );
  } else if (invoice.status == InvoiceStatus.fneGenerated) {
    return Watermark(
      text: 'FNE Reçu',
      color: Color(0xFF16A34A).withOpacity(0.1),
    );
  }
  return SizedBox.shrink();
}
```

#### 3.2 Panel de statut de vente

**Localisation :** `InvoiceDetailPage.jsx` (ligne 467)

**Affichage :**
- Si `isVerifying` → `"PAYÉ - EN VÉRIFICATION"`
- Si `isFneGenerated` → Badge "FNE Reçu"

### 4. Génération de Facture FNE

#### 4.1 Modal de génération FNE

**Nouveau composant :** `FneInvoiceModal.jsx`

**Fonctionnalités :**
- 📄 **Génération du numéro FNE** : Format `{NCC}-{YEAR}{COUNTER}`
  - Exemple : `1441119U-25000001`
- 📱 **Génération du QR Code** : Données encodées incluant le numéro FNE
- 💾 **Actions** :
  - Télécharger PDF
  - Partager
  - Imprimer
  - Envoyer par email

**Structure du numéro FNE :**
```dart
String generateFNENumber(String ncc, int year, int counter) {
  String yearSuffix = year.toString().substring(2); // 2025 → 25
  String paddedCounter = counter.toString().padLeft(6, '0');
  return '$ncc-$yearSuffix$paddedCounter';
}

// Exemple d'utilisation
String fneNumber = generateFNENumber('1441119U', 2025, 1);
// Résultat : 1441119U-25000001
```

**Données du QR Code :**
```dart
Map<String, dynamic> getFneQRData(Invoice invoice) {
  return {
    'fne_number': invoice.fneNumber,
    'invoice_number': invoice.number,
    'vendor_name': invoice.issuer.name,
    'vendor_ncc': invoice.issuer.ncc,
    'client_name': invoice.client.name,
    'amount_ttc': invoice.totalAmount,
    'date': invoice.date,
    'verification_url': 'https://fneconnect.sn/verify/${invoice.fneNumber}',
  };
}
```

---

## 📋 II. GESTION DES DEVIS (Quotes)

### 1. Filtres et Statuts

**Statuts identiques aux factures** avec les mêmes couleurs et libellés.

### 2. Actions spécifiques aux Devis

#### 2.1 Conversion de Devis

**Actions disponibles :**
- ✅ **Convertir en Proforma** : Crée une proforma à partir du devis
- ✅ **Convertir en Facture** : Crée une facture à partir du devis

**Implémentation Flutter :**
```dart
Future<void> convertQuote(Quote quote, String targetType) async {
  if (targetType == 'proforma') {
    Proforma proforma = Proforma.fromQuote(quote);
    await navigateToProformaCreate(proforma);
  } else if (targetType == 'invoice') {
    Invoice invoice = Invoice.fromQuote(quote);
    await navigateToInvoiceCreate(invoice);
  }
}
```

### 3. Boutons de conversion dans le tableau

**Localisation :** `DocumentTable.jsx` (lignes 126-134)

**UI :**
- 🔄 Bouton "Convertir en Proforma" (icône Edit, couleur secondaire)
- 📄 Bouton "Convertir en Facture" (icône FileCheck, couleur primaire)

---

## 📋 III. GESTION DES PROFORMAS

### 1. Actions spécifiques aux Proformas

**Action unique :**
- ✅ **Convertir en Facture** : Crée une facture à partir de la proforma

**Implémentation Flutter :**
```dart
Future<void> convertProformaToInvoice(Proforma proforma) async {
  Invoice invoice = Invoice.fromProforma(proforma);
  await navigateToInvoiceCreate(invoice);
}
```

---

## 📋 IV. GESTION DES CLIENTS

### 1. Structure des données Client

**Champs identiques** à la version web actuelle.

### 2. Actions

**Actions disponibles :**
- ✅ **Voir** : Afficher détails
- ✅ **Modifier** : Éditer informations
- ✅ **Supprimer** : Avec confirmation

---

##  V. DÉCONNEXION ET NAVIGATION

### 1. Redirection après déconnexion

**Comportement :**
- **Vendeur** → Redirection vers l'écran de Login Vendeur/Public

**Implémentation Flutter :**
```dart
Future<void> logout() async {
  await clearUserSession();
  navigateToLoginScreen();
}
```

### 2. Nettoyage de session

**Ordre d'exécution :**
1. Nettoyer le stockage local (`SharedPreferences` ou `SecureStorage`)
2. Rediriger immédiatement

---

## 🎨 VI. COMPOSANTS UI COMMUNS

### 1. StatusBadge (Vue Vendeur)

**Props :**
- `status` (String) : Code du statut
- `label` (String, optionnel) : Libellé personnalisé (Par défaut : Libellé vendeur)

**Rendu :**
- Badge arrondi avec couleur de fond claire et texte coloré
- Police en majuscules, petite taille
- Border radius : 999px (complètement arrondi)

### 2. DocumentTable

**Colonnes obligatoires :**
1. **N° Document** : Avec icône FileText
2. **N° Compte** : Format monospace
3. **Client** : Nom + Téléphone
4. **Date** : Format dd/MM/yyyy
5. **Montant TTC** : Format FCFA avec séparateurs
6. **Statut** : Badge coloré
7. **Actions** : Boutons d'action

---

## 📊 VII. MOCK DATA

### Factures (Exemple Vendeur)

```dart
List<Invoice> mockInvoices = [
  Invoice(
    id: 1,
    accountNumber: 'FNE-25897001',
    number: 'FAC-2023-001',
    clientName: 'Jean Doe',
    clientPhone: '0708091011',
    date: '2023-12-01',
    amount: 150000,
    status: 'fne_generated', // Affiche "FNE Reçu"
    isComplete: true,
  ),
  Invoice(
    id: 2,
    accountNumber: 'FNE-25897002',
    number: 'FAC-2023-002',
    clientName: 'Entreprise ABC',
    clientPhone: '0102030405',
    date: '2023-12-05',
    amount: 2500000,
    status: 'pending',
    isComplete: true,
  ),
  // ... etc
];
```

---

## 🔄 VIII. FLUX DE TRAVAIL FNE (Perspective Vendeur)

### Parcours d'une facture :

1. **Brouillon** (`draft`)
   ↓ (Vendeur finalise)
   
2. **En attente** (`pending`)
   ↓ (Vendeur effectue/reçoit paiement)
   
3. **Payée** (`paid`)
   ↓ (Vendeur génère FNE)
   
4. **Payé - En vérification** (`verifying`)
   ↓ (Attente validation externe)
   
5. **FNE Reçu** (`fne_generated`)
   ✅ Facture certifiée disponible au téléchargement

**Alternative :**
- Étape 4 → **Rejetée** (`rejected`) si la validation échoue

---

## 📌 IX. CHECKLIST D'IMPLÉMENTATION MOBILE (Vendeur)

### Phase 1 : Modèles de données
- [ ] Mettre à jour le modèle `Invoice` avec nouveaux statuts
- [ ] Mettre à jour le modèle `Quote`
- [ ] Mettre à jour le modèle `Proforma`
- [ ] Ajouter le champ `isComplete` à `Invoice`

### Phase 2 : UI Components
- [ ] Créer/Mettre à jour `StatusBadge` widget avec libellés vendeur
- [ ] Créer les filtres de statut (chips/tabs)
- [ ] Implémenter les boutons d'action conditionnels
- [ ] Ajouter le watermark sur les détails de facture

### Phase 3 : Fonctionnalités FNE
- [ ] Modal de génération FNE
- [ ] Génération du numéro FNE
- [ ] Génération du QR Code
- [ ] Actions (Download, Share, Print, Email)

### Phase 4 : Conversions
- [ ] Devis → Proforma
- [ ] Devis → Facture
- [ ] Proforma → Facture

### Phase 5 : Navigation & Auth
- [ ] Redirection post-déconnexion vers Login
- [ ] Nettoyage de session propre

### Phase 6 : Tests
- [ ] Tester tous les filtres de statut
- [ ] Tester toutes les actions par statut
- [ ] Tester la génération FNE
- [ ] Tester les conversions de documents
- [ ] Tester la déconnexion

---

## 📞 CONTACT & SUPPORT

Pour toute question ou clarification, contactez l'équipe frontend web.

**Documentation complétée le :** 14 janvier 2026
**Version :** 1.1 (Adaptée Mobile Vendeur)
**Auteur :** Équipe FNE Connect Frontend
