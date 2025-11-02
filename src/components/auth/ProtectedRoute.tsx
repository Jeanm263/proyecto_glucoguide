import { Navigate } from 'react-router-dom';
import { authService } from '../../services/authService';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

/**
 * Componente que protege rutas privadas
 * Redirige a login si el usuario no está autenticado
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

