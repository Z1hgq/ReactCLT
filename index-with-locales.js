const reactCLT = require('./src');

const req = require.context('./src', true, /^\.\/locale\/.+_.+\.tsx$/);

reactCLT.locales = {};

req.keys().forEach(mod => {
  const matches = mod.match(/\/([^/]+).tsx$/);
  reactCLT.locales[matches[1]] = req(mod).default;
});

module.exports = reactCLT;
