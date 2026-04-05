const API_BASE_URL = '/api';

export const api = {
  // Get all projects
  getProjects: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Add a new project
  addProject: async (projectData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) {
        throw new Error('Failed to add project');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  },
};