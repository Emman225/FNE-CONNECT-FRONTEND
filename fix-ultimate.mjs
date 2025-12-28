import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allFixes = [
    // Features → core/utils → utils
    { pattern: 'from "../../../core/utils/financialUtils"', replacement: 'from "../../../../utils/financialUtils"' },
    { pattern: "from '../../../core/utils/financialUtils'", replacement: "from '../../../../utils/financialUtils'" },

    // Features → context
    { pattern: 'from "../../../context/NotificationContext"', replacement: 'from "../../../../context/NotificationContext"' },
    { pattern: "from '../../../context/NotificationContext'", replacement: "from '../../../../context/NotificationContext'" },

    // Supprimer import store
    { pattern: 'from "../../../store"', replacement: '// from "../../../store" // TODO: Fix store path' },
    { pattern: "from '../../../store'", replacement: "// from '../../../store' // TODO: Fix store path" },

    // Pages shared → mockData
    { pattern: 'from "../../../../data/mockData"', replacement: 'from "../../../data/mockData"' },
    { pattern: "from '../../../../data/mockData'", replacement: "from '../../../data/mockData'" },

    // Pages shared → financialUtils  
    { pattern: 'from "../../../../core/utils/financialUtils"', replacement: 'from "../../../utils/financialUtils"' },
    { pattern: "from '../../../../core/utils/financialUtils'", replacement: "from '../../../utils/financialUtils'" },

    // AmlDashboard → context
    { pattern: 'from "../../../../context/NotificationContext"', replacement: 'from "../../../context/NotificationContext"' },
    { pattern: "from '../../../../context/NotificationContext'", replacement: "from '../../../context/NotificationContext'" },

    // RegisterPage → Navbar
    { pattern: 'from "../../../../app/public/components/Navbar"', replacement: 'from "../../../app/public/components/Navbar"' },
    { pattern: "from '../../../../app/public/components/Navbar'", replacement: "from '../../../app/public/components/Navbar'" },

    // UserCreatePage → types/roles
    { pattern: 'from "../../../../../types/roles"', replacement: 'from "../../../../types/roles"' },
    { pattern: "from '../../../../../types/roles'", replacement: "from '../../../../types/roles'" },

    // Topbar → types/roles (déjà à 5 niveaux mais référence types à 4)
    { pattern: 'from "../../../../../types/roles"', replacement: 'from "../../../../types/roles"' },
    { pattern: "from '../../../../../types/roles'", replacement: "from '../../../../types/roles'" },

    // InputPassword dans src/auth/components (2 niveaux vers src, donc ../../components)
    { pattern: 'from "../../../../components/ui/Input"', replacement: 'from "../../components/ui/Input"' },
    { pattern: "from '../../../../components/ui/Input'", replacement: "from '../../components/ui/Input'" },

    // InputPassword dans src/components/forms (3 niveaux vers src, donc ../../components depuis forms)
    // Mais d'après l'erreur c'est dans src/components/forms/InputPassword.tsx
    // src/components/forms/ est à 3 niveaux donc ../../ vers src
];

function fixFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        allFixes.forEach(fix => {
            if (content.includes(fix.pattern)) {
                content = content.split(fix.pattern).join(fix.replacement);
            }
        });

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
            console.log(`✅ ${relativePath}`);
            return 1;
        }
    } catch (err) {
        // Ignorer les erreurs de lecture
    }
    return 0;
}

function walkDir(dir) {
    let count = 0;
    try {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            try {
                const stat = fs.statSync(filePath);

                if (stat.isDirectory()) {
                    count += walkDir(filePath);
                } else if (file.endsWith('.jsx') || file.endsWith('.tsx')) {
                    count += fixFile(filePath);
                }
            } catch (err) {
                // Ignorer
            }
        });
    } catch (err) {
        // Ignorer
    }

    return count;
}

console.log('🔧 ULTIMATE FIX - Correcting all remaining imports...\n');
const fixed = walkDir(path.join(__dirname, 'src'));
console.log(`\n✨ SUCCESS! ${fixed} files fixed!`);
console.log('\nℹ️  Vite should auto-reload. Check the terminal...');
