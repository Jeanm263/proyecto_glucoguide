import apiClient from './api';
import type { EducationContent } from '../types/education';

/**
 * Servicio para obtener contenido educativo desde el backend
 * TODO: Conectar con endpoints reales del backend
 */

export const educationService = {
  /**
   * Obtener todo el contenido educativo
   */
  async getAllContent(level?: string): Promise<EducationContent[]> {
    try {
      const response = await apiClient.get('/education', {
        params: level ? { level } : {}
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching education content:', error);
      throw error;
    }
  },

  /**
   * Buscar contenido educativo
   */
  async searchContent(query: string): Promise<EducationContent[]> {
    try {
      const response = await apiClient.get('/education/search', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching education content:', error);
      throw error;
    }
  },

  /**
   * Obtener un artículo por ID
   */
  async getContentById(id: string): Promise<EducationContent> {
    try {
      const response = await apiClient.get(`/education/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching education content:', error);
      throw error;
    }
  },

  /**
   * Obtener contenido por tags
   */
  async getContentByTags(tags: string[]): Promise<EducationContent[]> {
    try {
      const response = await apiClient.get('/education/tags', {
        params: { tags: tags.join(',') }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching content by tags:', error);
      throw error;
    }
  },

  /**
   * Crear nuevo contenido (admin)
   */
  async createContent(content: Omit<EducationContent, 'id'>): Promise<EducationContent> {
    try {
      const response = await apiClient.post('/education', content);
      return response.data;
    } catch (error) {
      console.error('Error creating education content:', error);
      throw error;
    }
  },

  /**
   * Actualizar contenido (admin)
   */
  async updateContent(id: string, content: Partial<EducationContent>): Promise<EducationContent> {
    try {
      const response = await apiClient.put(`/education/${id}`, content);
      return response.data;
    } catch (error) {
      console.error('Error updating education content:', error);
      throw error;
    }
  },

  /**
   * Eliminar contenido (admin)
   */
  async deleteContent(id: string): Promise<void> {
    try {
      await apiClient.delete(`/education/${id}`);
    } catch (error) {
      console.error('Error deleting education content:', error);
      throw error;
    }
  }
};

