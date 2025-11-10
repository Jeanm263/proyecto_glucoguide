import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HomeScreen } from '../HomeScreen';
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
    user: { id: '1', name: 'Test User', email: 'test@example.com' },
    logout: mockLogout,
  }),
}));

// Mock de config/env
jest.mock('../../config/env', () => ({
  USE_MOCK_SERVICE: true,
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

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar correctamente con el nombre del usuario', () => {
    renderWithProviders(<HomeScreen />);
    
    expect(screen.getByText('GlucosaApp')).toBeInTheDocument();
    expect(screen.getByText('¡Hola, Test User! 👋')).toBeInTheDocument();
    expect(screen.getByText('Tu guía inteligente para gestionar la diabetes tipo 2 con información nutricional y educación')).toBeInTheDocument();
  });

  it('debería renderizar las tarjetas de funcionalidad', () => {
    renderWithProviders(<HomeScreen />);
    
    // Usar queryAllByText y verificar que hay al menos una coincidencia
    expect(screen.queryAllByText('Buscar Alimentos').length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Seguimiento de Alimentos').length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Educación').length).toBeGreaterThan(0);
  });

  it('debería navegar a la pantalla de alimentos cuando se hace clic en la tarjeta correspondiente', () => {
    renderWithProviders(<HomeScreen />);
    
    // Usar aria-label para seleccionar la tarjeta correcta
    const foodCard = screen.getByRole('button', { name: 'Buscar alimentos y ver información nutricional' });
    fireEvent.click(foodCard);
    expect(mockNavigate).toHaveBeenCalledWith('/foods');
  });

  it('debería navegar a la pantalla de seguimiento de alimentos cuando se hace clic en la tarjeta correspondiente', () => {
    renderWithProviders(<HomeScreen />);
    
    // Usar aria-label para seleccionar la tarjeta correcta
    const trackingCard = screen.getByRole('button', { name: 'Registrar y seguir alimentos consumidos' });
    fireEvent.click(trackingCard);
    expect(mockNavigate).toHaveBeenCalledWith('/food-tracking');
  });

  it('debería navegar a la pantalla de educación cuando se hace clic en la tarjeta correspondiente', () => {
    renderWithProviders(<HomeScreen />);
    
    // Usar aria-label para seleccionar la tarjeta correcta
    const educationCard = screen.getByRole('button', { name: 'Acceder a contenido educativo sobre diabetes' });
    fireEvent.click(educationCard);
    expect(mockNavigate).toHaveBeenCalledWith('/education');
  });

  it('debería cerrar sesión cuando se hace clic en el botón de cerrar sesión', () => {
    renderWithProviders(<HomeScreen />);
    
    const logoutButton = screen.getByText('Cerrar Sesión');
    fireEvent.click(logoutButton);
    
    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});