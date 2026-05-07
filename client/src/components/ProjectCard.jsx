import { useNavigate } from 'react-router-dom';

export default function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div style={{ border: '1px solid #ddd', padding: 16, marginBottom: 12, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h3 style={{ margin: 0 }}>{project.name}</h3>
        {project.description && <p style={{ margin: '4px 0' }}>{project.description}</p>}
        <small>Owner: {project.owner?.name}</small>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => navigate(`/projects/${project._id}`)}
          style={{ padding: '6px 12px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          View Tasks
        </button>
        {user.role === 'admin' && (
          <button onClick={() => onDelete(project._id)}
            style={{ padding: '6px 12px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}