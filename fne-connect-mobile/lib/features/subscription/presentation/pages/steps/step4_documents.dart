import 'dart:io';
import 'package:flutter/material.dart';
import '../../../../auth/data/models/registration_data.dart';
import '../../../../auth/presentation/widgets/file_upload_box.dart';
import '../../widgets/registration_form_styles.dart';

class Step4Documents extends StatefulWidget {
  final RegistrationData data;
  final VoidCallback onNext;
  final VoidCallback onPrevious;

  const Step4Documents({
    super.key,
    required this.data,
    required this.onNext,
    required this.onPrevious,
  });

  @override
  State<Step4Documents> createState() => _Step4DocumentsState();
}

class _Step4DocumentsState extends State<Step4Documents> {
  int get uploadedCount {
    int count = 0;
    if (widget.data.cniRecto != null) count++;
    if (widget.data.cniVerso != null) count++;
    if (widget.data.selfieCni != null) count++;
    // rccm est optionnel mais compte si présent
    return count;
  }

  void _validateAndContinue() {
    // Validation désactivée: uploadedCount >= 0
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
              'Documents requis',
              subtitle: 'Veuillez télécharger les versions numériques de vos pièces',
            ),
    
            FileUploadBox(
              label: 'Carte Nationale d\'Identité (Recto) *',
              file: widget.data.cniRecto,
              fileName: widget.data.cniRectoName,
              onFileSelected: (f, n) => setState(() {
                widget.data.cniRecto = f;
                widget.data.cniRectoName = n;
              }),
              onFileRemoved: () => setState(() {
                widget.data.cniRecto = null;
                widget.data.cniRectoName = null;
              }),
            ),
            const SizedBox(height: 24),
    
            FileUploadBox(
              label: 'Carte Nationale d\'Identité (Verso) *',
              file: widget.data.cniVerso,
              fileName: widget.data.cniVersoName,
              onFileSelected: (f, n) => setState(() {
                widget.data.cniVerso = f;
                widget.data.cniVersoName = n;
              }),
              onFileRemoved: () => setState(() {
                widget.data.cniVerso = null;
                widget.data.cniVersoName = null;
              }),
            ),
            const SizedBox(height: 24),
    
            FileUploadBox(
              label: 'Photo d\'identité complète (Selfie CNI) *',
              file: widget.data.selfieCni,
              fileName: widget.data.selfieCniName,
              onFileSelected: (f, n) => setState(() {
                widget.data.selfieCni = f;
                widget.data.selfieCniName = n;
              }),
              onFileRemoved: () => setState(() {
                widget.data.selfieCni = null;
                widget.data.selfieCniName = null;
              }),
            ),
            const SizedBox(height: 24),
    
            FileUploadBox(
              label: 'Registre de Commerce (RCCM) - Optionnel',
              file: widget.data.rccm,
              fileName: widget.data.rccmName,
              onFileSelected: (f, n) => setState(() {
                widget.data.rccm = f;
                widget.data.rccmName = n;
              }),
              onFileRemoved: () => setState(() {
                widget.data.rccm = null;
                widget.data.rccmName = null;
              }),
            ),
            
            const SizedBox(height: 48),
    
            RegistrationFormStyles.buildNavigationButtons(
              onNext: _validateAndContinue, 
              onPrevious: widget.onPrevious
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}
