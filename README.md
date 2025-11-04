# GlucosaApp - Frontend

Aplicación web para el acompañamiento nutricional y educativo de personas con diabetes tipo II.

## Características

- ✅ Autenticación de usuarios (registro e inicio de sesión)
- ✅ Búsqueda y consulta de alimentos con información nutricional
- ✅ Seguimiento de alimentos consumidos
- ✅ Planificación de comidas
- ✅ Contenido educativo sobre diabetes
- ✅ Registro de síntomas
- ✅ Sistema de notificaciones

## Tecnologías

- React 18 con TypeScript
- Vite como bundler
- React Router para navegación
- React Hook Form para formularios
- Zod para validación
- Axios para llamadas API
- React Hot Toast para notificaciones
- CSS-in-JS para estilos

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Instalar dependencias
npm install

# Crear archivo .env basado en env.example
cp env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm run lint` - Ejecuta el linter
- `npm run preview` - Vista previa de la compilación de producción
- `npm run test` - Ejecuta las pruebas unitarias
- `npm run test:watch` - Ejecuta las pruebas en modo watch

## Estructura del proyecto

```
src/
├── components/     # Componentes reutilizables
├── screens/        # Pantallas principales de la aplicación
├── services/       # Servicios para comunicación con el backend
├── contexts/       # Contextos de React
├── hooks/          # Hooks personalizados
├── utils/          # Utilidades y funciones auxiliares
├── types/          # Definiciones de tipos TypeScript
├── constants/      # Constantes de la aplicación
├── schemas/        # Esquemas de validación
├── assets/         # Recursos estáticos
├── config/         # Configuración de la aplicación
└── App.tsx         # Componente principal
```

## Variables de entorno

El archivo `.env` debe contener:

```
# URL del API Backend
VITE_API_URL=http://localhost:4000/api

# Usar servicio mock o backend real
# true = usar mock (para desarrollo sin backend)
# false = usar backend real (cuando el backend esté disponible)
VITE_USE_MOCK_SERVICE=false
```

## Pruebas

El proyecto incluye pruebas unitarias con Jest y React Testing Library. Para ejecutar las pruebas:

```bash
# Ejecutar todas las pruebas
npm run test

# Ejecutar pruebas en modo watch
npm run test:watch
```

## Despliegue

Para compilar la aplicación para producción:

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.

## Contribución

1. Crear una rama para la nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
2. Realizar los cambios necesarios
3. Commitear los cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## Licencia

MIT