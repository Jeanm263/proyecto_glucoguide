import React from 'react';
import Card from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  trend,
  trendValue,
  icon,
  color = 'primary'
}) => {
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
  };

  const trendColor = trend === 'up' ? 'text-success' : 'text-error';

  return (
    <Card className="h-full">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-text-primary mb-1">{value}</h3>
          {description && (
            <p className="text-sm text-text-secondary">{description}</p>
          )}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} bg-opacity-10 flex items-center justify-center`}>
            {icon}
          </div>
        )}
      </div>
      
      {trendValue && (
        <div className="mt-4 flex items-center">
          <span className={`text-sm font-medium ${trendColor}`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </span>
          <span className="text-sm text-text-secondary ml-2">vs último mes</span>
        </div>
      )}
    </Card>
  );
};

export default StatCard;