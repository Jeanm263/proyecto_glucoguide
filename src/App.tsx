import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomeScreen } from './screens/HomeScreen';
import { FoodSearchScreen } from './screens/foods/FoodSearchScreen';
import { FoodTrackingScreen } from './screens/foods/FoodTrackingScreen';
import { EducationScreen } from './screens/education/EducationScreen';
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegisterScreen } from './screens/auth/RegisterScreen';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

// Default redirect based on authentication context
const DefaultRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // Let AuthProvider handle loading state
  }

  return isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta por defecto: redirigir a login si no está autenticado, sino a home */}       
        <Route
          path="/"
          element={<DefaultRedirect />}
        />

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
          path="/education"
          element={
            <ProtectedRoute>
              <EducationScreen />
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;