import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary para capturar errores de React y mostrar UI de fallback
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    }

    // Aquí podrías enviar el error a un servicio de tracking (Sentry, etc.)
    // en producción
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={errorBoundaryStyles.container}>
          <div style={errorBoundaryStyles.content}>
            <div style={errorBoundaryStyles.icon}>⚠️</div>
            <h1 style={errorBoundaryStyles.title}>Algo salió mal</h1>
            <p style={errorBoundaryStyles.message}>
              Lo sentimos, ha ocurrido un error inesperado.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <details style={errorBoundaryStyles.details}>
                <summary style={errorBoundaryStyles.summary}>
                  Detalles del error (solo en desarrollo)
                </summary>
                <pre style={errorBoundaryStyles.errorText}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              style={errorBoundaryStyles.button}
            >
              Volver al inicio
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const errorBoundaryStyles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  content: {
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '24px',
    padding: '48px',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center' as const,
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  icon: {
    fontSize: '64px',
    marginBottom: '24px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    margin: '0 0 16px 0',
    color: '#333',
  },
  message: {
    fontSize: '16px',
    color: '#666',
    margin: '0 0 32px 0',
    lineHeight: '1.6',
  },
  details: {
    textAlign: 'left' as const,
    marginBottom: '24px',
    background: '#f5f5f5',
    borderRadius: '8px',
    padding: '16px',
  },
  summary: {
    cursor: 'pointer',
    fontWeight: 600,
    marginBottom: '12px',
    color: '#666',
  },
  errorText: {
    color: '#c33',
    fontSize: '12px',
    overflow: 'auto',
    whiteSpace: 'pre-wrap' as const,
  },
  button: {
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: 600,
    border: 'none',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

