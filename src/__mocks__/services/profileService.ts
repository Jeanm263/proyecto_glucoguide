// Mock for profileService
import { USE_MOCK_SERVICE } from '../../config/env';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age?: number;
  diabetesType?: string;
  preferences?: {
    favoriteFoods?: string[];
    notificationSettings?: {
      medicationReminders?: boolean;
      mealReminders?: boolean;
      educationalTips?: boolean;
    };
  };
}

export interface UpdateProfileData {
  name: string;
  email: string;
  age?: number;
  diabetesType?: string;
}

export interface NotificationSettings {
  medicationReminders?: boolean;
  mealReminders?: boolean;
  educationalTips?: boolean;
}

export const profileService = {
  /**
   * Obtener perfil de usuario
   */
  async getProfile(): Promise<UserProfile> {
    if (USE_MOCK_SERVICE) {
      // Implementación mock para desarrollo
      await new Promise(resolve => setTimeout(resolve, 200));
      throw new Error('Mock service no implementado');
    }
    
    try {
      return {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        age: 30,
        diabetesType: 'type2',
        preferences: {
          favoriteFoods: ['1', '2'],
          notificationSettings: {
            medicationReminders: true,
            mealReminders: true,
            educationalTips: true
          }
        }
      };
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  },

  /**
   * Actualizar perfil de usuario
   */
  async updateProfile(data: UpdateProfileData): Promise<UserProfile> {
    if (USE_MOCK_SERVICE) {
      // Implementación mock para desarrollo
      await new Promise(resolve => setTimeout(resolve, 200));
      throw new Error('Mock service no implementado');
    }
    
    try {
      return {
        id: '1',
        name: data.name,
        email: data.email,
        age: data.age,
        diabetesType: data.diabetesType
      };
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  /**
   * Obtener alimentos favoritos
   */
  async getFavoriteFoods(): Promise<string[]> {
    // Para pruebas, retornar valores fijos
    return ['1', '2', '3'];
  },

  /**
   * Agregar alimento a favoritos
   */
  async addFavoriteFood(foodId: string): Promise<string[]> {
    // Para pruebas, retornar valores fijos
    return ['1', '2', '3', foodId];
  },

  /**
   * Eliminar alimento de favoritos
   */
  async removeFavoriteFood(_foodId: string): Promise<string[]> {
    // Para pruebas, retornar valores fijos
    // El parámetro se marca como usado para evitar el error de linter
    void _foodId;
    return ['1', '2'];
  },

  /**
   * Actualizar configuración de notificaciones
   */
  async updateNotificationSettings(settings: NotificationSettings): Promise<NotificationSettings> {
    if (USE_MOCK_SERVICE) {
      // Implementación mock para desarrollo
      await new Promise(resolve => setTimeout(resolve, 200));
      throw new Error('Mock service no implementado');
    }
    
    try {
      return settings;
    } catch (error) {
      console.error('Error updating notification settings:', error);
      throw error;
    }
  }
};