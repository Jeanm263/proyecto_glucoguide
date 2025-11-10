import React, { Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { FoodSearchScreen } from "./screens/foods/FoodSearchScreen";
import { EducationScreen } from "./screens/education/EducationScreen";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { RegisterScreen } from "./screens/auth/RegisterScreen";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { ProfileScreen } from "./screens/ProfileScreen";
import { FoodTrackingScreen } from "./screens/foods/FoodTrackingScreen";
import { ProfileEditScreen } from "./screens/ProfileEditScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

// --- Redirección inicial: siempre redirige a login primero
const DefaultRedirect = () => {
  // Siempre redirigir a login como punto de entrada inicial
  return <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirección por defecto */}
        <Route path="/" element={<DefaultRedirect />} />

        {/* Rutas públicas */}
        <Route
          path="/login"
          // 🔧 Si el LoginScreen falla, muestra un fallback temporal
          element={
            <ErrorBoundary>
              <LoginScreen />
            </ErrorBoundary>
          }
        />
        <Route path="/register" element={<RegisterScreen />} />

        {/* Rutas protegidas */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/foods"
          element={
            <ProtectedRoute>
              <FoodSearchScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/food-tracking"
          element={
            <ProtectedRoute>
              <FoodTrackingScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/education"
          element={
            <ProtectedRoute>
              <EducationScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <ProfileEditScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsScreen />
            </ProtectedRoute>
          }
        />

        {/* Ruta no encontrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

/**
 * Componente auxiliar para capturar errores en pantallas
 * Si un componente (como LoginScreen) lanza un error de render, evita la pantalla en blanco
 */
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<Error | null>(null);

  return (
    <Suspense fallback={<p>Cargando componente...</p>}>
      {error ? (
        <div
          style={{
            padding: "2rem",
            color: "red",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          ⚠️ Error al cargar componente:
          <br />
          {error.message}
        </div>
      ) : (
        <ErrorCatcher onError={setError}>{children}</ErrorCatcher>
      )}
    </Suspense>
  );
}

function ErrorCatcher({
  children,
  onError,
}: {
  children: React.ReactNode;
  onError: (error: Error) => void;
}) {
  try {
    return <>{children}</>;
  } catch (err) {
    onError(err as Error);
    return null;
  }
}