# Plan de Développement : FNE CONNECT Mobile (Vendeurs)

## 1. Analyse du Rôle Vendeur
Le Vendeur est l'acteur principal sur le terrain. Ses besoins critiques sont :
- **Rapidité** : Créer un devis ou une facture en quelques secondes devant le client.
- **Suivi** : Savoir si ses factures sont payées et suivre ses commissions.
- **Mobilité** : Interface optimisée pour une utilisation à une main.

## 2. Architecture Technique
- **Framework** : Flutter
- **Gestion d'état** : BLoC (Business Logic Component)
- **Architecture** : Clean Architecture
    - **Data** : Sources de données (Local/Remote) et Repositories.
    - **Domain** : Entités et Use Cases (Logique métier pure).
    - **Presentation** : UI (Widgets) et Logique d'interface (BLoCs).
- **Navigation** : AutoRouter ou GoRouter.
- **Injection de dépendances** : GetIt & Injectable.

## 3. Structure des Dossiers Proposée
```text
fne_connect_mobile/
├── lib/
│   ├── core/                # Code partagé (thème, utils, erreurs)
│   ├── features/            # Fonctionnalités par domaine
│   │   ├── auth/            # Authentification
│   │   ├── dashboard/       # Tableau de bord
│   │   ├── documents/       # Factures, Devis, Proformas
│   │   ├── clients/         # Gestion des clients
│   │   └── finance/         # Commissions, Paiements
│   └── main.dart
```

## 4. Écrans à Implémenter (V1 - UI Only)
1.  **SplashScreen** : Logo et initialisation.
2.  **LoginScreen** : Saisie des identifiants vendeur.
3.  **HomeScreen (Dashboard)** : Résumé des ventes, boutons d'action rapide.
4.  **DocumentListScreen** : Liste filtrable avec onglets (Factures, Devis, Proformas).
5.  **CreateDocumentScreen** : Formulaire par étapes (Client -> Articles -> Récapitulatif).
6.  **ClientListScreen** : Carnet d'adresses client.
7.  **FinancialScreen** : Historique des commissions et retraits.

## 5. Prochaines Étapes
- [ ] Initialisation du projet Flutter.
- [ ] Mise en place du thème (Couleurs FNE CONNECT : Bleu/Orange).
- [ ] Création des modèles de données (Entities).
- [ ] Développement des écrans UI.
