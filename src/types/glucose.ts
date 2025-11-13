export interface GlucoseReading {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  level: number; // mg/dL
  mealContext: 'fasting' | 'before_meal' | 'after_meal' | 'bedtime' | 'other';
  notes: string;
  relatedFoods: string[]; // IDs de alimentos
  createdAt: string;
  updatedAt: string;
}

export interface GlucoseStatistics {
  average: number;
  min: number;
  max: number;
  totalCount: number;
  contextAverages: Record<string, number>;
  trend: 'improving' | 'worsening' | 'stable';
  dateRange: {
    start: string;
    end: string;
  };
}