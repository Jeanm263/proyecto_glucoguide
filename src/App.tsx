import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <div>
          <Routes>
            {/* Rutas públicas - sin barra de navegación */}
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            
            {/* Rutas protegidas - con barra de navegación */}
            <Route path="/home" element={
              <div>
                <ModernNavbar />
                <ProtectedRoute><HomeScreen /></ProtectedRoute>
              </div>
            } />
            <Route path="/profile" element={
              <div>
                <ModernNavbar />
                <ProtectedRoute><ProfileScreen /></ProtectedRoute>
              </div>
            } />
            <Route path="/settings" element={
              <div>
                <ModernNavbar />
                <ProtectedRoute><SettingsScreen /></ProtectedRoute>
              </div>
            } />
            <Route path="/glucose" element={
              <div>
                <ModernNavbar />
                <ProtectedRoute><GlucoseScreen /></ProtectedRoute>
              </div>
            } />
            <Route path="/foods" element={
              <div>
                <ModernNavbar />
                <ProtectedRoute><FoodSearchScreen /></ProtectedRoute>
              </div>
            } />
            <Route path="/foods/tracking" element={
              <div>
                <ModernNavbar />
                <ProtectedRoute><FoodTrackingScreen /></ProtectedRoute>
              </div>
            } />
            <Route path="/education" element={
              <div>
                <ModernNavbar />
                <ProtectedRoute><EducationScreen /></ProtectedRoute>
              </div>
            } />
            
            {/* Ruta por defecto - redirige al login */}
            <Route path="/" element={<LoginScreen />} />
            <Route path="*" element={<LoginScreen />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;