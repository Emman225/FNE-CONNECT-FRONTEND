import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class FileUploadBox extends StatelessWidget {
  final String label;
  final File? file;
  final String? fileName;
  final Function(File file, String fileName) onFileSelected;
  final VoidCallback? onFileRemoved;

  const FileUploadBox({
    super.key,
    required this.label,
    this.file,
    this.fileName,
    required this.onFileSelected,
    this.onFileRemoved,
  });

  Future<void> _pickFile(BuildContext context) async {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return SafeArea(
          child: Wrap(
            children: [
              ListTile(
                leading: const Icon(Icons.photo_library),
                title: const Text('Choisir depuis la galerie'),
                onTap: () async {
                  Navigator.pop(context);
                  await _pickImage(ImageSource.gallery);
                },
              ),
              ListTile(
                leading: const Icon(Icons.photo_camera),
                title: const Text('Prendre une photo'),
                onTap: () async {
                  Navigator.pop(context);
                  await _pickImage(ImageSource.camera);
                },
              ),
            ],
          ),
        );
      },
    );
  }

  Future<void> _pickImage(ImageSource source) async {
    final ImagePicker picker = ImagePicker();
    try {
      final XFile? image = await picker.pickImage(
        source: source,
        maxWidth: 1920,
        maxHeight: 1920,
        imageQuality: 85,
      );
      
      if (image != null) {
        final File file = File(image.path);
        final String fileName = image.name;
        onFileSelected(file, fileName);
      }
    } catch (e) {
      debugPrint('Erreur lors de la sélection du fichier: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final hasFile = file != null;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: Color(0xFF475569),
          ),
        ),
        const SizedBox(height: 8),
        InkWell(
          onTap: hasFile ? null : () => _pickFile(context),
          borderRadius: BorderRadius.circular(12),
          child: Container(
            width: double.infinity, // Prend toute la largeur disponible
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: hasFile ? const Color(0xFFF1F5F9) : Colors.white,
              border: Border.all(
                color: hasFile 
                    ? const Color(0xFF00BA71) 
                    : const Color(0xFFE2E8F0),
                width: 2,
                style: hasFile ? BorderStyle.solid : BorderStyle.solid, // Identique mais explicite
                strokeAlign: BorderSide.strokeAlignInside,
              ),
              borderRadius: BorderRadius.circular(12),
            ),
            child: hasFile
                ? Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: const Color(0xFF00BA71).withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Icon(
                          Icons.insert_drive_file,
                          color: Color(0xFF00BA71),
                          size: 24,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          fileName ?? 'Fichier sélectionné',
                          style: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                            color: Color(0xFF1E293B),
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      IconButton(
                        onPressed: onFileRemoved,
                        icon: const Icon(
                          Icons.close,
                          color: Color(0xFF64748B),
                        ),
                        padding: EdgeInsets.zero,
                        constraints: const BoxConstraints(),
                      ),
                    ],
                  )
                : Column(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: const Color(0xFF00BA71).withValues(alpha: 0.1),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.upload_file,
                          color: Color(0xFF00BA71),
                          size: 32,
                        ),
                      ),
                      const SizedBox(height: 12),
                      const Text(
                        'Cliquer pour télécharger',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: Color(0xFF1E293B),
                        ),
                      ),
                      const SizedBox(height: 4),
                      const Text(
                        'JPG, PNG ou PDF (max. 5MB)',
                        style: TextStyle(
                          fontSize: 12,
                          color: Color(0xFF94A3B8),
                        ),
                      ),
                    ],
                  ),
          ),
        ),
      ],
    );
  }
}
