import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { profileService } from '../services/profileService';
import { foodService } from '../services/foodService';
import type { FoodItem } from '../types/food';
import { toastError } from '../utils/toast';

interface FavoritesContextType {
  favoriteFoods: FoodItem[];
  favoriteIds: string[];
  isLoading: boolean;
  addFavorite: (foodId: string) => Promise<void>;
  removeFavorite: (foodId: string) => Promise<void>;
  isFavorite: (foodId: string) => boolean;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favoriteFoods, setFavoriteFoods] = useState<FoodItem[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Cargar alimentos favoritos al montar el componente
   */
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      // Obtener IDs de alimentos favoritos
      const ids = await profileService.getFavoriteFoods();
      setFavoriteIds(ids);
      
      // Obtener detalles de los alimentos favoritos
      if (ids.length > 0) {
        const foodsData = await Promise.all(
          ids.map(id => foodService.getFoodById(id))
        );
        // Filtrar alimentos que no sean null
        const foods = foodsData.filter((food): food is FoodItem => food !== null);
        setFavoriteFoods(foods);
      } else {
        setFavoriteFoods([]);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      toastError('Error al cargar alimentos favoritos');
      setFavoriteFoods([]);
      setFavoriteIds([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addFavorite = useCallback(async (foodId: string) => {
    try {
      await profileService.addFavoriteFood(foodId);
      setFavoriteIds(prev => [...prev, foodId]);
      
      // Obtener el alimento completo y añadirlo a la lista
      const food = await foodService.getFoodById(foodId);
      if (food) {
        setFavoriteFoods(prev => [...prev, food]);
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
      toastError('Error al agregar alimento a favoritos');
      throw error;
    }
  }, []);

  const removeFavorite = useCallback(async (foodId: string) => {
    try {
      await profileService.removeFavoriteFood(foodId);
      setFavoriteIds(prev => prev.filter(id => id !== foodId));
      setFavoriteFoods(prev => prev.filter(food => food.id !== foodId));
    } catch (error) {
      console.error('Error removing favorite:', error);
      toastError('Error al eliminar alimento de favoritos');
      throw error;
    }
  }, []);

  const isFavorite = useCallback((foodId: string) => {
    return favoriteIds.includes(foodId);
  }, [favoriteIds]);

  const refreshFavorites = useCallback(async () => {
    await loadFavorites();
  }, [loadFavorites]);

  const value: FavoritesContextType = {
    favoriteFoods,
    favoriteIds,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
    refreshFavorites
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export default FavoritesContext;