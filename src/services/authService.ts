import apiClient from './api';
import { mockAuthService } from './mockAuthService';

/**
 * Servicio de autenticación
 * En desarrollo: usa mockAuthService (sin backend)
 * En producción: conectar con endpoints reales del backend
 */

// Cambiar a false cuando el backend esté disponible
const USE_MOCK_SERVICE = true;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const authService = {
  /**
   * Iniciar sesión
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (USE_MOCK_SERVICE) {
      return mockAuthService.login(credentials);
    }
    
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      // Guardar token en localStorage
      localStorage.setItem('authToken', token);
      
      return { token, user };
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
      return mockAuthService.register(data);
    }
    
    try {
      const response = await apiClient.post('/auth/register', data);
      const { token, user } = response.data;
      
      // Guardar token en localStorage
      localStorage.setItem('authToken', token);
      
      return { token, user };
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  /**
   * Cerrar sesión
   */
  logout(): void {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  },

  /**
   * Obtener usuario actual
   */
  async getCurrentUser() {
    if (USE_MOCK_SERVICE) {
      return mockAuthService.getCurrentUser();
    }
    
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  },

  /**
   * Verificar si hay un token válido
   */
  isAuthenticated(): boolean {
    if (USE_MOCK_SERVICE) {
      return mockAuthService.isAuthenticated();
    }
    return !!localStorage.getItem('authToken');
  },

  /**
   * Obtener token
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
};

