const rclt = require('./src');

const req = require.context('./src', true, /^\.\/locale\/.+_.+\.tsx$/);

rclt.locales = {};

req.keys().forEach(mod => {
  const matches = mod.match(/\/([^/]+).tsx$/);
  rclt.locales[matches[1]] = req(mod).default;
});

module.exports = rclt;
