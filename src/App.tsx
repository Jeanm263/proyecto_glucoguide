import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegisterScreen } from './screens/auth/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { GlucoseScreen } from './screens/GlucoseScreen';
import { FoodSearchScreen } from './screens/foods/FoodSearchScreen';
import { EducationScreen } from './screens/education/EducationScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { FoodTrackingScreen } from './screens/foods/FoodTrackingScreen';
import apiClient from './services/api';
import { API_URL } from './config/env';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Definir tipo para errores de Axios
interface AxiosError {
  response?: {
    status: number;
    data?: unknown;
  };
  request?: unknown;
  message: string;
}

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Verificar conexión con el backend al iniciar la aplicación
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Intentar conectar al endpoint de salud
        const response = await apiClient.get('/health');
        setIsConnected(response.status === 200);
        setConnectionError(null);
      } catch (error) {
        console.error('Error al conectar con el backend:', error);
        setIsConnected(false);
        
        // Obtener detalles del error
        let errorMessage = 'Error de conexión desconocido';
        if ((error as AxiosError).response) {
          errorMessage = `Error del servidor: ${(error as AxiosError).response?.status}`;
        } else if ((error as AxiosError).request) {
          errorMessage = 'No se recibió respuesta del servidor. Verifica tu conexión a internet.';
        } else {
          errorMessage = (error as AxiosError).message || 'Error de conexión';
        }
        
        setConnectionError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    checkConnection();
  }, []);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          maxWidth: '350px',
          width: '90%'
        }}>
          <div className="spinner" style={{
            width: '48px',
            height: '48px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #9c27b0',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 15px'
          }}></div>
          <h3 style={{ 
            color: '#333', 
            marginBottom: '10px',
            fontSize: '1.2rem',
            fontWeight: 600
          }}>
            Verificando conexión
          </h3>
          <p style={{ 
            color: '#666', 
            margin: 0,
            fontSize: '0.95rem'
          }}>
            Estableciendo conexión con el servidor...
          </p>
        </div>
      </div>
    );
  }

  if (isConnected === false) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '35px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          maxWidth: '420px',
          width: '90%'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#ff6b6b',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 25px'
          }}>
            <span style={{ color: 'white', fontSize: '28px' }}>⚠️</span>
          </div>
          <h2 style={{ 
            color: '#333', 
            marginBottom: '15px',
            fontSize: '1.4rem',
            fontWeight: 700
          }}>
            Sin conexión al servidor
          </h2>
          <p style={{ 
            color: '#666', 
            marginBottom: '25px',
            fontSize: '1rem',
            lineHeight: 1.5
          }}>
            {connectionError || 'No se puede conectar al servidor backend. Por favor verifica tu conexión a internet.'}
          </p>
          <p style={{ 
            color: '#999', 
            fontSize: '0.9rem', 
            marginBottom: '25px',
            fontStyle: 'italic'
          }}>
            URL del API: {API_URL}
          </p>
          <div style={{ 
            backgroundColor: '#fff3cd', 
            border: '1px solid #ffeaa7', 
            borderRadius: '8px', 
            padding: '18px', 
            marginBottom: '25px',
            textAlign: 'left'
          }}>
            <h3 style={{ 
              margin: '0 0 12px 0', 
              color: '#856404',
              fontSize: '1.1rem',
              fontWeight: 600
            }}>
              Soluciones posibles:
            </h3>
            <ul style={{ 
              paddingLeft: '22px', 
              margin: '0', 
              color: '#856404',
              textAlign: 'left'
            }}>
              <li style={{ marginBottom: '8px' }}>Verifica tu conexión a internet</li>
              <li style={{ marginBottom: '8px' }}>Reinicia la aplicación</li>
              <li style={{ marginBottom: '8px' }}>Asegúrate de que el servidor esté en funcionamiento</li>
              <li style={{ marginBottom: '8px' }}>Verifica que la URL del API sea correcta</li>
              <li>Prueba en otro dispositivo o red</li>
            </ul>
          </div>
          <button 
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#9c27b0',
              color: 'white',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 2px 6px rgba(156, 39, 176, 0.2)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Reintentar conexión
          </button>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            backgroundColor: '#f8f9fa'
          }}>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/home" element={
                <ProtectedRoute>
                  <HomeScreen />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              } />
              <Route path="/glucose" element={
                <ProtectedRoute>
                  <GlucoseScreen />
                </ProtectedRoute>
              } />
              <Route path="/foods" element={
                <ProtectedRoute>
                  <FoodSearchScreen />
                </ProtectedRoute>
              } />
              <Route path="/education" element={
                <ProtectedRoute>
                  <EducationScreen />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsScreen />
                </ProtectedRoute>
              } />
              <Route path="/food-tracking" element={
                <ProtectedRoute>
                  <FoodTrackingScreen />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;