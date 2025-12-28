import 'package:flutter/material.dart';
import '../../../../auth/data/models/registration_data.dart';
import '../../widgets/registration_form_styles.dart';

class Step1Compte extends StatefulWidget {
  final RegistrationData data;
  final VoidCallback onNext;

  const Step1Compte({
    super.key,
    required this.data,
    required this.onNext,
  });

  @override
  State<Step1Compte> createState() => _Step1CompteState();
}

class _Step1CompteState extends State<Step1Compte> {
  final _formKey = GlobalKey<FormState>();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _otpController = TextEditingController();

  bool _isPasswordVisible = false;
  bool _isConfirmPasswordVisible = false;
  bool _showOtpField = false;
  bool _isLoadingOtp = false;

  @override
  void initState() {
    super.initState();
    _phoneController.text = widget.data.telephone ?? '';
  }

  @override
  void dispose() {
    _phoneController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _otpController.dispose();
    super.dispose();
  }

  void _requestOtp() async {
    if (_phoneController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Veuillez entrer un numéro de téléphone')),
      );
      return;
    }

    setState(() {
      _isLoadingOtp = true;
    });

    await Future.delayed(const Duration(seconds: 2));

    if (mounted) {
      setState(() {
        _isLoadingOtp = false;
        _showOtpField = true;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Code OTP envoyé ! (Code de test : 1234)'),
          backgroundColor: Colors.green,
        ),
      );
    }
  }

  void _handleContinue() {
    // Validation désactivée pour tests UI
    widget.data.telephone = _phoneController.text;
    widget.data.password = _passwordController.text;
    widget.onNext();
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: RegistrationFormStyles.buildFormWrapper(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // En-tête
              RegistrationFormStyles.buildHeader(
                'Création de compte',
                subtitle: 'Commençons par sécuriser votre compte',
              ),

              // Champ Téléphone + Bouton OTP
              RegistrationFormStyles.buildLabel('Numéro de téléphone'),
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    flex: 2,
                    child: RegistrationFormStyles.buildShadowContainer(
                      child: TextFormField(
                        controller: _phoneController,
                        keyboardType: TextInputType.phone,
                        decoration: RegistrationFormStyles.premiumInputDecoration(
                          hint: '07 00 00 00 00',
                          icon: Icons.phone_android_outlined,
                        ),
                        validator: (value) {
                          if (value == null || value.isEmpty) return 'Requis';
                          if (value.length < 10) return 'Invalide';
                          return null;
                        },
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  
                  // Bouton OTP
                  Container(
                    width: 90,
                    height: 56, // Match new input height
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(16),
                      gradient: const LinearGradient(
                        colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.2),
                          blurRadius: 10,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Material(
                      color: Colors.transparent,
                      child: InkWell(
                        onTap: _isLoadingOtp || _showOtpField ? null : _requestOtp,
                        borderRadius: BorderRadius.circular(16),
                        child: Center(
                          child: _isLoadingOtp
                              ? const SizedBox(
                                  width: 20,
                                  height: 20,
                                  child: CircularProgressIndicator(
                                    color: Colors.white,
                                    strokeWidth: 2,
                                  ),
                                )
                              : Icon(
                                  _showOtpField ? Icons.check_circle : Icons.sms_outlined,
                                  color: _showOtpField ? Colors.greenAccent : Colors.white,
                                  size: 24,
                                ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),

              // Champ OTP (Apparaît après clic)
              if (_showOtpField) ...[
                RegistrationFormStyles.buildLabel('Code de vérification (OTP)'),
                RegistrationFormStyles.buildShadowContainer(
                  child: TextFormField(
                    controller: _otpController,
                    keyboardType: TextInputType.number,
                    decoration: RegistrationFormStyles.premiumInputDecoration(
                      hint: 'Entrez le code reçu (1234)',
                      icon: Icons.lock_clock_outlined,
                    ),
                  ),
                ),
                const SizedBox(height: 24),
              ],

              // Mot de passe
              RegistrationFormStyles.buildLabel('Mot de passe'),
              RegistrationFormStyles.buildShadowContainer(
                child: TextFormField(
                  controller: _passwordController,
                  obscureText: !_isPasswordVisible,
                  decoration: RegistrationFormStyles.premiumInputDecoration(
                    hint: '8 caractères minimum',
                    icon: Icons.lock_outline,
                    suffixIcon: IconButton(
                      icon: Icon(
                        _isPasswordVisible ? Icons.visibility_outlined : Icons.visibility_off_outlined,
                        color: Colors.grey,
                      ),
                      onPressed: () => setState(() => _isPasswordVisible = !_isPasswordVisible),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Confirmation Mot de passe
              RegistrationFormStyles.buildLabel('Confirmer le mot de passe'),
              RegistrationFormStyles.buildShadowContainer(
                child: TextFormField(
                  controller: _confirmPasswordController,
                  obscureText: !_isConfirmPasswordVisible,
                  decoration: RegistrationFormStyles.premiumInputDecoration(
                    hint: 'Répétez le mot de passe',
                    icon: Icons.lock_reset,
                    suffixIcon: IconButton(
                      icon: Icon(
                        _isConfirmPasswordVisible ? Icons.visibility_outlined : Icons.visibility_off_outlined,
                        color: Colors.grey,
                      ),
                      onPressed: () => setState(() => _isConfirmPasswordVisible = !_isConfirmPasswordVisible),
                    ),
                  ),
                ),
              ),
              
              const SizedBox(height: 48),

              // Bouton Continuer
              RegistrationFormStyles.buildGradientButton(
                text: 'Continuer',
                onPressed: _handleContinue,
                icon: Icons.arrow_forward_rounded,
              ),
              
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}
