import 'package:flutter/material.dart';
import '../../../../auth/data/models/registration_data.dart';
import '../../widgets/registration_form_styles.dart';

class Step3Activite extends StatefulWidget {
  final RegistrationData data;
  final VoidCallback onNext;
  final VoidCallback onPrevious;

  const Step3Activite({
    super.key,
    required this.data,
    required this.onNext,
    required this.onPrevious,
  });

  @override
  State<Step3Activite> createState() => _Step3ActiviteState();
}

class _Step3ActiviteState extends State<Step3Activite> {
  final _formKey = GlobalKey<FormState>();
  final _nomCommercialController = TextEditingController();
  final _descriptionController = TextEditingController();
  
  String? _selectedTypeActivite;
  String? _selectedAnneeDebut;

  final List<String> _typesActivite = [
    'Commerce de détail',
    'Prestation de services',
    'Artisanat',
    'Agriculture',
    'Transport',
    'Immobilier',
    'Autre'
  ];

  late List<String> _annees;

  @override
  void initState() {
    super.initState();
    _nomCommercialController.text = widget.data.nomCommercial ?? '';
    _descriptionController.text = widget.data.descriptionActivite ?? '';
    _selectedTypeActivite = widget.data.typeActivite;
    _selectedAnneeDebut = widget.data.anneeDebutActivite;

    int currentYear = DateTime.now().year;
    _annees = List.generate(
      currentYear - 1980 + 1,
      (index) => (currentYear - index).toString(),
    );
  }

  @override
  void dispose() {
    _nomCommercialController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  void _handleContinue() {
    // Validation désactivée pour tests UI
    widget.data.typeActivite = _selectedTypeActivite;
    widget.data.descriptionActivite = _descriptionController.text;
    widget.data.nomCommercial = _nomCommercialController.text;
    widget.data.anneeDebutActivite = _selectedAnneeDebut;
    
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
              RegistrationFormStyles.buildHeader(
                'Activité',
                subtitle: 'Détails de votre activité commerciale',
              ),

              // Type d'activité
              RegistrationFormStyles.buildLabel('Type d\'activité'),
              RegistrationFormStyles.buildShadowContainer(
                child: DropdownButtonFormField<String>(
                  value: _selectedTypeActivite,
                  hint: const Text('Sélectionner'),
                  decoration: RegistrationFormStyles.premiumInputDecoration(
                    hint: '',
                    icon: Icons.category_outlined,
                  ),
                  items: _typesActivite.map((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
                  onChanged: (newValue) {
                    setState(() => _selectedTypeActivite = newValue);
                  },
                  validator: (value) => value == null ? 'Requis' : null,
                ),
              ),
              const SizedBox(height: 24),

              // Nom commercial
              RegistrationFormStyles.buildLabel('Nom commercial (Facultatif)'),
              RegistrationFormStyles.buildShadowContainer(
                child: TextFormField(
                  controller: _nomCommercialController,
                  decoration: RegistrationFormStyles.premiumInputDecoration(
                    hint: 'Ex: Ma Boutique',
                    icon: Icons.store_outlined,
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Description
              RegistrationFormStyles.buildLabel('Description de l\'activité'),
              RegistrationFormStyles.buildShadowContainer(
                child: TextFormField(
                  controller: _descriptionController,
                  maxLines: 4,
                  decoration: RegistrationFormStyles.premiumInputDecoration(
                    hint: 'Décrivez brièvement votre activité...',
                    icon: Icons.description_outlined,
                  ),
                  validator: (value) => value?.isEmpty ?? true ? 'Requis' : null,
                ),
              ),
              const SizedBox(height: 24),

              // Année de début
              RegistrationFormStyles.buildLabel('Année de début d\'activité'),
              RegistrationFormStyles.buildShadowContainer(
                child: DropdownButtonFormField<String>(
                  value: _selectedAnneeDebut,
                  hint: const Text('Sélectionner l\'année'),
                  decoration: RegistrationFormStyles.premiumInputDecoration(
                    hint: '',
                    icon: Icons.calendar_today_outlined,
                  ),
                  items: _annees.map((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
                  onChanged: (newValue) {
                    setState(() => _selectedAnneeDebut = newValue);
                  },
                  validator: (value) => value == null ? 'Requis' : null,
                ),
              ),
              
              const SizedBox(height: 48),

              // Boutons Navigation
              RegistrationFormStyles.buildNavigationButtons(
                onNext: _handleContinue,
                onPrevious: widget.onPrevious,
              ),
              
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}
