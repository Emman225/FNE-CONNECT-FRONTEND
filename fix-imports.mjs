import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixes = [
    // Pages public/static - Container (guillemets simples ET doubles)
    { pattern: "from '../../components/ui/Container'", replacement: "from '../../../components/ui/Container'" },
    { pattern: 'from "../../components/ui/Container"', replacement: 'from "../../../components/ui/Container"' },

    // Pages shared - Features
    { pattern: "from '../../../components/clients/", replacement: "from '../../../../app/shared/features/clients/" },
    { pattern: "from '../../../components/documents/", replacement: "from '../../../../app/shared/features/documents/" },
    { pattern: "from '../../../components/payments/", replacement: "from '../../../../app/shared/features/payments/" },
    { pattern: "from '../../../components/profile/", replacement: "from '../../../../app/shared/features/profile/" },
    { pattern: "from '../../../components/payouts/", replacement: "from '../../../../app/shared/features/payouts/" },
    { pattern: "from '../../../components/invoices/", replacement: "from '../../../../app/shared/features/invoices/" },

    { pattern: 'from "../../../components/clients/', replacement: 'from "../../../../app/shared/features/clients/' },
    { pattern: 'from "../../../components/documents/', replacement: 'from "../../../../app/shared/features/documents/' },
    { pattern: 'from "../../../components/payments/', replacement: 'from "../../../../app/shared/features/payments/' },
    { pattern: 'from "../../../components/profile/', replacement: 'from "../../../../app/shared/features/profile/' },
    { pattern: 'from "../../../components/payouts/', replacement: 'from "../../../../app/shared/features/payouts/' },
    { pattern: 'from "../../../components/invoices/', replacement: 'from "../../../../app/shared/features/invoices/' },

    // RegisterPage
    { pattern: 'from "../../../../app/public/components/common/Navbar"', replacement: 'from "../../../../app/public/components/Navbar"' },

    // Sidebar/Topbar - AuthProvider
    { pattern: "from '../../../auth/AuthProvider'", replacement: "from '../../../../auth/AuthProvider'" },
    { pattern: 'from "../../../auth/AuthProvider"', replacement: 'from "../../../../auth/AuthProvider"' },

    // UserListPage  
    { pattern: 'from "../../../../../core/constants/roles"', replacement: 'from "../../../../../types/roles"' },
    { pattern: 'from "../../../../../core/constants/mockUsers"', replacement: 'from "../../../../../data/mockUsers"' },
];

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    fixes.forEach(fix => {
        if (content.includes(fix.pattern)) {
            content = content.split(fix.pattern).join(fix.replacement);
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed: ${path.relative(process.cwd(), filePath)}`);
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

console.log('🔧 Fixing imports...');
const fixed = walkDir(path.join(__dirname, 'src'));
console.log(`\n✨ Done! ${fixed} files fixed.`);
