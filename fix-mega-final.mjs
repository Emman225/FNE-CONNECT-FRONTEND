import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const finalFixes = [
    // Tous les Input dans features → ../../../../components
    { pattern: 'from "../../components/ui/Input"', replacement: 'from "../../../../components/ui/Input"' },
    { pattern: "from '../../components/ui/Input'", replacement: "from '../../../../components/ui/Input'" },

    // UserCreatePage Input (src/pages/admin/platform/users/ = 5 niveaux, donc 4x ../)
    { pattern: 'from "../../components/ui/Input"', replacement: 'from "../../../../components/ui/Input"' },

    // RegisterPage RegistrationStepper (src/pages/public/auth/ = 4 niveaux, donc 3x ../)
    { pattern: 'from "../../../../auth/components/RegistrationStepper"', replacement: 'from "../../../auth/components/RegistrationStepper"' },

    // AmlDashboard compliance components (src/pages/admin/compliance/)
    { pattern: 'from "../../../components/compliance/', replacement: 'from "../../../app/admin/components/compliance/' },

    //  FneInvoiceModal context (src/app/shared/features/invoices/ = 5 niveaux, donc 4x ../)
    { pattern: 'from "../../../context/NotificationContext"', replacement: 'from "../../../../context/NotificationContext"' },
];

function fixFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        finalFixes.forEach(fix => {
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
        // Ignore
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
                // Ignore
            }
        });
    } catch (err) {
        // Ignore
    }

    return count;
}

console.log('🚀 FINAL MEGA FIX - Last corrections...\n');
const fixed = walkDir(path.join(__dirname, 'src'));
console.log(`\n🎉 DONE! ${fixed} files fixed!`);
console.log('\n🔥 This should be the LAST fix! Check Vite...');
