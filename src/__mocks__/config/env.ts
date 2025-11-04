// Mock for config/env.ts
export const USE_MOCK_SERVICE = false;
export const API_URL = 'http://localhost:4000/api';
export const env = {
  VITE_API_URL: 'http://localhost:4000/api',
  VITE_USE_MOCK_SERVICE: false
};

// Mock para import.meta.env
export const mockImportMetaEnv = {
  VITE_API_URL: 'http://localhost:4000/api',
  VITE_USE_MOCK_SERVICE: 'false'
};