import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ModernNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { path: '/home', label: 'Inicio', icon: '🏠' },
    { path: '/profile', label: 'Perfil', icon: '👤' },
    { path: '/glucose', label: 'Glucosa', icon: '📊' },
    { path: '/foods', label: 'Alimentos', icon: '🍎' },
    { path: '/education', label: 'Educación', icon: '📚' },
  ];

  const isActive = (path: string) => {
    if (path === '/home') {
      return location.pathname === '/home';
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="modern-mobile-header show-on-mobile">
        <h1 className="modern-header-title">GlucosaGuide</h1>
        {user && (
          <button
            onClick={handleLogout}
            className="modern-btn modern-btn-ghost modern-btn-sm"
            style={{ 
              padding: '4px 8px',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            Salir
          </button>
        )}
      </header>

      {/* Mobile Navigation */}
      <nav className="modern-mobile-nav show-on-mobile">
        <div className="modern-mobile-nav-container">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`modern-mobile-nav-item ${
                isActive(item.path) ? 'modern-mobile-nav-item-active' : ''
              }`}
            >
              <span className="modern-mobile-nav-icon">{item.icon}</span>
              <span className="modern-mobile-nav-text">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default ModernNavbar;