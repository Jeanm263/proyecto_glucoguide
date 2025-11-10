import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileScreen } from '../ProfileScreen';
import { AuthProvider } from '../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mock de useNavigate
const mockNavigate = jest.fn();
const mockLogout = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock del contexto de autenticación
jest.mock('../../contexts/AuthContext', () => ({
  ...jest.requireActual('../../contexts/AuthContext'),
  useAuth: () => ({
    user: { 
      id: '1', 
      name: 'Test User', 
      email: 'test@example.com',
      age: 30,
      diabetesType: 'Tipo 2'
    },
    logout: mockLogout,
  }),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('ProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar correctamente la información del usuario', () => {
    renderWithProviders(<ProfileScreen />);
    
    expect(screen.getByText('Mi Perfil')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    // Usar una función para buscar texto que puede estar dividido en múltiples elementos
    expect(screen.getByText((_, element) => {
      return element?.textContent === 'Edad: 30 años';
    })).toBeInTheDocument();
    expect(screen.getByText((_, element) => {
      return element?.textContent === 'Tipo de Diabetes: Tipo 2';
    })).toBeInTheDocument();
  });

  it('debería renderizar las opciones del perfil', () => {
    renderWithProviders(<ProfileScreen />);
    
    expect(screen.getByText('Editar Perfil')).toBeInTheDocument();
    expect(screen.getByText('Historial')).toBeInTheDocument();
    expect(screen.getByText('Favoritos')).toBeInTheDocument();
    expect(screen.getByText('Configuración')).toBeInTheDocument();
  });

  it('debería navegar al login cuando se cierra la sesión', () => {
    renderWithProviders(<ProfileScreen />);
    
    const logoutButton = screen.getByText('Cerrar Sesión');
    fireEvent.click(logoutButton);
    
    expect(mockLogout).toHaveBeenCalled();
    // El logout redirige automáticamente, por lo que no necesitamos verificar la navegación
  });

  it('debería mostrar las descripciones de las opciones', () => {
    renderWithProviders(<ProfileScreen />);
    
    expect(screen.getByText('Actualiza tu información personal')).toBeInTheDocument();
    expect(screen.getByText('Ver alimentos registrados')).toBeInTheDocument();
    expect(screen.getByText('Tus alimentos preferidos')).toBeInTheDocument();
    expect(screen.getByText('Preferencias y notificaciones')).toBeInTheDocument();
  });
});