import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FoodTrackingScreen } from '../FoodTrackingScreen';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock the AuthContext
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '1', name: 'Test User' },
    logout: jest.fn(),
  }),
}));

// Mock the food service
jest.mock('../../../services/foodService', () => ({
  foodService: {
    getAllFoods: jest.fn().mockResolvedValue([]),
    getFoodById: jest.fn().mockResolvedValue(null)
  }
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('FoodTrackingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithRouter(<FoodTrackingScreen />);
    
    // Usamos un texto más específico del componente
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});