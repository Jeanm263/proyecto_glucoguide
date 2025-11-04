import apiClient from './api';
import type { FoodItem } from '../types/food';

export interface MealPlanFood {
  foodId?: string;
  food: Partial<FoodItem>;
  portion: string;
  notes: string;
}

export interface MealPlanMeal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: MealPlanFood[];
}

export interface MealPlanDay {
  day: string;
  meals: MealPlanMeal[];
}

export interface MealPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  meals: MealPlanDay[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingList {
  food: Partial<FoodItem>;
  portions: string[];
  totalPortions: number;
}

export const mealPlanService = {
  /**
   * Obtener todos los planes de comidas
   */
  async getAllMealPlans(params?: { 
    userId?: string; 
    active?: boolean;
  }): Promise<MealPlan[]> {
    try {
      const response = await apiClient.get('/meal-plans', { params });
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      throw error;
    }
  },

  /**
   * Obtener un plan de comidas por ID
   */
  async getMealPlanById(id: string): Promise<MealPlan> {
    try {
      const response = await apiClient.get(`/meal-plans/${id}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      throw error;
    }
  },

  /**
   * Crear un nuevo plan de comidas
   */
  async createMealPlan(mealPlan: Omit<MealPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<MealPlan> {
    try {
      const response = await apiClient.post('/meal-plans', mealPlan);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error creating meal plan:', error);
      throw error;
    }
  },

  /**
   * Actualizar un plan de comidas
   */
  async updateMealPlan(id: string, mealPlan: Partial<MealPlan>): Promise<MealPlan> {
    try {
      const response = await apiClient.put(`/meal-plans/${id}`, mealPlan);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error updating meal plan:', error);
      throw error;
    }
  },

  /**
   * Eliminar un plan de comidas
   */
  async deleteMealPlan(id: string): Promise<void> {
    try {
      await apiClient.delete(`/meal-plans/${id}`);
    } catch (error) {
      console.error('Error deleting meal plan:', error);
      throw error;
    }
  },

  /**
   * Generar lista de compras basada en el plan de comidas
   */
  async generateShoppingList(id: string): Promise<{ 
    mealPlan: string; 
    shoppingList: ShoppingList[] 
  }> {
    try {
      const response = await apiClient.get(`/meal-plans/${id}/shopping-list`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error generating shopping list:', error);
      throw error;
    }
  }
};