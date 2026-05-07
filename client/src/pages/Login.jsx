import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://assignement-production.up.railway.app/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 24 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={{ display: 'block', width: '100%', marginBottom: 12, padding: 8 }} />
        <input type="password" placeholder="Password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          style={{ display: 'block', width: '100%', marginBottom: 12, padding: 8 }} />
        <button type="submit" style={{ padding: '8px 24px' }}>Login</button>
      </form>
      <p>No account? <Link to="/signup">Signup</Link></p>
    </div>
  );
}