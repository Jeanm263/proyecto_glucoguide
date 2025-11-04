export interface SymptomEntry {
  type: 'energy' | 'mood' | 'physical' | 'other';
  severity: number; // 1-10
  description: string;
}

export interface Symptom {
  id: string;
  userId: string;
  date: string;
  symptoms: SymptomEntry[];
  notes: string;
  relatedFoods: string[]; // IDs de alimentos
  createdAt: string;
  updatedAt: string;
}

export interface SymptomStats {
  totalRecords: number;
  energy: {
    low: number; // 1-3
    medium: number; // 4-7
    high: number; // 8-10
  };
  mood: {
    low: number; // 1-3
    medium: number; // 4-7
    high: number; // 8-10
  };
  physical: {
    low: number; // 1-3
    medium: number; // 4-7
    high: number; // 8-10
  };
}