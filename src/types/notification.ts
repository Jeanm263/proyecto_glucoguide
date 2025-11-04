export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'medication' | 'meal' | 'education' | 'security' | 'tip' | 'alert';
  priority: 'low' | 'medium' | 'high';
  scheduledAt: string;
  sentAt?: string;
  readAt?: string;
  isRead: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}