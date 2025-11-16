import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegisterScreen } from './screens/auth/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { GlucoseScreen } from './screens/GlucoseScreen';
import { FoodSearchScreen } from './screens/foods/FoodSearchScreen';
import { FoodTrackingScreen } from './screens/foods/FoodTrackingScreen';
import { EducationScreen } from './screens/education/EducationScreen';
import ModernNavbar from './components/common/ModernNavbar';
import './index.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div style={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <Routes>
            {/* Rutas públicas - sin barra de navegación */}
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            
            {/* Rutas protegidas - con barra de navegación */}
            <Route path="/home" element={
              <ProtectedRoute>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  <ModernNavbar />
                  <div style={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--primary-500) var(--neutral-200)'
                  }}>
                    <HomeScreen />
                  </div>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  <ModernNavbar />
                  <div style={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--primary-500) var(--neutral-200)'
                  }}>
                    <ProfileScreen />
                  </div>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  <ModernNavbar />
                  <div style={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--primary-500) var(--neutral-200)'
                  }}>
                    <SettingsScreen />
                  </div>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/glucose" element={
              <ProtectedRoute>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  <ModernNavbar />
                  <div style={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--primary-500) var(--neutral-200)'
                  }}>
                    <GlucoseScreen />
                  </div>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/foods" element={
              <ProtectedRoute>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  <ModernNavbar />
                  <div style={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--primary-500) var(--neutral-200)'
                  }}>
                    <FoodSearchScreen />
                  </div>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/foods/tracking" element={
              <ProtectedRoute>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  <ModernNavbar />
                  <div style={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--primary-500) var(--neutral-200)'
                  }}>
                    <FoodTrackingScreen />
                  </div>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/education" element={
              <ProtectedRoute>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  <ModernNavbar />
                  <div style={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--primary-500) var(--neutral-200)'
                  }}>
                    <EducationScreen />
                  </div>
                </div>
              </ProtectedRoute>
            } />
            
            {/* Ruta por defecto - redirige al login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;