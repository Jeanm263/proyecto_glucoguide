import apiClient from './api';
import type { FoodItem } from '../types/food';

export interface FoodLog {
  id: string;
  userId: string;
  foodId?: string;
  food?: Partial<FoodItem>;
  portion: string;
  consumedAt: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface DailyNutritionSummary {
  date: string;
  totalLogs: number;
  nutrition: {
    carbohydrates: number;
    fiber: number;
    sugars: number;
  };
  trafficLight: {
    green: number;
    yellow: number;
    red: number;
  };
}

export const foodLogService = {
  /**
   * Obtener todos los registros de alimentos
   */
  async getAllFoodLogs(params?: { 
    userId?: string; 
    date?: string;
  }): Promise<FoodLog[]> {
    try {
      const response = await apiClient.get('/food-logs', { params });
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching food logs:', error);
      throw error;
    }
  },

  /**
   * Obtener un registro de alimento por ID
   */
  async getFoodLogById(id: string): Promise<FoodLog> {
    try {
      const response = await apiClient.get(`/food-logs/${id}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching food log:', error);
      throw error;
    }
  },

  /**
   * Crear un nuevo registro de alimento
   */
  async createFoodLog(foodLog: Omit<FoodLog, 'id' | 'createdAt' | 'updatedAt'>): Promise<FoodLog> {
    try {
      const response = await apiClient.post('/food-logs', foodLog);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error creating food log:', error);
      throw error;
    }
  },

  /**
   * Actualizar un registro de alimento
   */
  async updateFoodLog(id: string, foodLog: Partial<FoodLog>): Promise<FoodLog> {
    try {
      const response = await apiClient.put(`/food-logs/${id}`, foodLog);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error updating food log:', error);
      throw error;
    }
  },

  /**
   * Eliminar un registro de alimento
   */
  async deleteFoodLog(id: string): Promise<void> {
    try {
      await apiClient.delete(`/food-logs/${id}`);
    } catch (error) {
      console.error('Error deleting food log:', error);
      throw error;
    }
  },

  /**
   * Obtener resumen nutricional diario
   */
  async getDailyNutritionSummary(params: { 
    userId: string; 
    date: string;
  }): Promise<DailyNutritionSummary> {
    try {
      const response = await apiClient.get('/food-logs/summary', { params });
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching daily nutrition summary:', error);
      throw error;
    }
  }
};