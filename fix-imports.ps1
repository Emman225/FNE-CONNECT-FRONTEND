# Script de correction automatique des imports
# Ce script corrige les imports obsolètes après la restructuration Clean Architecture

$filesToFix = @(
    "src/pages/public/static/AboutPage.jsx",
    "src/pages/public/static/ContactPage.jsx",
    "src/pages/public/static/FaqPage.jsx",
    "src/pages/public/static/NewsPage.jsx",
    "src/pages/public/static/ServicesPage.jsx"
)

foreach ($file in $filesToFix) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Correction des imports Navbar et Footer
        $content = $content -replace "from\s+['\`"]\.\.\/\.\.\/components\/common\/Navbar['\`"]", "from '../../../app/public/components/Navbar'"
        $content = $content -replace "from\s+['\`"]\.\.\/\.\.\/components\/common\/Footer['\`"]", "from '../../../app/public/components/Footer'"
        
        Set-Content -Path $file -Value $content -NoNewline
        Write-Host "✅ Corrigé: $file"
    } else {
        Write-Host "⚠️  Introuvable: $file"
    }
}

Write-Host "`n✨ Correction terminée!"
