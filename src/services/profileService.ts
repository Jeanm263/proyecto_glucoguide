import apiClient from './api';

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
    try {
      const response = await apiClient.get('/profile/profile');
      return response.data.user;
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  },

  /**
   * Actualizar perfil de usuario
   */
  async updateProfile(data: UpdateProfileData): Promise<UserProfile> {
    try {
      const response = await apiClient.put('/profile/profile', data);
      return response.data.user;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  /**
   * Obtener alimentos favoritos
   */
  async getFavoriteFoods(): Promise<string[]> {
    try {
      const response = await apiClient.get('/profile/favorites');
      return response.data.favoriteFoods || [];
    } catch (error) {
      console.error('Error getting favorite foods:', error);
      throw error;
    }
  },

  /**
   * Agregar alimento a favoritos
   */
  async addFavoriteFood(foodId: string): Promise<string[]> {
    try {
      const response = await apiClient.post('/profile/favorites', { foodId });
      return response.data.favoriteFoods;
    } catch (error) {
      console.error('Error adding favorite food:', error);
      throw error;
    }
  },

  /**
   * Eliminar alimento de favoritos
   */
  async removeFavoriteFood(foodId: string): Promise<string[]> {
    try {
      const response = await apiClient.delete('/profile/favorites', { data: { foodId } });
      return response.data.favoriteFoods;
    } catch (error) {
      console.error('Error removing favorite food:', error);
      throw error;
    }
  },

  /**
   * Actualizar configuración de notificaciones
   */
  async updateNotificationSettings(settings: NotificationSettings): Promise<NotificationSettings> {
    try {
      const response = await apiClient.put('/profile/notifications', settings);
      return response.data.notificationSettings;
    } catch (error) {
      console.error('Error updating notification settings:', error);
      throw error;
    }
  }
};