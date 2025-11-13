import log from 'loglevel';

// Configurar el nivel de logging según el entorno
// Verificar si estamos en un entorno de navegador o Node.js
const isDev = typeof process !== 'undefined' 
  ? process.env.NODE_ENV === 'development'
  : false;

if (isDev) {
  log.setLevel('debug');
} else {
  log.setLevel('warn');
}

// Añadir prefijo para identificar el origen de los logs
const prefix = '[GlucosaApp]';

const logger = {
  trace: (message: string, ...args: unknown[]) => {
    log.trace(`${prefix} ${message}`, ...args);
  },
  
  debug: (message: string, ...args: unknown[]) => {
    log.debug(`${prefix} ${message}`, ...args);
  },
  
  info: (message: string, ...args: unknown[]) => {
    log.info(`${prefix} ${message}`, ...args);
  },
  
  warn: (message: string, ...args: unknown[]) => {
    log.warn(`${prefix} ${message}`, ...args);
  },
  
  error: (message: string, ...args: unknown[]) => {
    log.error(`${prefix} ${message}`, ...args);
  }
};

export default logger;