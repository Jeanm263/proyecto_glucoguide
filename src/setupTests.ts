import '@testing-library/jest-dom';

// Mock for import.meta.env
Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: {
        VITE_API_URL: 'http://localhost:4000/api',
        VITE_USE_MOCK_SERVICE: 'false'
      }
    }
  },
  writable: true,
  enumerable: true,
  configurable: true
});

// Mock console.error and console.log to prevent network errors from cluttering test output
const originalError = console.error;
const originalLog = console.log;

beforeAll(() => {
  console.error = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  console.error = originalError;
  console.log = originalLog;
});