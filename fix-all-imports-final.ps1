# Script de correction MASSIVE des imports - Version finale
Write-Host "🔧 Correction massive des imports en cours..." -ForegroundColor Cyan

$corrections = 0

# Tous les fichiers JSX/TSX
$files = Get-ChildItem -Path "src" -Include "*.jsx","*.tsx" -Recurse -File

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($null -eq $content) { continue }
    
    $original = $content
    
    # Pages public/static - Container
    $content = $content -replace '(import\s+Container\s+from\s+)"\.\./\.\./components/ui/Container"', '$1"../../../components/ui/Container"'
    
    # Pages shared - Features vers app/shared/features
    $content = $content -replace 'from\s+"\.\.//\.\./components/clients/', 'from "../../../../app/shared/features/clients/'
    $content = $content -replace 'from\s+"\.\.//\.\./components/documents/', 'from "../../../../app/shared/features/documents/'
    $content = $content -replace 'from\s+"\.\.//\.\./components/payments/', 'from "../../../../app/shared/features/payments/'
    $content = $content -replace 'from\s+"\.\.//\.\./components/profile/', 'from "../../../../app/shared/features/profile/'
    $content = $content -replace 'from\s+"\.\.//\.\./components/payouts/', 'from "../../../../app/shared/features/payouts/'
    $content = $content -replace 'from\s+"\.\.//\.\./components/invoices/', 'from "../../../../app/shared/features/invoices/'
    
    # Pages admin - Features  
    $content = $content -replace 'from\s+"\.\.//\.\./components/documents/', 'from "../../../../app/shared/features/documents/'
    
    # RegisterPage - Navbar
    $content = $content -replace 'from\s+"\.\.//\.\.//\.\.//app/public/components/common/Navbar"', 'from "../../../../app/public/components/Navbar"'
    
    # Sidebar/Topbar - AuthProvider
    $content = $content -replace 'from\s+"\.\./\.\./auth/AuthProvider"', 'from "../../../auth/AuthProvider"'
    
    # UserListPage - roles et mockUsers
    $content = $content -replace 'from\s+"\.\.//\.\.//\.\.//\.\.//core/constants/roles"', 'from "../../../../../types/roles"'
    $content = $content -replace 'from\s+"\.\.//\.\.//\.\.//\.\.//core/constants/mockUsers"', 'from "../../../../../data/mockUsers"'
    
    # Utils et data
    $content = $content -replace 'from\s+"\.\.//\.\.//\.\.//utils/financialUtils"', 'from "../../../../utils/financialUtils"'
    $content = $content -replace 'from\s+"\.\.//\.\.//\.\.//data/mockData"', 'from "../../../../data/mockData"'
    $content = $content -replace 'from\s+"\.\.//\.\.//\.\.//hooks/useDashboardPath"', 'from "../../../../hooks/useDashboardPath"'
    $content = $content -replace 'from\s+"\.\.//\.\.//\.\.//context/NotificationContext"', 'from "../../../../context/NotificationContext"'
    
    # AuthProvider pour Sidebar/Topbar (depuis app/shared/components/dashboard)
    $content = $content -replace 'from\s+"\.\./\.\./\.\./auth/AuthProvider"', 'from "../../../../auth/AuthProvider"'
    
    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        $corrections++
        Write-Host "✅ $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "`n✨ Terminé! $corrections fichiers corrigés" -ForegroundColor Cyan
