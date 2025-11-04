import type { FoodItem } from './food';

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