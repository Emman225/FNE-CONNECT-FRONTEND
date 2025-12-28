import 'package:flutter/material.dart';
import '../../../../auth/data/models/registration_data.dart';
import '../../widgets/registration_form_styles.dart';

class Step5Paiement extends StatefulWidget {
  final RegistrationData data;
  final VoidCallback onNext;
  final VoidCallback onPrevious;

  const Step5Paiement({
    super.key,
    required this.data,
    required this.onNext,
    required this.onPrevious,
  });

  @override
  State<Step5Paiement> createState() => _Step5PaiementState();
}

class _Step5PaiementState extends State<Step5Paiement> {
  String? _selectedPlan;
  String? _selectedPaymentMethod;

  @override
  void initState() {
    super.initState();
    _selectedPlan = widget.data.planAbonnement;
    _selectedPaymentMethod = widget.data.methodePaiement;
  }

  void _handleContinue() {
    widget.data.planAbonnement = _selectedPlan;
    widget.data.methodePaiement = _selectedPaymentMethod;
    widget.onNext();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: RegistrationFormStyles.buildFormWrapper(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            RegistrationFormStyles.buildHeader(
              'Abonnement',
              subtitle: 'Choisissez votre formule et votre moyen de paiement',
            ),

            const Text(
              'CHOISISSEZ VOTRE PLAN',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                color: Colors.grey,
                letterSpacing: 1.2,
              ),
            ),
            const SizedBox(height: 16),
            
            _buildPlanCard(
              title: 'Mensuel',
              price: '5 000 FCFA',
              detail: '/ mois',
              value: 'mensuel',
              icon: Icons.calendar_view_month_rounded,
            ),
            const SizedBox(height: 16),
            _buildPlanCard(
              title: 'Annuel',
              price: '50 000 FCFA',
              detail: '/ an',
              value: 'annuel',
              icon: Icons.calendar_today_rounded,
              isRecommended: true,
              savingText: 'Économisez 10 000 FCFA',
            ),

            const SizedBox(height: 32),

            const Text(
              'MÉTHODE DE PAIEMENT',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                color: Colors.grey,
                letterSpacing: 1.2,
              ),
            ),
            const SizedBox(height: 16),

            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              mainAxisSpacing: 16,
              crossAxisSpacing: 16,
              childAspectRatio: 1.4,
              children: [
                _buildPaymentCard('Orange Money', 'assets/images/om.png', 'orange', const Color(0xFFFF7900)),
                _buildPaymentCard('MTN Money', 'assets/images/mtn.png', 'mtn', const Color(0xFFFFCC00)),
                _buildPaymentCard('Moov Money', 'assets/images/moov.png', 'moov', const Color(0xFF0066CC)),
                _buildPaymentCard('Wave', 'assets/images/wave.png', 'wave', const Color(0xFF1DC0F1)),
              ],
            ),

            if (_selectedPaymentMethod != null) ...[
              const SizedBox(height: 24),
              _buildPaymentInfoBox(),
            ],

            const SizedBox(height: 48),

            RegistrationFormStyles.buildNavigationButtons(
              onNext: _handleContinue,
              onPrevious: widget.onPrevious,
            ),
            
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildPlanCard({
    required String title,
    required String price,
    required String detail,
    required String value,
    required IconData icon,
    bool isRecommended = false,
    String? savingText,
  }) {
    final isSelected = _selectedPlan == value;
    final primaryColor = RegistrationFormStyles.primaryColor;

    return GestureDetector(
      onTap: () => setState(() => _selectedPlan = value),
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              // Fond changé en Gris Clair si non sélectionné pour contraste, Blanc si selectionné ?
              // Non, restons sur un fond distinct du wrapper. F8FAFC.
              color: isSelected ? Colors.white : const Color(0xFFF8FAFC),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: isSelected ? primaryColor : const Color(0xFFE2E8F0),
                width: 2,
              ),
              boxShadow: isSelected ? [
                BoxShadow(
                  color: primaryColor.withValues(alpha: 0.2),
                  blurRadius: 15,
                  offset: const Offset(0, 4),
                ),
              ] : [], // Pas d'ombre si non sélectionné pour alléger
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: isSelected ? primaryColor.withValues(alpha: 0.1) : Colors.grey.withValues(alpha: 0.05),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    icon,
                    color: isSelected ? primaryColor : Colors.grey,
                    size: 24,
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
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: isSelected ? const Color(0xFF1E293B) : Colors.grey[700],
                        ),
                      ),
                      const SizedBox(height: 4),
                      RichText(
                        text: TextSpan(
                          children: [
                            TextSpan(
                              text: price,
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: isSelected ? primaryColor : Colors.black,
                              ),
                            ),
                            TextSpan(
                              text: ' $detail',
                              style: TextStyle(
                                fontSize: 14,
                                color: Colors.grey[500],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                if (isSelected)
                  const Icon(Icons.check_circle_rounded, color: RegistrationFormStyles.primaryColor, size: 28)
                else
                  Icon(Icons.circle_outlined, color: Colors.grey[300], size: 28),
              ],
            ),
          ),
          if (isRecommended)
            Positioned(
              top: -12,
              right: 20,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [Color(0xFFFFD700), Color(0xFFFFA500)]),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.orange.withValues(alpha: 0.3),
                      blurRadius: 8,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.star_rounded, size: 14, color: Colors.white),
                    const SizedBox(width: 4),
                    Text(
                      savingText ?? 'Recommandé',
                      style: const TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildPaymentCard(String name, String assetPath, String value, Color brandColor) {
    final isSelected = _selectedPaymentMethod == value;

    return GestureDetector(
      onTap: () => setState(() => _selectedPaymentMethod = value),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        decoration: BoxDecoration(
          color: isSelected ? Colors.white : const Color(0xFFF8FAFC),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isSelected ? brandColor : const Color(0xFFE2E8F0),
            width: 2,
          ),
          boxShadow: isSelected ? [
            BoxShadow(
              color: brandColor.withValues(alpha: 0.2),
              blurRadius: 15,
              offset: const Offset(0, 4),
            ),
          ] : [],
        ),
        child: Stack(
          children: [
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      color: brandColor.withValues(alpha: 0.1),
                      shape: BoxShape.circle,
                    ),
                    child: Icon(Icons.account_balance_wallet_rounded, color: brandColor),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    name,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 13,
                      color: isSelected ? Colors.black : Colors.grey[600],
                    ),
                  ),
                ],
              ),
            ),
            if (isSelected)
              Positioned(
                top: 8,
                right: 8,
                child: Icon(Icons.check_circle, color: brandColor, size: 20),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildPaymentInfoBox() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        children: [
          Row(
            children: [
              const Icon(Icons.phone_android_rounded, size: 20, color: Color(0xFF64748B)),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  'Paiement via ${_selectedPaymentMethod!.toUpperCase()}',
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          const Text(
            'Vous recevrez une notification sur votre téléphone pour valider la transaction.',
            style: TextStyle(fontSize: 12, color: Color(0xFF64748B)),
          ),
        ],
      ),
    );
  }
}
