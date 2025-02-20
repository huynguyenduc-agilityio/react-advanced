import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: './',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!**/*.stories.{ts,tsx}',
    '!src/main.tsx',
  ],

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-transformer-svg',

    '^@/(.*)$': '<rootDir>/src/$1',
    '^@public/(.*)$': '<rootDir>/public/$1',
    '^@/assets(.*)$': '<rootDir>src/assets/$1',
    '^@/pages(.*)$': '<rootDir>src/pages/$1',
    '^@/components(.*)$': '<rootDir>src/components/$1',
    '^@/constants(.*)$': '<rootDir>src/constants/$1',
    '^@/utils(.*)$': '<rootDir>src/utils/$1',
    '^@/__mocks__(.*)$': '<rootDir>src/__mocks__/$1',
    '^@/services(.*)$': '<rootDir>src/services/$1',
    '^@/hooks(.*)$': '<rootDir>src/hooks/$1',
    '^@/actions(.*)$': '<rootDir>src/actions/$1',
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/constants/',
    '<rootDir>/src/themes/',
    '<rootDir>/src/routers/',
    '<rootDir>/src/types/',
    '<rootDir>/src/pages/index.ts',
    '<rootDir>/src/App.tsx',
    '<rootDir>/src/main.tsx',
    '<rootDir>/src/layouts/index.ts',
    '<rootDir>/src/services/index.ts',
    '<rootDir>/src/components/Form/index.ts',
    '<rootDir>/src/vite-env.d.ts',
    '<rootDir>/src/vite.config.ts',
    '<rootDir>/src/jest.config.ts',
    '/.storybook/',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // coverageThreshold: {
  //   global: {
  //     statements: 90,
  //     branches: 90,
  //     functions: 90,
  //     lines: 90,
  //   },
  // },
};

export default config;
