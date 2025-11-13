import { http, HttpResponse } from 'msw';

// Mock data for foods
const mockFoods = [
  {
    id: '1',
    name: 'Manzana',
    category: 'frutas',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    fiber: 2.4,
    servingSize: '100g'
  },
  {
    id: '2',
    name: 'Plátano',
    category: 'frutas',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    fiber: 2.6,
    servingSize: '100g'
  },
  {
    id: '3',
    name: 'Arroz blanco',
    category: 'cereales',
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    fiber: 0.4,
    servingSize: '100g'
  }
];

// Mock categories
const mockCategories = ['frutas', 'verduras', 'cereales', 'proteínas', 'lácteos'];

export const handlers = [
  // Mock GET /foods
  http.get('/foods', () => {
    return HttpResponse.json({ success: true, data: mockFoods });
  }),

  // Mock GET /foods/search
  http.get('/foods/search', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q') || '';
    const filteredFoods = mockFoods.filter(food => 
      food.name.toLowerCase().includes(query.toLowerCase())
    );
    return HttpResponse.json({ success: true, data: filteredFoods });
  }),

  // Mock GET /foods/categories
  http.get('/foods/categories', () => {
    return HttpResponse.json({ success: true, data: mockCategories });
  }),

  // Mock GET /foods/:id
  http.get('/foods/:id', ({ params }) => {
    const { id } = params;
    const food = mockFoods.find(f => f.id === id);
    if (food) {
      return HttpResponse.json({ success: true, data: food });
    }
    return HttpResponse.json({ success: false, message: 'Food not found' }, { status: 404 });
  }),

  // Mock auth endpoints
  http.post('/auth/login', () => {
    return HttpResponse.json({ 
      success: true, 
      data: { 
        user: { id: '1', name: 'Test User', email: 'test@example.com' }, 
        token: 'mock-jwt-token' 
      } 
    });
  }),

  http.post('/auth/register', () => {
    return HttpResponse.json({ 
      success: true, 
      data: { 
        user: { id: '1', name: 'Test User', email: 'test@example.com' }, 
        token: 'mock-jwt-token' 
      } 
    });
  }),

  http.get('/auth/check', ({ request }) => {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (token) {
      return HttpResponse.json({ 
        success: true, 
        data: { 
          user: { id: '1', name: 'Test User', email: 'test@example.com' } 
        } 
      });
    }
    return HttpResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  })
];