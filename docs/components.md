# Documentación de Componentes - Glucosa-App

## Componentes Principales

### AuthProvider
Componente de contexto para la autenticación de usuarios.

**Props:**
- `children`: React.ReactNode - Componentes hijos

**Funcionalidades:**
- Gestiona el estado de autenticación del usuario
- Proporciona métodos para login, registro y logout
- Mantiene la sesión del usuario activa

### ProtectedRoute
Componente para proteger rutas que requieren autenticación.

**Props:**
- `children`: React.ReactNode - Componentes hijos

**Funcionalidades:**
- Verifica si el usuario está autenticado
- Redirige a la página de login si no está autenticado
- Muestra un indicador de carga mientras verifica la autenticación

### FoodCard
Componente para mostrar información de un alimento.

**Props:**
- `food`: Food - Objeto con información del alimento
- `onPress`: () => void - Función que se ejecuta al presionar la tarjeta

**Funcionalidades:**
- Muestra el nombre, categoría e índice glucémico del alimento
- Muestra un indicador de semáforo nutricional (verde, amarillo, rojo)
- Permite interactuar con el alimento

### FoodSearchScreen
Pantalla para buscar y explorar alimentos.

**Funcionalidades:**
- Buscar alimentos por nombre o categoría
- Mostrar resultados de búsqueda
- Navegar a la pantalla de detalles de alimentos

### FoodTrackingScreen
Pantalla para registrar alimentos consumidos.

**Funcionalidades:**
- Registrar alimentos consumidos con porción y hora
- Ver historial de alimentos consumidos
- Calcular nutrientes totales consumidos

### EducationScreen
Pantalla para contenido educativo sobre diabetes.

**Funcionalidades:**
- Mostrar contenido educativo categorizado
- Buscar contenido por nivel (básico, intermedio, avanzado)
- Marcar contenido como leído

### GlucoseScreen
Pantalla para registrar y monitorear niveles de glucosa.

**Funcionalidades:**
- Registrar niveles de glucosa con fecha y hora
- Mostrar historial de niveles de glucosa
- Proporcionar recomendaciones basadas en los niveles registrados

### HomeScreen
Pantalla principal de la aplicación.

**Funcionalidades:**
- Mostrar resumen de actividad del usuario
- Acceso rápido a funciones principales
- Notificaciones y recordatorios

## Servicios

### authService
Servicio para la gestión de autenticación.

**Métodos:**
- `login(credentials)`: Iniciar sesión con credenciales
- `register(userData)`: Registrar un nuevo usuario
- `getCurrentUser()`: Obtener información del usuario actual
- `isAuthenticated()`: Verificar si el usuario está autenticado
- `logout()`: Cerrar sesión del usuario

### foodService
Servicio para la gestión de alimentos.

**Métodos:**
- `getAllFoods()`: Obtener todos los alimentos
- `searchFoods(query, category)`: Buscar alimentos
- `getFoodById(id)`: Obtener un alimento por ID
- `getFoodCategories()`: Obtener categorías de alimentos

### educationService
Servicio para la gestión de contenido educativo.

**Métodos:**
- `getAllContent()`: Obtener todo el contenido educativo
- `getContentById(id)`: Obtener contenido por ID
- `getContentByCategory(category)`: Obtener contenido por categoría

## Hooks

### useAuth
Hook personalizado para acceder al contexto de autenticación.

**Retorna:**
- `user`: Información del usuario actual
- `isAuthenticated`: Booleano indicando si está autenticado
- `isLoading`: Booleano indicando si se está cargando
- `login`: Función para iniciar sesión
- `register`: Función para registrarse
- `logout`: Función para cerrar sesión
- `refreshUser`: Función para refrescar información del usuario

## Utilidades

### logger
Sistema de logging para la aplicación.

**Métodos:**
- `trace(message, ...args)`: Mensajes de seguimiento
- `debug(message, ...args)`: Mensajes de depuración
- `info(message, ...args)`: Mensajes informativos
- `warn(message, ...args)`: Mensajes de advertencia
- `error(message, ...args)`: Mensajes de error

### toast
Sistema de notificaciones toast.

**Métodos:**
- `success(message)`: Mostrar notificación de éxito
- `error(message)`: Mostrar notificación de error
- `info(message)`: Mostrar notificación informativa
- `warning(message)`: Mostrar notificación de advertencia