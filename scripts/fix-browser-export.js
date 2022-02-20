#!/usr/bin/env node

const fs = require('fs').promises;

const findStatement = /(else if \(typeof define === .*\s*.*\s*})/m;

const exportedUMD = './src/sidebar.js';

(async () => {
  const jsContent = await fs.readFile(exportedUMD, 'utf-8');
  //   const findStatement = jsContent.match(findStatement)[0];

  const replaceStatement = ` else {
      const exports = {}
      factory({}, exports);
      this.Sidebar = exports.default;
    }`;
  await fs.writeFile(
    exportedUMD,
    jsContent.replace(findStatement, `$1${replaceStatement}`)
  );
})();
