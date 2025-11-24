import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.glucoguide.app',
  appName: 'GlucosaGuide',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: [
      'glucosa-app-backend.onrender.com',
      '*.onrender.com',
      'https://glucosa-app-backend.onrender.com',
      'http://glucosa-app-backend.onrender.com',
      'localhost',
      '10.0.2.2' // Para emulador de Android
    ]
  },
  android: {
    buildOptions: {
      releaseType: 'AAB'
    }
  },
  // Añadir configuración para manejar mejor el ciclo de vida de la app
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#9c27b0",
      androidSplashResourceName: "splash",
      splashFullScreen: true,
      splashImmersive: true,
    }
  }
};

export default config;