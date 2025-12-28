import 'package:flutter/material.dart';
//import '../../../../core/theme/app_colors.dart';
import '../../../dashboard/presentation/pages/main_navigation_screen.dart';
import '../../../subscription/presentation/pages/subscription_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> with SingleTickerProviderStateMixin {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isPasswordVisible = false;
  
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    );

    _fadeAnimation = CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.0, 0.6, curve: Curves.easeOut),
    );

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.3),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.2, 1.0, curve: Curves.easeOutCubic),
    ));

    _scaleAnimation = Tween<double>(
      begin: 0.8,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.0, 0.6, curve: Curves.easeOutBack),
    ));

    _controller.forward();
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    // Aggressive small screen check
    final isSmallScreen = screenHeight < 700;
    final isVerySmall = screenHeight < 600;

    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: const Color(0xFF10B981),
      body: Container(
        height: screenHeight, // Force full height
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF059669),
              Color(0xFF10B981),
              Color(0xFF0A6FBD),
            ],
          ),
        ),
        child: Stack(
          children: [
            // Decorative Circles
            Positioned(top: -80, right: -80, child: _buildDecorativeCircle(250, 0.08)),
            Positioned(top: 120, left: -40, child: _buildDecorativeCircle(150, 0.1)),
            Positioned(bottom: 100, right: 20, child: _buildDecorativeCircle(100, 0.06)),

            // Main Content
            SafeArea(
              child: Column(
                children: [
                  // Very Compact Header with Animations
                  Expanded(
                    flex: isSmallScreen ? 1 : 2,
                    child: Center(
                      child: FadeTransition(
                        opacity: _fadeAnimation,
                        child: ScaleTransition(
                          scale: _scaleAnimation,
                          child: isVerySmall
                              ? Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    _buildHeaderIcon(28),
                                    const SizedBox(width: 12),
                                    _buildHeaderText(20, false),
                                  ],
                                )
                              : Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    _buildHeaderIcon(isSmallScreen ? 32 : 44),
                                    SizedBox(height: isSmallScreen ? 8 : 16),
                                    _buildHeaderText(isSmallScreen ? 22 : 26, !isSmallScreen),
                                  ],
                                ),
                        ),
                      ),
                    ),
                  ),

                  // Compact Form Section with Slide Animation
                  Expanded(
                    flex: isSmallScreen ? 4 : 5,
                    child: SlideTransition(
                      position: _slideAnimation,
                      child: Container(
                        width: double.infinity,
                        padding: EdgeInsets.fromLTRB(24, isSmallScreen ? 20 : 30, 24, isSmallScreen ? 10 : 20),
                        decoration: const BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.only(
                            topLeft: Radius.circular(30),
                            topRight: Radius.circular(30),
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black26,
                              blurRadius: 20,
                              offset: Offset(0, -5),
                            ),
                          ],
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            if (!isSmallScreen) ...[
                              const Text(
                                'Connexion',
                                style: TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xFF1E293B),
                                ),
                              ),
                              const Text(
                                'Entrez vos identifiants',
                                style: TextStyle(
                                  fontSize: 13,
                                  color: Color(0xFF64748B),
                                ),
                              ),
                            ],

                            // Fields - Compact spacing
                            Column(
                              children: [
                                _buildModernTextField(
                                  controller: _emailController,
                                  label: 'Adresse Email',
                                  hint: 'exemple@email.com',
                                  icon: Icons.email_outlined,
                                  keyboardType: TextInputType.emailAddress,
                                  isCompact: isSmallScreen,
                                ),
                                SizedBox(height: isSmallScreen ? 12 : 20),
                                _buildModernTextField(
                                  controller: _passwordController,
                                  label: 'Mot de passe',
                                  hint: '••••••••',
                                  icon: Icons.lock_outline,
                                  isPassword: true,
                                  isCompact: isSmallScreen,
                                ),

                                // Forgot Password
                                Align(
                                  alignment: Alignment.centerRight,
                                  child: TextButton(
                                    onPressed: () {},
                                    style: TextButton.styleFrom(
                                      foregroundColor: const Color(0xFF10B981),
                                      padding: EdgeInsets.symmetric(
                                          horizontal: 4, vertical: isSmallScreen ? 0 : 4),
                                      minimumSize: Size.zero,
                                      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                      visualDensity: VisualDensity.compact,
                                    ),
                                    child: Text(
                                      'Mot de passe oublié ?',
                                      style: TextStyle(
                                        fontWeight: FontWeight.w600,
                                        fontSize: isSmallScreen ? 12 : 13,
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),

                            // Actions
                            Column(
                              children: [
                                _buildGradientButton(
                                  label: 'SE CONNECTER',
                                  onPressed: () {
                                    Navigator.pushReplacement(
                                      context,
                                      MaterialPageRoute(
                                        builder: (context) => const MainNavigationScreen(),
                                      ),
                                    );
                                  },
                                ),
                                SizedBox(height: isSmallScreen ? 10 : 16),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(
                                      "Pas encore de compte ? ",
                                      style: TextStyle(
                                          color: const Color(0xFF64748B),
                                          fontSize: isSmallScreen ? 12 : 13),
                                    ),
                                    GestureDetector(
                                      onTap: () => Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) => const SubscriptionScreen(),
                                        ),
                                      ),
                                      child: Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                        decoration: BoxDecoration(
                                          color: const Color(0xFF10B981).withValues(alpha: 0.1),
                                          borderRadius: BorderRadius.circular(6),
                                        ),
                                        child: Text(
                                          "Créer un compte",
                                          style: TextStyle(
                                            color: const Color(0xFF10B981),
                                            fontWeight: FontWeight.bold,
                                            fontSize: isSmallScreen ? 12 : 13,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDecorativeCircle(double size, double opacity) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: RadialGradient(
          colors: [
            Colors.white.withValues(alpha: opacity),
            Colors.white.withValues(alpha: opacity * 0.3),
            Colors.transparent,
          ],
        ),
      ),
    );
  }

  // Helper for Header Icon
  Widget _buildHeaderIcon(double size) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.15),
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 15,
            spreadRadius: 3,
          ),
        ],
      ),
      child: Icon(Icons.account_balance_wallet_rounded, color: Colors.white, size: size),
    );
  }

  // Helper for Header Text
  Widget _buildHeaderText(double fontSize, bool showSubtitle) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          'FNE CONNECT',
          style: TextStyle(
            fontSize: fontSize,
            fontWeight: FontWeight.bold,
            color: Colors.white,
            letterSpacing: 1.5,
          ),
        ),
        if (showSubtitle) ...[
          const SizedBox(height: 4),
          Text(
            'Bienvenue ! Connectez-vous',
            style: TextStyle(
              fontSize: 13,
              color: Colors.white.withValues(alpha: 0.7),
              fontWeight: FontWeight.w300,
            ),
          ),
        ],
      ],
    );
  }

  Widget _buildModernTextField({
    required TextEditingController controller,
    required String label,
    required String hint,
    required IconData icon,
    bool isPassword = false,
    TextInputType keyboardType = TextInputType.text,
    bool isCompact = false,
  }) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(14),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.02),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: TextField(
        controller: controller,
        obscureText: isPassword && !_isPasswordVisible,
        keyboardType: keyboardType,
        style: TextStyle(fontSize: 14, color: const Color(0xFF1E293B)),
        decoration: InputDecoration(
          labelText: label,
          labelStyle: const TextStyle(
            color: Color(0xFF64748B),
            fontSize: 13,
            fontWeight: FontWeight.w500,
          ),
          floatingLabelStyle:
              const TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.w600),
          hintText: hint,
          hintStyle: const TextStyle(color: Color(0xFFCBD5E1), fontSize: 13),
          prefixIcon: Icon(icon, color: const Color(0xFF10B981), size: 20),
          suffixIcon: isPassword
              ? IconButton(
                  icon: Icon(
                    _isPasswordVisible
                        ? Icons.visibility_outlined
                        : Icons.visibility_off_outlined,
                    color: const Color(0xFF94A3B8),
                    size: 20,
                  ),
                  onPressed: () => setState(() => _isPasswordVisible = !_isPasswordVisible),
                )
              : null,
          filled: true,
          fillColor: const Color(0xFFF8FAFC),
          contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: isCompact ? 12 : 16),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: const BorderSide(color: Color(0xFFE2E8F0), width: 1.5),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: const BorderSide(color: Color(0xFFE2E8F0), width: 1.5),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: const BorderSide(color: Color(0xFF10B981), width: 1.5),
          ),
        ),
      ),
    );
  }

  Widget _buildGradientButton({
    required String label,
    required VoidCallback onPressed,
  }) {
    return Container(
      width: double.infinity,
      height: 48,
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [
            Color(0xFF10B981),
            Color(0xFF059669),
          ],
        ),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF10B981).withValues(alpha: 0.4),
            blurRadius: 16,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onPressed,
          borderRadius: BorderRadius.circular(16),
          child: Center(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  label,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 1.2,
                  ),
                ),
                const SizedBox(width: 8),
                const Icon(
                  Icons.arrow_forward_rounded,
                  color: Colors.white,
                  size: 20,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
