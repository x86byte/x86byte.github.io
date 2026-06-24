const fs = require('fs');
const files = [
  __dirname + '/src/articles/lummac2.ts',
  __dirname + '/src/articles/obfusk8.ts',
  __dirname + '/src/articles/roadmap.ts'
];

for (const file of files) {
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
