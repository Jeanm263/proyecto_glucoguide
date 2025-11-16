import React from 'react';
import Card from './Card';
import Button from './Button';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  actionText,
  onAction,
  color = 'primary'
}) => {
  const colorClasses = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    accent: 'bg-accent text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    error: 'bg-error text-white',
  };

  return (
    <Card hoverable shadow="lg" className="h-full flex flex-col">
      <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary mb-4 flex-grow">{description}</p>
      {actionText && onAction && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAction}
          className="self-start"
        >
          {actionText}
        </Button>
      )}
    </Card>
  );
};

export default DashboardCard;