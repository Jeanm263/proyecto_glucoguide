export interface FoodItem {
  id: string;
  name: string;
  category: string;
  glycemicIndex: number;
  carbohydrates: number;
  fiber: number;
  sugars: number;
  portion: string;
  trafficLight: 'green' | 'yellow' | 'red';
  barcodes?: string[];
  commonNames: string[];
}

export interface FoodSearchFilters {
  category?: string;
  trafficLight?: 'green' | 'yellow' | 'red';
  glycemicIndexMin?: number;
  glycemicIndexMax?: number;
}

