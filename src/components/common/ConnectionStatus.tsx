import React, { useState, useEffect } from 'react';
import apiClient from '../../services/api';

// Definir tipo para errores de Axios
interface AxiosError {
  response?: {
    status: number;
    data?: unknown;
  };
  code?: string;
  message: string;
}

export const ConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [connectionDetails, setConnectionDetails] = useState<{
    status: number | null;
    message: string;
    timestamp: string;
  }>({
    status: null,
    message: '',
    timestamp: ''
  });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await apiClient.get('/health');
        setIsConnected(response.status === 200);
        setConnectionDetails({
          status: response.status,
          message: 'Conexión exitosa',
          timestamp: new Date().toLocaleTimeString()
        });
      } catch (error: unknown) {
        console.error('Error al verificar conexión:', error);
        setIsConnected(false);
        
        // Obtener detalles del error
        let errorMessage = 'Error de conexión desconocido';
        let status = null;
        
        if (error && typeof error === 'object' && 'message' in error) {
          const axiosError = error as AxiosError;
          
          // Verificar si es un error de red
          if (axiosError.code === 'ENOTFOUND') {
            errorMessage = 'No se puede encontrar el servidor. Verifica la URL del API.';
          } else if (axiosError.code === 'ECONNABORTED') {
            errorMessage = 'Tiempo de conexión agotado. El servidor puede estar sobrecargado.';
          } else if (axiosError.response) {
            // Error con respuesta del servidor
            status = axiosError.response.status;
            if (status === 404) {
              errorMessage = 'Endpoint no encontrado en el servidor.';
            } else if (status === 500) {
              errorMessage = 'Error interno del servidor.';
            } else {
              errorMessage = `Error del servidor: ${status}`;
            }
          } else {
            errorMessage = axiosError.message || 'Error de conexión';
          }
        }
        
        setConnectionDetails({
          status,
          message: errorMessage,
          timestamp: new Date().toLocaleTimeString()
        });
      }
    };

    // Verificar conexión inmediatamente
    checkConnection();
    
    // Verificar conexión cada 30 segundos
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isConnected === null) {
    return null; // No mostrar nada mientras se verifica la conexión
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: isConnected ? '#51cf66' : '#ff6b6b',
      color: 'white',
      padding: '8px 16px',
      textAlign: 'center',
      fontSize: '14px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>{isConnected ? '✅' : '❌'}</span>
        <span>
          {isConnected ? 'Conectado al servidor' : 'Sin conexión al servidor'}
        </span>
      </div>
      <button 
        onClick={() => setShowDetails(!showDetails)}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        {showDetails ? '▲' : '▼'}
      </button>
      
      {showDetails && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: isConnected ? '#40c057' : '#f03e3e',
          padding: '12px 16px',
          fontSize: '12px',
          textAlign: 'left'
        }}>
          <p><strong>Estado:</strong> {isConnected ? 'Conectado' : 'Desconectado'}</p>
          <p><strong>URL del API:</strong> {apiClient.defaults.baseURL}</p>
          <p><strong>Última verificación:</strong> {connectionDetails.timestamp}</p>
          {connectionDetails.status && (
            <p><strong>Código de estado:</strong> {connectionDetails.status}</p>
          )}
          <p><strong>Detalles:</strong> {connectionDetails.message}</p>
          {!isConnected && (
            <div style={{ marginTop: '8px' }}>
              <p><strong>Soluciones posibles:</strong></p>
              <ul style={{ paddingLeft: '16px', margin: '4px 0' }}>
                <li>Verifica tu conexión a internet</li>
                <li>Asegúrate de que el servidor esté en funcionamiento</li>
                <li>Verifica que la URL del API sea correcta</li>
                <li>Reinicia la aplicación</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};