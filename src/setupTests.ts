import '@testing-library/jest-dom';
import { server } from './__mocks__/server';

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

// Enable API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});

// Clean up after the tests are finished.
afterAll(() => {
  server.close();
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