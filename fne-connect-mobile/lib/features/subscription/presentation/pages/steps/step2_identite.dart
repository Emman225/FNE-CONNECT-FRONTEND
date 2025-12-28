import 'package:flutter/material.dart';
import '../../../../auth/data/models/registration_data.dart';
import 'package:intl/intl.dart';
import '../../widgets/registration_form_styles.dart';

class Step2Identite extends StatefulWidget {
  final RegistrationData data;
  final VoidCallback onNext;
  final VoidCallback onPrevious;

  const Step2Identite({
    super.key,
    required this.data,
    required this.onNext,
    required this.onPrevious,
  });

  @override
  State<Step2Identite> createState() => _Step2IdentiteState();
}

class _Step2IdentiteState extends State<Step2Identite> {
  final _formKey = GlobalKey<FormState>();
  
  // Controllers
  final _nomController = TextEditingController();
  final _prenomsController = TextEditingController();
  final _lieuNaissanceController = TextEditingController();
  final _adresseController = TextEditingController();
  final _emailController = TextEditingController();
  final _dateNaissanceController = TextEditingController();

  // Dropdown values
  String? _selectedCivilite;
  String? _selectedNationalite;
  DateTime? _selectedDate;

  final List<String> _civilites = ['M.', 'Mme', 'Mlle'];
  final List<String> _nationalites = ['Ivoirienne', 'Française', 'Autre'];

  @override
  void initState() {
    super.initState();
    _nomController.text = widget.data.nom ?? '';
    _prenomsController.text = widget.data.prenoms ?? '';
    _lieuNaissanceController.text = widget.data.lieuNaissance ?? '';
    _adresseController.text = widget.data.adresse ?? '';
    _emailController.text = widget.data.email ?? '';
    
    _selectedCivilite = widget.data.civilite;
    _selectedNationalite = widget.data.nationalite;
    
    if (widget.data.dateNaissance != null) {
      _selectedDate = widget.data.dateNaissance;
      _dateNaissanceController.text = DateFormat('dd/MM/yyyy').format(_selectedDate!);
    }
  }

  @override
  void dispose() {
    _nomController.dispose();
    _prenomsController.dispose();
    _lieuNaissanceController.dispose();
    _adresseController.dispose();
    _emailController.dispose();
    _dateNaissanceController.dispose();
    super.dispose();
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate ?? DateTime(2000),
      firstDate: DateTime(1900),
      lastDate: DateTime.now().subtract(const Duration(days: 365 * 18)),
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: const ColorScheme.light(
              primary: Color(0xFF00BA71),
              onPrimary: Colors.white,
              onSurface: Color(0xFF1E293B),
            ),
          ),
          child: child!,
        );
      },
    );
    if (picked != null && picked != _selectedDate) {
      setState(() {
        _selectedDate = picked;
        _dateNaissanceController.text = DateFormat('dd/MM/yyyy').format(picked);
      });
    }
  }

  void _handleContinue() {
    // Validation désactivée pour tests UI
    widget.data.civilite = _selectedCivilite;
    widget.data.nom = _nomController.text;
    widget.data.prenoms = _prenomsController.text;
    widget.data.dateNaissance = _selectedDate;
    widget.data.lieuNaissance = _lieuNaissanceController.text;
    widget.data.nationalite = _selectedNationalite;
    widget.data.adresse = _adresseController.text;
    widget.data.email = _emailController.text;
    
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
                'Identité',
                subtitle: 'Informations personnelles du vendeur',
              ),

              // Civilité
              RegistrationFormStyles.buildLabel('Civilité'),
              RegistrationFormStyles.buildShadowContainer(
                child: DropdownButtonFormField<String>(
                  value: _selectedCivilite,
                  hint: const Text('Sélectionner'),
                  decoration: RegistrationFormStyles.premiumInputDecoration(
                    hint: '',
                    icon: Icons.person_outline,
                  ),
                  items: _civilites.map((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
                  onChanged: (newValue) {
                    setState(() => _selectedCivilite = newValue);
                  },
                  validator: (value) => value == null ? 'Requis' : null,
                ),
              ),
              const SizedBox(height: 24),

              // Nom
              RegistrationFormStyles.buildLabel('Nom'),
              RegistrationFormStyles.buildShadowContainer(
                child: TextFormField(
                  controller: _nomController,
                  decoration: RegistrationFormStyles.premiumInputDecoration(
                    hint: 'Votre nom de famille',
                    icon: Icons.badge_outlined,
                  ),
                  validator: (value) => value?.isEmpty ?? true ? 'Requis' : null,
                ),
              ),
              const SizedBox(height: 24),

              // Prénoms
              RegistrationFormStyles.buildLabel('Prénoms'),
              RegistrationFormStyles.buildShadowContainer(
                child: TextFormField(
                  controller: _prenomsController,
                  decoration: RegistrationFormStyles.premiumInputDecoration(
                    hint: 'Vos prénoms',
                    icon: Icons.badge_outlined,
                  ),
                  validator: (value) => value?.isEmpty ?? true ? 'Requis' : null,
                ),
              ),
              const SizedBox(height: 24),

              // Date de naissance
              RegistrationFormStyles.buildLabel('Date de naissance'),
              RegistrationFormStyles.buildShadowContainer(
                child: TextFormField(
                  controller: _dateNaissanceController,
                  readOnly: true,
                  onTap: () => _selectDate(context),
                  decoration: RegistrationFormStyles.premiumInputDecoration(
                    hint: 'JJ/MM/AAAA',
                    icon: Icons.calendar_today_outlined,
                  ),
                  validator: (value) => value?.isEmpty ?? true ? 'Requis' : null,
                ),
              ),
              const SizedBox(height: 24),

              // Lieu de naissance
              RegistrationFormStyles.buildLabel('Lieu de naissance'),
              RegistrationFormStyles.buildShadowContainer(
                child: TextFormField(
                  controller: _lieuNaissanceController,
                  decoration: RegistrationFormStyles.premiumInputDecoration(
                    hint: 'Ville de naissance',
                    icon: Icons.location_on_outlined,
                  ),
                  validator: (value) => value?.isEmpty ?? true ? 'Requis' : null,
                ),
              ),
              const SizedBox(height: 24),

              // Nationalité
              RegistrationFormStyles.buildLabel('Nationalité'),
              RegistrationFormStyles.buildShadowContainer(
                child: DropdownButtonFormField<String>(
                  value: _selectedNationalite,
                  hint: const Text('Sélectionner'),
                  decoration: RegistrationFormStyles.premiumInputDecoration(
                    hint: '',
                    icon: Icons.flag_outlined,
                  ),
                  items: _nationalites.map((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
                  onChanged: (newValue) {
                    setState(() => _selectedNationalite = newValue);
                  },
                  validator: (value) => value == null ? 'Requis' : null,
                ),
              ),
              const SizedBox(height: 24),

              // Adresse
              RegistrationFormStyles.buildLabel('Adresse Géographique'),
              RegistrationFormStyles.buildShadowContainer(
                child: TextFormField(
                  controller: _adresseController,
                  decoration: RegistrationFormStyles.premiumInputDecoration(
                    hint: 'Commune, Quartier...',
                    icon: Icons.home_outlined,
                  ),
                  validator: (value) => value?.isEmpty ?? true ? 'Requis' : null,
                ),
              ),
              const SizedBox(height: 24),

              // Email
              RegistrationFormStyles.buildLabel('Email'),
              RegistrationFormStyles.buildShadowContainer(
                child: TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  decoration: RegistrationFormStyles.premiumInputDecoration(
                    hint: 'exemple@email.com',
                    icon: Icons.email_outlined,
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) return 'Requis';
                    if (!value.contains('@')) return 'Email invalide';
                    return null;
                  },
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
