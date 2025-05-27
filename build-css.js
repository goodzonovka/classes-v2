const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');
const { generateCssFromClasses } = require('./utils/generateCss.js');
const config = require('./config/index.js');
const { generateCssVars } = require('./utils/color.js');
const {responsivePrefixes} = require('./utils/responsive.js');
const { states } = require('./utils/cssUtils.js');

console.time('⏱️ CSS сгенерирован за')

// 🔍 Основная функция — извлекает классы из DOM-дерева
function extractMatchingClassesFromDomElements(elements, configMap) {
  const classSet = new Set();

  for (const el of elements) {
    const classAttr = el.getAttribute('class');
    if (!classAttr) continue;

    const classes = classAttr.trim().split(/\s+/);

    for (let className of classes) {
      const classNameParts = className.split(':');
      let parts = [...classNameParts];

      if (parts.length > 1) {
        parts = parts.filter(part => !responsivePrefixes.includes(part));
        parts = parts.filter(part => !states.includes(part));
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
const supportedExtensions = ['.html', '.php', '.phtml'];
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
  // path.resolve(__dirname, '../../application/test'),
];
for (const dir of scanPaths) {
  walkDir(dir, (filePath) => {
    // console.log('🔍 Проверка файла:', filePath);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    allContent += `<div data-file="${filePath}">\n${fileContent}\n</div>\n`;
  });
}

// 🌳 Парсим HTML с помощью node-html-parser
const root = parse(allContent, { lowerCaseTagName: false, script: true, style: true, pre: true });
const elementsWithClass = root.querySelectorAll('[class]');

// 🧠 Извлекаем классы и фильтруем по config
const classSet = extractMatchingClassesFromDomElements(elementsWithClass, config, false);

const isDev = true;
// 🎨 Генерация переменных и CSS
const cssVars = generateCssVars(isDev); // false = production mode
const css = generateCssFromClasses(classSet, config, isDev);

// 💾 Сохраняем CSS
const outDir = path.resolve(__dirname, 'dist/css');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// 🔧 Вставляем переменные в начало файла
fs.writeFileSync(path.join(outDir, 'classes-v2.css'), `${cssVars}\n${css}`);
console.timeEnd('⏱️ CSS сгенерирован за');
console.log('✅ CSS сгенерирован: dist/css/classes-v2.css');
