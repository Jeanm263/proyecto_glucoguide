// Mock for authService
import { USE_MOCK_SERVICE } from '../../config/env';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  age?: number;
  diabetesType?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  diabetesType?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  /**
   * Iniciar sesión
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (USE_MOCK_SERVICE) {
      // Implementación mock para desarrollo
      await new Promise(resolve => setTimeout(resolve, 500));
      throw new Error('Mock service no implementado');
    }
    
    try {
      const response = {
        data: {
          user: {
            id: '1',
            name: 'Test User',
            email: credentials.email
          }
        }
      };
      
      return { 
        token: '', // El token se maneja con cookies
        user: response.data.user
      };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  /**
   * Registrar nuevo usuario
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    if (USE_MOCK_SERVICE) {
      // Implementación mock para desarrollo
      await new Promise(resolve => setTimeout(resolve, 500));
      throw new Error('Mock service no implementado');
    }
    
    try {
      const response = {
        data: {
          user: {
            id: '1',
            name: data.name,
            email: data.email
          }
        }
      };
      
      return { 
        token: '', // El token se maneja con cookies
        user: response.data.user
      };
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  /**
   * Cerrar sesión
   */
  logout(): void {
    // En el caso de cookies, podríamos hacer una llamada al backend
    // para eliminar la cookie de sesión
    window.location.href = '/';
  },

  /**
   * Obtener usuario actual
   */
  async getCurrentUser(): Promise<User> {
    if (USE_MOCK_SERVICE) {
      // Implementación mock para desarrollo
      await new Promise(resolve => setTimeout(resolve, 200));
      throw new Error('Mock service no implementado');
    }
    
    try {
      const response = {
        data: {
          user: {
            id: '1',
            name: 'Test User',
            email: 'test@example.com'
          }
        }
      };
      return response.data.user;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  },

  /**
   * Verificar si hay un token válido
   */
  async isAuthenticated(): Promise<boolean> {
    if (USE_MOCK_SERVICE) {
      // Para desarrollo, asumimos que no estamos autenticados
      return false;
    }
    
    try {
      // Simular una llamada exitosa al backend
      return true;
    } catch (error: unknown) {
      // Si hay un error, asumimos que no estamos autenticados
      console.error('Authentication check failed:', error);
      return false;
    }
  },

  /**
   * Obtener token
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
};