# 🎨 Nouveau Design Premium - Écran de Connexion

L'écran de connexion (`LoginScreen`) a été entièrement repensé pour offrir une expérience utilisateur moderne, fluide et premium.

## ✨ Fonctionnalités Clés

### 1. Arrière-plan "Mesh Gradient"
Au lieu d'un fond blanc plat, nous utilisons des formes géométriques floutées positionnées stratégiquement :
- **Haut Droit** : Cercle vert (Primary Color)
- **Bas Gauche** : Cercle bleu (Secondary Color)
- **Centre Gauche** : Cercle orange (Accent Color)

Ces éléments utilisent `BackdropFilter` avec un flou gaussien (`sigmaX`, `sigmaY`) pour créer un effet de diffusion de lumière très tendance.

### 2. Animations "Staggered" (En cascade)
Les éléments n'apparaissent pas tous en même temps, mais séquentiellement pour guider l'œil de l'utilisateur :
1.  **Header (Logo + Texte)** : Animation immédiate.
2.  **Champs Email** : Délai de 200ms.
3.  **Champ Mot de passe** : Délai de 400ms.
4.  **Boutons** : Animation fluide après 600ms.

Technique utilisée : `AnimationController` principal pour le slide global + `TweenAnimationBuilder` pour les éléments individuels.

### 3. Composants UI Modernes
- **Champs de Saisie** : Style "Boxed" avec fond gris très clair (`#F8FAFC`), bordure subtile et ombre portée légère. Coins très arrondis (30px).
- **Bouton Principal** : Gradient linéaire (`Color(0xFF10B981)` -> `Color(0xFF059669)`) avec ombre portée colorée (Glow effect).
- **Typographie** : Hiérarchie visuelle claire avec des titres en gras et des sous-titres en gris ardoise (`Slate 500`).

## 🛠️ Stack Technique
- **Flutter Natif** : Aucune librairie tierce requise.
- **Widgets Utilisés** : `Stack`, `Positioned`, `BackdropFilter`, `AnimatedBuilder`, `TweenAnimationBuilder`, `SingleChildScrollView`.

## 📱 Aperçu
L'écran est responsive et s'adapte aux différentes tailles d'écran grâce à l'utilisation de `Flexible` et `SingleChildScrollView`.
