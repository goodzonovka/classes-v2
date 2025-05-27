const chokidar = require('chokidar');
const { exec } = require('child_process');

// Пути к отслеживаемым директориям
const watchPaths = [
  '../page-layouts/**/*.html',
  '../page-layouts/**/*.php',
  '../page-layouts/**/*.js',
  // '../../application/test/*.html',
  // '../../application/test/*.php',
];

// Запуск сборки CSS
function runBuild() {
  console.log('🔄 Изменения найдены. Пересобираем CSS...');

  exec('npm run build:css', (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Ошибка сборки:', stderr);
    } else {
      console.log(stdout);
    }
  });
}

runBuild();

// Следим за изменениями
const watcher = chokidar.watch(watchPaths, {
  persistent: true,
  ignoreInitial: true,
});

watcher.on('change', runBuild);
watcher.on('add', runBuild);
watcher.on('unlink', runBuild);

console.log('👀 Ожидание изменений в HTML/PHP...');
