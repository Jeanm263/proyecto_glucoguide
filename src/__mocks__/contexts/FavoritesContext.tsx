import React from 'react';
import type { FoodItem } from '../../types/food';

interface FavoritesContextType {
  favoriteFoods: FoodItem[];
  favoriteIds: string[];
  isLoading: boolean;
  addFavorite: (foodId: string) => Promise<void>;
  removeFavorite: (foodId: string) => Promise<void>;
  isFavorite: (foodId: string) => boolean;
  refreshFavorites: () => Promise<void>;
}

// Datos de prueba para alimentos favoritos
const mockFavoriteFoods: FoodItem[] = [
  {
    id: '1',
    name: 'Manzana',
    category: 'Frutas',
    glycemicIndex: 38,
    carbohydrates: 14,
    fiber: 2.4,
    sugars: 10,
    portion: '100g',
    trafficLight: 'green',
    commonNames: ['Apple']
  },
  {
    id: '2',
    name: 'Arroz blanco',
    category: 'Cereales',
    glycemicIndex: 73,
    carbohydrates: 28,
    fiber: 0.4,
    sugars: 0.1,
    portion: '100g',
    trafficLight: 'red',
    commonNames: ['White rice']
  }
];

const mockFavoriteIds = ['1', '2'];

const useFavorites = (): FavoritesContextType => {
  return {
    favoriteFoods: mockFavoriteFoods,
    favoriteIds: mockFavoriteIds,
    isLoading: false,
    addFavorite: jest.fn().mockResolvedValue(undefined),
    removeFavorite: jest.fn().mockResolvedValue(undefined),
    isFavorite: jest.fn().mockImplementation((foodId: string) => mockFavoriteIds.includes(foodId)),
    refreshFavorites: jest.fn().mockResolvedValue(undefined)
  };
};

const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export { useFavorites, FavoritesProvider };