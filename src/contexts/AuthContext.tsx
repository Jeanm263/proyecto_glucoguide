import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService, type AuthResponse, type LoginCredentials, type RegisterData, type User } from '../services/authService';
import { USE_MOCK_SERVICE } from '../config/env';
import { toastError, toastSuccess, getErrorMessage } from '../utils/toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook para usar el contexto de autenticación
 * @throws Error si se usa fuera de AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

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
          const isAuthenticated = await authService.isAuthenticated();
          if (isAuthenticated) {
            const currentUser = await authService.getCurrentUser();
            setUser({
              id: currentUser.id,
              name: currentUser.name,
              email: currentUser.email,
              age: currentUser.age,
              diabetesType: currentUser.diabetesType,
            });
          }
        } catch (error) {
          // Si no hay sesión activa, el error es esperado
          console.log('No hay sesión activa');
          // Silenciar el error ya que es esperado cuando no hay sesión activa
          console.error(error);
        } finally {
          // Siempre establecer isLoading a false después de verificar la autenticación
          setIsLoading(false);
        }
      } else {
        // En entorno de pruebas o cuando se usa el servicio mock, establecer isLoading a false inmediatamente
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
      const response: AuthResponse = await authService.login(credentials);
      setUser({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        age: response.user.age,
        diabetesType: response.user.diabetesType,
      });
      toastSuccess('¡Bienvenido! Inicio de sesión exitoso');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
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
      await authService.register(data);
      toastSuccess('¡Cuenta creada exitosamente! Por favor inicia sesión.');
      // Redirect to login after registration
      window.location.href = '/login';
    } catch (error) {
      const errorMessage = getErrorMessage(error);
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
      const currentUser = await authService.getCurrentUser();
      setUser({
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        age: currentUser.age,
        diabetesType: currentUser.diabetesType,
      });
    } catch (error) {
      console.error('Error al refrescar usuario:', error);
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