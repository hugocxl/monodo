import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.monodo.app',
  appName: 'Monodo',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
