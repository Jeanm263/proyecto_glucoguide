import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authService, type AuthResponse, type LoginCredentials, type RegisterData, type User } from '../services/authService';
import { USE_MOCK_SERVICE } from '../config/env';
import { toastError, toastSuccess, getErrorMessage } from '../utils/toast';
import logger from '../utils/logger';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Provider del contexto de autenticación
 * Maneja el estado global de autenticación
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Verificar autenticación al montar el componente
   */
  useEffect(() => {
    const checkAuth = async () => {
      // Solo verificar autenticación si no estamos usando el servicio mock
      // y no estamos en un entorno de pruebas
      const isTestEnv = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test';
      
      if (!USE_MOCK_SERVICE && !isTestEnv) {
        try {
          logger.debug('Verificando estado de autenticación al iniciar la aplicación');
          const isAuthenticated = await authService.isAuthenticated();
          logger.debug('Resultado de verificación de autenticación:', isAuthenticated);
          if (isAuthenticated) {
            const currentUser = await authService.getCurrentUser();
            logger.debug('Usuario actual obtenido:', { userId: currentUser.id, email: currentUser.email });
            setUser({
              id: currentUser.id,
              name: currentUser.name,
              email: currentUser.email,
              age: currentUser.age,
              diabetesType: currentUser.diabetesType,
            });
          } else {
            logger.debug('Usuario no autenticado, estableciendo user a null');
            setUser(null);
          }
        } catch (error) {
          // Si no hay sesión activa, el error es esperado
          logger.debug('No se encontró sesión activa:', error);
          setUser(null);
        } finally {
          // Siempre establecer isLoading a false después de verificar la autenticación
          logger.debug('Verificación de autenticación completada, estableciendo isLoading a false');
          setIsLoading(false);
        }
      } else {
        // En entorno de pruebas o cuando se usa el servicio mock, establecer isLoading a false inmediatamente
        logger.debug('Usando servicio mock o entorno de pruebas, estableciendo isLoading a false');
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Iniciar sesión
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      logger.info('Iniciando proceso de login', { email: credentials.email });
      const response: AuthResponse = await authService.login(credentials);
      setUser({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        age: response.user.age,
        diabetesType: response.user.diabetesType,
      });
      toastSuccess('¡Bienvenido! Inicio de sesión exitoso');
      logger.info('Login completado exitosamente', { userId: response.user.id, email: response.user.email });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      logger.error('Error en login', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        email: credentials.email 
      });
      toastError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Registrar nuevo usuario
   */
  const register = useCallback(async (data: RegisterData) => {
    try {
      setIsLoading(true);
      logger.info('Iniciando proceso de registro', { email: data.email });
      // Register the user
      await authService.register(data);
      toastSuccess('¡Cuenta creada exitosamente!');
      
      // Auto-login after registration as per project requirements
      // Use the same credentials to login
      const loginCredentials: LoginCredentials = {
        email: data.email,
        password: data.password
      };
      
      // Perform login
      const response: AuthResponse = await authService.login(loginCredentials);
      setUser({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        age: response.user.age,
        diabetesType: response.user.diabetesType,
      });
      
      // Redirect to home screen after auto-login
      window.location.href = '/home';
      logger.info('Registro y login automático completados exitosamente', { userId: response.user.id, email: response.user.email });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      logger.error('Error en registro', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        email: data.email 
      });
      toastError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Cerrar sesión
   */
  const logout = useCallback(() => {
    logger.info('Cerrando sesión de usuario');
    authService.logout();
    setUser(null);
    // Redirigir a la página de login
    window.location.href = '/login';
  }, []);

  /**
   * Refrescar información del usuario actual
   */
  const refreshUser = useCallback(async () => {
    try {
      logger.debug('Refrescando información del usuario');
      const currentUser = await authService.getCurrentUser();
      setUser({
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        age: currentUser.age,
        diabetesType: currentUser.diabetesType,
      });
      logger.debug('Información del usuario refrescada exitosamente');
    } catch (error) {
      logger.error('Error al refrescar usuario:', error);
      setUser(null);
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;