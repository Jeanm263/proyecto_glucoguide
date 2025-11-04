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
      // Manejar diferentes estructuras de respuesta
      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (response.data.data) {
        return response.data.data;
      }
      if (response.data.foods) {
        return response.data.foods;
      }
      return [];
    } catch (error) {
      console.error('Error fetching foods:', error);
      // Devolver un array vacío en caso de error para evitar romper la UI
      return [];
    }
  },

  /**
   * Buscar alimentos por nombre
   */
  async searchFoods(query: string): Promise<FoodItem[]> {
    try {
      const response = await apiClient.get('/foods', {
        params: { search: query }
      });
      // Manejar diferentes estructuras de respuesta
      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (response.data.data) {
        return response.data.data;
      }
      if (response.data.foods) {
        return response.data.foods;
      }
      return [];
    } catch (error) {
      console.error('Error searching foods:', error);
      // Devolver un array vacío en caso de error para evitar romper la UI
      return [];
    }
  },

  /**
   * Obtener un alimento por ID
   */
  async getFoodById(id: string): Promise<FoodItem | null> {
    try {
      const response = await apiClient.get(`/foods/${id}`);
      // Manejar diferentes estructuras de respuesta
      if (response.data) {
        if (response.data.data) {
          return response.data.data;
        }
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching food:', error);
      // Devolver null en caso de error
      return null;
    }
  },
};