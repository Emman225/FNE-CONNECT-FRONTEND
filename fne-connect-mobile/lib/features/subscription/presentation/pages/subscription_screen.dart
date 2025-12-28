import 'package:flutter/material.dart';
import '../../../auth/data/models/registration_data.dart';
import '../../../auth/presentation/widgets/registration_stepper.dart';

import 'steps/step1_compte.dart';
import 'steps/step2_identite.dart';
import 'steps/step3_activite.dart';
import 'steps/step4_documents.dart';
import 'steps/step5_paiement.dart';
import 'steps/step6_contrat.dart';
import 'steps/step7_validation.dart';

class SubscriptionScreen extends StatefulWidget {
  const SubscriptionScreen({super.key});

  @override
  State<SubscriptionScreen> createState() => _SubscriptionScreenState();
}

class _SubscriptionScreenState extends State<SubscriptionScreen> {
  int _currentStep = 1;
  final RegistrationData _formData = RegistrationData();
  final ScrollController _scrollController = ScrollController();

  void _nextStep() {
    if (_currentStep < 7) {
      setState(() => _currentStep++);
      _scrollToTop();
    }
  }

  void _prevStep() {
    if (_currentStep > 1) {
      setState(() => _currentStep--);
      _scrollToTop();
    }
  }

  void _scrollToTop() {
    if (_scrollController.hasClients) {
      _scrollController.animateTo(
        0,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOut,
      );
    }
  }

  Future<void> _submitRegistration() async {
    // Show loading
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => Center(
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
          ),
          child: const Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              CircularProgressIndicator(color: Color(0xFF00BA71)),
              SizedBox(height: 16),
              Text('Traitement en cours...', style: TextStyle(fontWeight: FontWeight.w600)),
            ],
          ),
        ),
      ),
    );

    // Simulate API call
    try {
      await Future.delayed(const Duration(seconds: 2));
      // Ici: Appel API réel avec _formData.toJson()
      
      if (mounted) {
        Navigator.pop(context); // Close loader
        _nextStep(); // Go to validation step (7)
      }
    } catch (e) {
      if (mounted) {
        Navigator.pop(context);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erreur: $e'), backgroundColor: Colors.red),
        );
      }
    }
  }

  Widget _getCurrentStepWidget() {
    switch (_currentStep) {
      case 1:
        return Step1Compte(data: _formData, onNext: _nextStep);
      case 2:
        return Step2Identite(
          data: _formData, 
          onNext: _nextStep, 
          onPrevious: _prevStep
        );
      case 3:
        return Step3Activite(
          data: _formData, 
          onNext: _nextStep, 
          onPrevious: _prevStep
        );
      case 4:
        return Step4Documents(
          data: _formData, 
          onNext: _nextStep, 
          onPrevious: _prevStep
        );
      case 5:
        return Step5Paiement(
          data: _formData, 
          onNext: _nextStep, 
          onPrevious: _prevStep
        );
      case 6:
        return Step6Contrat(
          data: _formData, 
          onNext: _submitRegistration, 
          onPrevious: _prevStep
        );
      case 7:
        return Step7Validation(data: _formData);
      default:
        return const SizedBox();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0A6FBD),
        elevation: 0,
        leading: Builder(
          builder: (context) {
            if (_currentStep == 1 || _currentStep == 7) {
              return IconButton(
                icon: const Icon(Icons.close, color: Colors.white),
                onPressed: () => Navigator.of(context).pop(),
              );
            }
            return IconButton(
              icon: const Icon(Icons.arrow_back, color: Colors.white),
              onPressed: _prevStep,
            );
          },
        ),
        title: const Text(
          'Inscription Vendeur',
          style: TextStyle(
            color: Colors.white,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
      ),
      body: Column(
        children: [
          // Le Stepper reste visible sauf à la dernière étape de validation
          if (_currentStep < 7)
            Container(
              color: Colors.white,
              child: RegistrationStepper(currentStep: _currentStep),
            ),
            
          Expanded(
            child: _getCurrentStepWidget(),
          ),
        ],
      ),
    );
  }
}
