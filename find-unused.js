const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = getFiles(path.resolve('./src')).map(f => path.relative(process.cwd(), f));
const usedMap = new Set();
let toProcess = [path.relative(process.cwd(), path.resolve('./src/main.jsx'))];
usedMap.add(toProcess[0]);

while(toProcess.length > 0) {
  const current = toProcess.pop();
  try {
    const code = fs.readFileSync(current, 'utf8');
    const importRegex = /import.*?['"](.+?)['"]/g;
    let match;
    while((match = importRegex.exec(code)) !== null) {
      const target = match[1];
      if (target.startsWith('.')) {
        let abs = path.resolve(path.dirname(current), target);
        let checkPaths = [abs, abs + '.js', abs + '.jsx', abs + '/index.js', abs + '/index.jsx'];
        for (let p of checkPaths) {
          if (fs.existsSync(p) && !fs.statSync(p).isDirectory()) {
            const rel = path.relative(process.cwd(), p);
            if (!usedMap.has(rel)) {
              usedMap.add(rel);
              toProcess.push(rel);
            }
            break;
          }
        }
      }
    }
  } catch(e){}
}

const unused = allFiles.filter(f => !usedMap.has(f));
console.log(unused.join('\n'));
