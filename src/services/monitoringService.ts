import logger from '../utils/logger';

// Tipos para métricas del frontend
interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

interface UserAction {
  action: string;
  component: string;
  timestamp: number;
}

interface ErrorLog {
  error: string;
  stack?: string;
  context?: string;
  timestamp: number;
}

class MonitoringService {
  private performanceMetrics: PerformanceMetric[] = [];
  private userActions: UserAction[] = [];
  private errorLogs: ErrorLog[] = [];

  // Registrar métricas de rendimiento
  public recordPerformanceMetric(name: string, value: number): void {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now()
    };
    
    this.performanceMetrics.push(metric);
    
    // Mantener solo las últimas 100 métricas
    if (this.performanceMetrics.length > 100) {
      this.performanceMetrics.shift();
    }
    
    logger.debug('Métrica de rendimiento registrada', { name, value });
  }

  // Registrar acciones del usuario
  public recordUserAction(action: string, component: string): void {
    const userAction: UserAction = {
      action,
      component,
      timestamp: Date.now()
    };
    
    this.userActions.push(userAction);
    
    // Mantener solo las últimas 100 acciones
    if (this.userActions.length > 100) {
      this.userActions.shift();
    }
    
    logger.debug('Acción de usuario registrada', { action, component });
  }

  // Registrar errores
  public recordError(error: Error, context?: string): void {
    const errorLog: ErrorLog = {
      error: error.message,
      stack: error.stack,
      context,
      timestamp: Date.now()
    };
    
    this.errorLogs.push(errorLog);
    
    // Mantener solo los últimos 50 errores
    if (this.errorLogs.length > 50) {
      this.errorLogs.shift();
    }
    
    logger.error('Error registrado', { 
      message: error.message,
      context,
      stack: error.stack
    });
  }

  // Medir el tiempo de carga de una página
  public measurePageLoad(pageName: string): void {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      this.recordPerformanceMetric(`${pageName}_load_time`, navigation.loadEventEnd - navigation.loadEventStart);
      this.recordPerformanceMetric(`${pageName}_dom_content_loaded`, navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
    }
  }

  // Medir el tiempo de respuesta de una API
  public async measureApiCall<T>(apiCall: () => Promise<T>, endpoint: string): Promise<T> {
    const startTime = performance.now();
    
    try {
      const result = await apiCall();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      this.recordPerformanceMetric(`${endpoint}_response_time`, duration);
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      this.recordPerformanceMetric(`${endpoint}_response_time`, duration);
      if (error instanceof Error) {
        this.recordError(error, `API call to ${endpoint}`);
      }
      
      throw error;
    }
  }

  // Obtener métricas de rendimiento
  public getPerformanceMetrics(): PerformanceMetric[] {
    return [...this.performanceMetrics];
  }

  // Obtener acciones del usuario
  public getUserActions(): UserAction[] {
    return [...this.userActions];
  }

  // Obtener logs de errores
  public getErrorLogs(): ErrorLog[] {
    return [...this.errorLogs];
  }

  // Enviar métricas al backend (simulado)
  public async sendMetricsToBackend(): Promise<void> {
    try {
      // En un entorno real, enviaríamos las métricas a un endpoint del backend
      logger.debug('Métricas enviadas al backend', {
        performanceMetrics: this.performanceMetrics.length,
        userActions: this.userActions.length,
        errorLogs: this.errorLogs.length
      });
      
      // Limpiar métricas después de enviarlas
      this.performanceMetrics = [];
      this.userActions = [];
      this.errorLogs = [];
    } catch (error) {
      if (error instanceof Error) {
        logger.error('Error al enviar métricas al backend', error);
      }
    }
  }

  // Inicializar monitoreo
  public initialize(): void {
    logger.info('Servicio de monitoreo inicializado');
    
    // Enviar métricas periódicamente
    setInterval(() => {
      this.sendMetricsToBackend();
    }, 30000); // Cada 30 segundos
  }
}

// Crear una instancia única del servicio
const monitoringService = new MonitoringService();

export default monitoringService;