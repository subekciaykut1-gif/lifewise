import fs from 'fs';
import path from 'path';

const contentDir = './content';
const locales = ['es', 'fr', 'de', 'pt'];

function getFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else if (file.endsWith('.mdx')) {
            results.push(file);
        }
    });
    return results;
}

locales.forEach(locale => {
    const dir = path.join(contentDir, locale);
    const files = getFiles(dir);
    console.log(`Processing locale ${locale}: ${files.length} files.`);

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const parts = content.split('---');
        if (parts.length < 3) return;
        
        const frontmatter = parts[1];
        const body = parts.slice(2).join('---');
        
        const lines = frontmatter.split(/\r?\n/);
        const newLines = lines.map(line => {
            const match = line.match(/^(\s*)(title|excerpt|category|date|publishedAt|image|featured|mostRead):\s*(.*)$/);
            if (!match) return line;
            
            const indent = match[1];
            const key = match[2];
            let val = match[3].trim();
            
            // If it starts with multiple quotes or mixed quotes, strip it
            if (val.startsWith('"') || val.startsWith("'")) {
                let cleanVal = val.replace(/^["']+/, '').replace(/["']+$/, '');
                
                // Re-wrap and escape
                if (cleanVal === 'true' || cleanVal === 'false' || /^-?\d+(\.\d+)?$/.test(cleanVal)) {
                    return `${indent}${key}: ${cleanVal}`;
                }
                const escapedVal = cleanVal.replace(/"/g, '\\"');
                return `${indent}${key}: "${escapedVal}"`;
            }
            return line;
        });
        
        const newFrontmatter = newLines.join('\n');
        const newContent = `---${newFrontmatter}\n---${body}`;
        fs.writeFileSync(file, newContent);
    });
});

console.log('Cleanup complete.');
