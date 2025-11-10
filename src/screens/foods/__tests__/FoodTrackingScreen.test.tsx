import { render, screen, fireEvent } from '@testing-library/react';
import { FoodTrackingScreen } from '../FoodTrackingScreen';
import { BrowserRouter } from 'react-router-dom';

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock de config/env
jest.mock('../../../config/env', () => ({
  USE_MOCK_SERVICE: true,
}));

// Mock de INITIAL_FOODS
jest.mock('../../../constants/foodsData', () => ({
  INITIAL_FOODS: [
    {
      id: 'apple-1',
      name: 'Manzana',
      category: 'frutas',
      glycemicIndex: 38,
      carbohydrates: 25,
      fiber: 4,
      sugars: 19,
      portion: '1 unidad mediana (182g)',
      trafficLight: 'green',
      commonNames: ['manzana roja', 'manzana verde', 'apple']
    },
    {
      id: 'bread-1',
      name: 'Pan integral',
      category: 'cereales',
      glycemicIndex: 55,
      carbohydrates: 15,
      fiber: 2,
      sugars: 2,
      portion: '2 rebanadas (60g)',
      trafficLight: 'yellow',
      commonNames: ['pan integral', 'whole wheat bread']
    }
  ]
}));

describe('FoodTrackingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar correctamente el encabezado y título', () => {
    render(
      <BrowserRouter>
        <FoodTrackingScreen />
      </BrowserRouter>
    );
    
    // Verificar que se muestra el botón de inicio usando queryByRole
    expect(screen.getByRole('button', { name: 'Volver al inicio' })).toBeInTheDocument();
    
    // Verificar que se muestra el título usando el heading
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('debería renderizar el selector de fecha', () => {
    render(
      <BrowserRouter>
        <FoodTrackingScreen />
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText('Fecha:')).toBeInTheDocument();
    // Verificar que existe un input de tipo date
    const dateInput = screen.getByLabelText('Fecha:') as HTMLInputElement;
    expect(dateInput).toBeInTheDocument();
  });

  it('debería navegar a la pantalla de inicio cuando se hace clic en el botón de volver', () => {
    render(
      <BrowserRouter>
        <FoodTrackingScreen />
      </BrowserRouter>
    );
    
    const backButton = screen.getByRole('button', { name: 'Volver al inicio' });
    fireEvent.click(backButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  it('debería mostrar alimentos registrados cuando hay entradas', () => {
    render(
      <BrowserRouter>
        <FoodTrackingScreen />
      </BrowserRouter>
    );
    
    // Verificar que se muestran los alimentos registrados
    expect(screen.getByText('Manzana')).toBeInTheDocument();
    expect(screen.getByText('Pan integral')).toBeInTheDocument();
    
    // Verificar que se muestran las horas
    expect(screen.getByText('⏰ 08:30')).toBeInTheDocument();
    expect(screen.getByText('⏰ 13:15')).toBeInTheDocument();
  });

  it('debería mostrar los totales de carbohidratos y fibra', () => {
    render(
      <BrowserRouter>
        <FoodTrackingScreen />
      </BrowserRouter>
    );
    
    // Verificar que se muestran los totales (25 + 15 = 40 carbs, 4 + 2 = 6 fibra)
    expect(screen.getByText('40g')).toBeInTheDocument(); // Carbohidratos
    expect(screen.getByText('6g')).toBeInTheDocument(); // Fibra
  });

  it('debería permitir cambiar la fecha', () => {
    render(
      <BrowserRouter>
        <FoodTrackingScreen />
      </BrowserRouter>
    );
    
    const dateInput = screen.getByLabelText('Fecha:') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    
    expect(dateInput.value).toBe('2023-01-01');
  });

  it('debería abrir el modal al hacer clic en "Agregar Alimento"', () => {
    render(
      <BrowserRouter>
        <FoodTrackingScreen />
      </BrowserRouter>
    );
    
    const addButton = screen.getByRole('button', { name: 'Agregar alimento' });
    fireEvent.click(addButton);
    
    // Verificar que el modal se abre (buscando elementos del modal)
    expect(screen.getByPlaceholderText('Buscar alimento...')).toBeInTheDocument();
  });
});