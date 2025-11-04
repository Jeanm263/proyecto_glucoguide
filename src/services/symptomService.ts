import apiClient from './api';

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

export const symptomService = {
  /**
   * Obtener todos los registros de síntomas
   */
  async getAllSymptoms(params?: { 
    userId?: string; 
    startDate?: string;
    endDate?: string;
  }): Promise<Symptom[]> {
    try {
      const response = await apiClient.get('/symptoms', { params });
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching symptoms:', error);
      throw error;
    }
  },

  /**
   * Obtener un registro de síntomas por ID
   */
  async getSymptomById(id: string): Promise<Symptom> {
    try {
      const response = await apiClient.get(`/symptoms/${id}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching symptom:', error);
      throw error;
    }
  },

  /**
   * Crear un nuevo registro de síntomas
   */
  async createSymptom(symptom: Omit<Symptom, 'id' | 'createdAt' | 'updatedAt'>): Promise<Symptom> {
    try {
      const response = await apiClient.post('/symptoms', symptom);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error creating symptom:', error);
      throw error;
    }
  },

  /**
   * Actualizar un registro de síntomas
   */
  async updateSymptom(id: string, symptom: Partial<Symptom>): Promise<Symptom> {
    try {
      const response = await apiClient.put(`/symptoms/${id}`, symptom);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error updating symptom:', error);
      throw error;
    }
  },

  /**
   * Eliminar un registro de síntomas
   */
  async deleteSymptom(id: string): Promise<void> {
    try {
      await apiClient.delete(`/symptoms/${id}`);
    } catch (error) {
      console.error('Error deleting symptom:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas de síntomas
   */
  async getSymptomStats(params: { 
    userId: string; 
    startDate?: string;
    endDate?: string;
  }): Promise<SymptomStats> {
    try {
      const response = await apiClient.get('/symptoms/stats', { params });
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching symptom stats:', error);
      throw error;
    }
  }
};