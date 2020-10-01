const path = require('path');
module.exports = {
  // 单元测试环境根目录
  rootDir: path.resolve(__dirname),
  // 指定需要进行单元测试的文件匹配规则
  testMatch: ['<rootDir>/src/**/__tests__/**'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransform.js',
  },
  moduleNameMapper: {
    '@src': '<rootDir>/src',
    '@utils': '<rootDir>/utils',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(lodash-es|other-es-lib))',
  ],
};
