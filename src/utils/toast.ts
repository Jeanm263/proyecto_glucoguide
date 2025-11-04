import toast from 'react-hot-toast';

/**
 * Utilidades para mostrar notificaciones toast
 */

export const toastError = (message: string) => {
  return toast.error(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#fee',
      color: '#c33',
      border: '1px solid #fcc',
      borderRadius: '12px',
      padding: '12px 16px',
    },
  });
};

export const toastSuccess = (message: string) => {
  return toast.success(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#efe',
      color: '#3c3',
      border: '1px solid #cfc',
      borderRadius: '12px',
      padding: '12px 16px',
    },
  });
};

export const toastInfo = (message: string) => {
  return toast(message, {
    duration: 3000,
    position: 'top-right',
    icon: 'ℹ️',
    style: {
      background: '#eef',
      color: '#33c',
      border: '1px solid #ccf',
      borderRadius: '12px',
      padding: '12px 16px',
    },
  });
};

export const toastLoading = (message: string) => {
  return toast.loading(message, {
    position: 'top-right',
    style: {
      background: '#fff',
      color: '#667eea',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '12px 16px',
    },
  });
};

/**
 * Obtener mensaje de error amigable desde un error de API
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    // Error de red o sin conexión
    if (error.message.includes('Network Error') || error.message.includes('timeout')) {
      return 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
    }
    
    // Error genérico
    return error.message || 'Ha ocurrido un error inesperado';
  }
  
  // Error de axios con respuesta
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const axiosError = error as { response: { data?: { message?: string; error?: { message?: string } } } };
    const data = axiosError.response?.data;
    
    // Intentar obtener mensaje del servidor
    if (data?.message) {
      return data.message;
    }
    if (data?.error?.message) {
      return data.error.message;
    }
    
    // Mensaje según código de estado
    const status = (axiosError.response as { status?: number })?.status;
    switch (status) {
      case 400:
        return 'Solicitud inválida';
      case 401:
        return 'Credenciales inválidas';
      case 403:
        return 'No tienes permiso para realizar esta acción';
      case 404:
        return 'Recurso no encontrado';
      case 422:
        return 'Los datos proporcionados no son válidos';
      case 500:
        return 'Error del servidor. Por favor intenta más tarde';
      case 502:
      case 503:
        return 'El servidor no está disponible. Por favor intenta más tarde';
      default:
        return 'Error en la comunicación con el servidor';
    }
  }
  
  return 'Ha ocurrido un error inesperado';
};

