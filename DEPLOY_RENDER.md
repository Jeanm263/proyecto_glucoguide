# Despliegue del Frontend en Render

## Requisitos previos

1. Cuenta en [Render](https://render.com/)
2. Backend desplegado (ver instrucciones en el backend)

## Pasos para el despliegue

### 1. Configurar variables de entorno

Asegúrate de que el archivo `.env.production` tenga la URL correcta del backend:

```
VITE_API_URL=https://tu-backend-en-render.onrender.com/api
VITE_USE_MOCK_SERVICE=false
```

### 2. Desplegar en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Haz clic en "New" y selecciona "Static Site"
3. Conecta tu repositorio de GitHub
4. Selecciona el repositorio del frontend
5. Configura:
   - Name: `glucosa-app-frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Plan: Free (para pruebas)
6. Añade las variables de entorno del archivo `.env.production`
7. Haz clic en "Create Static Site"

### 3. Configurar dominio personalizado (opcional)

Render proporcionará automáticamente un subdominio. Si deseas usar un dominio personalizado:

1. En el dashboard de Render, ve a tu sitio estático
2. Haz clic en "Settings"
3. En la sección "Custom Domains", añade tu dominio
4. Sigue las instrucciones para configurar los registros DNS

## Configuración del backend

Después de desplegar el frontend, actualiza la URL del frontend en tu backend:

1. En el dashboard de Render del backend, ve a "Environment Variables"
2. Actualiza `FRONTEND_URL` con la URL de tu frontend en Render

## Solución de problemas

### Problemas comunes

1. **Errores de CORS**:
   - Verifica que `FRONTEND_URL` en el backend coincida exactamente con la URL del frontend
   - Asegúrate de que ambas URLs usen el mismo protocolo (https)

2. **Conexión al API fallida**:
   - Verifica que `VITE_API_URL` en el frontend apunte a la URL correcta del backend
   - Asegúrate de que el backend esté funcionando correctamente

### Comandos útiles

```bash
# Verificar que el build funciona localmente
npm run build

# Verificar variables de entorno
echo $VITE_API_URL

# Verificar salud del backend
curl https://tu-backend-en-render.onrender.com/api/health
```

## Mantenimiento

1. **Actualizaciones**: Para actualizar el frontend, haz push a tu repositorio y Render reconstruirá automáticamente
2. **Monitoreo**: Usa las herramientas de monitoreo de Render para vigilar el rendimiento
3. **Backups**: Configura backups regulares de tu código fuente en GitHub