export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'medication' | 'meal' | 'education' | 'security' | 'tip' | 'alert';
  priority: 'low' | 'medium' | 'high';
  scheduledAt: string;
  sentAt?: string;
  readAt?: string;
  isRead: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

import apiClient from './api';

export const notificationService = {
  /**
   * Obtener todas las notificaciones
   */
  async getAllNotifications(params?: { 
    userId?: string; 
    isRead?: boolean;
    type?: string;
    limit?: number;
    skip?: number;
  }): Promise<{ 
    data: Notification[]; 
    count: number; 
    total: number 
  }> {
    try {
      const response = await apiClient.get('/notifications', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  /**
   * Obtener una notificación por ID
   */
  async getNotificationById(id: string): Promise<Notification> {
    try {
      const response = await apiClient.get(`/notifications/${id}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching notification:', error);
      throw error;
    }
  },

  /**
   * Crear una nueva notificación
   */
  async createNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>): Promise<Notification> {
    try {
      const response = await apiClient.post('/notifications', notification);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  /**
   * Actualizar una notificación
   */
  async updateNotification(id: string, notification: Partial<Notification>): Promise<Notification> {
    try {
      const response = await apiClient.put(`/notifications/${id}`, notification);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error updating notification:', error);
      throw error;
    }
  },

  /**
   * Eliminar una notificación
   */
  async deleteNotification(id: string): Promise<void> {
    try {
      await apiClient.delete(`/notifications/${id}`);
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },

  /**
   * Marcar notificación como leída
   */
  async markAsRead(id: string): Promise<Notification> {
    try {
      const response = await apiClient.patch(`/notifications/${id}/read`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  /**
   * Marcar notificación como no leída
   */
  async markAsUnread(id: string): Promise<Notification> {
    try {
      const response = await apiClient.patch(`/notifications/${id}/unread`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error marking notification as unread:', error);
      throw error;
    }
  },

  /**
   * Obtener notificaciones no leídas
   */
  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    try {
      const response = await apiClient.get('/notifications/unread', { 
        params: { userId } 
      });
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching unread notifications:', error);
      throw error;
    }
  },

  /**
   * Marcar todas las notificaciones como leídas
   */
  async markAllAsRead(userId: string): Promise<{ message: string }> {
    try {
      const response = await apiClient.patch('/notifications/read-all', { userId });
      return response.data;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }
};