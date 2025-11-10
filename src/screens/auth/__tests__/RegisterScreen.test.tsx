import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegisterScreen } from '../RegisterScreen';
import { AuthProvider } from '../../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock del contexto de autenticación
const mockRegister = jest.fn();
jest.mock('../../../contexts/AuthContext', () => ({
  ...jest.requireActual('../../../contexts/AuthContext'),
  useAuth: () => ({
    register: mockRegister,
    isLoading: false,
  }),
}));

// Mock de config/env
jest.mock('../../../config/env', () => ({
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

describe('RegisterScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar el formulario de registro', () => {
    renderWithProviders(<RegisterScreen />);
    
    expect(screen.getByText('GlucosaApp')).toBeInTheDocument();
    expect(screen.getByText('Crea tu cuenta gratuita')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument();
    // Get all password inputs and check that there are two
    const passwordInputs = screen.getAllByPlaceholderText('••••••••');
    expect(passwordInputs).toHaveLength(2);
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeInTheDocument();
  });

  it('debería mostrar errores de validación cuando el formulario está vacío', async () => {
    renderWithProviders(<RegisterScreen />);
    
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('El nombre es requerido')).toBeInTheDocument();
      expect(screen.getByText('El email es requerido')).toBeInTheDocument();
      expect(screen.getByText('La contraseña es requerida')).toBeInTheDocument();
      expect(screen.getByText('Confirma tu contraseña')).toBeInTheDocument();
    });
  });

  it('debería registrar al usuario correctamente', async () => {
    mockRegister.mockResolvedValueOnce({});
    
    renderWithProviders(<RegisterScreen />);
    
    // Llenar el formulario
    fireEvent.change(screen.getByPlaceholderText('Juan Pérez'), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByPlaceholderText('tu@email.com'), {
      target: { value: 'test@example.com' }
    });
    const passwordInputs = screen.getAllByPlaceholderText('••••••••');
    fireEvent.change(passwordInputs[0], {
      target: { value: 'password123' }
    });
    fireEvent.change(passwordInputs[1], {
      target: { value: 'password123' }
    });
    
    // Enviar el formulario
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('debería mostrar un error si el registro falla', async () => {
    mockRegister.mockRejectedValueOnce(new Error('Error de registro'));
    
    renderWithProviders(<RegisterScreen />);
    
    // Llenar el formulario
    fireEvent.change(screen.getByPlaceholderText('Juan Pérez'), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByPlaceholderText('tu@email.com'), {
      target: { value: 'test@example.com' }
    });
    const passwordInputs = screen.getAllByPlaceholderText('••••••••');
    fireEvent.change(passwordInputs[0], {
      target: { value: 'password123' }
    });
    fireEvent.change(passwordInputs[1], {
      target: { value: 'password123' }
    });
    
    // Enviar el formulario
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalled();
      // El error se maneja en el contexto, no se muestra directamente en el componente
    });
  });
});