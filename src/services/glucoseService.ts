import apiClient from './api';
import type { GlucoseReading, GlucoseStatistics } from '../types/glucose';

export const glucoseService = {
  /**
   * Crear un nuevo registro de glucosa
   */
  async createReading(reading: Omit<GlucoseReading, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<GlucoseReading> {
    try {
      const response = await apiClient.post('/glucose', reading);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error creating glucose reading:', error);
      throw error;
    }
  },

  /**
   * Obtener registros de glucosa
   */
  async getReadings(params?: { 
    startDate?: string; 
    endDate?: string; 
    limit?: number 
  }): Promise<GlucoseReading[]> {
    try {
      const response = await apiClient.get('/glucose', { params });
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching glucose readings:', error);
      throw error;
    }
  },

  /**
   * Obtener un registro de glucosa por ID
   */
  async getReadingById(id: string): Promise<GlucoseReading> {
    try {
      const response = await apiClient.get(`/glucose/${id}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching glucose reading:', error);
      throw error;
    }
  },

  /**
   * Actualizar un registro de glucosa
   */
  async updateReading(id: string, reading: Partial<GlucoseReading>): Promise<GlucoseReading> {
    try {
      const response = await apiClient.put(`/glucose/${id}`, reading);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error updating glucose reading:', error);
      throw error;
    }
  },

  /**
   * Eliminar un registro de glucosa
   */
  async deleteReading(id: string): Promise<void> {
    try {
      await apiClient.delete(`/glucose/${id}`);
    } catch (error) {
      console.error('Error deleting glucose reading:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas de glucosa
   */
  async getStatistics(days?: number): Promise<GlucoseStatistics> {
    try {
      const params = days ? { days } : {};
      const response = await apiClient.get('/glucose/statistics', { params });
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching glucose statistics:', error);
      throw error;
    }
  }
};