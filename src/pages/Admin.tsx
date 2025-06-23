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

  // Form states
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [expForm, setExpForm] = useState(emptyExperience);
  const [projForm, setProjForm] = useState(emptyProject);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

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

  // Experience handlers
  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if ((editingExperience as Experience | null)?.$id) {
        await experienceService.updateExperience(editingExperience!.$id, expForm);
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

  // Project handlers
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if ((editingProject as Project | null)?.$id) {
        await projectService.updateProject(editingProject!.$id, projForm);
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
      <div className="min-h-screen bg-background p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 pt-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('experiences')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'experiences'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Experiences ({experiences.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Projects ({projects.length})
          </button>
        </div>

        {/* Experiences Tab */}
        {activeTab === 'experiences' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Experiences</h2>
              <Button onClick={() => { setShowExperienceForm(true); setEditingExperience(null); setExpForm(emptyExperience); }}>
                <Plus className="w-4 h-4 mr-2" /> Add Experience
              </Button>
            </div>
            {showExperienceForm && (
              <form onSubmit={handleSaveExperience} className="rounded-xl shadow p-8 mb-8 max-w-2xl mx-auto border border-border">
                <h3 className="text-xl font-semibold mb-6 text-primary flex items-center gap-2">
                  {editingExperience ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />} {editingExperience ? 'Edit Experience' : 'Add Experience'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Company</label>
                    <input required className="input w-full" placeholder="Company" value={expForm.company} onChange={e => setExpForm(f => ({ ...f, company: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <input required className="input w-full" placeholder="Role" value={expForm.role} onChange={e => setExpForm(f => ({ ...f, role: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Period</label>
                    <input required className="input w-full" placeholder="Period" value={expForm.period} onChange={e => setExpForm(f => ({ ...f, period: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Emoji</label>
                    <input className="input w-full" placeholder="Emoji (optional)" value={expForm.emoji} onChange={e => setExpForm(f => ({ ...f, emoji: e.target.value }))} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea required className="input w-full min-h-[60px] resize-y" placeholder="Description" value={expForm.description} onChange={e => setExpForm(f => ({ ...f, description: e.target.value }))} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
                    <input required className="input w-full" placeholder="e.g. Python, Pandas, Numpy" value={expForm.skills} onChange={e => setExpForm(f => ({ ...f, skills: e.target.value }))} />
                  </div>
                </div>
                <div className="flex gap-3 mt-8 justify-end">
                  <Button type="submit" className="bg-primary text-white flex items-center gap-1 shadow-md hover:bg-primary/90"><Save className="w-4 h-4" /> Save</Button>
                  <Button type="button" variant="outline" onClick={() => { setShowExperienceForm(false); setEditingExperience(null); setExpForm(emptyExperience); }} className="flex items-center gap-1"><X className="w-4 h-4" /> Cancel</Button>
                </div>
              </form>
            )}
            <ul className="space-y-4">
              {experiences.map(exp => (
                <li key={exp.$id} className="bg-card rounded-lg shadow p-4 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-lg">{exp.company} <span className="text-base font-normal">({exp.period})</span></div>
                    <div className="text-sm text-muted-foreground">{exp.role}</div>
                    <div className="text-sm mt-1">{exp.description}</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exp.skills.split(',').map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-muted text-xs rounded-md">{skill.trim()}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleEditExperience(exp)}><Edit2 className="w-4 h-4" /></Button>
                    <Button variant="destructive" onClick={() => handleDeleteExperience(exp.$id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Projects</h2>
              <Button onClick={() => { setShowProjectForm(true); setEditingProject(null); setProjForm(emptyProject); }}>
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </Button>
            </div>
            {showProjectForm && (
              <form onSubmit={handleSaveProject} className="bg-card rounded-xl shadow p-8 mb-8 max-w-2xl mx-auto border border-border">
                <h3 className="text-xl font-semibold mb-6 text-primary flex items-center gap-2">
                  {editingProject ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />} {editingProject ? 'Edit Project' : 'Add Project'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input required className="input w-full" placeholder="Title" value={projForm.title} onChange={e => setProjForm(f => ({ ...f, title: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <input required className="input w-full" placeholder="Status" value={projForm.status} onChange={e => setProjForm(f => ({ ...f, status: e.target.value }))} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea required className="input w-full min-h-[60px] resize-y" placeholder="Description" value={projForm.description} onChange={e => setProjForm(f => ({ ...f, description: e.target.value }))} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Technologies (comma separated)</label>
                    <input required className="input w-full" placeholder="e.g. React, Tailwind CSS, Supabase" value={projForm.technologies} onChange={e => setProjForm(f => ({ ...f, technologies: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">GitHub Link</label>
                    <input required className="input w-full" placeholder="GitHub Link" value={projForm.github} onChange={e => setProjForm(f => ({ ...f, github: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Live Link</label>
                    <input className="input w-full" placeholder="Live Link (optional)" value={projForm.liveLink} onChange={e => setProjForm(f => ({ ...f, liveLink: e.target.value }))} />
                  </div>
                </div>
                <div className="flex gap-3 mt-8 justify-end">
                  <Button type="submit" className="bg-primary text-white flex items-center gap-1 shadow-md hover:bg-primary/90"><Save className="w-4 h-4" /> Save</Button>
                  <Button type="button" variant="outline" onClick={() => { setShowProjectForm(false); setEditingProject(null); setProjForm(emptyProject); }} className="flex items-center gap-1"><X className="w-4 h-4" /> Cancel</Button>
                </div>
              </form>
            )}
            <ul className="space-y-4">
              {projects.map(proj => (
                <li key={proj.$id} className="bg-card rounded-lg shadow p-4 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-lg">{proj.title}</div>
                    <div className="text-sm text-muted-foreground">{proj.status}</div>
                    <div className="text-sm mt-1">{proj.description}</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {proj.technologies.split(',').map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-muted text-xs rounded-md">{tech.trim()}</span>
                      ))}
                    </div>
                    <div className="text-xs mt-2">
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-primary underline">GitHub</a>
                      {proj.liveLink && (
                        <>
                          {' | '}
                          <a href={proj.liveLink} target="_blank" rel="noopener noreferrer" className="text-primary underline">Live</a>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleEditProject(proj)}><Edit2 className="w-4 h-4" /></Button>
                    <Button variant="destructive" onClick={() => handleDeleteProject(proj.$id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;