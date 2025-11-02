import apiClient from './api';
import type { FoodItem, FoodSearchFilters } from '../types/food';

/**
 * Servicio para obtener alimentos desde el backend
 * TODO: Conectar con endpoints reales del backend
 */

export const foodService = {
  /**
   * Obtener todos los alimentos
   */
  async getAllFoods(filters?: FoodSearchFilters): Promise<FoodItem[]> {
    try {
      const response = await apiClient.get('/foods', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching foods:', error);
      throw error;
    }
  },

  /**
   * Buscar alimentos por nombre
   */
  async searchFoods(query: string): Promise<FoodItem[]> {
    try {
      const response = await apiClient.get('/foods/search', {
        params: { q: query }
      });
      return response.data;
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
      return response.data;
    } catch (error) {
      console.error('Error fetching food:', error);
      throw error;
    }
  },

  /**
   * Obtener alimentos por categoría
   */
  async getFoodsByCategory(category: string): Promise<FoodItem[]> {
    try {
      const response = await apiClient.get(`/foods/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching foods by category:', error);
      throw error;
    }
  },

  /**
   * Crear un nuevo alimento (admin)
   */
  async createFood(food: Omit<FoodItem, 'id'>): Promise<FoodItem> {
    try {
      const response = await apiClient.post('/foods', food);
      return response.data;
    } catch (error) {
      console.error('Error creating food:', error);
      throw error;
    }
  },

  /**
   * Actualizar un alimento (admin)
   */
  async updateFood(id: string, food: Partial<FoodItem>): Promise<FoodItem> {
    try {
      const response = await apiClient.put(`/foods/${id}`, food);
      return response.data;
    } catch (error) {
      console.error('Error updating food:', error);
      throw error;
    }
  },

  /**
   * Eliminar un alimento (admin)
   */
  async deleteFood(id: string): Promise<void> {
    try {
      await apiClient.delete(`/foods/${id}`);
    } catch (error) {
      console.error('Error deleting food:', error);
      throw error;
    }
  }
};

