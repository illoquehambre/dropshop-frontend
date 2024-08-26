const nextJest = require('next/jest');
const { pathsToModuleNameMapper } = require('ts-jest')
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig')
const createJestConfig = nextJest({
  dir: './',
});


const config = {
  coverageProvider: 'babel',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */),
  setupFilesAfterEnv: ['next'], // Asegúrate de tener este archivo si necesitas configuraciones adicionales
};

module.exports = createJestConfig(config);
