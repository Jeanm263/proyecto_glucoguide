import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LoadingScreen } from './components/common/LoadingScreen';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Lazy loading de rutas para mejorar performance
const HomeScreen = lazy(() => import('./screens/HomeScreen').then(module => ({ default: module.HomeScreen })));
const FoodSearchScreen = lazy(() => import('./screens/foods/FoodSearchScreen').then(module => ({ default: module.FoodSearchScreen })));
const FoodTrackingScreen = lazy(() => import('./screens/foods/FoodTrackingScreen').then(module => ({ default: module.FoodTrackingScreen })));
const EducationScreen = lazy(() => import('./screens/education/EducationScreen').then(module => ({ default: module.EducationScreen })));
const LoginScreen = lazy(() => import('./screens/auth/LoginScreen').then(module => ({ default: module.LoginScreen })));
const RegisterScreen = lazy(() => import('./screens/auth/RegisterScreen').then(module => ({ default: module.RegisterScreen })));

// Componente interno para usar el hook useAuth
const RootRedirect: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return isAuthenticated ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              {/* Ruta por defecto: redirigir a login si no está autenticado, sino a home */}
              <Route path="/" element={<RootRedirect />} />
            
            {/* Rutas públicas */}
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            
            {/* Rutas protegidas */}
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <HomeScreen />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/foods" 
              element={
                <ProtectedRoute>
                  <FoodSearchScreen />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/food-tracking" 
              element={
                <ProtectedRoute>
                  <FoodTrackingScreen />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/education" 
              element={
                <ProtectedRoute>
                  <EducationScreen />
                </ProtectedRoute>
              } 
            />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;