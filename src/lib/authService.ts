import { Account } from 'appwrite';
import { client } from './appwrite';

const account = new Account(client);

export const authService = {
  async login(email: string, password: string) {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  async logout() {
    try {
      return await account.deleteSession('current');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
  async getSession() {
    try {
      return await account.get();
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  },
}; 