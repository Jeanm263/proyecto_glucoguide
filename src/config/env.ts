import { z } from 'zod';

/**
 * Schema de validación para variables de entorno
 * Define qué variables son requeridas y opcionales
 */
const envSchema = z.object({
  // URL del API backend (opcional, tiene valor por defecto)
  VITE_API_URL: z.string().url().optional().default('http://localhost:4000/api'),
  
  // Determina si usar el servicio mock o el backend real
  VITE_USE_MOCK_SERVICE: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val.toLowerCase() === 'true'),
});

/**
 * Valida y parsea las variables de entorno
 * @throws Error si alguna variable requerida falta o es inválida
 */
export const validateEnv = () => {
  try {
    // En entorno de test, usar valores por defecto
    const isTestEnv = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test';
    
    if (isTestEnv) {
      return {
        VITE_API_URL: 'http://localhost:4000/api',
        VITE_USE_MOCK_SERVICE: false
      };
    }

    // En entorno de desarrollo/producción, usar valores por defecto o variables de entorno
    const env = envSchema.parse({
      VITE_API_URL: process.env.VITE_API_URL,
      VITE_USE_MOCK_SERVICE: process.env.VITE_USE_MOCK_SERVICE,
    });

    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues
        .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
        .join('\n');

      throw new Error(
        `❌ Error en variables de entorno:\n${errorMessages}\n\n` +
        `Por favor revisa tu archivo .env y asegúrate de que todas las variables requeridas estén configuradas correctamente.\n` +
        `Puedes usar el archivo env.example como referencia.`
      );
    }
    throw error;
  }
};

/**
 * Variables de entorno validadas
 * Usa esta variable en lugar de import.meta.env directamente
 */
export const env = validateEnv();

/**
 * URL del API backend
 */
export const API_URL = env.VITE_API_URL;

/**
 * Indica si se debe usar el servicio mock
 */
export const USE_MOCK_SERVICE = env.VITE_USE_MOCK_SERVICE;