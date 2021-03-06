const fs = require('fs');
const path = require('path');
const defaultVars = require('./scripts/themes/default-vars');
const darkVars = require('./scripts/themes/dark-vars');
const compactVars = require('./scripts/themes/compact-vars');

function generateThemeFileContent(theme) {
  return `const { ${theme}ThemeSingle } = require('./theme');\nconst defaultTheme = require('./default-theme');\n
module.exports = {
  ...defaultTheme,
  ...${theme}ThemeSingle
}`;
}

// We need compile additional content for rclt user
function finalizeCompile() {
  if (fs.existsSync(path.join(__dirname, './lib'))) {
    // 为 dist/rclt.less 编译入口文件
    const componentsPath = path.join(process.cwd(), 'src');
    let componentsLessContent = '';
    // Build components in one file: lib/style/components.less
    fs.readdir(componentsPath, (err, files) => {
      files.forEach(file => {
        if (
          fs.existsSync(path.join(componentsPath, file, 'style', 'index.less'))
        ) {
          componentsLessContent += `@import "../${path.join(
            file,
            'style',
            'index.less',
          )}";\n`;
        }
      });
      fs.writeFileSync(
        path.join(process.cwd(), 'lib', 'style', 'components.less'),
        componentsLessContent,
      );
    });
  }
}

function buildThemeFile(theme, vars) {
  // Build less entry file: dist/rclt.${theme}.less
  if (theme !== 'default') {
    fs.writeFileSync(
      path.join(process.cwd(), 'dist', `rclt.${theme}.less`),
      `@import "../lib/style/${theme}.less";\n@import "../lib/style/components.less";`,
    );
    // eslint-disable-next-line no-console
    console.log(`Built a entry less file to dist/rclt.${theme}.less`);
  } else {
    fs.writeFileSync(
      path.join(process.cwd(), 'dist', `default-theme.js`),
      `module.exports = ${JSON.stringify(vars, null, 2)};\n`,
    );
    return;
  }

  // Build ${theme}.js: dist/${theme}-theme.js, for less-loader

  fs.writeFileSync(
    path.join(process.cwd(), 'dist', `theme.js`),
    `const ${theme}ThemeSingle = ${JSON.stringify(vars, null, 2)};\n`,
    {
      flag: 'a',
    },
  );

  fs.writeFileSync(
    path.join(process.cwd(), 'dist', `${theme}-theme.js`),
    generateThemeFileContent(theme),
  );

  // eslint-disable-next-line no-console
  console.log(`Built a ${theme} theme js file to dist/${theme}-theme.js`);
}

function finalizeDist() {
  if (fs.existsSync(path.join(__dirname, './dist'))) {
    // Build less entry file: dist/rclt.less
    fs.writeFileSync(
      path.join(process.cwd(), 'dist', 'rclt.less'),
      '@import "../lib/style/index.less";\n@import "../lib/style/components.less";',
    );
    // eslint-disable-next-line no-console
    fs.writeFileSync(
      path.join(process.cwd(), 'dist', 'theme.js'),
      `const defaultTheme = require('./default-theme.js');\n`,
    );
    // eslint-disable-next-line no-console
    console.log('Built a entry less file to dist/rclt.less');
    buildThemeFile('default', defaultVars);
    buildThemeFile('dark', darkVars);
    buildThemeFile('compact', compactVars);
    fs.writeFileSync(
      path.join(process.cwd(), 'dist', `theme.js`),
      `
function getThemeVariables(options = {}) {
  let themeVar = {
    'hack': \`true;@import "\${require.resolve('rclt/lib/style/color/colorPalette.less')}";\`,
    ...defaultTheme
  };
  if(options.dark) {
    themeVar = {
      ...themeVar,
      ...darkThemeSingle
    }
  }
  if(options.compact){
    themeVar = {
      ...themeVar,
      ...compactThemeSingle
    }
  }
  return themeVar;
}

module.exports = {
  darkThemeSingle,
  compactThemeSingle,
  getThemeVariables
}`,
      {
        flag: 'a',
      },
    );
  }
}

module.exports = {
  compile: {
    finalize: finalizeCompile,
  },
  dist: {
    finalize: finalizeDist,
  },
  generateThemeFileContent,
};
