const { spawn } = require('child_process');
const path = require('path');

const cwd = process.cwd();
console.log('Build started in', cwd);

const install = spawn('npm', ['install'], { stdio: 'inherit', shell: true, cwd });
install.on('close', (code) => {
  if (code !== 0) {
    process.exit(code);
  }
  console.log('Install completed');
});
