import 'package:flutter/material.dart';
import '../../../../auth/data/models/registration_data.dart';
import '../../../../dashboard/presentation/pages/main_navigation_screen.dart';
import '../../../../public/presentation/pages/public_home_screen.dart';
import '../../widgets/registration_form_styles.dart';

class Step7Validation extends StatefulWidget {
  final RegistrationData data;

  const Step7Validation({super.key, required this.data});

  @override
  State<Step7Validation> createState() => _Step7ValidationState();
}

class _Step7ValidationState extends State<Step7Validation> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );

    _scaleAnimation = CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.0, 0.6, curve: Curves.elasticOut),
    );

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.4, 1.0, curve: Curves.easeIn),
      ),
    );

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _goToDashboard() {
    // Redirection propre vers le dashboard
    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (context) => const MainNavigationScreen()),
      (route) => false,
    );
  }

  void _goToHome() {
    // Redirection propre vers l'accueil public
    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (context) => const PublicHomeScreen()),
      (route) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const SizedBox(height: 40),
          
          // Animation de Succès
          ScaleTransition(
            scale: _scaleAnimation,
            child: Container(
              width: 120,
              height: 120,
              decoration: BoxDecoration(
                color: const Color(0xFFDCFCE7),
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF00BA71).withOpacity(0.2),
                    blurRadius: 30,
                    spreadRadius: 10,
                  ),
                ],
              ),
              child: const Icon(
                Icons.check_rounded,
                size: 80,
                color: Color(0xFF00BA71),
              ),
            ),
          ),
          const SizedBox(height: 32),

          FadeTransition(
            opacity: _fadeAnimation,
            child: Column(
              children: [
                const Text(
                  'Félicitations !',
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF1E293B),
                    letterSpacing: -0.5,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  'Votre inscription a été soumise avec succès.',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.grey[600],
                    height: 1.5,
                  ),
                ),
                const SizedBox(height: 48),

                // Carte des prochaines étapes
                RegistrationFormStyles.buildShadowContainer(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'PROCHAINES ÉTAPES',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF94A3B8),
                          letterSpacing: 1.2,
                        ),
                      ),
                      const SizedBox(height: 20),
                      _buildStepItem(
                        icon: Icons.mark_email_read_outlined,
                        title: 'Vérification Email',
                        desc: 'Un email de confirmation a été envoyé à ${widget.data.email ?? "votre adresse"}',
                        isDone: true,
                      ),
                      _buildDivider(),
                      _buildStepItem(
                        icon: Icons.admin_panel_settings_outlined,
                        title: 'Validation Administrative',
                        desc: 'Nos équipes vont vérifier vos documents sous 24h.',
                      ),
                      _buildDivider(),
                      _buildStepItem(
                        icon: Icons.rocket_launch_outlined,
                        title: 'Activation du Compte',
                        desc: 'Vous pourrez commencer à vendre dès validation.',
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 48),

                RegistrationFormStyles.buildGradientButton(
                  text: 'Accéder au tableau de bord',
                  onPressed: _goToDashboard,
                  icon: Icons.dashboard_outlined,
                ),
                const SizedBox(height: 16),
                TextButton(
                  onPressed: _goToHome,
                  style: TextButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    foregroundColor: const Color(0xFF64748B),
                  ),
                  child: const Text(
                    'Retour à l\'accueil',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
  
  Widget _buildStepItem({
    required IconData icon,
    required String title,
    required String desc,
    bool isDone = false,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: isDone ? const Color(0xFFDCFCE7) : const Color(0xFFF1F5F9),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(
            isDone ? Icons.check : icon,
            color: isDone ? const Color(0xFF00BA71) : const Color(0xFF64748B),
            size: 20,
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 15,
                  color: isDone ? const Color(0xFF00BA71) : const Color(0xFF1E293B),
                ),
              ),
              const SizedBox(height: 4),
              Text(
                desc,
                style: const TextStyle(
                  fontSize: 13,
                  color: Color(0xFF64748B),
                  height: 1.4,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildDivider() {
    return Container(
      margin: const EdgeInsets.only(left: 19, top: 4, bottom: 4), // Align with icon center
      height: 24,
      width: 2,
      color: const Color(0xFFE2E8F0),
    );
  }
}
