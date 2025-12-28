import 'package:flutter/material.dart';
import '../../../../auth/data/models/registration_data.dart';
import '../../widgets/registration_form_styles.dart';

class Step6Contrat extends StatefulWidget {
  final RegistrationData data;
  final VoidCallback onNext;
  final VoidCallback onPrevious;

  const Step6Contrat({
    super.key,
    required this.data,
    required this.onNext,
    required this.onPrevious,
  });

  @override
  State<Step6Contrat> createState() => _Step6ContratState();
}

class _Step6ContratState extends State<Step6Contrat> {
  bool _acceptedTerms = false;
  bool _acceptedPrivacy = false;
  bool _acceptedPortage = false;

  @override
  void initState() {
    super.initState();
    _acceptedTerms = widget.data.acceptedTerms;
    _acceptedPrivacy = widget.data.acceptedPrivacy;
    _acceptedPortage = widget.data.acceptedPortage;
  }

  void _handleSubmit() {
    // Validation désactivée, on sauvegarde juste l'état et on passe à la suite
    widget.data.acceptedTerms = _acceptedTerms;
    widget.data.acceptedPrivacy = _acceptedPrivacy;
    widget.data.acceptedPortage = _acceptedPortage;
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
              'Contrats',
              subtitle: 'Veuillez lire et accepter les termes suivants',
            ),

            // Zone Contrat
            Container(
              height: 300,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFFF8FAFC),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFFE2E8F0)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.05),
                    blurRadius: 10,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Scrollbar(
                thumbVisibility: true,
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text(
                        'CONTRAT D\'UTILISATION ET DE PORTAGE SALARIAL',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                          color: Color(0xFF1E293B),
                          decoration: TextDecoration.underline,
                        ),
                      ),
                      SizedBox(height: 16),
                      Text(
                        '''Article 1 : Objet
Le présent contrat a pour objet de définir les conditions dans lesquelles le Vendeur confie à FNE CONNECT la gestion administrative et financière de son activité.

Article 2 : Portage Fiscal
FNE CONNECT s'engage à reverser les taxes et impôts dûs à l'État de Côte d'Ivoire selon la législation en vigueur, prélevés à la source sur le chiffre d'affaires du Vendeur.

Article 3 : Commission
En contrepartie de ses services, FNE CONNECT percevra une commission sur chaque transaction effectuée via la plateforme, dont le taux est défini dans l'annexe tarifaire.

Article 4 : Obligations du Vendeur
Le Vendeur s'engage à fournir des informations véridiques et à respecter la charte de qualité de FNE CONNECT.

Article 5 : Durée
Le présent contrat est conclu pour une durée indéterminée et peut être résilié par l'une ou l'autre des parties avec un préavis de 30 jours.

Article 6 : Confidentialité
Les parties s'engagent à conserver la confidentialité des informations échangées dans le cadre de l'exécution du présent contrat.

[... Suite du contrat juridique ...]
                        ''',
                        style: TextStyle(
                          fontSize: 13,
                          height: 1.6,
                          color: Color(0xFF475569),
                          fontFamily: 'Roboto',
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            
            const SizedBox(height: 24),
            
            _buildCheckboxTile(
              value: _acceptedTerms,
              label: 'J\'accepte les Conditions Générales d\'Utilisation (CGU)',
              onChanged: (v) => setState(() => _acceptedTerms = v!),
            ),
            
            _buildCheckboxTile(
              value: _acceptedPrivacy,
              label: 'J\'accepte la Politique de Confidentialité',
              onChanged: (v) => setState(() => _acceptedPrivacy = v!),
            ),
            
            _buildCheckboxTile(
              value: _acceptedPortage,
              label: 'Je signe le Contrat de Portage Fiscal Numérique',
              onChanged: (v) => setState(() => _acceptedPortage = v!),
              isLast: true,
            ),

            const SizedBox(height: 40),

            RegistrationFormStyles.buildNavigationButtons(
              onNext: _handleSubmit,
              onPrevious: widget.onPrevious,
              nextLabel: 'Soumettre l\'inscription',
            ),
            
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildCheckboxTile({
    required bool value,
    required String label,
    required Function(bool?) onChanged,
    bool isLast = false,
  }) {
    return Container(
      margin: EdgeInsets.only(bottom: isLast ? 0 : 12),
      decoration: BoxDecoration(
        color: value ? const Color(0xFFF0FDF4) : Colors.transparent,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: value ? const Color(0xFF00BA71).withValues(alpha: 0.3) : Colors.transparent,
        ),
      ),
      child: CheckboxListTile(
        value: value,
        onChanged: onChanged,
        activeColor: const Color(0xFF00BA71),
        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        controlAffinity: ListTileControlAffinity.leading,
        title: Text(
          label,
          style: TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w600,
            color: value ? const Color(0xFF14532D) : const Color(0xFF475569),
          ),
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }
}
