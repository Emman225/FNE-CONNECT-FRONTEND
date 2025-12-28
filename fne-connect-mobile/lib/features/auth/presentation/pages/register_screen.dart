import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../subscription/presentation/pages/subscription_screen.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> with SingleTickerProviderStateMixin {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  
  bool _obscurePassword = true;
  bool _obscureConfirmPassword = true;
  bool _acceptTerms = false;

  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
        vsync: this, duration: const Duration(milliseconds: 1000));
    _fadeAnimation = CurvedAnimation(
        parent: _controller, curve: const Interval(0.0, 0.6, curve: Curves.easeOut));
    _slideAnimation = Tween<Offset>(
            begin: const Offset(0, 0.3), end: Offset.zero)
        .animate(CurvedAnimation(
            parent: _controller,
            curve: const Interval(0.2, 1.0, curve: Curves.easeOutCubic)));
    _controller.forward();
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF10B981),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      extendBodyBehindAppBar: true,
      body: Stack(
        children: [
          // Background Gradient
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topRight,
                end: Alignment.bottomLeft,
                colors: [
                  Color(0xFF059669),
                  Color(0xFF10B981),
                ],
              ),
            ),
          ),
          
          // Header Content
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  FadeTransition(
                    opacity: _fadeAnimation,
                    child: const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: 10),
                        Text(
                          'Créer un compte',
                          style: TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                            letterSpacing: -0.5,
                          ),
                        ),
                        Text(
                          'Rejoignez FNE CONNECT',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.white70,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Sliding Bottom Sheet
          Align(
            alignment: Alignment.bottomCenter,
            child: SlideTransition(
              position: _slideAnimation,
              child: Container(
                height: MediaQuery.of(context).size.height * 0.75, // Taller for register
                width: double.infinity,
                padding: const EdgeInsets.fromLTRB(32, 32, 32, 0),
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(40),
                    topRight: Radius.circular(40),
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black26,
                      blurRadius: 20,
                      offset: Offset(0, -5),
                    ),
                  ],
                ),
                child: SingleChildScrollView(
                  padding: const EdgeInsets.only(bottom: 32),
                  child: Column(
                    children: [
                      _buildTextField(_nameController, "Nom complet", Icons.person_outline),
                      const SizedBox(height: 16),
                      _buildTextField(_emailController, "Email professionnel", Icons.email_outlined),
                      const SizedBox(height: 16),
                      _buildTextField(_phoneController, "Téléphone", Icons.phone_outlined),
                      const SizedBox(height: 16),
                      _buildTextField(
                        _passwordController, "Mot de passe", Icons.lock_outline, 
                        isPassword: true, 
                        obscureText: _obscurePassword,
                        onVisibilityToggle: () {
                          setState(() => _obscurePassword = !_obscurePassword);
                        }
                      ),
                      const SizedBox(height: 16),
                      _buildTextField(
                        _confirmPasswordController, "Confirmer le mot de passe", Icons.lock_outline,
                        isPassword: true,
                        obscureText: _obscureConfirmPassword,
                        onVisibilityToggle: () {
                          setState(() => _obscureConfirmPassword = !_obscureConfirmPassword);
                        }
                      ),
                      const SizedBox(height: 24),

                      // Terms
                      Row(
                        children: [
                          Checkbox(
                            value: _acceptTerms,
                            onChanged: (v) => setState(() => _acceptTerms = v ?? false),
                            activeColor: const Color(0xFF10B981),
                          ),
                          Expanded(
                            child: Text(
                              "J'accepte les conditions d'utilisation",
                              style: TextStyle(fontSize: 13, color: Colors.grey[600]),
                            ),
                          )
                        ],
                      ),
                      
                      const SizedBox(height: 24),

                      // Button
                      SizedBox(
                        width: double.infinity,
                        height: 56,
                        child: ElevatedButton(
                          onPressed: _acceptTerms ? _handleRegister : null,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF10B981),
                            foregroundColor: Colors.white,
                            disabledBackgroundColor: Colors.grey[300],
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            elevation: _acceptTerms ? 5 : 0,
                          ),
                          child: const Text(
                            "S'INSCRIRE",
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              letterSpacing: 1,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTextField(TextEditingController ctrl, String hint, IconData icon, {bool isPassword = false, bool obscureText = false, VoidCallback? onVisibilityToggle}) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFFF1F5F9),
        borderRadius: BorderRadius.circular(16),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
      child: TextField(
        controller: ctrl,
        obscureText: isPassword && obscureText,
        decoration: InputDecoration(
          icon: Icon(icon, color: const Color(0xFF94A3B8)),
          border: InputBorder.none,
          hintText: hint,
          hintStyle: const TextStyle(color: Color(0xFF94A3B8)),
          suffixIcon: isPassword
              ? IconButton(
                  icon: Icon(
                    obscureText ? Icons.visibility : Icons.visibility_off,
                    color: const Color(0xFF94A3B8),
                  ),
                  onPressed: onVisibilityToggle,
                )
              : null,
        ),
      ),
    );
  }

  void _handleRegister() {
     // Basic validation
    if (_nameController.text.isEmpty || _emailController.text.isEmpty || _passwordController.text.length < 6) {
       ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Veuillez remplir tous les champs correctement")),
      );
      return;
    }
    
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => const SubscriptionScreen()),
    );
  }
}
