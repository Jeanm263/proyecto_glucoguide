import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.glucosaguide.app',
  appName: 'GlucosaGuide',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    hostname: 'localhost',
    cleartext: false
  },
  android: {
    buildOptions: {
      releaseType: 'AAB'
    }
  }
};

export default config;