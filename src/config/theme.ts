// Configuración del tema futurista para la aplicación
export const futuristicTheme = {
  // Colores principales
  colors: {
    primary: '#00f0ff',
    primaryDark: '#00d0e0',
    primaryLight: '#20ffff',
    secondary: '#ff00ff',
    secondaryDark: '#d000d0',
    secondaryLight: '#ff20ff',
    accent: '#00ff88',
    background: '#0a0a1a',
    surface: '#121224',
    surfaceLight: '#1a1a30',
    error: '#ff4040',
    warning: '#ffaa00',
    success: '#00ff88',
    text: {
      primary: '#ffffff',
      secondary: '#e0e0ff',
      tertiary: '#a0a0c0',
      disabled: '#606080'
    },
    border: '#2a2a4a',
    divider: '#3a3a5a'
  },
  
  // Colores para modo oscuro
  dark: {
    background: '#0a0a1a',
    surface: '#121224',
    surfaceLight: '#1a1a30',
    text: {
      primary: '#ffffff',
      secondary: '#e0e0ff',
      tertiary: '#a0a0c0',
      disabled: '#606080'
    },
    border: '#2a2a4a',
    divider: '#3a3a5a'
  },
  
  // Colores para modo claro
  light: {
    background: '#f8f9fa',
    surface: '#ffffff',
    surfaceLight: '#f8f9fa',
    text: {
      primary: '#212121',
      secondary: '#616161',
      tertiary: '#9e9e9e',
      disabled: '#bdbdbd'
    },
    border: '#e0e0e0',
    divider: '#f5f5f5'
  },
  
  // Tipografía
  typography: {
    fontFamily: {
      primary: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      heading: "'Orbitron', 'Space Grotesk', sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace"
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem'
    },
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    }
  },
  
  // Espaciado
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem'
  },
  
  // Radio de bordes
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px'
  },
  
  // Sombras
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.06)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
    none: 'none',
    neo: {
      light: '8px 8px 16px rgba(0, 0, 0, 0.25), -8px -8px 16px rgba(255, 255, 255, 0.05)',
      dark: '8px 8px 16px rgba(0, 0, 0, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.05)',
      inner: 'inset 4px 4px 8px rgba(0, 0, 0, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.05)',
      floating: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)'
    }
  },
  
  // Transiciones
  transitions: {
    default: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    fast: 'all 0.15s cubic-bezier(0.25, 0.8, 0.25, 1)',
    slow: 'all 0.45s cubic-bezier(0.25, 0.8, 0.25, 1)',
    spring: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    bounce: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  
  // Animaciones
  animations: {
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    bounce: 'bounce 1s infinite',
    float: 'float 3s ease-in-out infinite',
    glow: 'glow 2s ease-in-out infinite alternate',
    slideIn: 'slideIn 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    slideOut: 'slideOut 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    fadeIn: 'fadeIn 0.3s ease-out',
    fadeOut: 'fadeOut 0.3s ease-out'
  }
};

export type FuturisticTheme = typeof futuristicTheme;