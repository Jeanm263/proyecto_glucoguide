import { foodService } from '../services/foodService';
import apiClient from '../services/api';

// Mock de apiClient
jest.mock('../services/api');

describe('foodService', () => {
  const mockFood = {
    id: '123',
    name: 'Manzana',
    category: 'frutas',
    glycemicIndex: 38,
    carbohydrates: 25,
    fiber: 4,
    sugars: 19,
    portion: '1 unidad mediana (182g)',
    trafficLight: 'green'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllFoods', () => {
    it('debería obtener todos los alimentos correctamente', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [mockFood]
        }
      };

      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await foodService.getAllFoods();

      expect(apiClient.get).toHaveBeenCalledWith('/foods');
      expect(result).toEqual([mockFood]);
    });

    it('debería manejar errores al obtener alimentos', async () => {
      const errorMessage = 'Error al obtener alimentos';
      (apiClient.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(foodService.getAllFoods()).rejects.toThrow(errorMessage);
    });
  });

  describe('searchFoods', () => {
    it('debería buscar alimentos por nombre', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [mockFood]
        }
      };

      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await foodService.searchFoods('manzana');

      expect(apiClient.get).toHaveBeenCalledWith('/foods/search', { params: { query: 'manzana' } });
      expect(result).toEqual([mockFood]);
    });

    it('debería buscar alimentos por categoría', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [mockFood]
        }
      };

      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await foodService.searchFoods('', 'frutas');

      expect(apiClient.get).toHaveBeenCalledWith('/foods/search', { params: { category: 'frutas' } });
      expect(result).toEqual([mockFood]);
    });

    it('debería buscar alimentos por nombre y categoría', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [mockFood]
        }
      };

      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await foodService.searchFoods('manzana', 'frutas');

      expect(apiClient.get).toHaveBeenCalledWith('/foods/search', { params: { query: 'manzana', category: 'frutas' } });
      expect(result).toEqual([mockFood]);
    });
  });

  describe('getFoodById', () => {
    it('debería obtener un alimento por ID', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: mockFood
        }
      };

      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await foodService.getFoodById('123');

      expect(apiClient.get).toHaveBeenCalledWith('/foods/123');
      expect(result).toEqual(mockFood);
    });

    it('debería manejar errores al obtener un alimento', async () => {
      const errorMessage = 'Alimento no encontrado';
      (apiClient.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(foodService.getFoodById('123')).rejects.toThrow(errorMessage);
    });
  });

  describe('getFoodCategories', () => {
    it('debería obtener todas las categorías de alimentos', async () => {
      const mockCategories = ['frutas', 'verduras', 'cereales'];
      const mockResponse = {
        data: {
          success: true,
          data: mockCategories
        }
      };

      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await foodService.getFoodCategories();

      expect(apiClient.get).toHaveBeenCalledWith('/foods/categories');
      expect(result).toEqual(mockCategories);
    });

    it('debería manejar errores al obtener categorías', async () => {
      const errorMessage = 'Error al obtener categorías';
      (apiClient.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(foodService.getFoodCategories()).rejects.toThrow(errorMessage);
    });
  });
});