import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FoodSearchScreen } from '../FoodSearchScreen';

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
    getFoodCategories: jest.fn().mockResolvedValue(['todas', 'frutas', 'verduras', 'cereales']),
    searchFoods: jest.fn().mockResolvedValue([])
  }
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('FoodSearchScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithRouter(<FoodSearchScreen />);
    
    expect(screen.getByText(/buscar alimentos/i)).toBeInTheDocument();
  });
});