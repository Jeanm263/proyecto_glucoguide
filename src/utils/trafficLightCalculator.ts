import type { FoodItem } from '../types/food';

/**
 * Calcula el semáforo nutricional basado en múltiples factores
 * @param food - Alimento a evaluar
 * @returns Color del semáforo: 'green', 'yellow' o 'red'
 */
export const calculateTrafficLight = (food: FoodItem): 'green' | 'yellow' | 'red' => {
  let score = 0;

  // Índice Glucémico (0-3 puntos)
  if (food.glycemicIndex < 55) score += 3;
  else if (food.glycemicIndex < 70) score += 1;

  // Fibra (0-2 puntos)
  if (food.fiber >= 5) score += 2;
  else if (food.fiber >= 3) score += 1;

  // Carbohidratos (0-2 puntos)
  if (food.carbohydrates < 10) score += 2;
  else if (food.carbohydrates < 20) score += 1;

  // Azúcares (0 a -2 puntos)
  if (food.sugars > 15) score -= 2;
  else if (food.sugars > 10) score -= 1;

  return score >= 5 ? 'green' : score >= 2 ? 'yellow' : 'red';
};

/**
 * Obtiene el color hexadecimal para el semáforo
 */
export const getTrafficLightColor = (color: 'green' | 'yellow' | 'red'): string => {
  const colors = {
    green: '#4CAF50',
    yellow: '#FFC107',
    red: '#F44336'
  };
  return colors[color];
};

/**
 * Obtiene el texto explicativo para el semáforo
 */
export const getTrafficLightText = (color: 'green' | 'yellow' | 'red'): string => {
  const texts = {
    green: 'Excelente elección',
    yellow: 'Consumir con moderación',
    red: 'Consumir ocasionalmente'
  };
  return texts[color];
};

