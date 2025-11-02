# Documentación API - GlucosaApp

Esta documentación describe los endpoints que el backend debe implementar para que la aplicación frontend funcione correctamente.

## Configuración Base

- **Base URL**: `http://localhost:3000/api`
- **Headers**: `Content-Type: application/json`
- **Autenticación**: Bearer Token (JWT)

---

## Endpoints de Autenticación

### POST /auth/login

Iniciar sesión de usuario.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Response 200:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user123",
    "name": "Juan Pérez",
    "email": "usuario@ejemplo.com"
  }
}
```

---

### POST /auth/register

Registrar nuevo usuario.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "name": "Juan Pérez"
}
```

**Response 200:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user123",
    "name": "Juan Pérez",
    "email": "usuario@ejemplo.com"
  }
}
```

---

### GET /auth/me

Obtener información del usuario actual (requiere autenticación).

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "id": "user123",
  "name": "Juan Pérez",
  "email": "usuario@ejemplo.com"
}
```

---

## Endpoints de Alimentos

### GET /foods

Obtener todos los alimentos con filtros opcionales.

**Query Parameters:**
- `category` (string, opcional): Filtrar por categoría
- `trafficLight` (string, opcional): 'green', 'yellow', 'red'
- `glycemicIndexMin` (number, opcional)
- `glycemicIndexMax` (number, opcional)

**Response 200:**
```json
[
  {
    "id": "f001",
    "name": "Manzana",
    "category": "frutas",
    "glycemicIndex": 36,
    "carbohydrates": 14,
    "fiber": 2.4,
    "sugars": 10,
    "portion": "1 unidad mediana (180g)",
    "trafficLight": "green",
    "barcodes": [],
    "commonNames": ["manzana", "poma"]
  }
]
```

---

### GET /foods/search

Buscar alimentos por nombre.

**Query Parameters:**
- `q` (string, requerido): Término de búsqueda

**Response 200:**
```json
[]
```

---

### GET /foods/:id

Obtener un alimento específico por ID.

**Response 200:**
```json
{
  "id": "f001",
  "name": "Manzana",
  "category": "frutas",
  "glycemicIndex": 36,
  "carbohydrates": 14,
  "fiber": 2.4,
  "sugars": 10,
  "portion": "1 unidad mediana (180g)",
  "trafficLight": "green",
  "barcodes": [],
  "commonNames": ["manzana", "poma"]
}
```

---

### GET /foods/category/:category

Obtener alimentos por categoría.

**Response 200:**
```json
[]
```

---

### POST /foods

Crear un nuevo alimento (requiere rol admin).

**Request Body:**
```json
{
  "name": "Nuevo Alimento",
  "category": "frutas",
  "glycemicIndex": 50,
  "carbohydrates": 20,
  "fiber": 3,
  "sugars": 10,
  "portion": "100g",
  "trafficLight": "yellow",
  "barcodes": [],
  "commonNames": []
}
```

**Response 201:**
```json
{
  "id": "f002",
  "name": "Nuevo Alimento",
  ...
}
```

---

### PUT /foods/:id

Actualizar un alimento (requiere rol admin).

**Response 200:**
```json
{
  "id": "f002",
  ...
}
```

---

### DELETE /foods/:id

Eliminar un alimento (requiere rol admin).

**Response 204:** No Content

---

## Endpoints de Contenido Educativo

### GET /education

Obtener todo el contenido educativo.

**Query Parameters:**
- `level` (string, opcional): 'basic', 'intermediate', 'advanced'

**Response 200:**
```json
[
  {
    "id": "edu_001",
    "title": "¿Qué es la Diabetes Tipo 2?",
    "content": "La diabetes tipo 2 es...",
    "type": "article",
    "duration": "8 min",
    "level": "basic",
    "tags": ["diabetes", "básico", "introducción"]
  }
]
```

---

### GET /education/search

Buscar contenido educativo.

**Query Parameters:**
- `q` (string, requerido): Término de búsqueda

**Response 200:**
```json
[]
```

---

### GET /education/:id

Obtener un artículo específico por ID.

**Response 200:**
```json
{
  "id": "edu_001",
  "title": "¿Qué es la Diabetes Tipo 2?",
  "content": "...",
  "type": "article",
  "duration": "8 min",
  "level": "basic",
  "tags": ["diabetes", "básico", "introducción"]
}
```

---

### GET /education/tags

Obtener contenido por tags.

**Query Parameters:**
- `tags` (string, requerido): Tags separados por coma (ej: "diabetes,nutrición")

**Response 200:**
```json
[]
```

---

### POST /education

Crear nuevo contenido (requiere rol admin).

**Request Body:**
```json
{
  "title": "Nuevo Artículo",
  "content": "Contenido del artículo...",
  "type": "article",
  "duration": "10 min",
  "level": "intermediate",
  "tags": ["tag1", "tag2"]
}
```

**Response 201:**
```json
{
  "id": "edu_002",
  ...
}
```

---

### PUT /education/:id

Actualizar contenido (requiere rol admin).

**Response 200:**
```json
{
  "id": "edu_002",
  ...
}
```

---

### DELETE /education/:id

Eliminar contenido (requiere rol admin).

**Response 204:** No Content

---

## Estructura de Datos

### FoodItem

```typescript
interface FoodItem {
  id: string;
  name: string;
  category: string;
  glycemicIndex: number;
  carbohydrates: number;
  fiber: number;
  sugars: number;
  portion: string;
  trafficLight: 'green' | 'yellow' | 'red';
  barcodes?: string[];
  commonNames: string[];
}
```

### EducationContent

```typescript
interface EducationContent {
  id: string;
  title: string;
  content: string;
  type: 'article' | 'interactive' | 'video';
  duration: string;
  level: 'basic' | 'intermediate' | 'advanced';
  tags: string[];
}
```

---

## Manejo de Errores

Todas las respuestas de error deben seguir este formato:

**Response Error (4xx/5xx):**
```json
{
  "error": {
    "message": "Mensaje de error descriptivo",
    "code": "ERROR_CODE"
  }
}
```

**Códigos de Error Comunes:**
- `401`: No autenticado
- `403`: No autorizado
- `404`: Recurso no encontrado
- `422`: Datos inválidos
- `500`: Error del servidor

---

## Notas de Implementación

1. **Cors**: El backend debe permitir requests desde `http://localhost:5173` (puerto de desarrollo de Vite).

2. **Validación**: Implementar validación de datos en todos los endpoints POST/PUT.

3. **Paginación**: Considerar implementar paginación para endpoints que devuelvan listas grandes.

4. **Cache**: Implementar cache para datos que no cambien frecuentemente (alimentos, contenido educativo).

5. **Rate Limiting**: Implementar rate limiting para prevenir abusos.

6. **Logging**: Registrar todas las solicitudes y errores para debugging.

---

## Variables de Entorno

El frontend espera la siguiente variable de entorno:

```env
VITE_API_URL=http://localhost:3000/api
```

Esta variable debe ser configurada en el archivo `.env` del proyecto frontend.

---

## Próximos Endpoints (Futuras Versiones)

- `/glucose`: Registro de niveles de glucosa
- `/meals`: Planificación de comidas
- `/progress`: Seguimiento de progreso del usuario
- `/reports`: Reportes y análisis
- `/notifications`: Configuración de notificaciones

