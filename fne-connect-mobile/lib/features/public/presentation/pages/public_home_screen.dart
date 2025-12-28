import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../auth/presentation/pages/login_screen.dart';
import '../../../subscription/presentation/pages/subscription_screen.dart';
import '../pages/draft_invoice_screen.dart';
import '../pages/draft_proforma_screen.dart';

class PublicHomeScreen extends StatelessWidget {
  const PublicHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    final isSmallScreen = screenHeight < 700;
    final isVerySmall = screenHeight < 600;

    return Scaffold(
      body: Container(
        height: screenHeight,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFF10B981),
              Color(0xFF059669),
              Color(0xFF0A6FBD),
            ],
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 8.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                // Header (Compact)
                Container(
                  padding: EdgeInsets.symmetric(vertical: isSmallScreen ? 4 : 12),
                  child: Row( // Using Row for header on all screens to save vertical space
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.2),
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          Icons.account_balance_wallet_rounded,
                          size: isSmallScreen ? 32 : 40,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'FNE CONNECT',
                            style: TextStyle(
                              fontSize: 22,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                              letterSpacing: 1.5,
                            ),
                          ),
                          if (!isVerySmall)
                            Text(
                              'Facturation électronique',
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.white.withValues(alpha: 0.9),
                              ),
                            ),
                        ],
                      ),
                    ],
                  ),
                ),

                // Features Card (Restored List Layout - Extra Compact)
                Container(
                  width: double.infinity,
                  margin: EdgeInsets.symmetric(vertical: isSmallScreen ? 6 : 10),
                  padding: EdgeInsets.symmetric(
                    horizontal: isSmallScreen ? 12 : 16,
                    vertical: isSmallScreen ? 10 : 14,
                  ),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.1),
                        blurRadius: 15,
                        offset: const Offset(0, 8),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'Pourquoi FNE CONNECT ?',
                        style: TextStyle(
                          fontSize: isSmallScreen ? 16 : 18,
                          fontWeight: FontWeight.bold,
                          color: const Color(0xFF1E293B),
                        ),
                      ),
                      SizedBox(height: isSmallScreen ? 8 : 12),
                      _buildFeatureItem(
                        icon: Icons.check_circle_rounded,
                        title: 'Facturation Conforme DGI',
                        description: 'Respect des normes en vigueur',
                        isCompact: isSmallScreen,
                      ),
                      SizedBox(height: isSmallScreen ? 6 : 10),
                      _buildFeatureItem(
                        icon: Icons.flash_on_rounded,
                        title: 'Rapide et Intuitif',
                        description: 'Gagnez du temps au quotidien',
                        isCompact: isSmallScreen,
                      ),
                      SizedBox(height: isSmallScreen ? 6 : 10),
                      _buildFeatureItem(
                        icon: Icons.security_rounded,
                        title: 'Sécurité Maximale',
                        description: 'Vos données sont protégées',
                        isCompact: isSmallScreen,
                      ),
                      SizedBox(height: isSmallScreen ? 6 : 10),
                      _buildFeatureItem(
                        icon: Icons.cloud_done_rounded,
                        title: 'Accès Cloud 24/7',
                        description: 'Partout, tout le temps',
                        isCompact: isSmallScreen,
                      ),
                    ],
                  ),
                ),
                
                // Main Buttons Actions
                Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    _buildPrimaryButton(
                      context,
                      label: 'S\'abonner Maintenant',
                      icon: Icons.star_rounded,
                      gradient: const LinearGradient(
                        colors: [Color(0xFFD97706), Color(0xFFB45309)],
                      ),
                      onTap: () => Navigator.push(context, MaterialPageRoute(builder: (context) => const SubscriptionScreen())),
                      isCompact: isSmallScreen,
                    ),
                    SizedBox(height: isSmallScreen ? 8 : 10),
                    _buildSecondaryButton(
                      context,
                      label: 'Se Connecter',
                      icon: Icons.login_rounded,
                      onTap: () => Navigator.push(context, MaterialPageRoute(builder: (context) => const LoginScreen())),
                      isCompact: isSmallScreen,
                    ),
                  ],
                ),

                SizedBox(height: isSmallScreen ? 8 : 12),

                // Trial / Draft Section
                Container(
                  padding: EdgeInsets.all(isSmallScreen ? 8 : 12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF0F9FF),
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: const Color(0xFF0EA5E9), width: 2),
                  ),
                  child: Column(
                    children: [
                      if (!isVerySmall) ...[
                        const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.lightbulb_rounded, color: Color(0xFF0EA5E9), size: 18),
                            SizedBox(width: 8),
                            Text(
                              'Essayez sans engagement',
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF1E293B),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                      ],
                      Row(
                        children: [
                          Expanded(
                            child: _buildDraftButton(
                              context,
                              label: 'Facture',
                              icon: Icons.receipt_long_rounded,
                              onTap: () => Navigator.push(context, MaterialPageRoute(builder: (context) => const DraftInvoiceScreen())),
                              isCompact: isSmallScreen,
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: _buildDraftButton(
                              context,
                              label: 'Proforma',
                              icon: Icons.assignment_rounded,
                              onTap: () => Navigator.push(context, MaterialPageRoute(builder: (context) => const DraftProformaScreen())),
                              isCompact: isSmallScreen,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildFeatureItem({
    required IconData icon,
    required String title,
    required String description,
    bool isCompact = false,
  }) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.all(6),
          decoration: BoxDecoration(
            color: const Color(0xFF10B981).withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: const Color(0xFF10B981), size: isCompact ? 18 : 22),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontSize: isCompact ? 13 : 15,
                  fontWeight: FontWeight.w600,
                  color: const Color(0xFF1E293B),
                  height: 1.1,
                ),
              ),
              if (!isCompact) ...[
                const SizedBox(height: 2),
                Text(
                  description,
                  style: const TextStyle(
                    fontSize: 12,
                    color: Color(0xFF64748B),
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildPrimaryButton(
    BuildContext context, {
    required String label,
    required IconData icon,
    required Gradient gradient,
    required VoidCallback onTap,
    bool isCompact = false,
  }) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        gradient: gradient,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: gradient.colors.first.withValues(alpha: 0.3),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(12),
          child: Padding(
            padding: EdgeInsets.symmetric(vertical: isCompact ? 10 : 12),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(icon, color: Colors.white, size: isCompact ? 18 : 20),
                const SizedBox(width: 10),
                Text(
                  label,
                  style: TextStyle(
                    fontSize: isCompact ? 14 : 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSecondaryButton(
    BuildContext context, {
    required String label,
    required IconData icon,
    required VoidCallback onTap,
    bool isCompact = false,
  }) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFF10B981), width: 2),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(12),
          child: Padding(
            padding: EdgeInsets.symmetric(vertical: isCompact ? 10 : 12),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(icon, color: const Color(0xFF10B981), size: isCompact ? 18 : 20),
                const SizedBox(width: 10),
                Text(
                  label,
                  style: TextStyle(
                    fontSize: isCompact ? 14 : 16,
                    fontWeight: FontWeight.bold,
                    color: const Color(0xFF10B981),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDraftButton(
    BuildContext context, {
    required String label,
    required IconData icon,
    required VoidCallback onTap,
    bool isCompact = false,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFF0EA5E9), width: 2),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(10),
          child: Padding(
            padding: EdgeInsets.symmetric(vertical: isCompact ? 8 : 12, horizontal: 8),
            child: isCompact 
                ? Row( // On compact screens, use Row (Icon + Text) to save vertical space
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(icon, color: const Color(0xFF0EA5E9), size: 20),
                      const SizedBox(width: 6),
                      Text(
                        label,
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: Color(0xFF1E293B),
                        ),
                      ),
                    ],
                  )
                : Column( // On larger screens, use Column
                    children: [
                      Icon(icon, color: const Color(0xFF0EA5E9), size: 26),
                      const SizedBox(height: 6),
                      Text(
                        label,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: Color(0xFF1E293B),
                          height: 1.3,
                        ),
                      ),
                    ],
                  ),
          ),
        ),
      ),
    );
  }
}
