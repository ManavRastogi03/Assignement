import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 24px', background: '#1976d2', color: '#fff' }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <Link to="/dashboard" style={{ color: '#fff' }}>Dashboard</Link>
        <Link to="/projects" style={{ color: '#fff' }}>Projects</Link>
      </div>
      <div>
        {user.name} ({user.role}) &nbsp;
        <button onClick={logout} style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '4px 12px', cursor: 'pointer' }}>Logout</button>
      </div>
    </nav>
  );
}