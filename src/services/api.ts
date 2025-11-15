import axios from 'axios';
import { API_URL } from '../config/env';

// Configuración base de la API
// Usa la URL validada desde el config
const API_BASE_URL = API_URL;

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // Aumentado de 10000 a 30000 ms (30 segundos)
  withCredentials: true, // Importante para manejar cookies
});

// Interceptor para agregar token de autenticación si existe
// No es necesario ya que usamos cookies para la autenticación
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores globales
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar diferentes tipos de errores
    if (error.response) {
      // El servidor respondió con un código de error
      const status = error.response.status;
      
      switch (status) {
        case 401:
          // No autorizado - sesión expirada
          localStorage.removeItem('authToken');
          // No redirigir automáticamente para evitar bucles
          // La redirección se manejará en el contexto de autenticación
          break;
        case 403:
          // Prohibido
          console.error('Acceso prohibido:', error.response.data);
          break;
        case 404:
          // No encontrado
          console.error('Recurso no encontrado:', error.response.data);
          break;
        case 422:
          // Validación fallida
          console.error('Error de validación:', error.response.data);
          break;
        case 500:
        case 502:
        case 503:
          // Error del servidor
          console.error('Error del servidor:', error.response.data);
          break;
        default:
          console.error('Error en la respuesta:', error.response.data);
      }
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      console.error('Sin respuesta del servidor. Verifica tu conexión a internet.');
    } else {
      // Algo pasó al configurar la petición
      console.error('Error al configurar la petición:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;

