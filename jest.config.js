export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json'
    }]
  },
  moduleNameMapper: {
    '^../config/env$': '<rootDir>/src/__mocks__/config/env.ts',
    '^../../config/env$': '<rootDir>/src/__mocks__/config/env.ts',
    '^../../services/authService$': '<rootDir>/src/__mocks__/services/authService.ts',
    '^../services/profileService$': '<rootDir>/src/__mocks__/services/profileService.ts',
    '^../../services/profileService$': '<rootDir>/src/__mocks__/services/profileService.ts',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  setupFiles: ['<rootDir>/src/testSetup.js'],
  resetMocks: true,
  restoreMocks: true
};