import 'package:flutter/material.dart';

class RegistrationStep {
  final int number;
  final String icon;
  final String label;

  const RegistrationStep({
    required this.number,
    required this.icon,
    required this.label,
  });
}

class RegistrationStepper extends StatelessWidget {
  final int currentStep;
  
  const RegistrationStepper({
    super.key,
    required this.currentStep,
  });

  static const List<RegistrationStep> steps = [
    RegistrationStep(number: 1, icon: '👤', label: 'Compte'),
    RegistrationStep(number: 2, icon: '🪪', label: 'Identité'),
    RegistrationStep(number: 3, icon: '💼', label: 'Activité'),
    RegistrationStep(number: 4, icon: '📄', label: 'Documents'),
    RegistrationStep(number: 5, icon: '💳', label: 'Paiement'),
    RegistrationStep(number: 6, icon: '📋', label: 'Contrat'),
    RegistrationStep(number: 7, icon: '✓', label: 'Validation'),
  ];

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isMobile = constraints.maxWidth < 600;
        
        return Container(
          padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
          child: Column(
            children: [
              // Ligne de progression avec cercles
              SizedBox(
                height: 60,
                child: Stack(
                  children: [
                    // Ligne de fond
                    Positioned(
                      left: 20,
                      right: 20,
                      top: 18,
                      child: Container(
                        height: 3,
                        decoration: BoxDecoration(
                          color: const Color(0xFFE2E8F0),
                          borderRadius: BorderRadius.circular(2),
                        ),
                      ),
                    ),
                    
                    // Ligne de progression remplie
                    Positioned(
                      left: 20,
                      right: 20 + (MediaQuery.of(context).size.width - 72) * 
                          ((7 - currentStep) / 6),
                      top: 18,
                      child: Container(
                        height: 3,
                        decoration: BoxDecoration(
                          color: const Color(0xFF00BA71),
                          borderRadius: BorderRadius.circular(2),
                        ),
                      ),
                    ),
                    
                    // Cercles des étapes
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: steps.map((step) {
                        return _buildStepCircle(step, isMobile);
                      }).toList(),
                    ),
                  ],
                ),
              ),
              
              // Labels (cachés sur mobile)
              if (!isMobile) ...[
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: steps.map((step) {
                    return SizedBox(
                      width: 40,
                      child: Text(
                        step.label,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: step.number == currentStep 
                              ? FontWeight.w600 
                              : FontWeight.w400,
                          color: step.number <= currentStep
                              ? const Color(0xFF00BA71)
                              : const Color(0xFF94A3B8),
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ],
            ],
          ),
        );
      },
    );
  }

  Widget _buildStepCircle(RegistrationStep step, bool isMobile) {
    final isCompleted = step.number < currentStep;
    final isActive = step.number == currentStep;
    final isFuture = step.number > currentStep;

    return Container(
      width: 40,
      height: 40,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: isCompleted || isActive 
            ? const Color(0xFF00BA71) 
            : Colors.white,
        border: Border.all(
          color: isFuture 
              ? const Color(0xFFE2E8F0) 
              : const Color(0xFF00BA71),
          width: 3,
        ),
        boxShadow: isActive
            ? [
                BoxShadow(
                  color: const Color(0xFF00BA71).withOpacity(0.3),
                  blurRadius: 8,
                  spreadRadius: 2,
                ),
              ]
            : null,
      ),
      child: Center(
        child: isCompleted
            ? const Icon(
                Icons.check,
                color: Colors.white,
                size: 20,
              )
            : Text(
                step.icon,
                style: TextStyle(
                  fontSize: 18,
                  color: isActive ? Colors.white : null,
                ),
              ),
      ),
    );
  }
}
