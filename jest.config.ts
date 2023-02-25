import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  clearMocks: true,
  coverageProvider: "v8",
  preset: 'ts-jest',
  testMatch: [
    '**/*.spec.ts',
    '**/*.test.ts'    
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/'}),
};
