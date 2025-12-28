# FNE CONNECT Mobile - Documentation

## 📱 Vue d'ensemble
Application mobile Flutter dédiée aux **Vendeurs** de FNE CONNECT pour gérer leurs activités commerciales en mobilité.

## 🎨 Écrans Développés

### 1. **LoginScreen**
- Authentification sécurisée pour les vendeurs
- Récupération de mot de passe
- Design moderne avec logo et branding FNE CONNECT

### 2. **HomeScreen (Dashboard)**
- Vue d'ensemble des performances (ventes, commissions)
- Actions rapides : Créer facture/devis, ajouter client
- Activités récentes
- Navigation par bottom bar

### 3. **DocumentListScreen**
- 3 onglets : Factures, Devis, Proformas
- Filtres : Tous, Brouillon, En attente, Payées, FNE Envoyées
- Cartes de documents avec statuts colorés
- Bouton flottant pour créer un nouveau document

### 4. **CreateDocumentScreen**
- Formulaire en 3 étapes (Stepper)
  1. Informations client
  2. Articles & Configuration (TVA, AIRSI)
  3. Récapitulatif avec calculs
- Gestion dynamique des articles
- Calcul automatique des totaux

### 5. **ClientListScreen**
- Liste complète des clients
- Barre de recherche
- Statistiques (Total, Actifs, Nouveaux)
- Actions : Appeler, Envoyer email, Créer facture
- Bouton pour ajouter un nouveau client

### 6. **FinanceScreen**
- Carte de solde avec gradient premium
- Statistiques : Semaine, Mois
- Historique des transactions (commissions, retraits)
- Bouton "Demander un retrait"

## 🏗️ Architecture

```
lib/
├── core/
│   └── theme/
│       ├── app_colors.dart        # Palette de couleurs
│       └── app_theme.dart         # Thème Material
├── features/
│   ├── auth/
│   │   └── presentation/
│   │       └── pages/
│   │           └── login_screen.dart
│   ├── dashboard/
│   │   └── presentation/
│   │       └── pages/
│   │           └── home_screen.dart
│   ├── documents/
│   │   └── presentation/
│   │       └── pages/
│   │           ├── document_list_screen.dart
│   │           └── create_document_screen.dart
│   ├── clients/
│   │   └── presentation/
│   │       └── pages/
│   │           └── client_list_screen.dart
│   └── finance/
│       └── presentation/
│           └── pages/
│               └── finance_screen.dart
└── main.dart                      # Point d'entrée avec navigation
```

## 🎨 Design System

### Couleurs
- **Primary** : `#10B981` (Vert émeraude)
- **Secondary** : `#0A6FBD` (Bleu océan)
- **Accent** : `#D97706` (Orange/Or)
- **Success** : `#10B981`
- **Warning** : `#F59E0B`
- **Error** : `#EF4444`
- **Info** : `#0EA5E9`

### Typographie
- Font: **Inter** (Google Fonts)
- Hiérarchie claire avec poids variés (300-700)

## 📦 Dépendances Installées

```yaml
dependencies:
  flutter_bloc: ^8.1.3
  bloc: ^8.1.2
  dio: ^5.4.0
  get_it: ^7.6.4
  equatable: ^2.0.5
  google_fonts: ^6.1.0
  font_awesome_flutter: ^10.6.0
  intl: ^0.19.0
  shimmer: ^3.0.0
```

## 🚀 Prochaines Étapes

### Phase 2 - Intégration API
- [ ] Configuration Dio pour les appels API
- [ ] Implémentation des repositories
- [ ] Gestion du token d'authentification
- [ ] Gestion des erreurs réseau

### Phase 3 - Logique Métier (BLoC)
- [ ] AuthBloc pour l'authentification
- [ ] DocumentBloc pour la gestion des documents
- [ ] ClientBloc pour la gestion des clients
- [ ] FinanceBloc pour les transactions

### Phase 4 - Fonctionnalités Avancées
- [ ] Génération PDF des documents
- [ ] Partage par email/WhatsApp
- [ ] Mode hors ligne avec cache local
- [ ] Notifications push

## 🎯 Fonctionnalités Vendeur (Selon RBAC)

✅ **Accessible sur mobile :**
- Tableau de bord
- Gestion clients
- Création/Gestion factures
- Création/Gestion devis
- Création/Gestion proformas
- Suivi des paiements
- Visualisation des commissions
- Demandes de reversement

❌ **Non accessible (Admin uniquement) :**
- Conformité AML
- Rapports DGI
- Gestion des vendeurs
- Configuration système
- Reporting global

## 🧪 Tests

Pour tester l'application :

```bash
cd fne-connect-mobile
flutter run
```

Pour tester sur un émulateur spécifique :
```bash
flutter run -d <device-id>
```

## 📱 Compatibility
- **Android** : API 21+ (Android 5.0+)
- **iOS** : iOS 11.0+

## 👨‍💻 Développement
- **Architecture** : Clean Architecture
- **Pattern d'état** : BLoC
- **Injection de dépendances** : GetIt (à configurer)
- **Format de code** : `flutter format lib/`

---

**Note** : Cette version contient uniquement les écrans UI. L'intégration avec l'API backend sera effectuée dans la phase suivante.
