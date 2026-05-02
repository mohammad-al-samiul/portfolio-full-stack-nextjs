import api from '@/lib/axios';
import type { Project, CreateProjectData, UpdateProjectData } from '@/lib/types';

export const projectService = {
  /** Published projects — homepage portfolio section */
  getProjects: async (): Promise<Project[]> => {
    const response = await api.get('/projects');
    return response.data;
  },

  /** All projects — admin dashboard */
  getProjectsAdmin: async (): Promise<Project[]> => {
    const response = await api.get('/projects?admin=1');
    return response.data;
  },

  createProject: async (data: CreateProjectData): Promise<Project> => {
    const response = await api.post('/projects', data);
    return response.data;
  },

  updateProject: async (
    id: string,
    data: UpdateProjectData,
  ): Promise<Project> => {
    const response = await api.patch(`/projects/${id}`, data);
    return response.data;
  },

  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};
