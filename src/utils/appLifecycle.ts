import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

/**
 * Verifica si la aplicación se está ejecutando en un entorno móvil
 * @returns boolean indicando si es un entorno móvil
 */
export const isMobile = (): boolean => {
  return Capacitor.isNativePlatform();
};

/**
 * Inicializa los listeners del ciclo de vida de la aplicación
 * @param onResumeCallback Función a ejecutar cuando la app vuelve a estar activa
 */
export const initAppLifecycleListeners = (onResumeCallback: () => void) => {
  // Solo en entornos móviles
  if (isMobile()) {
    // Listener para cuando la app se reanuda
    App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        console.log('App ha vuelto a estar activa');
        onResumeCallback();
      }
    });
    
    // Listener para cuando la app se reanuda desde background
    App.addListener('resume', () => {
      console.log('App reanudada desde background');
      onResumeCallback();
    });
  }
};

/**
 * Limpia los listeners del ciclo de vida de la aplicación
 */
export const removeAppLifecycleListeners = () => {
  if (isMobile()) {
    App.removeAllListeners();
  }
};