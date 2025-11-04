import { authService } from '../authService';
import apiClient from '../../services/api';

// Mock de apiClient
jest.mock('../../services/api');

// Mock de las variables de entorno
jest.mock('../../config/env', () => ({
  USE_MOCK_SERVICE: false
}));

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('debería iniciar sesión correctamente', async () => {
      const mockResponse = {
        data: {
          user: {
            id: '1',
            name: 'Test User',
            email: 'test@example.com'
          }
        }
      };

      (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);

      const credentials = { email: 'test@example.com', password: 'password123' };
      const result = await authService.login(credentials);

      expect(apiClient.post).toHaveBeenCalledWith('/auth/login', credentials);
      expect(result).toEqual({
        token: '',
        user: mockResponse.data.user
      });
    });

    it('debería lanzar un error si el inicio de sesión falla', async () => {
      const mockError = new Error('Credenciales inválidas');
      (apiClient.post as jest.Mock).mockRejectedValue(mockError);

      const credentials = { email: 'test@example.com', password: 'wrongpassword' };

      await expect(authService.login(credentials)).rejects.toThrow('Credenciales inválidas');
    });
  });

  describe('register', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
      const mockResponse = {
        data: {
          user: {
            id: '1',
            name: 'Test User',
            email: 'test@example.com'
          }
        }
      };

      (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };
      const result = await authService.register(userData);

      expect(apiClient.post).toHaveBeenCalledWith('/auth/register', userData);
      expect(result).toEqual({
        token: '',
        user: mockResponse.data.user
      });
    });

    it('debería lanzar un error si el registro falla', async () => {
      const mockError = new Error('El usuario ya existe');
      (apiClient.post as jest.Mock).mockRejectedValue(mockError);

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      await expect(authService.register(userData)).rejects.toThrow('El usuario ya existe');
    });
  });

  describe('getCurrentUser', () => {
    it('debería obtener el usuario actual correctamente', async () => {
      const mockResponse = {
        data: {
          user: {
            id: '1',
            name: 'Test User',
            email: 'test@example.com'
          }
        }
      };

      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.getCurrentUser();

      expect(apiClient.get).toHaveBeenCalledWith('/auth/me');
      expect(result).toEqual(mockResponse.data.user);
    });

    it('debería lanzar un error si no se puede obtener el usuario', async () => {
      const mockError = new Error('No autenticado');
      (apiClient.get as jest.Mock).mockRejectedValue(mockError);

      await expect(authService.getCurrentUser()).rejects.toThrow('No autenticado');
    });
  });

  describe('isAuthenticated', () => {
    it('debería retornar true si el usuario está autenticado', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({});

      const result = await authService.isAuthenticated();

      expect(apiClient.get).toHaveBeenCalledWith('/auth/me');
      expect(result).toBe(true);
    });

    it('debería retornar false si el usuario no está autenticado', async () => {
      const mockError = new Error('No autenticado');
      (apiClient.get as jest.Mock).mockRejectedValue(mockError);

      const result = await authService.isAuthenticated();

      expect(apiClient.get).toHaveBeenCalledWith('/auth/me');
      expect(result).toBe(false);
    });
  });
});