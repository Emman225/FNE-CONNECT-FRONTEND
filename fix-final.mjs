import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const globalFixes = [
    // Features → components/ui (src/app/shared/features/* à 5 niveaux, donc 4x ../)
    { pattern: 'from "../ui/Card"', replacement: 'from "../../../../components/ui/Card"' },
    { pattern: "from '../ui/Card'", replacement: "from '../../../../components/ui/Card'" },
    { pattern: 'from "../ui/Button"', replacement: 'from "../../../../components/ui/Button"' },
    { pattern: "from '../ui/Button'", replacement: "from '../../../../components/ui/Button'" },
    { pattern: 'from "../ui/Input"', replacement: 'from "../../../../components/ui/Input"' },
    { pattern: "from '../ui/Input'", replacement: "from '../../../../components/ui/Input'" },

    // InputPassword (src/auth/components à 3 niveaux, donc 2x ../)
    { dir: 'src/auth/components/', pattern: 'from "../ui/Input"', replacement: 'from "../../components/ui/Input"' },
    { dir: 'src/auth/components/', pattern: "from '../ui/Input'", replacement: "from '../../components/ui/Input'" },

    // RegisterPage (src/pages/public/auth à 4 niveaux, donc 3x ../)
    { dir: 'src/pages/public/auth/', pattern: 'from "../../../../app/public/components/Navbar"', replacement: 'from "../../../app/public/components/Navbar"' },

    // UserCreatePage (src/pages/admin/platform/users/ à 5 niveaux, donc 4x ../)
    { dir: 'src/pages/admin/platform/users/', pattern: 'from "../../../../../types/roles"', replacement: 'from "../../../../types/roles"' },

    // Topbar (src/app/shared/components/dashboard/ à 5 niveaux, donc 4x ../)
    { dir: 'src/app/shared/components/dashboard/', pattern: 'from "../../../../../types/roles"', replacement: 'from "../../../../types/roles"' },

    // Pages shared → data/mockData (src/pages/shared/* à 3 niveaux, donc 2x ../  NON 3!)
    { dir: 'src/pages/shared/', pattern: 'from "../../../../data/mockData"', replacement: 'from "../../../data/mockData"' },
    { dir: 'src/pages/shared/', pattern: 'from "../../../../core/utils/financialUtils"', replacement: 'from "../../../utils/financialUtils"' },

    // AmlDashboard (src/pages/admin/compliance/ à 4 niveaux, donc 3x ../)
    { dir: 'src/pages/admin/compliance/', pattern: 'from "../../../../context/NotificationContext"', replacement: 'from "../../../context/NotificationContext"' },

    // PayoutReceipt (src/app/shared/features/payouts/ à 5 niveaux, donc 4x ../)
    { dir: 'src/app/shared/features/payouts/', pattern: 'from "../../../core/utils/financialUtils"', replacement: 'from "../../../../utils/financialUtils"' },
];

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
    let modified = false;

    globalFixes.forEach(fix => {
        // Si fix.dir est spécifié, vérifier que le fichier est dans ce dossier
        if (fix.dir && !relativePath.startsWith(fix.dir)) {
            return;
        }

        if (content.includes(fix.pattern)) {
            content = content.split(fix.pattern).join(fix.replacement);
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${relativePath}`);
        return 1;
    }
    return 0;
}

function walkDir(dir) {
    let count = 0;
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            count += walkDir(filePath);
        } else if (file.endsWith('.jsx') || file.endsWith('.tsx')) {
            count += fixFile(filePath);
        }
    });

    return count;
}

console.log('🔧 Final import fix...\n');
const fixed = walkDir(path.join(__dirname, 'src'));
console.log(`\n✨ ${fixed} files fixed!`);
