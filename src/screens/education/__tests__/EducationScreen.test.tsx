import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EducationScreen } from '../EducationScreen';
import { BrowserRouter } from 'react-router-dom';

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock de educationService
jest.mock('../../../services/educationService', () => ({
  educationService: {
    getAllContent: jest.fn().mockResolvedValue([
      {
        id: '1',
        title: '¿Qué es la diabetes?',
        level: 'basic',
        type: 'article',
        duration: 5,
        tags: ['introducción', 'conceptos básicos'],
        content: 'Contenido del artículo sobre diabetes',
        summary: 'Una introducción a la diabetes tipo 2'
      },
      {
        id: '2',
        title: 'Índice glucémico de los alimentos',
        level: 'intermediate',
        type: 'article',
        duration: 10,
        tags: ['alimentación', 'índice glucémico'],
        content: 'Contenido sobre índice glucémico',
        summary: 'Cómo entender el índice glucémico'
      }
    ])
  }
}));

// Mock de EDUCATION_CONTENT
jest.mock('../../../constants/educationContent', () => ({
  EDUCATION_CONTENT: [
    {
      id: '1',
      title: '¿Qué es la diabetes?',
      level: 'basic',
      type: 'article',
      duration: 5,
      tags: ['introducción', 'conceptos básicos'],
      content: 'Contenido del artículo sobre diabetes',
      summary: 'Una introducción a la diabetes tipo 2'
    },
    {
      id: '2',
      title: 'Índice glucémico de los alimentos',
      level: 'intermediate',
      type: 'article',
      duration: 10,
      tags: ['alimentación', 'índice glucémico'],
      content: 'Contenido sobre índice glucémico',
      summary: 'Cómo entender el índice glucémico'
    }
  ],
  EDUCATION_CATEGORIES: {
    basic: 'Básico',
    intermediate: 'Intermedio',
    advanced: 'Avanzado'
  }
}));

// Mock de useDebounce hook
jest.mock('../../../hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}));

// Mock de USE_MOCK_SERVICE
jest.mock('../../../config/env', () => ({
  USE_MOCK_SERVICE: true
}));

describe('EducationScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar correctamente el encabezado y título', async () => {
    render(
      <BrowserRouter>
        <EducationScreen />
      </BrowserRouter>
    );
    
    // Esperar a que se cargue el contenido
    await waitFor(() => {
      expect(screen.getByText('Educación en Diabetes')).toBeInTheDocument();
      expect(screen.getByText('Inicio')).toBeInTheDocument();
    });
  });

  it('debería renderizar la barra de búsqueda', async () => {
    render(
      <BrowserRouter>
        <EducationScreen />
      </BrowserRouter>
    );
    
    // Esperar a que se cargue el contenido
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Buscar artículos, videos, etc...')).toBeInTheDocument();
    });
  });

  it('debería renderizar los filtros de nivel', async () => {
    render(
      <BrowserRouter>
        <EducationScreen />
      </BrowserRouter>
    );
    
    // Esperar a que se cargue el contenido
    await waitFor(() => {
      expect(screen.getByText('Todos')).toBeInTheDocument();
      expect(screen.getByText('Básico')).toBeInTheDocument();
      expect(screen.getByText('Intermedio')).toBeInTheDocument();
      expect(screen.getByText('Avanzado')).toBeInTheDocument();
    });
  });

  it('debería navegar a la pantalla de inicio cuando se hace clic en el botón de volver', async () => {
    render(
      <BrowserRouter>
        <EducationScreen />
      </BrowserRouter>
    );
    
    // Esperar a que se cargue el contenido
    await waitFor(() => {
      expect(screen.getByText('Educación en Diabetes')).toBeInTheDocument();
    });
    
    const backButton = screen.getByText('Inicio');
    fireEvent.click(backButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  it('debería permitir escribir en la barra de búsqueda', async () => {
    render(
      <BrowserRouter>
        <EducationScreen />
      </BrowserRouter>
    );
    
    // Esperar a que se cargue el contenido
    await waitFor(() => {
      expect(screen.getByText('Educación en Diabetes')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText('Buscar artículos, videos, etc...');
    fireEvent.change(searchInput, { target: { value: 'diabetes' } });
    
    expect(searchInput).toHaveValue('diabetes');
  });

  it('debería mostrar contenido educativo cuando se carga correctamente', async () => {
    render(
      <BrowserRouter>
        <EducationScreen />
      </BrowserRouter>
    );
    
    // Esperar a que se cargue el contenido
    await waitFor(() => {
      expect(screen.getByText('¿Qué es la diabetes?')).toBeInTheDocument();
      expect(screen.getByText('Índice glucémico de los alimentos')).toBeInTheDocument();
    });
  });

  it('debería filtrar contenido por nivel', async () => {
    render(
      <BrowserRouter>
        <EducationScreen />
      </BrowserRouter>
    );
    
    // Esperar a que se cargue el contenido
    await waitFor(() => {
      expect(screen.getByText('¿Qué es la diabetes?')).toBeInTheDocument();
      expect(screen.getByText('Índice glucémico de los alimentos')).toBeInTheDocument();
    });
    
    // Filtrar por nivel básico
    const basicButton = screen.getByText('Básico');
    fireEvent.click(basicButton);
    
    // Verificar que solo se muestra el contenido básico
    expect(screen.getByText('¿Qué es la diabetes?')).toBeInTheDocument();
    expect(screen.queryByText('Índice glucémico de los alimentos')).not.toBeInTheDocument();
  });

  it('debería filtrar contenido por búsqueda', async () => {
    render(
      <BrowserRouter>
        <EducationScreen />
      </BrowserRouter>
    );
    
    // Esperar a que se cargue el contenido
    await waitFor(() => {
      expect(screen.getByText('¿Qué es la diabetes?')).toBeInTheDocument();
      expect(screen.getByText('Índice glucémico de los alimentos')).toBeInTheDocument();
    });
    
    // Buscar "índice"
    const searchInput = screen.getByPlaceholderText('Buscar artículos, videos, etc...');
    fireEvent.change(searchInput, { target: { value: 'índice' } });
    
    // Verificar que solo se muestra el contenido relacionado con "índice"
    expect(screen.getByText('Índice glucémico de los alimentos')).toBeInTheDocument();
    expect(screen.queryByText('¿Qué es la diabetes?')).not.toBeInTheDocument();
  });
});