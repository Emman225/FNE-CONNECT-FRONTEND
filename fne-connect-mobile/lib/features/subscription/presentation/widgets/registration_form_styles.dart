import 'package:flutter/material.dart';

class RegistrationFormStyles {
  static const Color primaryColor = Color(0xFF00BA71);
  static const Color primaryDark = Color(0xFF00945A);
  // Utilisation de withValues au lieu de withOpacity (compatibilité Flutter)
  static final Color shadowColor = Colors.black.withValues(alpha: 0.05);

  /// Titre de section avec sous-titre optionnel
  static Widget buildHeader(String title, {String? subtitle}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text( // Le titre reste en dehors ou en dedans, on verra. Souvent mieux dedans.
          title,
          style: const TextStyle(
            fontSize: 24, // un peu plus petit si dans une card
            fontWeight: FontWeight.bold,
            color: primaryColor,
            letterSpacing: -0.5,
          ),
        ),
        if (subtitle != null) ...[
          const SizedBox(height: 8),
          Text(
            subtitle,
            style: TextStyle(
              fontSize: 14,
              color: Colors.grey[600],
              height: 1.5,
            ),
          ),
        ],
        const SizedBox(height: 24),
      ],
    );
  }

  /// Le grand conteneur BLANC avec CADRE qui enveloppe tout le formulaire de l'étape
  static Widget buildFormWrapper({required Widget child}) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: const Color(0xFFCBD5E1), // Cadre visible (Slate-300)
          width: 1.5,
        ),
        boxShadow: [
          // Grosse ombre d'élévation pour le bloc principal
          BoxShadow(
            color: const Color(0xFF64748B).withValues(alpha: 0.15),
            blurRadius: 32,
            offset: const Offset(0, 12),
            spreadRadius: -4,
          ),
          // Ombre fine de contour
          BoxShadow(
            color: const Color(0xFF64748B).withValues(alpha: 0.05),
            blurRadius: 4,
            offset: const Offset(0, 2),
            spreadRadius: 0,
          ),
        ],
      ),
      child: child,
    );
  }

  /// Décoration premium pour les champs de saisie (Inputs à l'intérieur du wrapper)
  static InputDecoration premiumInputDecoration({
    required String hint,
    IconData? icon,
    Widget? suffixIcon,
    String? prefixText,
  }) {
    return InputDecoration(
      hintText: hint,
      hintStyle: TextStyle(color: Colors.grey[400], fontSize: 14),
      prefixIcon: icon != null ? Icon(icon, color: primaryColor, size: 22) : null,
      prefixText: prefixText,
      prefixStyle: const TextStyle(color: Color(0xFF1E293B), fontWeight: FontWeight.bold),
      suffixIcon: suffixIcon,
      
      filled: true,
      fillColor: Colors.transparent, // Le fond est géré par le shadowContainer (input box)
      
      contentPadding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
      isDense: true,
      
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide.none,
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide.none,
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: const BorderSide(color: primaryColor, width: 1.5),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: const BorderSide(color: Colors.red, width: 1),
      ),
    );
  }

  /// Conteneur pour un champ individuel (Input) À L'INTÉRIEUR du Wrapper
  /// Devient un champ gris clair pour contraster avec le wrapper blanc
  static Widget buildShadowContainer({required Widget child, EdgeInsetsGeometry? padding}) {
    return Container(
      width: double.infinity,
      padding: padding,
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC), // Gris très clair (Slate-50)
        borderRadius: BorderRadius.circular(16), // Arrondi un peu moins que le wrapper (24 vs 16)
        border: Border.all(
          color: const Color(0xFFE2E8F0), // Bordure fine (Slate-200)
          width: 1.0,
        ),
        // Pas d'ombre ici pour ne pas surcharger
      ),
      child: child,
    );
  }

  /// Label pour les champs
  static Widget buildLabel(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6, left: 4),
      child: Text(
        text,
        style: const TextStyle(
          fontSize: 13,
          fontWeight: FontWeight.w600,
          color: Color(0xFF475569), // Slate-600
          letterSpacing: 0.2,
        ),
      ),
    );
  }

  /// Bouton principal avec gradient
  static Widget buildGradientButton({
    required String text,
    required VoidCallback? onPressed,
    IconData? icon,
  }) {
    return Container(
      width: double.infinity,
      height: 52,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        gradient: onPressed != null
            ? const LinearGradient(
                colors: [primaryColor, primaryDark],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              )
            : LinearGradient(
                colors: [Colors.grey[300]!, Colors.grey[400]!],
              ),
        boxShadow: onPressed != null
            ? [
                BoxShadow(
                  color: primaryColor.withValues(alpha: 0.3),
                  blurRadius: 12,
                  offset: const Offset(0, 6),
                  spreadRadius: -2,
                ),
              ]
            : [],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onPressed,
          borderRadius: BorderRadius.circular(16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                text,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: Colors.white,
                  letterSpacing: 0.5,
                ),
              ),
              if (icon != null) ...[
                const SizedBox(width: 8),
                Icon(icon, color: Colors.white, size: 20),
              ],
            ],
          ),
        ),
      ),
    );
  }

  /// Bouton secondaire (Retour)
  static Widget buildSecondaryButton({
    required String text,
    required VoidCallback onPressed,
  }) {
    return SizedBox(
      width: double.infinity,
      height: 52,
      child: OutlinedButton(
        onPressed: onPressed,
        style: OutlinedButton.styleFrom(
          side: BorderSide(color: Colors.grey[300]!, width: 1.0),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          foregroundColor: Colors.grey[600],
          backgroundColor: Colors.white,
          elevation: 0,
        ),
        child: Text(
          text,
          style: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
  
  /// Row de navigation (Retour + Continuer)
  static Widget buildNavigationButtons({
    required VoidCallback onPrevious,
    required VoidCallback? onNext,
    String nextLabel = 'Continuer',
  }) {
    return Column(
      children: [
        buildGradientButton(
          text: nextLabel,
          onPressed: onNext,
          icon: Icons.arrow_forward_rounded,
        ),
        const SizedBox(height: 12),
        buildSecondaryButton(
          text: 'Retour',
          onPressed: onPrevious,
        ),
      ],
    );
  }
}
