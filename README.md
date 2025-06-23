# Personal Portfolio

[fayyadrc.vercel.app](https://fayyadrc.vercel.app)

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, featuring dynamic content management through Appwrite backend.

## Tech Stack

- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 📝 TypeScript 
- ☁️ Vercel (Deployment)
- 🔐 Appwrite (Backend & Authentication)

## Features

- **Dynamic Content Management**: Experiences and projects managed through Appwrite backend
- **Admin Panel**: Protected admin interface for content management
- **Responsive Design**: Modern, mobile-friendly UI
- **Dark Mode Support**: Built-in dark/light theme support
- **Authentication**: Secure admin access with Appwrite auth

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm
- Appwrite Cloud account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Fayyad_Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Appwrite credentials in `.env`:
   ```env
   VITE_APPWRITE_ENDPOINT=https://your-appwrite-endpoint.cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_project_id_here
   VITE_APPWRITE_DATABASE_ID=your_database_id_here
   VITE_APPWRITE_EXPERIENCES_COLLECTION_ID=your_experiences_collection_id_here
   VITE_APPWRITE_PROJECTS_COLLECTION_ID=your_projects_collection_id_here
   ```

4. **Appwrite Setup**
   
   - Create a new project in Appwrite Cloud
   - Create a database with collections for experiences and projects
   - Set up authentication (Email/Password)
   - Create an admin user in the Users section
   - Update your `.env` file with the correct IDs

5. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Access the application**
   - Main site: `http://localhost:5173`
   - Admin panel: `http://localhost:5173/admin`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_APPWRITE_ENDPOINT` | Appwrite API endpoint | Yes |
| `VITE_APPWRITE_PROJECT_ID` | Your Appwrite project ID | Yes |
| `VITE_APPWRITE_DATABASE_ID` | Database ID for content | Yes |
| `VITE_APPWRITE_EXPERIENCES_COLLECTION_ID` | Collection ID for experiences | Yes |
| `VITE_APPWRITE_PROJECTS_COLLECTION_ID` | Collection ID for projects | Yes |

## Deployment

The application is configured for deployment on Vercel. Make sure to:

1. Set up environment variables in your Vercel project settings
2. Connect your GitHub repository
3. Deploy automatically on push to main branch

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already added to `.gitignore`
- Use environment variables in production deployments
- Keep your Appwrite API keys secure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
