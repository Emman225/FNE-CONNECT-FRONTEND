# FNE CONNECT - ARCHITECTURE BACKEND LARAVEL

Ce document détaille l'architecture technique, le schéma de base de données et les endpoints API nécessaires pour alimenter le frontend FNE CONNECT existant.

## 1. Stack Technique Imposée

*   **Framework**: Laravel 11.x (API REST)
*   **Base de données**: PostgreSQL 14+
*   **Authentification**: JWT (tymon/jwt-auth) avec Refresh Tokens
*   **Permissions**: Spatie Laravel Permission (Roles & Permissions)
*   **Stockage**: S3 ou Local (Dossiers KYC sécurisés)
*   **Queue**: Redis (pour les traitements asynchrones DGI / Emails)

---

## 2. Modèle de Données (PostgreSQL)

### 2.1 Schéma Relationnel (Entités Principales)

#### `users`
Table centrale d'authentification.
*   `id` (UUID, PK)
*   `phone` (string, unique, index)
*   `email` (string, nullable, unique)
*   `password` (hash)
*   `name` (string)
*   `role` (enum: 'vendor', 'admin', 'compliance', 'finance', 'support')
*   `status` (enum: 'pending', 'active', 'suspended', 'closed')
*   `otp_code` (string, nullable)
*   `otp_expires_at` (datetime, nullable)
*   `email_verified_at` (datetime)
*   `phone_verified_at` (datetime)
*   `created_at`, `updated_at`, `deleted_at`

#### `vendors`
Profil étendu pour les vendeurs (KYC). Relation 1-1 avec `users`.
*   `id` (UUID, PK)
*   `user_id` (UUID, FK -> users.id)
*   `business_name` (string)
*   `rne_number` (string, nullable)
*   `nif` (string, nullable) - Numéro d'Identifiant Fiscal
*   `address` (text)
*   `city` (string)
*   `country` (string)
*   `kyc_status` (enum: 'pending', 'submitted', 'approved', 'rejected', 'incomplete')
*   `kyc_submitted_at` (datetime)
*   `kyc_reviewed_at` (datetime)
*   `kyc_reviewed_by` (UUID, FK -> users.id)
*   `balance` (decimal, default 0) - Solde disponible
*   `commission_rate` (decimal, default 2.5)
*   `created_at`, `updated_at`

#### `kyc_documents`
Documents téléchargés pour le KYC.
*   `id` (UUID, PK)
*   `vendor_id` (UUID, FK -> vendors.id)
*   `type` (enum: 'id_card', 'passport', 'rne_certificate', 'tax_certificate', 'photo')
*   `file_path` (string)
*   `status` (enum: 'pending', 'valid', 'rejected')
*   `rejection_reason` (text, nullable)
*   `created_at`, `updated_at`

#### `clients`
Clients gérés par les vendeurs.
*   `id` (UUID, PK)
*   `vendor_id` (UUID, FK -> vendors.id)
*   `name` (string)
*   `email` (string, nullable)
*   `phone` (string, nullable)
*   `address` (text, nullable)
*   `type` (enum: 'B2B', 'B2C', 'B2F', 'B2G')
*   `ncc` (string, nullable) - Pour B2B
*   `created_at`, `updated_at`

#### `invoices`
Factures, Devis, Proformas.
*   `id` (UUID, PK)
*   `vendor_id` (UUID, FK -> vendors.id)
*   `client_id` (UUID, FK -> clients.id)
*   `type` (enum: 'QUOTE', 'PROFORMA', 'INVOICE')
*   `number` (string) - Numéro unique séquentiel par vendeur
*   `status` (enum: 'draft', 'sent', 'paid', 'partially_paid', 'cancelled', 'overdue')
*   `issue_date` (date)
*   `due_date` (date)
*   `currency` (string, default 'XAF')
*   `subtotal` (decimal)
*   `tax_amount` (decimal)
*   `total` (decimal)
*   `amount_paid` (decimal, default 0)
*   `payment_link_token` (string, unique, nullable)
*   `notes` (text, nullable)
*   `dgi_uid` (string, nullable) - Unique ID from DGI
*   `dgi_qr_code` (text, nullable)
*   `created_at`, `updated_at`

#### `invoice_items`
Lignes de facture.
*   `id` (UUID, PK)
*   `invoice_id` (UUID, FK -> invoices.id)
*   `description` (string)
*   `quantity` (decimal)
*   `unit_price` (decimal)
*   `tax_rate` (enum: 'TVA_18', 'TVA_9', 'NONE', ...)
*   `total` (decimal)

#### `payments`
Paiements reçus des clients.
*   `id` (UUID, PK)
*   `invoice_id` (UUID, FK -> invoices.id)
*   `amount` (decimal)
*   `method` (enum: 'WAVE', 'ORANGE_MONEY', 'MTN_MOMO', 'CASH', 'BANK_TRANSFER')
*   `transaction_ref` (string, nullable)
*   `status` (enum: 'pending', 'confirmed', 'failed')
*   `paid_at` (datetime)
*   `confirmed_at` (datetime, nullable)
*   `created_at`, `updated_at`

#### `commissions`
Commissions prélevées par FNE Connect.
*   `id` (UUID, PK)
*   `invoice_id` (UUID, FK -> invoices.id)
*   `vendor_id` (UUID, FK -> vendors.id)
*   `amount` (decimal)
*   `rate` (decimal) - Taux appliqué au moment
*   `status` (enum: 'calculated', 'deducted')
*   `created_at`, `updated_at`

#### `aml_alerts`
Alertes Anti-Money Laundering.
*   `id` (UUID, PK)
*   `vendor_id` (UUID, FK -> vendors.id)
*   `trigger_event` (string) - ex: 'high_value_transaction'
*   `severity` (enum: 'low', 'medium', 'high', 'critical')
*   `status` (enum: 'open', 'investigating', 'resolved', 'false_positive')
*   `details` (json)
*   `created_at`, `updated_at`

---

## 3. Authentification & Sécurité (JWT)

### Flow d'inscription Vendeur
1.  **POST /api/v1/auth/register**: Reçoit `phone`, `business_name`. Crée User (statut 'pending') + Vendor. Envoie OTP SMS.
2.  **POST /api/v1/auth/verify-otp**: Reçoit `phone`, `otp`. Vérifie. Si OK -> User 'active'. Retourne JWT Token.
3.  **POST /api/v1/auth/set-password**: (Optionnel si pas fait à l'étape 1) Définit le mot de passe final.

### Flow de Login
1.  **POST /api/v1/auth/login**: Reçoit `phone`/`email` + `password`.
2.  Retourne:
    ```json
    {
      "access_token": "eyJ...",
      "token_type": "bearer",
      "expires_in": 3600,
      "user": { ... },
      "role": "vendor"
    }
    ```

### Middleware
*   `auth:api`: Vérifie le token JWT valide.
*   `role:vendor`: Vérifie que l'utilisateur est un vendeur.
*   `role:admin|compliance`: Accès back-office.
*   `CheckKycStatus`: Middleware personnalisé pour bloquer la facturation si KYC != approved.

---

## 4. API Endpoints (Mapping Frontend)

### Groupe AUTH (`/api/v1/auth`)
| Méthode | Endpoint | Action UI | Payload |
| :--- | :--- | :--- | :--- |
| POST | `/register` | Inscription étape 1 | `{ phone, business_name, country_code }` |
| POST | `/verify-otp` | Validation OTP | `{ phone, otp_code }` |
| POST | `/login` | Connexion | `{ login, password }` |
| POST | `/refresh` | Rafraîchir token | `{ (Bearer Token) }` |
| POST | `/logout` | Déconnexion | - |
| GET | `/me` | Profil utilisateur courant | - |

### Groupe VENDOR / KYC (`/api/v1/vendor`)
| Méthode | Endpoint | Action UI |
| :--- | :--- | :--- |
| GET | `/profile` | Dashboard Vendeur (Header) |
| PUT | `/profile` | Mise à jour infos personnelles |
| POST | `/kyc/submit` | Soumission formulaire KYC global |
| POST | `/kyc/documents` | Upload fichier (Multipart) |
| GET | `/kyc/status` | Vérification statut ("En attente", "Validé") |

### Groupe CLIENTS (`/api/v1/clients`)
| Méthode | Endpoint | Action UI |
| :--- | :--- | :--- |
| GET | `/` | Liste des clients (DataTable) |
| POST | `/` | Créer un client |
| GET | `/{id}` | Détail client |
| PUT | `/{id}` | Modifier client |

### Groupe DOCUMENTS (`/api/v1/invoices`)
*Gère Devis, Proformas et Factures via le champ `type`*

| Méthode | Endpoint | Action UI |
| :--- | :--- | :--- |
| GET | `/` | Liste documents (Filtres: type, status) |
| POST | `/` | Créer Facture/Devis |
| GET | `/{id}` | Voir document / PDF |
| PUT | `/{id}` | Modifier brouillon |
| POST | `/{id}/finalize` | Valider (Brouillon -> Final) + Appel DGI |
| POST | `/{id}/send` | Envoyer par email |
| POST | `/{id}/duplicate` | Dupliquer (ex: Devis -> Facture) |

### Groupe PAIEMENTS PUBLICS (`/api/v1/public/payment`)
*Accessible sans authentification via Token de lien*

| Méthode | Endpoint | Action UI |
| :--- | :--- | :--- |
| GET | `/{token}` | Afficher page de paiement client |
| POST | `/{token}/process` | Exécuter paiement (Wave, OM, etc.) |

---

## 5. Exemples de Code Critique

### 5.1 Modèle User (App\Models\User.php)

```php
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements JWTSubject
{
    use HasRoles;

    protected $fillable = [
        'name', 'email', 'phone', 'password', 'status'
    ];

    public function vendor()
    {
        return $this->hasOne(Vendor::class);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'role' => $this->getRoleNames()->first(),
            'vendor_id' => $this->vendor?->id
        ];
    }
}
```

### 5.2 AuthController (App\Http\Controllers\Api\AuthController.php)

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'required|unique:users',
            'business_name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Logic de création user + envoi OTP
        // ...

        return response()->json(['message' => 'OTP sent successfully']);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => auth('api')->user()
        ]);
    }
}
```

### 5.3 Routes API (routes/api.php)

```php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\InvoiceController;

// Public Routes
Route::prefix('v1')->group(function () {
    Route::post('auth/login', [AuthController::class, 'login']);
    Route::post('auth/register', [AuthController::class, 'register']);
    
    // Public Payment Gateway
    Route::get('public/payment/{token}', [PaymentController::class, 'show']);
});

// Protected Routes
Route::prefix('v1')->middleware('auth:api')->group(function () {
    Route::post('auth/refresh', [AuthController::class, 'refresh']);
    Route::get('auth/me', [AuthController::class, 'me']);

    // Vendor Routes
    Route::middleware('role:vendor')->group(function () {
        Route::apiResource('invoices', InvoiceController::class);
        Route::apiResource('clients', ClientController::class);
        Route::post('kyc/submit', [KycController::class, 'submit']);
    });

    // Admin Routes
    Route::middleware('role:admin')->group(function () {
        Route::get('admin/dashboard', [AdminController::class, 'dashboard']);
    });
});
```

---

## 6. Instructions d'Installation & Démarrage

1.  **Créer le projet Laravel**
    ```bash
    composer create-project laravel/laravel fne-connect-backend
    cd fne-connect-backend
    ```

2.  **Installer les dépendances**
    ```bash
    composer require tymon/jwt-auth spatie/laravel-permission
    ```

3.  **Configurer JWT**
    ```bash
    php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
    php artisan jwt:secret
    ```

4.  **Configuration .env**
    ```env
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=fne_connect
    DB_USERNAME=postgres
    DB_PASSWORD=secret
    
    JWT_TTL=60
    JWT_REFRESH_TTL=20160
    ```

5.  **Exécuter les migrations**
    ```bash
    php artisan migrate
    ```

6.  **Lancer le serveur**
    ```bash
    php artisan serve
    ```
