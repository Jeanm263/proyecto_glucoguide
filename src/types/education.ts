export interface EducationContent {
  id: string;
  title: string;
  content: string;
  type: 'article' | 'interactive' | 'video';
  duration: string;
  level: 'basic' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface EducationCategory {
  id: string;
  name: string;
  icon?: string;
  description: string;
}

