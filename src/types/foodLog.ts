import type { FoodItem } from './food';

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