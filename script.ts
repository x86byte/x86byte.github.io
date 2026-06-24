import fs from 'fs';

function fixFile(file: string) {
  const content = fs.readFileSync(file, 'utf-8');
  // First, extract the actual markdown content by stripping the 'export const varName = `' and '`;' at the end.
  const match = content.match(/export const \w+ = `([\s\S]*)`;/);
  if (!match) {
    console.log('Could not match in', file);
    return;
  }
  let markdown = match[1];
  
  // Now write it back safely.
  fs.writeFileSync(file, 'export const ' + content.match(/export const (\w+) =/)[1] + ' = ' + JSON.stringify(markdown) + ';\n');
  console.log('Fixed', file);
}

['/src/articles/lummac2.ts', '/src/articles/obfusk8.ts', '/src/articles/roadmap.ts'].forEach(fixFile);
