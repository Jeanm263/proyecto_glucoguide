/**
 * Servicio de autenticación MOCK para desarrollo
 * Usa localStorage para simular un backend
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Base de datos de usuarios mock (simulada en localStorage)
const USERS_KEY = 'mock_users';
const CURRENT_USER_KEY = 'current_mock_user';

// Usuarios de prueba predefinidos
const DEFAULT_USERS = [
  {
    id: '1',
    name: 'Usuario Demo',
    email: 'demo@glucosaapp.com',
    password: 'demo123'
  },
  {
    id: '2',
    name: 'Test User',
    email: 'test@glucosaapp.com',
    password: 'test123'
  }
];

/**
 * Inicializar usuarios por defecto si no existen
 */
const initializeUsers = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
  }
};

/**
 * Obtener todos los usuarios
 */
const getUsers = (): MockUser[] => {
  const usersStr = localStorage.getItem(USERS_KEY);
  return usersStr ? JSON.parse(usersStr) : [];
};

/**
 * Guardar usuarios
 */
const saveUsers = (users: MockUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

/**
 * Generar un ID único
 */
const generateId = () => {
  return Date.now().toString();
};

/**
 * Generar un token simple
 */
const generateToken = (userId: string) => {
  // En producción, este sería un JWT real
  return `mock_token_${userId}_${Date.now()}`;
};

export const mockAuthService = {
  /**
   * Iniciar sesión
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = getUsers();
    const user = users.find(
      (u: MockUser) => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const token = generateToken(user.id);
    
    // Guardar datos del usuario actual
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    localStorage.setItem('authToken', token);
    
    return { token, user: userData };
  },

  /**
   * Registrar nuevo usuario
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    initializeUsers();
    const users = getUsers();
    
    // Verificar si el email ya existe
    const existingUser = users.find((u: MockUser) => u.email === data.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const newUser = {
      id: generateId(),
      name: data.name,
      email: data.email,
      password: data.password
    };

    users.push(newUser);
    saveUsers(users);

    const token = generateToken(newUser.id);
    
    // Guardar datos del usuario actual
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    localStorage.setItem('authToken', token);
    
    return { token, user: userData };
  },

  /**
   * Cerrar sesión
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = '/';
  },

  /**
   * Obtener usuario actual
   */
  async getCurrentUser() {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const userStr = localStorage.getItem(CURRENT_USER_KEY);
    if (!userStr) {
      throw new Error('Usuario no encontrado');
    }
    
    return JSON.parse(userStr);
  },

  /**
   * Verificar si hay un token válido
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Obtener token
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  /**
   * Limpiar todos los datos (útil para testing)
   */
  clearAll(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(USERS_KEY);
  }
};

// Inicializar usuarios al cargar el módulo
initializeUsers();

