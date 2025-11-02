import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomeScreen } from './screens/HomeScreen';
import { FoodSearchScreen } from './screens/foods/FoodSearchScreen';
import { EducationScreen } from './screens/education/EducationScreen';
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegisterScreen } from './screens/auth/RegisterScreen';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { authService } from './services/authService';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta por defecto: redirigir a login si no está autenticado, sino a home */}
        <Route 
          path="/" 
          element={
            authService.isAuthenticated() ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
