import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Experience, Project } from '../types';
import { experienceService, projectService } from '../lib/appwriteService';
import { authService } from '../lib/authService';
import { useNavigate } from 'react-router-dom';

const emptyExperience: Omit<Experience, '$id'> = {
  company: '',
  role: '',
  period: '',
  description: '',
  skills: '',
  emoji: '💻',
};

const emptyProject: Omit<Project, '$id'> = {
  title: '',
  description: '',
  technologies: '',
  status: 'Under Development',
  github: '',
  liveLink: '',
};

const AdminPage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'experiences' | 'projects'>('experiences');
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [expForm, setExpForm] = useState(emptyExperience);
  const [projForm, setProjForm] = useState(emptyProject);

  const navigate = useNavigate();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [experiencesData, projectsData] = await Promise.all([
        experienceService.getExperiences(),
        projectService.getProjects(),
      ]);
      setExperiences(experiencesData);
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingExperience?.$id) {
        await experienceService.updateExperience(editingExperience.$id, expForm);
      } else {
        await experienceService.createExperience(expForm);
      }
      await fetchData();
      setEditingExperience(null);
      setShowExperienceForm(false);
      setExpForm(emptyExperience);
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleEditExperience = (exp: Experience) => {
    setEditingExperience(exp);
    setExpForm(exp);
    setShowExperienceForm(true);
  };

  const handleDeleteExperience = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await experienceService.deleteExperience(id);
        await fetchData();
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject?.$id) {
        await projectService.updateProject(editingProject.$id, projForm);
      } else {
        await projectService.createProject(projForm);
      }
      await fetchData();
      setEditingProject(null);
      setShowProjectForm(false);
      setProjForm(emptyProject);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEditProject = (proj: Project) => {
    setEditingProject(proj);
    setProjForm(proj);
    setShowProjectForm(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(id);
        await fetchData();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 pt-20 md:pt-28">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" className="px-4 py-2">Logout</Button>
        </div>

        <div className="flex gap-4">
          <Button variant={activeTab === 'experiences' ? 'default' : 'outline'} onClick={() => setActiveTab('experiences')}>
            Experiences ({experiences.length})
          </Button>
          <Button variant={activeTab === 'projects' ? 'default' : 'outline'} onClick={() => setActiveTab('projects')}>
            Projects ({projects.length})
          </Button>
        </div>

        {/* Experience Form */}
        {showExperienceForm && (
          <div className="bg-card border p-6 rounded-xl mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {editingExperience ? 'Edit Experience' : 'Add New Experience'}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowExperienceForm(false);
                  setEditingExperience(null);
                  setExpForm(emptyExperience);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <form onSubmit={handleSaveExperience} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input
                  type="text"
                  value={expForm.company}
                  onChange={(e) => setExpForm({...expForm, company: e.target.value})}
                  className="w-full p-2 border rounded-md bg-background"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input
                  type="text"
                  value={expForm.role}
                  onChange={(e) => setExpForm({...expForm, role: e.target.value})}
                  className="w-full p-2 border rounded-md bg-background"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Period</label>
                <input
                  type="text"
                  value={expForm.period}
                  onChange={(e) => setExpForm({...expForm, period: e.target.value})}
                  className="w-full p-2 border rounded-md bg-background"
                  placeholder="e.g., 2022 - 2024"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Emoji</label>
                <input
                  type="text"
                  value={expForm.emoji}
                  onChange={(e) => setExpForm({...expForm, emoji: e.target.value})}
                  className="w-full p-2 border rounded-md bg-background"
                  maxLength={2}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={expForm.description}
                  onChange={(e) => setExpForm({...expForm, description: e.target.value})}
                  className="w-full p-2 border rounded-md bg-background"
                  rows={3}
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Skills (comma-separated)</label>
                <input
                  type="text"
                  value={expForm.skills}
                  onChange={(e) => setExpForm({...expForm, skills: e.target.value})}
                  className="w-full p-2 border rounded-md bg-background"
                  placeholder="React, TypeScript, Node.js"
                  required
                />
              </div>
              
              <div className="md:col-span-2 flex gap-2 pt-4">
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  {editingExperience ? 'Update' : 'Save'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowExperienceForm(false);
                    setEditingExperience(null);
                    setExpForm(emptyExperience);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Project Form */}
        {showProjectForm && (
          <div className="bg-card border p-6 rounded-xl mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowProjectForm(false);
                  setEditingProject(null);
                  setProjForm(emptyProject);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={projForm.title}
                  onChange={(e) => setProjForm({...projForm, title: e.target.value})}
                  className="w-full p-2 border rounded-md bg-background"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={projForm.status}
                  onChange={(e) => setProjForm({...projForm, status: e.target.value})}
                  className="w-full p-2 border rounded-md bg-background"
                  required
                >
                  <option value="Under Development">Under Development</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={projForm.description}
                  onChange={(e) => setProjForm({...projForm, description: e.target.value})}
                  className="w-full p-2 border rounded-md bg-background"
                  rows={3}
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={projForm.technologies}
                  onChange={(e) => setProjForm({...projForm, technologies: e.target.value})}
                  className="w-full p-2 border rounded-md bg-background"
                  placeholder="React, TypeScript, Tailwind"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={projForm.github}
                  onChange={(e) => setProjForm({...projForm, github: e.target.value})}
                  className="w-full p-2 border rounded-md bg-background"
                  placeholder="https://github.com/username/repo"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Live Link (optional)</label>
                <input
                  type="url"
                  value={projForm.liveLink}
                  onChange={(e) => setProjForm({...projForm, liveLink: e.target.value})}
                  className="w-full p-2 border rounded-md bg-background"
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="md:col-span-2 flex gap-2 pt-4">
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  {editingProject ? 'Update' : 'Save'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowProjectForm(false);
                    setEditingProject(null);
                    setProjForm(emptyProject);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'experiences' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Experiences</h2>
              <Button onClick={() => { setShowExperienceForm(true); setEditingExperience(null); setExpForm(emptyExperience); }}>
                <Plus className="w-4 h-4 mr-2" /> Add Experience
              </Button>
            </div>
            {experiences.map((exp) => (
              <div key={exp.$id} className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-white/10 bg-card border p-4 rounded-xl">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{exp.emoji} {exp.company} <span className="text-sm text-muted-foreground">({exp.period})</span></h3>
                    <p className="text-muted-foreground text-sm">{exp.role}</p>
                    <p className="mt-1 text-sm">{exp.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {exp.skills.split(',').map((s, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-muted rounded-md border">{s.trim()}</span>
                      ))}
                    </div>
                  </div>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditExperience(exp)}><Edit2 className="w-4 h-4" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteExperience(exp.$id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Projects</h2>
              <Button onClick={() => { setShowProjectForm(true); setEditingProject(null); setProjForm(emptyProject); }}>
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </Button>
            </div>
            {projects.map((proj) => (
              <div key={proj.$id} className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-white/10 bg-card border p-4 rounded-xl">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{proj.title}</h3>
                    <p className="text-muted-foreground text-sm">{proj.status}</p>
                    <p className="mt-1 text-sm">{proj.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {proj.technologies.split(',').map((tech, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-muted rounded-md border">{tech.trim()}</span>
                      ))}
                    </div>
                    <div className="mt-2 text-xs">
                      <a href={proj.github} className="text-primary underline mr-2">GitHub</a>
                      {proj.liveLink && <a href={proj.liveLink} className="text-primary underline">Live</a>}
                    </div>
                  </div>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditProject(proj)}><Edit2 className="w-4 h-4" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteProject(proj.$id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;