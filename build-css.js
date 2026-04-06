const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');
const { generateCssFromClasses } = require('./utils/generateCss.js');
const config = require('./config/index.js');
const { generateCssVars } = require('./utils/color.js');
const { STATES, RESPONSIVE_PREFIXES } = require('./utils/constants.js');

console.time('⏱️ CSS сгенерирован за')

function isValidClassToken(className) {
  let bracketDepth = 0;

  for (const char of className) {
    if (char === '[') {
      bracketDepth += 1;
      continue;
    }

    if (char === ']') {
      if (bracketDepth === 0) return false;
      bracketDepth -= 1;
      continue;
    }

    // Quotes are valid only inside arbitrary value blocks: e.g. bg-[url('img/test.svg')]
    if ((char === "'" || char === '"' || char === '`') && bracketDepth === 0) {
      return false;
    }
  }

  return bracketDepth === 0;
}

function extractClassesFromJs(content, configMap) {
  const classSet = new Set();
  const regex = /(?:class(?:Name)?|classList\.add)\s*=\s*["'`](.*?)["'`]/gs;

  let match;
  while ((match = regex.exec(content)) !== null) {
    const classAttr = match[1];
    const classes = classAttr.trim().split(/\s+/);

    for (let className of classes) {
      if (!isValidClassToken(className)) continue;

      const classNameParts = className.split(':');
      let parts = [...classNameParts];

      if (parts.length > 1) {
        parts = parts.filter(part => !RESPONSIVE_PREFIXES.includes(part));
        parts = parts.filter(part => !STATES.includes(part));
        if (classNameParts.includes('has') && parts.length === 2 && /^\[.*\]$/.test(parts[0])) {
          parts = parts.slice(1)
        }
      }

      let rawClass = parts.join(':');
      if (rawClass.startsWith('!')) rawClass = rawClass.slice(1);

      for (const prefix in configMap) {
        if (rawClass.startsWith(prefix) || rawClass.startsWith(`-${prefix}`)) {
          classSet.add(className);
          break;
        }
      }
    }
  }

  return classSet;
}

// 🔍 Основная функция — извлекает классы из DOM-дерева
function extractMatchingClassesFromDomElements(elements, configMap) {
  const classSet = new Set();

  for (const el of elements) {
    const classAttr = el.getAttribute('class');
    if (!classAttr) continue;

    const classes = classAttr.trim().split(/\s+/);

    for (let className of classes) {
      if (!isValidClassToken(className)) continue;

      const classNameParts = className.split(/:(?![^\[]*\])/);
      let parts = [...classNameParts];

      if (parts.length > 1) {
        parts = parts.filter(part => !RESPONSIVE_PREFIXES.includes(part));
        parts = parts.filter(part => !STATES.includes(part));

        /*if ((classNameParts.includes('nth-child') || classNameParts.includes('not')) && parts.length === 2 && /^\[.*\]$/.test(parts[0])) {
          parts = parts.slice(1)
        }*/

        if (parts.length === 2 && /^\[.*\]$/.test(parts[0])) {
          parts = parts.slice(1)
        }
      }

      let rawClass = parts.join(':');
      if (rawClass.startsWith('!')) rawClass = rawClass.slice(1);


      for (const prefix in configMap) {
        if (rawClass.startsWith(prefix) || rawClass.startsWith(`-${prefix}`)) {
          classSet.add(className);
          break;
        }
      }
    }
  }

  return classSet;
}

// 🔄 Рекурсивно собираем HTML-файлы
const supportedExtensions = ['.html', '.php', '.phtml', '.js'];
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    if (file === 'node_modules' || file.startsWith('.')) return;

    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      const ext = path.extname(fullPath);
      if (supportedExtensions.includes(ext)) {
        callback(fullPath);
      }
    }
  });
}

// 📥 Считываем HTML
let allContent = '';
const scanPaths = [
  path.resolve(__dirname, 'page-layouts'),
];
const classSet = new Set();

for (const dir of scanPaths) {
  walkDir(dir, (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const ext = path.extname(filePath);

    if (['.html', '.php', '.phtml'].includes(ext)) {
      const wrappedHtml = `<div data-file="${filePath}">\n${fileContent}\n</div>\n`;
      // console.log(wrappedHtml)
      const root = parse(wrappedHtml, { lowerCaseTagName: false, script: true, style: true, pre: true });
      // console.log('root')
      // console.log(root)
      const elementsWithClass = root.querySelectorAll('[class]');
      // console.log(extractMatchingClassesFromDomElements(elementsWithClass, config))
      // console.log('q')
      // console.log(elementsWithClass)
      const htmlClasses = extractMatchingClassesFromDomElements(elementsWithClass, config);
      htmlClasses.forEach(cls => classSet.add(cls));
    }

    if (ext === '.js') {
      const jsClasses = extractClassesFromJs(fileContent, config);
      jsClasses.forEach(cls => classSet.add(cls));
    }
  });
}

const isDev = false;
const isMinCss = false;

// 🎨 Генерация переменных и CSS
const cssVars = generateCssVars(isMinCss); // false = production mode
// console.log(classSet)
const css = generateCssFromClasses(classSet, config, isDev, isMinCss);
// console.log(css)

// 💾 Сохраняем CSS
const outDir = path.resolve(__dirname, 'dist/css');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// 🔧 Вставляем переменные в начало файла
fs.writeFileSync(path.join(outDir, 'classes-v2.css'), `${cssVars}\n${css}`);
console.timeEnd('⏱️ CSS сгенерирован за');
console.log('✅ CSS сгенерирован: dist/css/classes-v2.css');

module.exports = {
  extractMatchingClassesFromDomElements,
}