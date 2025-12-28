import 'dart:io';

/// Modèle de données pour stocker toutes les informations du processus d'inscription
class RegistrationData {
  // ========== ÉTAPE 1 : COMPTE ==========
  String? telephone;
  String? password;
  String? confirmPassword;
  bool otpSent = false;
  
  // ========== ÉTAPE 2 : IDENTITÉ ==========
  String? civilite;
  String? nationalite;
  String? nom;
  String? prenoms;
  DateTime? dateNaissance;
  String? lieuNaissance;
  String? adresse;
  String? email;
  
  // ========== ÉTAPE 3 : ACTIVITÉ ==========
  String? typeActivite;
  String? descriptionActivite;
  String? nomCommercial;
  String? anneeDebutActivite;
  
  // ========== ÉTAPE 4 : DOCUMENTS ==========
  File? cniRecto;
  String? cniRectoName;
  
  File? cniVerso;
  String? cniVersoName;
  
  File? selfieCni;
  String? selfieCniName;
  
  File? justificatifDomicile;
  String? justificatifDomicileName;

  File? rccm;
  String? rccmName;
  
  // ========== ÉTAPE 5 : PAIEMENT ==========
  String? planAbonnement; // 'mensuel' ou 'annuel'
  String? methodePaiement; // 'Orange Money', 'MTN Money', etc.
  
  // ========== ÉTAPE 6 : CONTRAT ==========
  bool acceptedTerms = false;
  bool acceptedPrivacy = false;
  bool acceptedPortage = false;

  // ========== VALIDATION ==========
  
  bool get isStep1Valid => 
      telephone != null && telephone!.isNotEmpty && 
      password != null && password!.length >= 6; // On suppose que la confirmation est gérée par le form
      
  bool get isStep2Valid => 
      civilite != null && 
      nom != null && 
      prenoms != null && 
      dateNaissance != null && 
      lieuNaissance != null && 
      nationalite != null && 
      adresse != null && 
      email != null;

  bool get isStep3Valid => 
      typeActivite != null && 
      descriptionActivite != null && 
      anneeDebutActivite != null;

  bool get isStep4Valid {
    int count = 0;
    if (cniRecto != null) count++;
    if (cniVerso != null) count++;
    if (selfieCni != null) count++;
    if (justificatifDomicile != null) count++;
    return count >= 3;
  }

  bool get isStep5Valid => planAbonnement != null && methodePaiement != null;

  bool get isStep6Valid => acceptedTerms && acceptedPrivacy && acceptedPortage;
  
  /// Réinitialise toutes les données
  void reset() {
    telephone = null;
    password = null;
    confirmPassword = null;
    otpSent = false;
    
    civilite = null;
    nationalite = null;
    nom = null;
    prenoms = null;
    dateNaissance = null;
    lieuNaissance = null;
    adresse = null;
    email = null;
    
    typeActivite = null;
    descriptionActivite = null;
    nomCommercial = null;
    anneeDebutActivite = null;
    
    // Reset documents
    cniRecto = null;
    cniRectoName = null;
    cniVerso = null;
    cniVersoName = null;
    selfieCni = null;
    selfieCniName = null;
    justificatifDomicile = null;
    justificatifDomicileName = null;
    rccm = null;
    rccmName = null;
    
    planAbonnement = null;
    methodePaiement = null;
    
    acceptedTerms = false;
    acceptedPrivacy = false;
    acceptedPortage = false;
  }
  
  /// Convertit les données en JSON (pour l'envoi à l'API)
  Map<String, dynamic> toJson() {
    return {
      'telephone': telephone,
      'civilite': civilite,
      'nationalite': nationalite,
      'nom': nom,
      'prenoms': prenoms,
      'dateNaissance': dateNaissance?.toIso8601String(),
      'lieuNaissance': lieuNaissance,
      'adresse': adresse,
      'email': email,
      'typeActivite': typeActivite,
      'descriptionActivite': descriptionActivite,
      'nomCommercial': nomCommercial,
      'anneeDebutActivite': anneeDebutActivite,
      // Les fichiers ne sont pas inclus dans le JSON simple
      'planAbonnement': planAbonnement,
      'methodePaiement': methodePaiement,
      'acceptedTerms': acceptedTerms,
      'acceptedPrivacy': acceptedPrivacy,
      'acceptedPortage': acceptedPortage,
    };
  }
}
