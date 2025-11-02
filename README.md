# 🩺 GlucosaApp

Aplicación web para gestión de diabetes tipo 2 con información nutricional y contenido educativo.

## Características

- 🔐 **Autenticación**: Sistema de login y registro de usuarios
- 🍎 **Búsqueda de Alimentos**: Base de datos con más de 100 alimentos con información nutricional detallada
- 🚦 **Semáforo Nutricional**: Sistema de clasificación basado en índice glucémico y valor nutricional
- 📚 **Módulo Educativo**: Contenido interactivo sobre diabetes, nutrición y hábitos saludables
- 📊 **Información Detallada**: Índice glucémico, carbohidratos, fibra y azúcares

## Tecnologías

- React 19 + TypeScript
- Vite para desarrollo rápido
- React Router para navegación
- CSS-in-JS para estilos

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── nutrition/       # Componentes de alimentación
│   └── education/       # Componentes educativos
├── screens/             # Pantallas principales
│   ├── auth/            # Autenticación (login y registro)
│   ├── foods/           # Pantalla de búsqueda de alimentos
│   └── education/       # Pantalla de contenido educativo
├── services/            # Servicios API
├── types/               # Definiciones TypeScript
├── utils/               # Utilidades y funciones helper
├── constants/           # Datos y constantes
└── App.tsx              # Componente principal con rutas
```

## Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

### 🔐 Credenciales de Prueba

La aplicación viene con un sistema mock para probar sin backend:

**Usuario Demo:**
- Email: `demo@glucosaapp.com`
- Contraseña: `demo123`

**Usuario Test:**
- Email: `test@glucosaapp.com`
- Contraseña: `test123`

También puedes registrar nuevos usuarios. Los datos se guardan en localStorage.

Ver [CREDENTIALES_DE_PRUEBA.md](CREDENTIALES_DE_PRUEBA.md) para más información.

## Funcionalidades Principales

### Algoritmo Semáforo Nutricional

El sistema clasifica alimentos en tres categorías:

- 🟢 **Verde**: Excelente elección (IG < 55, alta fibra, bajo azúcar)
- 🟡 **Amarillo**: Consumir con moderación (IG 55-70)
- 🔴 **Rojo**: Consumir ocasionalmente (IG > 70, alta azúcar)

### Base de Datos de Alimentos

Incluye información sobre:
- Índice glucémico
- Carbohidratos
- Fibra
- Azúcares
- Porción recomendada
- Nombres comunes

### Contenido Educativo

Artículos y recursos interactivos sobre:
- Diabetes tipo 2
- Planificación nutricional
- Índice glucémico
- Hábitos saludables
- Ejercicio y salud

## Rutas Disponibles

- `/` - Página de inicio
- `/login` - Inicio de sesión
- `/register` - Registro de usuarios
- `/foods` - Búsqueda de alimentos
- `/education` - Contenido educativo

## Próximas Características

- 📈 Seguimiento de glucosa
- 🍽️ Planificación de comidas
- 📱 Versión móvil (React Native)
- 🔄 Conexión con API backend

## Licencia

MIT
