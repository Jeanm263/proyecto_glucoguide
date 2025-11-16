import { useState, useEffect } from 'react';
import { futuristicTheme, type FuturisticTheme } from '../config/theme';

// Tipo para el modo de tema
type ThemeMode = 'dark' | 'light';

// Tipo para el contexto del tema
interface ThemeContextType {
  theme: FuturisticTheme;
  mode: ThemeMode;
  toggleMode: () => void;
}

/**
 * Hook para manejar el tema futurista de la aplicación
 * @returns Objeto con el tema, modo actual y función para cambiar el modo
 */
export const useTheme = (): ThemeContextType => {
  // Estado para el modo de tema (oscuro o claro)
  const [mode, setMode] = useState<ThemeMode>('dark');
  
  // Efecto para cargar el modo de tema preferido del usuario
  useEffect(() => {
    // Verificar si hay una preferencia guardada en localStorage
    const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      // Si no hay preferencia guardada, usar el modo oscuro por defecto
      setMode('dark');
    }
  }, []);
  
  // Efecto para aplicar el modo de tema al DOM
  useEffect(() => {
    // Guardar la preferencia en localStorage
    localStorage.setItem('themeMode', mode);
    
    // Aplicar clases al elemento raíz
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [mode]);
  
  // Función para cambiar entre modos de tema
  const toggleMode = () => {
    setMode(prevMode => prevMode === 'dark' ? 'light' : 'dark');
  };
  
  return {
    theme: futuristicTheme,
    mode,
    toggleMode
  };
};