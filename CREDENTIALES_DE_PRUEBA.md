# 🔑 Credenciales de Prueba - GlucosaApp

## Usuarios Predefinidos

La aplicación incluye usuarios de prueba preconfigurados para que puedas probar el sistema de autenticación sin necesidad de backend.

---

## 👤 Usuario Demo

**Email:** `demo@glucosaapp.com`  
**Contraseña:** `demo123`  
**Nombre:** Usuario Demo

---

## 👤 Usuario Test

**Email:** `test@glucosaapp.com`  
**Contraseña:** `test123`  
**Nombre:** Test User

---

## 🆕 Registro de Nuevos Usuarios

También puedes registrar nuevos usuarios directamente desde la aplicación. Los datos se guardarán en tu navegador (localStorage).

**Ejemplo de registro:**
- Nombre: Tu nombre completo
- Email: `tu-email@ejemplo.com`
- Contraseña: (mínimo 6 caracteres)
- Confirmar Contraseña: (debe coincidir)

---

## 🔄 Cómo Usar

1. **Inicia la aplicación:**
   ```bash
   npm run dev
   ```

2. **Te redirigirá automáticamente al login**

3. **Inicia sesión con uno de los usuarios de prueba:**
   - Email: `demo@glucosaapp.com`
   - Contraseña: `demo123`

4. **O regístrate con un nuevo usuario**

5. **Después del login, serás redirigido a `/home`**

---

## 💾 Almacenamiento

Los datos se guardan en el localStorage del navegador:
- **authToken**: Token de autenticación
- **current_mock_user**: Datos del usuario actual
- **mock_users**: Base de datos de usuarios

**⚠️ Nota:** Estos datos son temporales y se perderán si limpias el localStorage o usas modo incógnito.

---

## 🧹 Limpiar Datos

Si necesitas limpiar todos los datos de prueba:

1. Abre la consola del navegador (F12)
2. Ejecuta:
   ```javascript
   localStorage.clear();
   location.reload();
   ```

---

## 🔧 Cambiar a Backend Real

Cuando esté listo el backend:

1. Abre `src/services/authService.ts`
2. Cambia esta línea:
   ```typescript
   const USE_MOCK_SERVICE = true;
   ```
   Por:
   ```typescript
   const USE_MOCK_SERVICE = false;
   ```

3. Configura la URL del backend en `env.example` o `.env`

---

## ✅ Funcionalidades Mock

- ✅ Login con usuarios predefinidos
- ✅ Registro de nuevos usuarios
- ✅ Verificación de autenticación
- ✅ Logout
- ✅ Persistencia en localStorage
- ✅ Validación de credenciales
- ✅ Simulación de delay de red

---

¡Disfruta probando GlucosaApp! 🚀

