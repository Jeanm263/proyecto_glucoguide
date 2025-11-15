import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.glucosaguide.app',
  appName: 'GlucosaGuide',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    hostname: 'glucosa-app-backend.onrender.com',
    cleartext: false
  },
  android: {
    buildOptions: {
      releaseType: 'AAB'
    }
  }
};

export default config;