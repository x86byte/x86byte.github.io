import fs from 'fs';
import path from 'path';

function fixFile(file) {
  const content = fs.readFileSync(file, 'utf-8');
  let match = content.match(/export const \w+ = `([\s\S]*)`;/);
  if (!match) {
    // If it fails, maybe it just crashed because of the backtick, we can try another regex
    console.log('Regex fail for', file);
    // Let's just stringify everything after the first ` and before the last `
    const firstBacktick = content.indexOf('`');
    const lastBacktick = content.lastIndexOf('`');
    if (firstBacktick === -1 || lastBacktick === -1 || firstBacktick === lastBacktick) return;
    const markdown = content.slice(firstBacktick + 1, lastBacktick);
    const varName = content.match(/export const (\w+) =/)[1];
    fs.writeFileSync(file, 'export const ' + varName + ' = ' + JSON.stringify(markdown) + ';\n');
    console.log('Fixed fallback', file);
    return;
  }
  let markdown = match[1];
  const varName = content.match(/export const (\w+) =/)[1];
  fs.writeFileSync(file, 'export const ' + varName + ' = ' + JSON.stringify(markdown) + ';\n');
  console.log('Fixed', file);
}

['/app/applet/src/articles/lummac2.ts', '/app/applet/src/articles/obfusk8.ts', '/app/applet/src/articles/roadmap.ts'].forEach(f => fixFile(f));
