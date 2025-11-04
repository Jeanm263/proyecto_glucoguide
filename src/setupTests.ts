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