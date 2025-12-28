# Prompt pour Développeur Flutter : Implémentation du Flux d'Inscription (Abonnement) FNE Connect

## 📋 Contexte du Projet

FNE Connect est une plateforme de Facturation Normalisée Électronique conforme à la réglementation de la Direction Générale des Impôts de Côte d'Ivoire. Nous avons besoin d'implémenter le flux complet d'inscription/abonnement dans l'application mobile Flutter, en suivant fidèlement le design et la structure du frontend web.

## 🎯 Objectif

Créer un processus d'inscription multi-étapes (wizard) de 7 étapes pour permettre aux utilisateurs de créer un compte et de s'abonner au service FNE Connect depuis l'application mobile.

---

## 📱 Structure du Flux d'Inscription

Le flux d'inscription comprend **7 étapes séquentielles** :

### Étape 1 : Compte (Création des identifiants)
**Fichier de référence frontend** : `Step1Compte.jsx`

**Champs requis** :
- `phone` : Numéro de téléphone (avec indicatif +225)
  - Type : TextField avec input de type téléphone
  - Placeholder : "07 00 00 00 00"
  - Validation : Format téléphone ivoirien
  - Bouton "Envoyer OTP" adjacent pour vérification
  
- `password` : Mot de passe
  - Type : TextField avec masquage/affichage (toggle eye icon)
  - Placeholder : "Minimum 8 caractères"
  - Icon : Eye/EyeOff de lucide-react (à adapter avec Flutter Icons)
  
- `confirmPassword` : Confirmation du mot de passe
  - Type : TextField avec masquage/affichage
  - Validation : Doit correspondre au mot de passe

**Fonctionnalités** :
- Bouton "Envoyer OTP" qui simule l'envoi d'un code de vérification
- Affichage d'une alerte/snackbar confirmant l'envoi du code OTP
- Bouton "Continuer →" pour passer à l'étape suivante

**Design** :
- Layout centré avec maxWidth: 500px (à adapter pour mobile)
- Titre : "Compte" (fontSize: 1.75rem, fontWeight: 700, color: primary)
- Sous-titre : "Créez vos identifiants de connexion"
- Gap entre les champs : 1.5rem

---

### Étape 2 : Identité (Informations personnelles)
**Fichier de référence frontend** : `Step2Identite.jsx`

**Champs requis** :
- `civilite` : Civilité (Dropdown)
  - Options : "Sélectionner", "M.", "Mme"
  
- `nationalite` : Nationalité (Dropdown)
  - Options : "Sélectionner", "Ivoirienne", "Autre"
  
- `nom` : Nom de famille
  - Type : TextField
  - Placeholder : "Votre nom"
  
- `prenoms` : Prénoms
  - Type : TextField
  - Placeholder : "Vos prénoms"
  
- `dateNaissance` : Date de naissance
  - Type : DatePicker
  - Format : YYYY-MM-DD
  
- `lieuNaissance` : Lieu de naissance
  - Type : TextField
  - Placeholder : "Ville"
  
- `adresse` : Adresse complète
  - Type : TextField
  - Placeholder : "Rue, quartier, commune..."
  
- `email` : Email
  - Type : TextField email
  - Placeholder : "votre@email.com"
  - Validation : Format email valide

**Design** :
- Grille 2 colonnes pour les paires de champs (civilité/nationalité, nom/prénoms, date/lieu)
- Champs pleine largeur pour adresse et email
- Boutons : "← Retour" et "Continuer →"

---

### Étape 3 : Activité (Informations professionnelles)
**Fichier de référence frontend** : `Step3Activite.jsx`

**Champs requis** :
- `typeActivite` : Type d'activité (Dropdown)
  - Options : "Sélectionnez votre activité", "Artisan", "Commerçant", "Prestataire de services", "Freelance", "Autre"
  
- `descriptionActivite` : Description de l'activité (TextArea)
  - Placeholder : "Décrivez brièvement votre activité..."
  - Rows : 4
  
- `nomCommercial` : Nom commercial (optionnel)
  - Type : TextField
  - Placeholder : "Ex: Boutique Chez Mamadou"
  
- `anneeDebut` : Année de début d'activité (Dropdown)
  - Options : Liste des 30 dernières années (année courante - 29)
  - Exemple : 2024, 2023, 2022... jusqu'à 1995

**Design** :
- Titre : "Activité"
- Sous-titre : "Décrivez votre activité professionnelle"
- TextArea avec resize vertical
- Boutons navigation

---

### Étape 4 : Documents (Upload de pièces justificatives)
**Fichier de référence frontend** : `Step4Documents.jsx`

**Documents requis** :
1. `cniRecto` : CNI - Recto
2. `cniVerso` : CNI - Verso
3. `cniSelfie` : Selfie avec CNI
4. `justificatifDomicile` : Justificatif de domicile

**Fonctionnalités** :
- Zone de dépôt (upload area) avec style "dashed border"
- Icône Upload pour la zone vide
- Affichage du nom du fichier une fois sélectionné avec icône FileText
- Bouton X pour supprimer le fichier sélectionné
- Accept : image/*, .pdf
- Message d'information : "ℹ️ Vos documents sont nécessaires pour valider votre compte. Formats acceptés : jpg/png/pdf"

**Design** :
- Chaque zone d'upload : 
  - Border: 2px dashed
  - Padding: 2rem
  - Background: white (vide) / light gray (avec fichier)
  - Cursor: pointer (vide) / default (avec fichier)
- Info box avec background vert clair et border primary
- Utiliser image_picker ou file_picker package Flutter

---

### Étape 5 : Paiement (Sélection formule et méthode)
**Fichier de référence frontend** : `Step5Paiement.jsx`

**Section 1 : Formules d'abonnement**

**Plans disponibles** :
1. **Abonnement Mensuel**
   - Prix : 5 000 FCFA / mois
   - Fonctionnalités :
     - Factures illimitées
     - Conformité DGI garantie
     - Support prioritaire
     - Tableau de bord complet

2. **Abonnement Annuel** (Recommandé)
   - Prix : 50 000 FCFA / an
   - Badge "Recommandé"
   - Économie : "Économisez 10 000 FCFA"
   - Fonctionnalités :
     - Factures illimitées
     - Conformité DGI garantie
     - Support prioritaire 24/7
     - Tableau de bord complet
     - Formation personnalisée
     - 2 mois offerts

**Design des cartes de plan** :
- Cards cliquables avec border conditionnelle (2px solid primary si sélectionné)
- Background légèrement coloré si sélectionné (rgba(0, 186, 113, 0.05))
- Badge "Recommandé" en position absolue (top: -12px)
- Checkmark circulaire dans le coin si sélectionné
- Liste de features avec icônes Check

**Section 2 : Méthode de paiement**

**Options** (Radio buttons) :
- Orange Money
- MTN Money
- Moov Money
- Wave

**Design** :
- Label cliquable avec icon CreditCard
- Border conditionnelle selon sélection
- Info box : "💡 Après validation, vous recevrez un SMS pour confirmer le paiement via [méthode]."

**État du bouton** :
- Désactivé si plan OU méthode non sélectionné
- Texte : "Continuer au paiement →"

---

### Étape 6 : Contrat (Acceptation des conditions)
**Fichier de référence frontend** : `Step6Contrat.jsx`

**Contrat scrollable** :
- Height : 300px
- OverflowY : scroll/auto
- Content : Contrat de Portage Fiscal FNE Connect avec 6 articles

**Articles du contrat** :
1. **Article 1** : Objet du contrat
2. **Article 2** : Obligations de FNE Connect (4 items en liste)
3. **Article 3** : Obligations du porté (4 items en liste)
4. **Article 4** : Frais de service (5% du montant HT, minimum 500 FCFA)
5. **Article 5** : Reversement (48 heures après encaissement)
6. **Article 6** : Durée et résiliation (préavis 1 mois)

**Checkboxes d'acceptation** :
- `cgu` : "J'accepte les conditions générales d'utilisation"
- `confidentialite` : "J'accepte la politique de confidentialité"
- `contratFiscal` : "J'ai lu et j'accepte le contrat de portage fiscal"

**Fonctionnalités** :
- Bouton "Soumettre l'inscription" désactivé tant que les 3 checkboxes ne sont pas cochées
- Style disabled opacity: 0.5

---

### Étape 7 : Validation (Confirmation)
**Fichier de référence frontend** : `Step7Validation.jsx`

**Affichage** :
- Large icône CheckCircle (size: 60, color: primary)
- Cercle de fond avec background: rgba(0, 186, 113, 0.1)
- Titre : "Inscription soumise !"
- Message : "Votre demande d'inscription a été envoyée avec succès."

**Section "Prochaines étapes"** :
- Background vert clair avec border
- Liste de 3 items :
  - "✓ Notre équipe va vérifier vos documents"
  - "✓ Vous recevrez un email de confirmation dans 24-48 heures"
  - "✓ Une fois approuvé, vous pourrez accéder à votre tableau de bord"

**Note** :
- Info box bleu : "Votre compte sera en mode lecture seule jusqu'à validation complète"

**Boutons d'action** :
1. "Accéder au tableau de bord" (primary)
2. "Retour à l'accueil" (light)

---

## 🎨 Composant Stepper (Indicateur de progression)

**Fichier de référence** : `RegistrationStepper.jsx`

**Design** :
- Ligne de progression horizontale (3px height, background: border-color)
- Progression remplie en primary color
- 7 cercles représentant les étapes :
  - Width/Height : 40px
  - Border : 3px solid
  - Background : primary (complété/actif), white (futur)
  - Icône : Check si complété, emoji de l'étape sinon

**États des étapes** :
1. **Complété** (step.number < currentStep) : 
   - Background primary
   - Border primary
   - Icône Check blanche
   
2. **Actif** (step.number === currentStep) :
   - Background primary
   - Border primary
   - Emoji visible
   
3. **Futur** (step.number > currentStep) :
   - Background white
   - Border gray
   - Emoji grisé

**Icônes des étapes** :
- Étape 1 : 👤 (Compte)
- Étape 2 : 🪪 (Identité)
- Étape 3 : 💼 (Activité)
- Étape 4 : 📄 (Documents)
- Étape 5 : 💳 (Paiement)
- Étape 6 : 📋 (Contrat)
- Étape 7 : ✓ (Validation)

**Labels** :
- FontSize : 0.75rem
- Cachés sur mobile (< 768px)

---

## 🏗️ Architecture Recommandée Flutter

### Structure des fichiers suggérée :
```
lib/
├── screens/
│   └── auth/
│       ├── registration/
│       │   ├── registration_page.dart (Page principale avec state management)
│       │   ├── steps/
│       │   │   ├── step1_compte.dart
│       │   │   ├── step2_identite.dart
│       │   │   ├── step3_activite.dart
│       │   │   ├── step4_documents.dart
│       │   │   ├── step5_paiement.dart
│       │   │   ├── step6_contrat.dart
│       │   │   └── step7_validation.dart
│       │   └── widgets/
│       │       ├── registration_stepper.dart
│       │       └── file_upload_box.dart
├── models/
│   └── registration_data.dart (Classe pour stocker toutes les données)
└── services/
    └── registration_service.dart (API calls)
```

### Modèle de données :

```dart
class RegistrationData {
  // Step 1
  String? phone;
  String? password;
  String? confirmPassword;
  
  // Step 2
  String? civilite;
  String? nationalite;
  String? nom;
  String? prenoms;
  DateTime? dateNaissance;
  String? lieuNaissance;
  String? adresse;
  String? email;
  
  // Step 3
  String? typeActivite;
  String? descriptionActivite;
  String? nomCommercial;
  String? anneeDebut;
  
  // Step 4
  File? cniRecto;
  File? cniVerso;
  File? cniSelfie;
  File? justificatifDomicile;
  
  // Step 5
  String? subscriptionPlan; // 'mensuel' ou 'annuel'
  String? paymentMethod;
  
  // Step 6
  Map<String, bool> agreements = {
    'cgu': false,
    'confidentialite': false,
    'contratFiscal': false,
  };
}
```

---

## 🎨 Palette de Couleurs (Variables CSS à adapter)

```dart
// colors.dart
class AppColors {
  static const Color primary = Color(0xFF00BA71); // --primary (FNE Green)
  static const Color secondary = Color(0xFF1E3FA6); // --secondary (Corporate Blue)
  static const Color accent = Color(0xFF10B981); // --accent
  static const Color textMain = Color(0xFF1E293B); // --text-main
  static const Color textSecondary = Color(0xFF475569); // --text-secondary
  static const Color textMuted = Color(0xFF94A3B8); // --text-muted
  static const Color bgMain = Color(0xFFF8FAFC); // --bg-main
  static const Color borderColor = Color(0xFFE2E8F0); // --border-color
  static const Color danger = Color(0xFFEF4444); // --danger
  static const Color success = Color(0xFF10B981); // --success
}
```

---

## 🔄 Navigation et État

### Gestion de l'état :
- Utiliser `Provider`, `Riverpod`, ou `Bloc` pour gérer le state
- `currentStep` : int (1 à 7)
- `formData` : Instance de RegistrationData

### Méthodes de navigation :
```dart
void nextStep() {
  if (currentStep < 7) {
    setState(() => currentStep++);
  }
}

void prevStep() {
  if (currentStep > 1) {
    setState(() => currentStep--);
  }
}

void updateFormData(Map<String, dynamic> updates) {
  // Mettre à jour formData avec les nouvelles valeurs
}
```

### Soumission finale :
```dart
Future<void> handleSubmit() async {
  try {
    // 1. Afficher un loader
    // 2. Appeler l'API de registration
    // 3. Si succès : naviguer vers Step 7
    // 4. Si erreur : afficher message d'erreur
  } catch (e) {
    // Gérer l'erreur
  }
}
```

---

## 📦 Packages Flutter Recommandés

```yaml
dependencies:
  # UI & Navigation
  flutter:
    sdk: flutter
  provider: ^6.0.0  # ou riverpod/bloc selon préférence
  
  # Formulaires & Validation
  flutter_form_builder: ^9.0.0
  form_builder_validators: ^9.0.0
  
  # File Picker
  file_picker: ^6.0.0
  image_picker: ^1.0.0
  
  # Icons
  lucide_icons: ^0.0.1
  
  # Date Picker
  flutter_datetime_picker: ^1.5.1
  
  # HTTP requests
  dio: ^5.0.0
  
  # État global
  shared_preferences: ^2.0.0
```

---

## ✅ Critères de Validation

### Validation par étape :

**Étape 1** :
- Téléphone : Format valide (+225 XX XX XX XX XX)
- Mot de passe : Minimum 8 caractères
- Confirmation : Doit correspondre au mot de passe

**Étape 2** :
- Tous les champs requis remplis
- Email : Format email valide
- Date de naissance : Date valide (âge >= 18 ans)

**Étape 3** :
- Type d'activité sélectionné
- Description non vide

**Étape 4** :
- Au minimum 3 des 4 documents uploadés
- Taille maximale par fichier : 5 MB

**Étape 5** :
- Plan d'abonnement sélectionné
- Méthode de paiement sélectionnée

**Étape 6** :
- Les 3 checkboxes cochées

---

## 🎯 Spécifications Techniques

### Responsive Design :
- Adapter les grilles 2 colonnes en 1 colonne sur petit écran
- Réduire les font sizes sur mobile
- Cacher les labels du stepper sur mobile (< 600px width)

### Animations :
- Transition slide entre les étapes
- Fade in des composants
- Scale animation sur les boutons au tap

### Performance :
- Upload progressif des images (compression si > 1MB)
- Sauvegarde locale du formData (en cas de fermeture app)
- Debounce sur la validation des champs

### Accessibilité :
- Labels sémantiques pour les screen readers
- Contraste de couleurs conforme WCAG AA
- Taille des boutons >= 44x44px

---

## 🧪 Tests Recommandés

1. **Tests unitaires** :
   - Validation des champs
   - Logique de navigation
   - Transformation des données

2. **Tests d'intégration** :
   - Flux complet d'inscription
   - Upload de fichiers
   - Soumission du formulaire

3. **Tests UI** :
   - Rendu correct de chaque étape
   - Interaction avec les boutons
   - Affichage des erreurs

---

## 📝 Notes Importantes

1. **Sécurité** :
   - Ne jamais stocker les mots de passe en clair
   - Utiliser HTTPS pour toutes les requêtes
   - Valider toutes les entrées côté client ET serveur

2. **UX** :
   - Afficher des messages d'erreur clairs
   - Permettre de revenir en arrière sans perdre les données
   - Feedback visuel immédiat sur les actions

3. **API Integration** :
   - Endpoint prévu : `POST /api/auth/register`
   - Format de réponse attendu :
   ```json
   {
     "success": true,
     "message": "Inscription réussie",
     "data": {
       "userId": "...",
       "status": "pending"
     }
   }
   ```

4. **Gestion OTP** :
   - L'étape 1 mentionne un envoi d'OTP mais pas de champ de vérification
   - À clarifier : Faut-il ajouter un champ de vérification du code OTP ?

---

## 🚀 Livrables Attendus

1. ✅ Toutes les 7 étapes fonctionnelles
2. ✅ Stepper de progression visuel
3. ✅ Validation de formulaire complète
4. ✅ Upload de fichiers fonctionnel
5. ✅ Navigation avant/arrière fluide
6. ✅ Design fidèle au frontend web
7. ✅ Code propre et documenté
8. ✅ Tests unitaires et d'intégration
9. ✅ README avec instructions d'installation

---

## 📞 Contact & Support

Pour toute question ou clarification sur ce prompt, merci de contacter l'équipe technique FNE Connect.

---

**Date de création** : 25 Décembre 2025
**Version** : 1.0
**Auteur** : Équipe FNE Connect
