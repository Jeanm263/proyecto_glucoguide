import apiClient from './api';
import type { FoodItem } from '../types/food';

export const foodService = {
  /**
   * Obtener todos los alimentos
   */
  async getAllFoods(): Promise<FoodItem[]> {
    try {
      const response = await apiClient.get('/foods');
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching foods:', error);
      throw error;
    }
  },

  /**
   * Buscar alimentos por nombre o categoría
   */
  async searchFoods(query?: string, category?: string): Promise<FoodItem[]> {
    try {
      const params: Record<string, string> = {};
      if (query) params.query = query;
      if (category) params.category = category;
      
      const response = await apiClient.get('/foods/search', { params });
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error searching foods:', error);
      throw error;
    }
  },

  /**
   * Obtener un alimento por ID
   */
  async getFoodById(id: string): Promise<FoodItem> {
    try {
      const response = await apiClient.get(`/foods/${id}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching food:', error);
      throw error;
    }
  },

  /**
   * Crear un nuevo alimento
   */
  async createFood(food: Omit<FoodItem, 'id'>): Promise<FoodItem> {
    try {
      const response = await apiClient.post('/foods', food);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error creating food:', error);
      throw error;
    }
  },

  /**
   * Actualizar un alimento
   */
  async updateFood(id: string, food: Partial<FoodItem>): Promise<FoodItem> {
    try {
      const response = await apiClient.put(`/foods/${id}`, food);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error updating food:', error);
      throw error;
    }
  },

  /**
   * Eliminar un alimento
   */
  async deleteFood(id: string): Promise<void> {
    try {
      await apiClient.delete(`/foods/${id}`);
    } catch (error) {
      console.error('Error deleting food:', error);
      throw error;
    }
  },

  /**
   * Obtener categorías de alimentos
   */
  async getFoodCategories(): Promise<string[]> {
    try {
      const response = await apiClient.get('/foods/categories');
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching food categories:', error);
      throw error;
    }
  }
};