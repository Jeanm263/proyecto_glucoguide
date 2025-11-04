import { useState, useEffect } from 'react';

/**
 * Hook personalizado para debounce de valores
 * Útil para búsquedas y filtros que se ejecutan frecuentemente
 * 
 * @param value - El valor a debounce
 * @param delay - Tiempo de espera en milisegundos (default: 300ms)
 * @returns El valor después del delay
 * 
 * @example
 * const [searchQuery, setSearchQuery] = useState('');
 * const debouncedQuery = useDebounce(searchQuery, 300);
 * 
 * // searchQuery cambia inmediatamente cuando el usuario escribe
 * // debouncedQuery solo cambia 300ms después de que el usuario deje de escribir
 */
export const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Crear un timer que actualizará el valor después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el timer si el valor cambia antes del delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

