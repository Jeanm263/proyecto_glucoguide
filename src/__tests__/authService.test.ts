import { authService } from '../services/authService';
import apiClient from '../services/api';

// Mock de apiClient
jest.mock('../services/api');

describe('authService', () => {
  const mockUser = {
    id: '123',
    name: 'Test User',
    email: 'test@example.com',
    age: 30,
    diabetesType: 'type2'
  };

  const mockAuthResponse = {
    token: '',
    user: mockUser
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('debería iniciar sesión correctamente', async () => {
      (apiClient.post as jest.Mock).mockResolvedValue({
        data: {
          success: true,
          user: mockUser
        }
      });

      const credentials = {
        email: 'test@example.com',
        password: 'password123'
      };

      const result = await authService.login(credentials);

      expect(apiClient.post).toHaveBeenCalledWith('/auth/login', credentials);
      expect(result).toEqual(mockAuthResponse);
    });

    it('debería manejar errores de inicio de sesión', async () => {
      const errorMessage = 'Credenciales inválidas';
      (apiClient.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const credentials = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      await expect(authService.login(credentials)).rejects.toThrow(errorMessage);
    });
  });

  describe('register', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
      (apiClient.post as jest.Mock).mockResolvedValue({
        data: {
          success: true,
          user: mockUser
        }
      });

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        age: 30,
        diabetesType: 'type2'
      };

      const result = await authService.register(userData);

      expect(apiClient.post).toHaveBeenCalledWith('/auth/register', userData);
      expect(result).toEqual(mockAuthResponse);
    });

    it('debería manejar errores de registro', async () => {
      const errorMessage = 'El usuario ya existe';
      (apiClient.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      await expect(authService.register(userData)).rejects.toThrow(errorMessage);
    });
  });

  describe('getCurrentUser', () => {
    it('debería obtener el usuario actual correctamente', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({
        data: {
          success: true,
          user: mockUser
        }
      });

      const result = await authService.getCurrentUser();

      expect(apiClient.get).toHaveBeenCalledWith('/auth/me');
      expect(result).toEqual(mockUser);
    });

    it('debería manejar errores al obtener el usuario actual', async () => {
      const errorMessage = 'No autenticado';
      (apiClient.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(authService.getCurrentUser()).rejects.toThrow(errorMessage);
    });
  });

  describe('isAuthenticated', () => {
    it('debería retornar true si el usuario está autenticado', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({
        data: {
          success: true,
          user: mockUser
        }
      });

      const result = await authService.isAuthenticated();

      expect(apiClient.get).toHaveBeenCalledWith('/auth/me');
      expect(result).toBe(true);
    });

    it('debería retornar false si el usuario no está autenticado', async () => {
      (apiClient.get as jest.Mock).mockRejectedValue(new Error('Unauthorized'));

      const result = await authService.isAuthenticated();

      expect(apiClient.get).toHaveBeenCalledWith('/auth/me');
      expect(result).toBe(false);
    });
  });

  describe('logout', () => {
    it('debería cerrar sesión correctamente', () => {
      // El método logout no hace una llamada a la API, solo limpia el estado local
      expect(() => authService.logout()).not.toThrow();
    });
  });
});