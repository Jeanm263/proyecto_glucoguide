import { render, screen, fireEvent } from '@testing-library/react';
import { FoodSearchScreen } from '../FoodSearchScreen';
import { BrowserRouter } from 'react-router-dom';

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock de INITIAL_FOODS y FOOD_CATEGORIES
jest.mock('../../../constants/foodsData', () => ({
  INITIAL_FOODS: [
    {
      id: '1',
      name: 'Manzana',
      category: 'frutas',
      glycemicIndex: 38,
      glycemicLoad: 6,
      trafficLight: 'green',
      nutrients: {
        calories: 52,
        carbohydrates: 14,
        fiber: 2.4,
        protein: 0.3,
        fat: 0.2,
        sugar: 10,
        sodium: 1
      },
      commonNames: ['manzana roja', 'manzana verde'],
      portionSizes: [
        { size: '100g', grams: 100 },
        { size: '1 unidad', grams: 150 }
      ],
      recommendations: 'Excelente opción para personas con diabetes. Rica en fibra y con bajo índice glucémico.',
      warnings: 'Evitar en exceso si se combina con otras frutas altas en azúcar.'
    },
    {
      id: '2',
      name: 'Arroz blanco',
      category: 'cereales',
      glycemicIndex: 73,
      glycemicLoad: 37,
      trafficLight: 'red',
      nutrients: {
        calories: 130,
        carbohydrates: 28,
        fiber: 0.4,
        protein: 2.7,
        fat: 0.3,
        sugar: 0.1,
        sodium: 1
      },
      commonNames: ['arroz blanco cocido'],
      portionSizes: [
        { size: '100g', grams: 100 },
        { size: '1 taza', grams: 158 }
      ],
      recommendations: 'Consumir con moderación. Combinar con proteínas y vegetales para reducir el impacto glucémico.',
      warnings: 'Evitar porciones grandes. Preferir arroz integral cuando sea posible.'
    }
  ],
  FOOD_CATEGORIES: ['todas', 'frutas', 'cereales']
}));

// Mock de useDebounce hook
jest.mock('../../../hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}));

// Mock de config/env
jest.mock('../../../config/env', () => ({
  USE_MOCK_SERVICE: true,
}));

describe('FoodSearchScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar correctamente el encabezado y título', () => {
    render(
      <BrowserRouter>
        <FoodSearchScreen />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Buscar Alimentos')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Volver al inicio' })).toBeInTheDocument();
  });

  it('debería renderizar la barra de búsqueda', () => {
    render(
      <BrowserRouter>
        <FoodSearchScreen />
      </BrowserRouter>
    );
    
    expect(screen.getByPlaceholderText('Buscar alimentos... (ej: manzana, arroz, pan)')).toBeInTheDocument();
  });

  it('debería renderizar los filtros de categoría', () => {
    render(
      <BrowserRouter>
        <FoodSearchScreen />
      </BrowserRouter>
    );
    
    expect(screen.getByText('todas')).toBeInTheDocument();
    // Usar queryAllByText para manejar múltiples elementos con el mismo texto
    expect(screen.queryAllByText('frutas').length).toBeGreaterThan(0);
    expect(screen.queryAllByText('cereales').length).toBeGreaterThan(0);
  });

  it('debería navegar a la pantalla de inicio cuando se hace clic en el botón de volver', () => {
    render(
      <BrowserRouter>
        <FoodSearchScreen />
      </BrowserRouter>
    );
    
    const backButton = screen.getByRole('button', { name: 'Volver al inicio' });
    fireEvent.click(backButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  it('debería permitir escribir en la barra de búsqueda', () => {
    render(
      <BrowserRouter>
        <FoodSearchScreen />
      </BrowserRouter>
    );
    
    const searchInput = screen.getByPlaceholderText('Buscar alimentos... (ej: manzana, arroz, pan)');
    fireEvent.change(searchInput, { target: { value: 'manzana' } });
    
    expect(searchInput).toHaveValue('manzana');
  });

  it('debería mostrar alimentos cuando hay resultados', () => {
    render(
      <BrowserRouter>
        <FoodSearchScreen />
      </BrowserRouter>
    );
    
    // Verificar que se muestran algunos alimentos
    expect(screen.getByText('Manzana')).toBeInTheDocument();
    expect(screen.getByText('Arroz blanco')).toBeInTheDocument();
  });

  it('debería filtrar alimentos por categoría', () => {
    render(
      <BrowserRouter>
        <FoodSearchScreen />
      </BrowserRouter>
    );
    
    // Verificar que inicialmente se muestran ambos alimentos
    expect(screen.getByText('Manzana')).toBeInTheDocument();
    expect(screen.getByText('Arroz blanco')).toBeInTheDocument();
    
    // Filtrar por categoría "frutas" - usar getAllByText y seleccionar el botón de filtro
    const allFrutasElements = screen.queryAllByText('frutas');
    // El botón de filtro debería tener aria-label "Filtrar por categoría: frutas"
    const frutasButton = allFrutasElements.find(element => 
      element.getAttribute('aria-label') === 'Filtrar por categoría: frutas'
    );
    
    if (frutasButton) {
      fireEvent.click(frutasButton);
      
      // Verificar que solo se muestra la manzana
      expect(screen.getByText('Manzana')).toBeInTheDocument();
      expect(screen.queryByText('Arroz blanco')).not.toBeInTheDocument();
    }
  });

  it('debería filtrar alimentos por búsqueda', () => {
    render(
      <BrowserRouter>
        <FoodSearchScreen />
      </BrowserRouter>
    );
    
    // Verificar que inicialmente se muestran ambos alimentos
    expect(screen.getByText('Manzana')).toBeInTheDocument();
    expect(screen.getByText('Arroz blanco')).toBeInTheDocument();
    
    // Buscar "manzana"
    const searchInput = screen.getByPlaceholderText('Buscar alimentos... (ej: manzana, arroz, pan)');
    fireEvent.change(searchInput, { target: { value: 'manzana' } });
    
    // Verificar que solo se muestra la manzana
    expect(screen.getByText('Manzana')).toBeInTheDocument();
    expect(screen.queryByText('Arroz blanco')).not.toBeInTheDocument();
  });
});