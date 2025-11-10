import apiClient from './api';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age?: number;
  diabetesType?: string;
  preferences?: {
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