import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import { validateEnv } from "./config/env";
import monitoringService from "./services/monitoringService";

// Validar variables de entorno al iniciar la aplicación
try {
  validateEnv();
  console.log('✅ Variables de entorno validadas correctamente');
} catch (error) {
  console.error(error);
  // En desarrollo, mostrar error pero no bloquear
  if (import.meta.env.DEV) {
    console.warn('⚠️ Advertencia: Error en variables de entorno, usando valores por defecto');
  } else {
    // En producción, es crítico tener las variables correctas
    throw error;
  }
}

// Inicializar servicio de monitoreo
monitoringService.initialize();

// Agregar un listener para cuando la app se reanuda en entornos web
const handleVisibilityChange = () => {
  if (!document.hidden) {
    console.log('App ha vuelto a estar visible');
  }
};

document.addEventListener('visibilitychange', handleVisibilityChange);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);