import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchProjects = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/projects`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProjects(res.data));
  };

  useEffect(() => { fetchProjects(); }, []);

  const createProject = async () => {
    if (!name) return;
    await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, { name, description }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setName('');
    setDescription('');
    fetchProjects();
  };

const deleteProject = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProjects();
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: 24 }}>
        <h2>Projects</h2>
        {user.role === 'admin' && (
          <div style={{ marginBottom: 16 }}>
            <input placeholder="Project name" value={name}
              onChange={e => setName(e.target.value)}
              style={{ padding: 8, marginRight: 8 }} />
            <input placeholder="Description" value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ padding: 8, marginRight: 8 }} />
            <button onClick={createProject} style={{ padding: '8px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
              Create
            </button>
          </div>
        )}
        {projects.map(p => (
          <ProjectCard key={p._id} project={p} onDelete={deleteProject} />
        ))}
      </div>
    </div>
  );
}