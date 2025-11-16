import apiClient from './api';
import { USE_MOCK_SERVICE } from '../config/env';
import logger from '../utils/logger';

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
  glucoseLevel?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  diabetesType?: string;
  glucoseLevel?: number;
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
      logger.info('Iniciando proceso de login', { email: credentials.email });
      const response = await apiClient.post('/auth/login', credentials);
      const { user } = response.data;
      
      logger.info('Login exitoso', { userId: user.id, email: user.email });
      
      // El token se maneja con cookies, no es necesario guardarlo
      
      return { 
        token: '', // El token se maneja con cookies
        user 
      };
    } catch (error) {
      logger.error('Error en login', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        email: credentials.email 
      });
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
      logger.info('Iniciando proceso de registro', { email: data.email });
      const response = await apiClient.post('/auth/register', data);
      const { user } = response.data;
      
      logger.info('Registro exitoso', { userId: user.id, email: user.email });
      
      // El token se maneja con cookies, no es necesario guardarlo
      
      return { 
        token: '', // El token se maneja con cookies
        user 
      };
    } catch (error) {
      logger.error('Error en registro', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        email: data.email 
      });
      throw error;
    }
  },

  /**
   * Cerrar sesión
   */
  logout(): void {
    logger.info('Cerrando sesión de usuario');
    // En el caso de cookies, hacemos una llamada al backend
    // para eliminar la cookie de sesión
    apiClient.post('/auth/logout')
      .catch(error => {
        logger.error('Error al cerrar sesión en el backend', { 
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      });
    // La redirección se manejará en el contexto de autenticación
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
      logger.debug('Obteniendo información del usuario actual');
      const response = await apiClient.get('/auth/me');
      logger.debug('Información del usuario obtenida exitosamente');
      return response.data.user;
    } catch (error) {
      logger.error('Error al obtener usuario actual', { 
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      // Lanzar el error para que el contexto de autenticación pueda manejarlo correctamente
      throw error;
    }
  },

  /**
   * Verificar si hay un token válido
   */
  async isAuthenticated(): Promise<boolean> {
    // Detectar si estamos en un entorno móvil (Capacitor)
    const isMobile = typeof (window as unknown as { Capacitor?: unknown }).Capacitor !== 'undefined';
    
    // No verificar autenticación automáticamente en entornos móviles
    if (isMobile) {
      logger.debug('Entorno móvil detectado, no verificando autenticación automáticamente');
      return false;
    }
    
    if (USE_MOCK_SERVICE) {
      // Para desarrollo, asumimos que no estamos autenticados
      return false;
    }
    
    try {
      // Verificar autenticación consultando el endpoint protegido
      logger.debug('Verificando estado de autenticación');
      await apiClient.get('/auth/me');
      logger.debug('Usuario autenticado');
      return true;
    } catch (error: unknown) {
      // Si hay un error, asumimos que no estamos autenticados
      logger.debug('Usuario no autenticado', { 
        error: error instanceof Error ? error.message : 'Unknown error'
      });
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