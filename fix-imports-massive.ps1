# Script de correction massive des imports - Clean Architecture
# Corrige tous les chemins d'imports obsolètes

Write-Host "🔧 Début de la correction massive des imports..." -ForegroundColor Cyan

# Définir les mappings de correction
$replacements = @{
    # Composants UI
    '"../../components/ui/Container"'                   = '"../../../components/ui/Container"'
    '"../../components/ui/Card"'                        = '"../../../components/ui/Card"'
    '"../../../components/ui/'                          = '"../../../../components/ui/'
    
    # Components features -> app/shared/features
    '"../../../components/clients/'                     = '"../../../../app/shared/features/clients/'
    '"../../../components/documents/'                   = '"../../../../app/shared/features/documents/'
    '"../../../components/payments/'                    = '"../../../../app/shared/features/payments/'
    '"../../../components/payouts/'                     = '"../../../../app/shared/features/payouts/'
    '"../../../components/invoices/'                    = '"../../../../app/shared/features/invoices/'
    '"../../../components/profile/'                     = '"../../../../app/shared/features/profile/'
    '"../../../components/compliance/'                  = '"../../../../app/shared/features/compliance/'
    
    # Dashboard components
    '"../../components/dashboard/'                      = '"../../../app/shared/components/dashboard/'
    
    # Auth components (créer le dossier si nécessaire)
    '"../../../../components/auth/'                     = '"../../../../auth/components/'
    
    # Context
    '"../../../../context/NotificationContext"'         = '"../../../../context/NotificationContext"'
    
    # Data & Core (à recréer)
    '"../../../../data/mockData"'                       = '"../../../../data/mockData"'
    '"../../../../core/utils/financialUtils"'           = '"../../../../utils/financialUtils"'
    '"../../../../../core/constants/roles"'             = '"../../../../../types/roles"'
    '"../../../../../core/constants/mockUsers"'         = '"../../../../../data/mockUsers"'
    '"../../../core/constants/roles"'                   = '"../../../types/roles"'
    
    # Hooks
    '"../../../../hooks/useDashboardPath"'              = '"../../../../hooks/useDashboardPath"'
    
    # Auth Provider (Sidebar/Topbar)
    '"../../../auth/AuthProvider"'                      = '"../../../auth/AuthProvider"'
    
    # Navbar pour RegisterPage
    '"../../../../app/public/components/common/Navbar"' = '"../../../../app/public/components/Navbar"'
    '"../../../../auth/components/RegistrationStepper"' = '"../../../../auth/components/RegistrationStepper"'
}

# Trouver tous les fichiers .jsx, .tsx, .js, .ts
$files = Get-ChildItem -Path "src" -Include *.jsx, *.tsx, *.js, *.ts -Recurse -File

$totalFiles = $files.Count
$processedFiles = 0
$modifiedFiles = 0

foreach ($file in $files) {
    $processedFiles++
    $modified = $false
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    
    if ($null -eq $content) { continue }
    
    $originalContent = $content
    
    foreach ($pattern in $replacements.Keys) {
        $replacement = $replacements[$pattern]
        if ($content -match [regex]::Escape($pattern)) {
            $content = $content -replace [regex]::Escape($pattern), $replacement
            $modified = $true
        }
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        $modifiedFiles++
        Write-Host "✅ Modifié: $($file.FullName.Replace((Get-Location).Path, '.'))" -ForegroundColor Green
    }
    
    # Progress
    if ($processedFiles % 10 -eq 0) {
        $percent = [math]::Round(($processedFiles / $totalFiles) * 100)
        Write-Host "📊 Progression: $percent% ($processedFiles/$totalFiles fichiers)" -ForegroundColor Yellow
    }
}

Write-Host "`n✨ Correction terminée!" -ForegroundColor Green
Write-Host "📊 Fichiers traités: $processedFiles" -ForegroundColor Cyan
Write-Host "✏️  Fichiers modifiés: $modifiedFiles" -ForegroundColor Cyan
