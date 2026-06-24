import fs from 'fs';

function fixFile(file) {
  try {
    const content = fs.readFileSync(file, 'utf-8');
    const firstBacktick = content.indexOf('`');
    const lastBacktick = content.lastIndexOf('`');
    if (firstBacktick !== -1 && lastBacktick !== -1 && firstBacktick !== lastBacktick) {
      const markdown = content.slice(firstBacktick + 1, lastBacktick);
      const varNameMatch = content.match(/export const (\w+) =/);
      if (varNameMatch) {
        fs.writeFileSync(file, 'export const ' + varNameMatch[1] + ' = ' + JSON.stringify(markdown) + ';\n');
        console.log('Fixed', file);
      }
    }
  } catch(e) {
    console.error('Failed', file, e.message);
  }
}

['./src/articles/lummac2.ts', './src/articles/obfusk8.ts', './src/articles/roadmap.ts'].forEach(fixFile);
