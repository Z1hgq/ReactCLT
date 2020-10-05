import fs from 'fs';
const conf = JSON.parse(
  fs.readFileSync(__dirname + '/package.json').toString(),
);

export default {
  title: 'ReactCLT',
  devServer: {
    port: 3010,
    host: '127.0.0.1',
  },
  outputPath: `release/${conf.siteOutputName}`,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        style: true,
      },
      'antd',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: 'reactCLT',
        libraryDirectory: 'es',
        style: true, // 请勿修改此配置
      },
      'reactCLT',
    ],
  ],
  resolve: {
    includes: ['docs'],
  },
};
