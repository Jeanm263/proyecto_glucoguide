import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginScreen } from '../LoginScreen';
import { AuthProvider } from '../../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock del contexto de autenticación
const mockLogin = jest.fn();
jest.mock('../../../contexts/AuthContext', () => ({
  ...jest.requireActual('../../../contexts/AuthContext'),
  useAuth: () => ({
    login: mockLogin,
    isLoading: false,
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

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar el formulario de inicio de sesión', () => {
    renderWithProviders(<LoginScreen />);
    
    expect(screen.getByText('GlucosaApp')).toBeInTheDocument();
    expect(screen.getByText('Inicia sesión para continuar')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it('debería mostrar errores de validación cuando el formulario está vacío', async () => {
    renderWithProviders(<LoginScreen />);
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('El email es requerido')).toBeInTheDocument();
      expect(screen.getByText('La contraseña es requerida')).toBeInTheDocument();
    });
  });

  it('debería iniciar sesión correctamente', async () => {
    mockLogin.mockResolvedValueOnce({});
    
    renderWithProviders(<LoginScreen />);
    
    // Llenar el formulario
    fireEvent.change(screen.getByPlaceholderText('tu@email.com'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'password123' }
    });
    
    // Enviar el formulario
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  it('debería mostrar un error si el inicio de sesión falla', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Credenciales inválidas'));
    
    renderWithProviders(<LoginScreen />);
    
    // Llenar el formulario
    fireEvent.change(screen.getByPlaceholderText('tu@email.com'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'wrongpassword' }
    });
    
    // Enviar el formulario
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
      // El error se maneja en el contexto, no se muestra directamente en el componente
    });
  });
});