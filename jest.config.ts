import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest', // Transformador exclusivo para TypeScript
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Mapeo de paths como en tsconfig
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json', // Usa tu tsconfig existente
    },
  },
};

export default config;
