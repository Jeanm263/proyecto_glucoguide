/**
 * Utilidad para transformar datos entre el formato del backend y el frontend
 */

/**
 * Transforma un objeto del backend al formato esperado por el frontend
 * @param item - Objeto del backend (puede tener _id en lugar de id)
 * @returns Objeto con el formato esperado por el frontend
 */
export const transformBackendData = <T extends Record<string, unknown>>(item: T): T => {
  // Si el item ya tiene id, devolverlo tal cual
  if (item.id) {
    return item;
  }
  
  // Si tiene _id, transformarlo a id
  if (item._id) {
    return {
      ...item,
      id: item._id,
    };
  }
  
  // Si no tiene ninguno, devolver el item tal cual
  return item;
};

/**
 * Transforma un array de objetos del backend al formato esperado por el frontend
 * @param items - Array de objetos del backend
 * @returns Array de objetos con el formato esperado por el frontend
 */
export const transformBackendDataArray = <T extends Record<string, unknown>>(items: T[]): T[] => {
  return items.map(transformBackendData);
};