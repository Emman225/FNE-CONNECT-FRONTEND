import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixes = [
    // Pour pages/admin/platform (4 niveaux) → src/ (3x ../)
    { from: 'src/pages/admin/platform/', pattern: '../../../../app/shared/features/', replacement: '../../../app/shared/features/' },
    { from: 'src/pages/admin/platform/', pattern: '../../../../utils/', replacement: '../../../utils/' },
    { from: 'src/pages/admin/platform/', pattern: '../../../../data/', replacement: '../../../data/' },
    { from: 'src/pages/admin/platform/', pattern: '../../../../context/', replacement: '../../../context/' },

    // Pour pages/admin/platform/users (5 niveaux) → src/ (4x ../)  
    { from: 'src/pages/admin/platform/users/', pattern: '../../../../../auth/', replacement: '../../../../auth/' },
    { from: 'src/pages/admin/platform/users/', pattern: '../../../../../core/constants/roles', replacement: '../../../../types/roles' },
    { from: 'src/pages/admin/platform/users/', pattern: '../../../../../core/constants/mockUsers', replacement: '../../../../data/mockUsers' },

    // Pour pages/shared/* (4 niveaux) → src/ (3x ../)
    { from: 'src/pages/shared/', pattern: '../../../../app/shared/features/', replacement: '../../../app/shared/features/' },
    { from: 'src/pages/shared/', pattern: '../../../../hooks/', replacement: '../../../hooks/' },

    // Pour pages/admin/dashboard (4 niveaux) → src/ (3x ../)
    { from: 'src/pages/admin/dashboard/', pattern: '../../../../auth/', replacement: '../../../auth/' },

    // Pour pages/public/dashboard (4 niveaux) → src/ (3x ../)
    { from: 'src/pages/public/dashboard/', pattern: '../../../../auth/', replacement: '../../../auth/' },

    // Pour pages/admin/compliance (4 niveaux) → src/ (3x ../)
    { from: 'src/pages/admin/compliance/', pattern: '../../../../data/', replacement: '../../../data/' },

    //  Pour app/shared/components/dashboard (5 niveaux) → src/ (4x ../)
    { from: 'src/app/shared/components/dashboard/', pattern: '../../../types/roles', replacement: '../../../../types/roles' },

    // Pour RegisterPage
    { from: 'src/pages/public/auth/', pattern: '../../../../app/public/components/common/Navbar', replacement: '../../../../app/public/components/Navbar' },
];

function fixFile(filePath, fixes) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');

    fixes.forEach(fix => {
        if (relativePath.startsWith(fix.from) && content.includes(fix.pattern)) {
            content = content.split(fix.pattern).join(fix.replacement);
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed: ${relativePath}`);
        return 1;
    }
    return 0;
}

function walkDir(dir, fixes) {
    let count = 0;
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            count += walkDir(filePath, fixes);
        } else if (file.endsWith('.jsx') || file.endsWith('.tsx')) {
            count += fixFile(filePath, fixes);
        }
    });

    return count;
}

console.log('🔧 Fixing path levels...');
const fixed = walkDir(path.join(__dirname, 'src'), fixes);
console.log(`\n✨ Done! ${fixed} files fixed.`);
