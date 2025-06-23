import { Client, Databases } from 'appwrite';
import { env } from './env';

export const client = new Client();

client
  .setEndpoint(env.APPWRITE_ENDPOINT)
  .setProject(env.APPWRITE_PROJECT_ID);

export const databases = new Databases(client); 