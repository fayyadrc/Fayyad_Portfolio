import { databases } from './appwrite';
import { Experience, Project } from '../types';
import { env } from './env';

export const experienceService = {
  async getExperiences(): Promise<Experience[]> {
    const res = await databases.listDocuments(env.APPWRITE_DATABASE_ID, env.APPWRITE_EXPERIENCES_COLLECTION_ID);
    return res.documents as unknown as Experience[];
  },
  async createExperience(data: Omit<Experience, '$id'>) {
    return databases.createDocument(env.APPWRITE_DATABASE_ID, env.APPWRITE_EXPERIENCES_COLLECTION_ID, 'unique()', data);
  },
  async updateExperience(id: string, data: Partial<Experience>) {
    return databases.updateDocument(env.APPWRITE_DATABASE_ID, env.APPWRITE_EXPERIENCES_COLLECTION_ID, id, data);
  },
  async deleteExperience(id: string) {
    return databases.deleteDocument(env.APPWRITE_DATABASE_ID, env.APPWRITE_EXPERIENCES_COLLECTION_ID, id);
  }
};

export const projectService = {
  async getProjects(): Promise<Project[]> {
    const res = await databases.listDocuments(env.APPWRITE_DATABASE_ID, env.APPWRITE_PROJECTS_COLLECTION_ID);
    return res.documents as unknown as Project[];
  },
  async createProject(data: Omit<Project, '$id'>) {
    return databases.createDocument(env.APPWRITE_DATABASE_ID, env.APPWRITE_PROJECTS_COLLECTION_ID, 'unique()', data);
  },
  async updateProject(id: string, data: Partial<Project>) {
    return databases.updateDocument(env.APPWRITE_DATABASE_ID, env.APPWRITE_PROJECTS_COLLECTION_ID, id, data);
  },
  async deleteProject(id: string) {
    return databases.deleteDocument(env.APPWRITE_DATABASE_ID, env.APPWRITE_PROJECTS_COLLECTION_ID, id);
  }
}; 