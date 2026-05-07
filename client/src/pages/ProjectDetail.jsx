import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';

export default function ProjectDetail() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', dueDate: '', assignedTo: '' });
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  const fetchTasks = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setTasks(res.data));
  };

  const fetchUsers = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsers(res.data)).catch(() => {});
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const createTask = async () => {
    if (!form.title) return;
    await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, {
      ...form,
      project: id
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setForm({ title: '', description: '', dueDate: '', assignedTo: '' });
    fetchTasks();
  };

  const updateStatus = async (taskId, status) => {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: 24 }}>
        <h2>Project Tasks</h2>

        {/* Create Task Form */}
        <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 8, marginBottom: 24 }}>
          <h3>Create Task</h3>
          <input placeholder="Title" value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            style={{ padding: 8, marginRight: 8, marginBottom: 8 }} />
          <input placeholder="Description" value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            style={{ padding: 8, marginRight: 8, marginBottom: 8 }} />
          <input type="date" value={form.dueDate}
            onChange={e => setForm({ ...form, dueDate: e.target.value })}
            style={{ padding: 8, marginRight: 8, marginBottom: 8 }} />
          <select value={form.assignedTo}
            onChange={e => setForm({ ...form, assignedTo: e.target.value })}
            style={{ padding: 8, marginRight: 8, marginBottom: 8 }}>
            <option value="">Assign to...</option>
            {users.map(u => (
              <option key={u._id} value={u._id}>{u.name}</option>
            ))}
          </select>
          <button onClick={createTask}
            style={{ padding: '8px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
            Add Task
          </button>
        </div>

        {/* Task List */}
        {tasks.length === 0 && <p>No tasks yet.</p>}
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} onUpdateStatus={updateStatus} onDelete={deleteTask} />
        ))}
      </div>
    </div>
  );
}