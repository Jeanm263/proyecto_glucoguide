import React, { useState, useEffect } from 'react';
import type { Notification } from '../../types/notification';
import { notificationService } from '../../services/notificationService';
import { USE_MOCK_SERVICE } from '../../config/env';

interface NotificationBellProps {
  userId: string;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ userId }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!USE_MOCK_SERVICE && userId) {
          const unreadNotifications = await notificationService.getUnreadNotifications(userId);
          setNotifications(unreadNotifications);
          setUnreadCount(unreadNotifications.length);
        }
      } catch (error) {
        console.error('Error al cargar notificaciones:', error);
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleBellClick = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = async (id: string) => {
    try {
      if (!USE_MOCK_SERVICE) {
        await notificationService.markAsRead(id);
        setNotifications(notifications.filter(notification => notification.id !== id));
        setUnreadCount(unreadCount - 1);
      }
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return '💊';
      case 'meal':
        return '🍽️';
      case 'education':
        return '📚';
      case 'security':
        return '🔒';
      case 'tip':
        return '💡';
      case 'alert':
        return '⚠️';
      default:
        return '🔔';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#dc3545';
      case 'medium':
        return '#ffc107';
      case 'low':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="notification-bell-container">
      <button
        className="notification-bell"
        onClick={handleBellClick}
        aria-label={`Notificaciones (${unreadCount} no leídas)`}
        aria-expanded={isOpen}
      >
        <span className="bell-icon">🔔</span>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notificaciones</h3>
            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar notificaciones"
            >
              ✕
            </button>
          </div>
          
          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="empty-notifications">
                <p>No tienes notificaciones pendientes</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className="notification-item"
                  style={{ borderLeft: `4px solid ${getPriorityColor(notification.priority)}` }}
                >
                  <div className="notification-content">
                    <div className="notification-icon">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="notification-text">
                      <h4>{notification.title}</h4>
                      <p>{notification.message}</p>
                      <small>{new Date(notification.scheduledAt).toLocaleString()}</small>
                    </div>
                    <button
                      className="mark-read-button"
                      onClick={() => markAsRead(notification.id)}
                      aria-label="Marcar como leída"
                    >
                      ✓
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <style>{`
        .notification-bell-container {
          position: relative;
        }

        .notification-bell {
          background: none;
          border: none;
          cursor: pointer;
          position: relative;
          padding: 8px;
          font-size: 24px;
          color: #333;
          transition: transform 0.2s ease;
        }

        .notification-bell:hover {
          transform: scale(1.1);
        }

        .bell-icon {
          position: relative;
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #dc3545;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .notification-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 350px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          margin-top: 10px;
          max-height: 400px;
          display: flex;
          flex-direction: column;
        }

        .notification-header {
          padding: 16px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .notification-header h3 {
          margin: 0;
          font-size: 18px;
          color: #333;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #999;
          padding: 4px;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-button:hover {
          background: #f5f5f5;
          color: #333;
        }

        .notification-list {
          overflow-y: auto;
          flex: 1;
        }

        .empty-notifications {
          padding: 32px;
          text-align: center;
          color: #666;
        }

        .notification-item {
          padding: 16px;
          border-bottom: 1px solid #eee;
        }

        .notification-item:last-child {
          border-bottom: none;
        }

        .notification-content {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .notification-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .notification-text {
          flex: 1;
        }

        .notification-text h4 {
          margin: 0 0 4px 0;
          font-size: 16px;
          color: #333;
        }

        .notification-text p {
          margin: 0 0 8px 0;
          font-size: 14px;
          color: #666;
          line-height: 1.4;
        }

        .notification-text small {
          color: #999;
          font-size: 12px;
        }

        .mark-read-button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          color: #28a745;
          padding: 4px;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mark-read-button:hover {
          background: #e8f5e9;
        }

        @media (max-width: 768px) {
          .notification-dropdown {
            width: 300px;
            right: -50px;
          }
        }
      `}</style>
    </div>
  );
};