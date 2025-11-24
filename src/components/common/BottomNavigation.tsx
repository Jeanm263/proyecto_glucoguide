import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface BottomNavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const NAVIGATION_ITEMS: BottomNavigationItem[] = [
  {
    id: 'home',
    label: 'Inicio',
    icon: '🏠',
    path: '/home'
  },
  {
    id: 'foods',
    label: 'Alimentos',
    icon: '🍎',
    path: '/foods'
  },
  {
    id: 'tracking',
    label: 'Seguimiento',
    icon: '📝',
    path: '/food-tracking'
  },
  {
    id: 'glucose',
    label: 'Glucosa',
    icon: '📊',
    path: '/glucose'
  },
  {
    id: 'education',
    label: 'Educación',
    icon: '📚',
    path: '/education'
  },
  {
    id: 'profile',
    label: 'Perfil',
    icon: '👤',
    path: '/profile'
  }
];

export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav 
      className="bottom-navigation"
      role="navigation"
      aria-label="Navegación principal"
    >
      <ul className="nav-list">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <li key={item.id} className="nav-item">
              <button
                onClick={() => handleNavigation(item.path)}
                className={`nav-button ${isActive ? 'active' : ''}`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="nav-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <style>{`
        .bottom-navigation {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(156, 39, 176, 0.1);
          padding: 12px 0;
          z-index: 1000;
          box-shadow: 0 -2px 10px rgba(156, 39, 176, 0.1);
        }

        .nav-list {
          display: flex;
          justify-content: space-around;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          max-width: 1200px;
          margin: 0 auto;
        }

        .nav-item {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .nav-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          background: none;
          border: none;
          padding: 8px 12px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #9e9e9e;
          font-size: 11px;
          font-weight: 500;
          width: 100%;
        }

        .nav-button:hover {
          background: rgba(156, 39, 176, 0.1);
          color: #9c27b0;
        }

        .nav-button.active {
          color: #9c27b0;
          font-weight: 600;
          transform: translateY(-2px);
        }

        .nav-button.active .nav-icon {
          transform: scale(1.1);
        }

        .nav-icon {
          font-size: 18px;
          transition: transform 0.3s ease;
        }

        .nav-label {
          transition: all 0.3s ease;
        }

        @media (min-width: 768px) {
          .bottom-navigation {
            display: none;
          }
        }

        @media (max-width: 767px) {
          /* Ajustar padding en pantallas muy pequeñas */
          .nav-button {
            padding: 6px 8px;
            font-size: 10px;
          }
          
          .nav-icon {
            font-size: 16px;
          }
        }
      `}</style>
    </nav>
  );
};